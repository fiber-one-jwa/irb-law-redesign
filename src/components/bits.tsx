import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router'
import { ChevronDown, Star, ArrowRight, Phone, MessageCircle, CalendarCheck } from 'lucide-react'
import type { Lawyer } from '../data/lawyers'
import { CONTACT, type Faq } from '../data/content'
import skylineImg from '../assets/skyline.jpg'
import { animate, motion, prefersReducedMotion } from '../lib/motion'
import { Breadcrumbs } from './Layout'

/* ---------- Page hero with H1 + direct-answer paragraph ---------- */
export function PageHero({
  eyebrow,
  title,
  answer,
  crumbs,
  children,
}: {
  eyebrow: string
  title: string
  answer: string
  crumbs: { label: string; to?: string }[]
  children?: ReactNode
}) {
  return (
    <section className="relative overflow-hidden bg-navy-800 text-white">
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-teal-500/10 blur-3xl" />
      <div className="container-x relative py-14 md:py-20">
        <Breadcrumbs items={crumbs} />
        <p className="eyebrow mt-6 !text-gold-400">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl font-serif text-3xl font-bold leading-tight md:text-5xl">{title}</h1>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-navy-100 md:text-lg">{answer}</p>
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  )
}

/* ---------- Section heading ---------- */
export function SectionHeading({ eyebrow, title, sub, center = false, light = false }: {
  eyebrow: string; title: string; sub?: string; center?: boolean; light?: boolean
}) {
  const hRef = useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    const el = hRef.current
    if (!el) return
    if (prefersReducedMotion()) { el.classList.add('flourish-in'); return }
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { el.classList.add('flourish-in'); io.disconnect() }
      })
    }, { threshold: 0.6 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div className={center ? 'text-center' : ''}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 ref={hRef} className={`heading-flourish mt-2 font-serif text-2xl font-bold md:text-4xl ${light ? 'text-white' : 'text-navy-700'} ${center ? 'inline-block' : ''}`}>
        {title}
      </h2>
      {sub && <p className={`mt-6 max-w-2xl text-sm leading-relaxed md:text-base ${light ? 'text-navy-200' : 'text-navy-500'} ${center ? 'mx-auto' : ''}`}>{sub}</p>}
    </div>
  )
}

/* ---------- Lawyer avatar with photo or monogram fallback ---------- */
export function LawyerAvatar({ lawyer, size = 'md' }: { lawyer: Lawyer; size?: 'md' | 'lg' }) {
  const initials = lawyer.name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('')
  const dim = size === 'lg' ? 'h-40 w-40 text-3xl' : 'h-20 w-20 text-xl'
  if (lawyer.photo) {
    return <img src={lawyer.photo} alt={lawyer.name} className={`${dim} rounded-2xl object-cover ring-2 ring-gold-500/30`} />
  }
  return (
    <span className={`flex ${dim} items-center justify-center rounded-2xl bg-gradient-to-br from-navy-600 to-navy-800 font-serif font-semibold text-gold-300 ring-2 ring-gold-500/20`}>
      {initials}
    </span>
  )
}

/* ---------- Lawyer card ---------- */
export function LawyerCard({ lawyer }: { lawyer: Lawyer }) {
  return (
    <article className="card-soft group flex flex-col p-5 transition hover:-translate-y-1 hover:shadow-[0_12px_40px_-12px_rgba(27,42,74,0.25)]">
      <div className="flex items-start gap-4">
        <LawyerAvatar lawyer={lawyer} />
        <div className="min-w-0">
          <h3 className="font-serif text-lg font-bold text-navy-700">{lawyer.name}</h3>
          <p className="text-xs font-semibold uppercase tracking-wide text-gold-600">{lawyer.role}</p>
          <div className="mt-2 flex flex-wrap gap-1">
            {lawyer.languages.map(l => <span key={l} className="lang-chip">{l}</span>)}
          </div>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {lawyer.areas.map(a => <span key={a} className="tag-chip">{a}</span>)}
      </div>
      <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-navy-500">{lawyer.bio}</p>
      {lawyer.highlight && (
        <p className="mt-2 rounded-lg bg-gold-50 px-3 py-1.5 text-xs font-medium text-gold-700 ring-1 ring-gold-200">{lawyer.highlight}</p>
      )}
      <div className="mt-4 grid grid-cols-2 gap-2">
        <Link to={`/lawyers#${lawyer.id}`} className="rounded-full border border-navy-200 py-2 text-center text-xs font-semibold text-navy-700 transition hover:bg-navy-50">
          View Profile
        </Link>
        <a href={CONTACT.whatsappHref} className="rounded-full bg-navy-700 py-2 text-center text-xs font-semibold text-white transition hover:bg-navy-600">
          Book with {lawyer.name.split(' ')[0]}
        </a>
      </div>
    </article>
  )
}
