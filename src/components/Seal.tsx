import { useEffect, useRef } from 'react'
import { createDrawable, createTimeline, stagger, motion, prefersReducedMotion } from '../lib/motion'

/**
 * The firm's notarial seal — the site's signature element.
 * Draws itself (ink), then stamps into place (spring).
 */
export function Seal({ size = 148, className = '', delay = 0 }: { size?: number; className?: string; delay?: number }) {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    if (prefersReducedMotion()) {
      root.style.opacity = '1'
      return
    }
    const targets = root.querySelectorAll('.seal-draw')
    const drawables = Array.from(targets).map(t => createDrawable(t as SVGElement, 0))

    const tl = createTimeline({ delay })
    tl.add(drawables, {
      draw: '0 1',
      duration: motion.duration.draw,
      ease: motion.easings.ink,
      delay: stagger(90),
    })
    tl.add(root, {
      scale: [1.35, 1],
      rotate: [-14, -8],
      opacity: [0.9, 1],
      duration: 480,
      ease: motion.easings.stamp,
    }, '-=350')
    tl.add(root.querySelectorAll('.seal-fill'), {
      opacity: [0, 1],
      duration: 500,
      ease: 'outQuad',
    }, '-=200')

    return () => { tl.cancel() }
  }, [delay])

  const s = size
  return (
    <div
      ref={rootRef}
      className={`pointer-events-none select-none ${className}`}
      style={{ width: s, height: s, opacity: 0, rotate: '-8deg' }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 200 200" width={s} height={s} fill="none">
        <circle className="seal-draw" cx="100" cy="100" r="96" stroke="#C9A227" strokeWidth="2.5" />
        <circle className="seal-draw" cx="100" cy="100" r="88" stroke="#C9A227" strokeWidth="1" strokeDasharray="3 5" />
        <defs>
          <path id="sealTextPath" d="M 100,100 m -74,0 a 74,74 0 1,1 148,0 a 74,74 0 1,1 -148,0" />
        </defs>
        <text className="seal-fill" fill="#C9A227" fontSize="14.5" fontWeight="600" letterSpacing="3.5" style={{ opacity: 0, fontFamily: '"IBM Plex Mono", monospace' }}>
          <textPath href="#sealTextPath">I.R.B. LAW LLP · SINGAPORE · EST. 2012 ·</textPath>
        </text>
        <circle className="seal-draw" cx="100" cy="100" r="60" stroke="#C9A227" strokeWidth="1.5" />
        <g className="seal-draw" stroke="#C9A227" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M100 66 v52" />
          <path d="M72 80 h56" />
          <path d="M100 66 l6 -7" />
          <path d="M72 80 l-14 24 a14 9 0 0 0 28 0 l-14 -24" />
          <path d="M128 80 l-14 24 a14 9 0 0 0 28 0 l-14 -24" />
          <path d="M84 126 h32" />
        </g>
      </svg>
    </div>
  )
}
