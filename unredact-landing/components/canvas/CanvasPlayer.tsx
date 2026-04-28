'use client';

import { useRef, useEffect, useCallback } from 'react';
import { FrameState } from '@/lib/frameStates';

interface CanvasPlayerProps {
  frameState: FrameState;
  className?: string;
}

// Simulated PDF content for realism
const REDACTION_BOXES = [
  { x: 0.06, y: 0.18, w: 0.55, h: 0.032 },
  { x: 0.06, y: 0.28, w: 0.45, h: 0.032 },
  { x: 0.06, y: 0.38, w: 0.60, h: 0.032 },
  { x: 0.06, y: 0.48, w: 0.30, h: 0.032 },
  { x: 0.06, y: 0.58, w: 0.50, h: 0.032 },
];

const HIDDEN_TEXT_LINES = [
  { x: 0.06, y: 0.19, text: 'CLASSIFIED: Operation Nightfall — Document ID: NF-2024-887' },
  { x: 0.06, y: 0.29, text: 'Agent: [REDACTED] — Clearance Level: UMBRA — Status: ACTIVE' },
  { x: 0.06, y: 0.39, text: 'Location: 47.2341° N, 122.6553° W — Facility designation: ECHO-7' },
  { x: 0.06, y: 0.49, text: 'Authorization: granted' },
  { x: 0.06, y: 0.59, text: 'Extraction route: Northern corridor — exit via service tunnel 3B' },
];

const NORMAL_TEXT_LINES = [
  { x: 0.06, y: 0.09, text: 'DEPARTMENT OF RECORDS — INTERNAL MEMORANDUM', bold: true },
  { x: 0.06, y: 0.14, text: 'Date: November 12, 2024 — Ref: DOC-44821-B', bold: false },
  { x: 0.06, y: 0.24, text: 'The following information pertains to personnel assignments', bold: false },
  { x: 0.06, y: 0.34, text: 'and operational directives as outlined in section 7(b).', bold: false },
  { x: 0.06, y: 0.44, text: 'Review is mandatory prior to field deployment.', bold: false },
  { x: 0.06, y: 0.54, text: 'All recipients must acknowledge receipt within 48 hours.', bold: false },
  { x: 0.06, y: 0.64, text: 'Failure to comply will result in escalation procedures.', bold: false },
  { x: 0.06, y: 0.72, text: 'cc: Division Head, Security Officer, Legal Compliance', bold: false },
  { x: 0.06, y: 0.78, text: 'Attachments: Appendix A-D, Clearance Manifest NF-2024', bold: false },
];

function drawDocument(ctx: CanvasRenderingContext2D, w: number, h: number, state: FrameState) {
  const {
    documentOpacity,
    textBlackOpacity,
    redactionBoxOpacity,
    revealProgress,
    highlightIntensity,
    glowRadius,
    zoomLevel,
    pageSpread,
  } = state;

  if (documentOpacity < 0.01) return;

  ctx.save();

  // Center and zoom
  const docW = Math.min(w * 0.52, 520);
  const docH = docW * 1.38;

  // Batch spread: show 3 pages
  const pages = pageSpread > 0.05
    ? [
        { offsetX: lerp(0, -docW * 0.7, pageSpread), offsetY: lerp(0, docH * 0.05, pageSpread), scale: lerp(1, 0.78, pageSpread), alpha: 1 },
        { offsetX: 0, offsetY: 0, scale: 1, alpha: 1 },
        { offsetX: lerp(0, docW * 0.7, pageSpread), offsetY: lerp(0, docH * 0.08, pageSpread), scale: lerp(1, 0.78, pageSpread), alpha: pageSpread },
      ]
    : [{ offsetX: 0, offsetY: 0, scale: 1, alpha: 1 }];

  pages.forEach(({ offsetX, offsetY, scale, alpha }) => {
    ctx.save();
    ctx.globalAlpha = documentOpacity * alpha;
    ctx.translate(w / 2 + offsetX, h / 2 + offsetY);
    ctx.scale(zoomLevel * scale, zoomLevel * scale);

    const left = -docW / 2;
    const top = -docH / 2;

    // Document shadow/glow
    if (glowRadius > 5) {
      ctx.shadowColor = highlightIntensity > 0.1
        ? `rgba(244, 63, 94, ${highlightIntensity * 0.35})`
        : `rgba(99, 102, 241, 0.25)`;
      ctx.shadowBlur = glowRadius * 0.6;
    }

    // Document background
    ctx.fillStyle = '#F8F6F0';
    roundRect(ctx, left, top, docW, docH, 4);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Subtle paper texture lines
    ctx.strokeStyle = 'rgba(0,0,0,0.04)';
    ctx.lineWidth = 0.5;
    for (let i = 0; i < 40; i++) {
      const lineY = top + (docH / 40) * i;
      ctx.beginPath();
      ctx.moveTo(left, lineY);
      ctx.lineTo(left + docW, lineY);
      ctx.stroke();
    }

    const fs = docH * 0.033;
    ctx.font = `400 ${fs * 0.38}px 'JetBrains Mono', monospace`;

    // Normal text lines
    NORMAL_TEXT_LINES.forEach(({ x, y, text, bold }) => {
      ctx.font = `${bold ? '600' : '400'} ${fs * (bold ? 0.38 : 0.34)}px 'Inter', sans-serif`;
      ctx.fillStyle = bold ? 'rgba(15,15,30,0.9)' : 'rgba(30,30,55,0.72)';
      ctx.fillText(text, left + docW * x, top + docH * y);
    });

    // Black redaction boxes
    if (redactionBoxOpacity > 0.01) {
      REDACTION_BOXES.forEach(({ x, y, w: bw, h: bh }, i) => {
        const glow = revealProgress > 0.01 ? 0 : Math.sin(Date.now() / 600 + i) * 0.15 + 0.85;
        ctx.globalAlpha = documentOpacity * alpha * redactionBoxOpacity * (revealProgress > 0.01 ? 1 : glow);

        // Detection glow at edges (red glow when detecting)
        if (redactionBoxOpacity > 0.5 && revealProgress < 0.1) {
          ctx.shadowColor = '#F43F5E';
          ctx.shadowBlur = 12 * (1 - redactionBoxOpacity * 0.4);
        }
        ctx.fillStyle = '#1A1A1A';
        ctx.fillRect(left + docW * x, top + docH * y - docH * bh * 0.1, docW * bw, docH * bh);
        ctx.shadowBlur = 0;
        ctx.globalAlpha = documentOpacity * alpha;
      });
    }

    // Hidden text (revealed progressively)
    if (revealProgress > 0.01 || highlightIntensity > 0.01) {
      HIDDEN_TEXT_LINES.forEach(({ x, y, text }, i) => {
        const lineReveal = Math.max(0, Math.min(1, revealProgress * 5 - i * 0.8));
        if (lineReveal < 0.01) return;

        const r = Math.round(lerp(15, 244, highlightIntensity));
        const g = Math.round(lerp(15, 63, highlightIntensity));
        const b = Math.round(lerp(30, 94, highlightIntensity));

        ctx.font = `500 ${fs * 0.38}px 'JetBrains Mono', monospace`;
        ctx.globalAlpha = documentOpacity * alpha * lineReveal;
        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;

        // Highlight bar behind revealed text
        if (highlightIntensity > 0.3) {
          ctx.fillStyle = `rgba(244, 63, 94, ${highlightIntensity * 0.12})`;
          ctx.fillRect(
            left + docW * x - 4,
            top + docH * y - docH * 0.025,
            docW * 0.62,
            docH * 0.035
          );
          ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        }

        ctx.fillText(text, left + docW * x, top + docH * y);
        ctx.globalAlpha = documentOpacity * alpha;
      });
    }

    // Document border
    ctx.strokeStyle = 'rgba(0,0,0,0.08)';
    ctx.lineWidth = 1;
    roundRect(ctx, left, top, docW, docH, 4);
    ctx.stroke();

    ctx.restore();
  });

  ctx.restore();
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

export default function CanvasPlayer({ frameState, className = '' }: CanvasPlayerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const stateRef = useRef<FrameState>(frameState);

  useEffect(() => {
    stateRef.current = frameState;
  }, [frameState]);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width: w, height: h } = canvas;

    // Background — must match --black exactly
    ctx.fillStyle = '#03030A';
    ctx.fillRect(0, 0, w, h);

    // Ambient radial gradient
    const grad = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w * 0.6);
    grad.addColorStop(0, 'rgba(7,7,21,0.9)');
    grad.addColorStop(1, 'rgba(3,3,10,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    drawDocument(ctx, w, h, stateRef.current);

    rafRef.current = requestAnimationFrame(render);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);
    rafRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [render]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: 'sticky',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'block',
        background: '#03030A',
      }}
    />
  );
}
