# Floating Assets — Default Width Chart

> Each asset has a fixed default `width` (px) in `src/lib/assets/floating-assets.ts`.
> Size is driven purely by `width`; `ASSET_SCALE = 1` is the single fixed scale applied to every asset.
> Height is `auto` (follows each PNG/SVG aspect ratio). Width is the same across all modes; only x/y/rotation change per mode.

| Asset (id) | Default width (px) | rotation (chaos) | z-index |
|---|---|---|---|
| notebook (book) | 553 | −26° | 45 (auto) |
| torn-note | 211 | 0° | 79 (auto) |
| table-lamp | 202 | 0° | **40 (fixed — behind book)** |
| coffee-tube | 158 | −14° | 84 (auto) |
| film-roll | 150 | 13° | 85 (auto) |
| dictionary-clipping | 125 | −12° | **40 (fixed — behind book)** |
| folder | 115 | −11° | 89 (auto) |
| ms-paint-toolbar | 100 | 0° | 90 (auto) |
| gel-pen | 72 | 3° | 93 (auto — sits on book) |
| paracetamol-box | 61 | −16° | 94 (auto) |
| lighter | 61 | −26° | 94 (auto) |
| cursor-arrow | 55 | −14° | 95 (auto) |

**z-index rule:** `asset.z ?? round(100 − width / 10)` — smaller items sit on top of bigger ones. `table-lamp` and `dictionary-clipping` are pinned to `40` so they render **behind** the book.

To resize any asset, edit its `width` in `floatingAssets`. The image renders at that exact pixel width everywhere.
