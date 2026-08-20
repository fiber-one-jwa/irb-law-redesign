/**
 * IRB Law — single motion theme.
 * Every animation on the site resolves from these tokens,
 * mirroring a motion.theme.ts approach: tune the whole site here.
 */
import { animate, createTimeline, stagger, createDrawable, onScroll, cubicBezier } from 'animejs'

export const motion = {
  easings: {
    /** ink on paper — confident deceleration */
    ink: cubicBezier(0.22, 1, 0.36, 1),
    /** the stamp — spring-like overshoot for the seal */
    stamp: cubicBezier(0.34, 1.56, 0.64, 1),
    /** quiet hover micro-interactions */
    hover: cubicBezier(0.4, 0, 0.2, 1),
  },
  duration: {
    snap: 220,
    base: 650,
    slow: 900,
    draw: 1400,
  },
  stagger: { tight: 40, base: 80, relaxed: 150 },
  travel: { hover: 4, enter: 22, section: 40 },
} as const

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export { animate, createTimeline, stagger, createDrawable, onScroll }
