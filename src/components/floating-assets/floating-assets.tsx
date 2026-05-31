'use client';

import { useEffect, useRef, useState } from 'react';
import {
	ASSET_MODES,
	ASSET_SCALE,
	DEFAULT_ASSET_MODE,
	floatingAssets,
	type AssetMode,
} from '@/lib/assets/floating-assets';
import styles from './floating-assets.module.scss';

// Flip to false (or delete the button block) once default positions are captured.
const SHOW_CAPTURE_BUTTON = true;

const MODE_META: Record<AssetMode, { label: string; icon: React.ReactNode }> = {
	chaos: {
		label: 'Coffee table',
		icon: (
			<svg viewBox="0 0 16 16" aria-hidden="true">
				<path d="M3 6h8v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V6Z" />
				<path d="M11 7h1.6a1.6 1.6 0 0 1 0 3.2H11" />
				<path d="M5.5 2.2v1.6M8 2.2v1.6" />
			</svg>
		),
	},
	cleaned: {
		label: 'Cleaned up',
		icon: (
			<svg viewBox="0 0 16 16" aria-hidden="true">
				<path d="M11 2 7.5 7.5" />
				<path d="M4 14.5l1.8-5.6 5 1.6L9.4 13Z" />
				<path d="M5.6 11l4 1.3" />
			</svg>
		),
	},
	notebook: {
		label: 'Notebook',
		icon: (
			<svg viewBox="0 0 16 16" aria-hidden="true">
				<path d="M3 13.2l1.1-3 6.4-6.4 1.9 1.9-6.4 6.4-3 1.1Z" />
				<path d="M9.4 5.2l1.9 1.9" />
			</svg>
		),
	},
};

interface Point {
	x: number;
	y: number;
}

const round1 = (n: number): number => Math.round(n * 10) / 10;

export default function FloatingAssets() {
	const [mode, setMode] = useState<AssetMode>(DEFAULT_ASSET_MODE);
	const [overrides, setOverrides] = useState<
		Partial<Record<AssetMode, Record<string, Point>>>
	>({});
	const [draggingId, setDraggingId] = useState<string | null>(null);

	const audioRef = useRef<HTMLAudioElement | null>(null);
	const stageRef = useRef<HTMLDivElement | null>(null);
	const dragRef = useRef<{
		id: string;
		pointerId: number;
		startX: number;
		startY: number;
		originX: number;
		originY: number;
		moved: boolean;
	} | null>(null);
	const movedRef = useRef(false);

	useEffect(() => {
		stageRef.current?.parentElement?.setAttribute('data-mode', mode);
	}, [mode]);

	const playSound = (sound: string) => {
		audioRef.current?.pause();
		const audio = new Audio(sound);
		audioRef.current = audio;
		void audio.play().catch(() => {});
	};

	const startDrag = (
		e: React.PointerEvent<HTMLButtonElement>,
		id: string,
		originX: number,
		originY: number,
	) => {
		dragRef.current = {
			id,
			pointerId: e.pointerId,
			startX: e.clientX,
			startY: e.clientY,
			originX,
			originY,
			moved: false,
		};
		e.currentTarget.setPointerCapture(e.pointerId);
		setDraggingId(id);
	};

	const onDrag = (e: React.PointerEvent<HTMLButtonElement>) => {
		const d = dragRef.current;
		const rect = stageRef.current?.getBoundingClientRect();
		if (!d || d.pointerId !== e.pointerId || !rect) return;
		if (Math.abs(e.clientX - d.startX) > 3 || Math.abs(e.clientY - d.startY) > 3) {
			d.moved = true;
		}
		const nx = round1(d.originX + ((e.clientX - d.startX) / rect.width) * 100);
		const ny = round1(d.originY + ((e.clientY - d.startY) / rect.height) * 100);
		setOverrides(prev => ({
			...prev,
			[mode]: { ...prev[mode], [d.id]: { x: nx, y: ny } },
		}));
	};

	const endDrag = (e: React.PointerEvent<HTMLButtonElement>) => {
		const d = dragRef.current;
		if (!d || d.pointerId !== e.pointerId) return;
		movedRef.current = d.moved;
		dragRef.current = null;
		setDraggingId(null);
	};

	const handleClick = (sound: string) => {
		if (movedRef.current) {
			movedRef.current = false;
			return;
		}
		playSound(sound);
	};

	const capturePositions = () => {
		const snippet = floatingAssets
			.map(asset => {
				const base = asset.positions[mode];
				const o = overrides[mode]?.[asset.id];
				const x = round1(o?.x ?? base.x);
				const y = round1(o?.y ?? base.y);
				return `  // ${asset.id}\n      ${mode}: { x: ${x}, y: ${y}, rotation: ${base.rotation} },`;
			})
			.join('\n');
		const out = `/* ${mode} positions */\n${snippet}`;
		console.log(out);
		void navigator.clipboard?.writeText(snippet).catch(() => {});
	};

	return (
		<div className={styles['floating-assets']} data-mode={mode} ref={stageRef}>
			{floatingAssets.map(asset => {
				const base = asset.positions[mode];
				const o = overrides[mode]?.[asset.id];
				const x = o?.x ?? base.x;
				const y = o?.y ?? base.y;
				return (
					<button
						key={asset.id}
						type="button"
						className={styles['floating-assets--item']}
						aria-label={asset.label}
						onPointerDown={e => startDrag(e, asset.id, x, y)}
						onPointerMove={onDrag}
						onPointerUp={endDrag}
						onPointerCancel={endDrag}
						onMouseEnter={() => playSound(asset.sound)}
						onClick={() => handleClick(asset.sound)}
						style={
							{
								'--x': `${x}%`,
								'--y': `${y}%`,
								'--rot': `${base.rotation}deg`,
								'--scale': `${ASSET_SCALE}`,
								'--w': `${asset.width}px`,
								zIndex: asset.z ?? Math.round(100 - asset.width / 10),
								transition: draggingId === asset.id ? 'none' : undefined,
							} as React.CSSProperties
						}
					>
						<img
							className={styles['floating-assets--img']}
							src={asset.image}
							alt={asset.label}
							draggable={false}
						/>
					</button>
				);
			})}

			<div className={styles['floating-assets--modes']}>
				{ASSET_MODES.map(m => (
					<button
						key={m}
						type="button"
						className={`${styles['floating-assets--mode']} ${mode === m ? styles['floating-assets--mode-active'] : ''}`}
						aria-label={MODE_META[m].label}
						aria-pressed={mode === m}
						onClick={() => setMode(m)}
					>
						{MODE_META[m].icon}
					</button>
				))}
			</div>

			{SHOW_CAPTURE_BUTTON && (
				<button
					type="button"
					className={styles['floating-assets--capture']}
					onClick={capturePositions}
				>
					Copy positions
				</button>
			)}
		</div>
	);
}
