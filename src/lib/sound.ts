// Shared UI sound player. Caches one <audio> per source (preloaded), and plays
// a single channel at a time. Browsers block playback until the first user
// gesture (autoplay policy) — calls before that are silently ignored.

const cache = new Map<string, HTMLAudioElement>();
let last: HTMLAudioElement | null = null;

export function playSound(src: string, volume = 0.5): void {
  if (typeof window === 'undefined' || !src) return;

  let audio = cache.get(src);
  if (!audio) {
    audio = new Audio(src);
    audio.preload = 'auto';
    cache.set(src, audio);
  }

  if (last && last !== audio) last.pause();
  last = audio;

  audio.volume = volume;
  try {
    audio.currentTime = 0;
  } catch {
    // currentTime may throw before metadata loads — safe to ignore.
  }
  void audio.play().catch(() => {});
}
