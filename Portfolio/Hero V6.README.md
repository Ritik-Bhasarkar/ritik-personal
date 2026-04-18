# Ritik Bhasarkar — Hero V6

Standalone, production-ready hero section.

## Files
- `Hero V6.html` — the only file you need. Self-contained (fonts from Google Fonts CDN, no JS dependencies).

## Design system
- **Type:** Space Mono (body/UI), Caveat (annotations only)
- **Palette:** `#fafaf7` paper, `#111` ink, `#6b6b6b` muted, `#ef233c` annotation accent, `#1aa34a` availability dot
- **Grid:** 12-column @ 32px rows, rendered as a subtle background
- **Vibe:** Swiss / mono / grid-driven, B&W with editorial accent

## Structure
```
.hero
├── .topnav        brand · music player (center) · nav links
├── .avail         blinking green dot · "Open to freelance"
├── .meta          role · location · live IST clock
├── .main          name (huge) + bio (small)
├── .footrow       scroll cue · socials
├── .note.note-*   editorial pointer annotations (hand-drawn)
└── .halo          cursor-reactive halo
```

## Interactions
- **Music player** — click the bracketed icon in the nav to expand into "RITIK© RADIO" bar with play/pause, seekable progress, live timer
- **Clock** — ticks every second, Asia/Kolkata timezone
- **Halo** — follows cursor inside hero, multiply blend

## Things to wire up for Claude Code
- [ ] Replace placeholder social links with real URLs
- [ ] Add `#work`, `#about`, `#contact` target sections below the hero
- [ ] (Optional) Hook the music player to a real audio file — swap the fake timer in `tick()` for `audio.currentTime` listeners
- [ ] (Optional) Remove `.note-music` and `.note-bio` if you don't want the editorial annotations in production
- [ ] Consider a color-inverting nav on scroll (Apple-style) when the hero gives way to other sections

## Notes
- The 6:59 duration is placeholder; update `DURATION` constant when real audio is wired
- Annotations hide on mobile (<720px) automatically
- Availability pill color (`#1aa34a`) is the only non-B&W color besides the accent; deliberate
