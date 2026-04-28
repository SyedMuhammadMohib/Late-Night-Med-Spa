// FrameGenerator.ts — Maps scroll progress to deterministic frame state
// No external assets required — all rendering is programmatic

export interface FrameState {
  documentOpacity: number;
  textBlackOpacity: number;
  redactionBoxOpacity: number;
  revealProgress: number;
  highlightIntensity: number;
  particleActivity: number;
  glowRadius: number;
  zoomLevel: number;
  pageSpread: number; // 0=single page, 1=multiple pages spread
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * Math.max(0, Math.min(1, t));
}

function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function easeInOut(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function normalize(value: number, min: number, max: number): number {
  return Math.max(0, Math.min(1, (value - min) / (max - min)));
}

export function computeFrameState(scrollProgress: number): FrameState {
  const p = Math.max(0, Math.min(1, scrollProgress));

  // Phase breakpoints
  const PHASE = {
    INTRO_END: 0.10,
    ZOOM_END: 0.25,
    DETECT_END: 0.45,
    LIFT_END: 0.65,
    REVEAL_END: 0.80,
    BATCH_END: 0.95,
    FINAL: 1.00,
  };

  // === Document opacity: fades in 0–10%, stays full ===
  const documentOpacity = easeOut(normalize(p, 0, PHASE.INTRO_END));

  // === Zoom level: normal at 0%, zoomed in by 25% ===
  const zoomLevel = lerp(
    1.0,
    1.35,
    easeInOut(normalize(p, PHASE.INTRO_END, PHASE.ZOOM_END))
  );

  // === Redaction boxes: fully visible 25–30%, fade out 45–65% ===
  const boxIn = easeOut(normalize(p, PHASE.INTRO_END, PHASE.ZOOM_END));
  const boxOut = easeOut(normalize(p, PHASE.DETECT_END, PHASE.LIFT_END));
  const redactionBoxOpacity = boxIn * (1 - boxOut);

  // === Hidden text (black-on-black): present 10–65% ===
  const textBlackOpacity = lerp(
    0,
    1,
    easeOut(normalize(p, PHASE.INTRO_END, PHASE.ZOOM_END))
  ) * (1 - easeOut(normalize(p, PHASE.DETECT_END + 0.05, PHASE.LIFT_END)));

  // === Reveal progress: 0 until 45%, then floods 65–80% ===
  const revealProgress = easeOut(normalize(p, PHASE.LIFT_END - 0.05, PHASE.REVEAL_END));

  // === Highlight intensity: red color floods 65–80% ===
  const highlightIntensity = easeOut(normalize(p, PHASE.LIFT_END, PHASE.REVEAL_END));

  // === Page spread: multiple pages spread open 80–95% ===
  const pageSpread = easeInOut(normalize(p, PHASE.REVEAL_END, PHASE.BATCH_END));

  // === Particle activity: high in detection phase ===
  let particleActivity = 0;
  if (p < PHASE.DETECT_END) {
    particleActivity = normalize(p, PHASE.ZOOM_END, PHASE.DETECT_END);
  } else {
    particleActivity = 1 - normalize(p, PHASE.DETECT_END, PHASE.LIFT_END) * 0.5;
  }
  particleActivity = easeInOut(particleActivity);

  // === Glow radius: peaks at detection and reveal ===
  const glowPeakDetect = easeOut(normalize(p, PHASE.ZOOM_END, PHASE.DETECT_END));
  const glowPeakReveal = easeOut(normalize(p, PHASE.LIFT_END, PHASE.REVEAL_END));
  const glowRadius = Math.max(glowPeakDetect, glowPeakReveal) * 200;

  return {
    documentOpacity,
    textBlackOpacity,
    redactionBoxOpacity,
    revealProgress,
    highlightIntensity,
    particleActivity,
    glowRadius,
    zoomLevel,
    pageSpread,
  };
}

// Pre-compute 120 evenly spaced frames
export const FRAME_STATES: FrameState[] = Array.from({ length: 120 }, (_, i) =>
  computeFrameState(i / 119)
);
