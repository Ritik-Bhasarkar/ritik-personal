'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import styles from './string-grid.module.scss';

const COLS = 20;
const ROWS = 14;
const K_HOME = 70;
const K_NEIGHBOR = 320;
const DAMPING = 0.91;
const DT = 1 / 60;
const SUBSTEPS = 2;
const MOUSE_RADIUS = 150;
const MOUSE_STRENGTH = 12;

interface Pt {
    x: number; y: number;
    vx: number; vy: number;
    ox: number; oy: number;
}

export default function StringGrid() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const getSize = () => ({
            w: container.offsetWidth || window.innerWidth,
            h: container.offsetHeight || window.innerHeight,
        });
        let { w: W, h: H } = getSize();

        // --- Three.js setup ---
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(W, H);
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-W / 2, W / 2, H / 2, -H / 2, 0.1, 100);
        camera.position.z = 1;

        const PW = COLS + 1;
        const PH = ROWS + 1;
        const pts: Pt[] = [];

        const buildGrid = () => {
            pts.length = 0;
            for (let r = 0; r < PH; r++) {
                for (let c = 0; c < PW; c++) {
                    const ox = (c / COLS) * W - W / 2;
                    const oy = H / 2 - (r / ROWS) * H;
                    pts.push({ x: ox, y: oy, vx: 0, vy: 0, ox, oy });
                }
            }
        };
        buildGrid();

        // --- Geometry: horizontal + vertical line segments ---
        const hSegs = COLS * PH;
        const vSegs = ROWS * PW;
        const total = hSegs + vSegs;
        const arr = new Float32Array(total * 2 * 3);

        const geo = new THREE.BufferGeometry();
        const attr = new THREE.BufferAttribute(arr, 3);
        attr.setUsage(THREE.DynamicDrawUsage);
        geo.setAttribute('position', attr);

        const isDark = () => document.documentElement.classList.contains('theme-dark');

        const mat = new THREE.LineBasicMaterial({
            color: 0x4b4b4b,
            transparent: true,
            opacity: 0.38,
        });

        scene.add(new THREE.LineSegments(geo, mat));

        const writeVert = (base: number, p: Pt) => {
            arr[base] = p.x;
            arr[base + 1] = p.y;
            arr[base + 2] = 0;
        };

        const syncGeo = () => {
            let v = 0;
            for (let r = 0; r < PH; r++) {
                for (let c = 0; c < COLS; c++) {
                    writeVert(v * 3, pts[r * PW + c]);
                    writeVert((v + 1) * 3, pts[r * PW + c + 1]);
                    v += 2;
                }
            }
            for (let r = 0; r < ROWS; r++) {
                for (let c = 0; c < PW; c++) {
                    writeVert(v * 3, pts[r * PW + c]);
                    writeVert((v + 1) * 3, pts[(r + 1) * PW + c]);
                    v += 2;
                }
            }
            attr.needsUpdate = true;
        };

        // --- Spring-mass physics ---
        const step = (dt: number) => {
            for (let idx = 0; idx < pts.length; idx++) {
                const p = pts[idx];
                const r = Math.floor(idx / PW);
                const c = idx % PW;

                // Home spring
                let fx = -K_HOME * (p.x - p.ox);
                let fy = -K_HOME * (p.y - p.oy);

                // Neighbor springs (up, down, left, right)
                const neighbors: (Pt | null)[] = [
                    r > 0 ? pts[(r - 1) * PW + c] : null,
                    r < ROWS ? pts[(r + 1) * PW + c] : null,
                    c > 0 ? pts[r * PW + c - 1] : null,
                    c < COLS ? pts[r * PW + c + 1] : null,
                ];

                for (const n of neighbors) {
                    if (!n) continue;
                    const dx = n.x - p.x;
                    const dy = n.y - p.y;
                    const odx = n.ox - p.ox;
                    const ody = n.oy - p.oy;
                    const nat = Math.sqrt(odx * odx + ody * ody);
                    const cur = Math.sqrt(dx * dx + dy * dy) || 1e-8;
                    const ext = cur - nat;
                    fx += K_NEIGHBOR * ext * (dx / cur);
                    fy += K_NEIGHBOR * ext * (dy / cur);
                }

                p.vx = (p.vx + fx * dt) * DAMPING;
                p.vy = (p.vy + fy * dt) * DAMPING;
                p.x += p.vx * dt;
                p.y += p.vy * dt;
            }
        };

        // --- Mouse state ---
        const m = { x: 0, y: 0, px: 0, py: 0, down: false };

        const toLocal = (cx: number, cy: number) => {
            const rect = container.getBoundingClientRect();
            return {
                x: cx - rect.left - W / 2,
                y: -(cy - rect.top - H / 2),
            };
        };

        const onDown = (e: MouseEvent) => {
            m.down = true;
            const g = toLocal(e.clientX, e.clientY);
            m.x = g.x; m.y = g.y;
            m.px = g.x; m.py = g.y;
        };
        const onMove = (e: MouseEvent) => {
            m.px = m.x; m.py = m.y;
            const g = toLocal(e.clientX, e.clientY);
            m.x = g.x; m.y = g.y;
        };
        const onUp = () => { m.down = false; };

        window.addEventListener('mousedown', onDown);
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onUp);

        const applyMouse = () => {
            const dx = m.x - m.px;
            const dy = m.y - m.py;
            if (Math.abs(dx) < 0.05 && Math.abs(dy) < 0.05) return;
            for (const p of pts) {
                const dist = Math.sqrt((p.x - m.x) ** 2 + (p.y - m.y) ** 2);
                if (dist < MOUSE_RADIUS) {
                    const inf = (1 - dist / MOUSE_RADIUS) ** 2;
                    p.vx += dx * inf * MOUSE_STRENGTH;
                    p.vy += dy * inf * MOUSE_STRENGTH;
                }
            }
        };

        // --- Touch support ---
        const onTouchStart = (e: TouchEvent) => {
            if (!e.touches[0]) return;
            m.down = true;
            const g = toLocal(e.touches[0].clientX, e.touches[0].clientY);
            m.x = g.x; m.y = g.y; m.px = g.x; m.py = g.y;
        };
        const onTouchMove = (e: TouchEvent) => {
            if (!e.touches[0]) return;
            m.px = m.x; m.py = m.y;
            const g = toLocal(e.touches[0].clientX, e.touches[0].clientY);
            m.x = g.x; m.y = g.y;
        };
        const onTouchEnd = () => { m.down = false; };

        window.addEventListener('touchstart', onTouchStart, { passive: true });
        window.addEventListener('touchmove', onTouchMove, { passive: true });
        window.addEventListener('touchend', onTouchEnd);

        // --- Render loop ---
        let raf: number;
        const tick = () => {
            raf = requestAnimationFrame(tick);
            applyMouse();
            for (let s = 0; s < SUBSTEPS; s++) step(DT / SUBSTEPS);
            syncGeo();
            mat.color.set(isDark() ? 0xc8c8c8 : 0x4b4b4b);
            mat.opacity = isDark() ? 0.1 : 0.38;
            renderer.render(scene, camera);
        };
        tick();

        // --- Resize ---
        const onResize = () => {
            ({ w: W, h: H } = getSize());
            renderer.setSize(W, H);
            camera.left = -W / 2; camera.right = W / 2;
            camera.top = H / 2; camera.bottom = -H / 2;
            camera.updateProjectionMatrix();
            buildGrid();
        };
        window.addEventListener('resize', onResize);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('mousedown', onDown);
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseup', onUp);
            window.removeEventListener('touchstart', onTouchStart);
            window.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('touchend', onTouchEnd);
            window.removeEventListener('resize', onResize);
            geo.dispose();
            mat.dispose();
            renderer.dispose();
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
        };
    }, []);

    return <div ref={containerRef} className={styles['string-grid']} />;
}
