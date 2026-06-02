// Shared UI sound player. Caches one <audio> per source, plays a single channel
// at a time, and "unlocks" audio on the first user gesture so later hover/drag
// sounds are allowed by the browser autoplay policy.

const cache = new Map<string, HTMLAudioElement>();
let last: HTMLAudioElement | null = null;
let unlocked = false;
let warned = false;

function getAudio(src: string): HTMLAudioElement {
  let audio = cache.get(src);
  if (!audio) {
    audio = new Audio(src);
    audio.preload = 'auto';
    cache.set(src, audio);
  }
  return audio;
}

function unlockAll(): void {
  if (unlocked) return;
  unlocked = true;
  cache.forEach(audio => {
    const prevMuted = audio.muted;
    audio.muted = true;
    const p = audio.play();
    if (p && typeof p.then === 'function') {
      p.then(() => {
        audio.pause();
        try {
          audio.currentTime = 0;
        } catch {
          /* ignore */
        }
        audio.muted = prevMuted;
      }).catch(() => {
        audio.muted = prevMuted;
      });
    } else {
      audio.muted = prevMuted;
    }
  });
}

export function preloadSounds(srcs: string[]): void {
  if (typeof window === 'undefined') return;
  srcs.forEach(getAudio);
}

export function playSound(src: string, volume = 0.5): void {
  if (typeof window === 'undefined' || !src) return;

  const audio = getAudio(src);
  if (last && last !== audio) {
    try {
      last.pause();
    } catch {
      /* ignore */
    }
  }
  last = audio;

  audio.volume = volume;
  try {
    audio.currentTime = 0;
  } catch {
    /* metadata not ready yet */
  }

  const p = audio.play();
  if (p && typeof p.catch === 'function') {
    p.catch((err: unknown) => {
      if (!warned) {
        warned = true;
        console.warn('[sound] playback blocked/failed:', src, err);
      }
    });
  }
}

if (typeof window !== 'undefined') {
  const onGesture = () => unlockAll();
  ['pointerdown', 'touchstart', 'keydown'].forEach(ev =>
    window.addEventListener(ev, onGesture, { passive: true }),
  );
}
