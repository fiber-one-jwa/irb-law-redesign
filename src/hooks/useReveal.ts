import { useEffect, useRef } from 'react'
import { animate, stagger, motion, prefersReducedMotion } from '../lib/motion'

/**
 * Orchestrated scroll reveal: children marked with [data-reveal]
 * rise and fade in with a tight stagger the first time the
 * container enters the viewport. Reduced motion = instantly visible.
 */
export function useReveal<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const targets = Array.from(el.querySelectorAll<HTMLElement>('[data-reveal]'))
    if (!targets.length) return

    if (prefersReducedMotion()) {
      targets.forEach(t => { t.style.opacity = '1' })
      return
    }

    targets.forEach(t => {
      t.style.opacity = '0'
      t.style.transform = `translateY(${motion.travel.enter}px)`
    })

    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        animate(targets, {
          opacity: [0, 1],
          translateY: [motion.travel.enter, 0],
          duration: motion.duration.base,
          ease: motion.easings.ink,
          delay: stagger(motion.stagger.base),
        })
        io.disconnect()
      })
    }, { threshold })

    io.observe(el)
    return () => io.disconnect()
  }, [threshold])

  return ref
}
