import { writeFile } from 'node:fs/promises';
import path from 'node:path';

interface Point {
    x: number;
    y: number;
}

interface SvgInput {
    id: string;
    label: string;
    src: string;
    width: number;
    showOnAbout: boolean;
    hero: Point;
    statement: Point;
    about: Point;
}

const SVGS_PREFIX = '/floating-assets/svgs/';
const FILE_PATH = path.join(process.cwd(), 'src/lib/assets/hero-svgs.ts');

const isPoint = (value: unknown): value is Point => {
    if (typeof value !== 'object' || value === null) return false;
    const { x, y } = value as Record<string, unknown>;
    return typeof x === 'number' && typeof y === 'number' && Number.isFinite(x) && Number.isFinite(y);
};

const isSvg = (value: unknown): value is SvgInput => {
    if (typeof value !== 'object' || value === null) return false;
    const svg = value as Record<string, unknown>;
    return (
        typeof svg.id === 'string' &&
        typeof svg.label === 'string' &&
        typeof svg.src === 'string' &&
        typeof svg.width === 'number' &&
        typeof svg.showOnAbout === 'boolean' &&
        isPoint(svg.hero) &&
        isPoint(svg.statement) &&
        isPoint(svg.about)
    );
};

const round = (n: number): number => Math.round(n * 10) / 10;
const pt = (p: Point): string => `{ x: ${round(p.x)}, y: ${round(p.y)} }`;
const srcExpr = (src: string): string =>
    src.startsWith(SVGS_PREFIX) ? `\`\${SVGS}/${src.slice(SVGS_PREFIX.length)}\`` : JSON.stringify(src);

const serialize = (svgs: SvgInput[]): string => {
    const items = svgs
        .map(
            s => `  {
    id: ${JSON.stringify(s.id)},
    label: ${JSON.stringify(s.label)},
    src: ${srcExpr(s.src)},
    width: ${s.width},
    showOnAbout: ${s.showOnAbout},
    hero: ${pt(s.hero)},
    statement: ${pt(s.statement)},
    about: ${pt(s.about)},
  },`
        )
        .join('\n');

    return `export interface HeroSvgPoint {
  x: number;
  y: number;
}

export interface HeroSvg {
  id: string;
  label: string;
  src: string;
  width: number;
  showOnAbout: boolean;
  hero: HeroSvgPoint;
  statement: HeroSvgPoint;
  about: HeroSvgPoint;
}

const SVGS = "/floating-assets/svgs";

// Journey keyframes (center position, % of viewport): hero -> statement -> [dock on work cards] -> about.
// statement points sit in the side gutters so they never cover the statement text.
export const heroSvgs: HeroSvg[] = [
${items}
];
`;
};

export async function POST(request: Request): Promise<Response> {
    if (process.env.NODE_ENV !== 'development') {
        return Response.json({ error: 'Position editor is only available in development.' }, { status: 403 });
    }

    let body: unknown;
    try {
        body = await request.json();
    } catch {
        return Response.json({ error: 'Invalid JSON body.' }, { status: 400 });
    }

    if (!Array.isArray(body) || !body.every(isSvg)) {
        return Response.json({ error: 'Expected an array of SVG definitions.' }, { status: 400 });
    }

    await writeFile(FILE_PATH, serialize(body), 'utf8');
    return Response.json({ ok: true });
}
