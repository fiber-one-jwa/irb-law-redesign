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

/* ---------- FAQ accordion ---------- */
export function FaqSection({ faqs, title = 'Frequently asked questions', sub }: { faqs: Faq[]; title?: string; sub?: string }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0)
  return (
    <section className="container-x py-16">
      <SectionHeading eyebrow="FAQ" title={title} sub={sub} />
      <div className="mx-auto mt-10 max-w-3xl space-y-3">
        {faqs.map((f, i) => (
          <div key={i} className="card-soft overflow-hidden">
            <button
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
              aria-expanded={openIdx === i}
            >
              <span className="text-sm font-semibold text-navy-700 md:text-base">{f.q}</span>
              <ChevronDown className={`h-4 w-4 shrink-0 text-gold-500 transition-transform ${openIdx === i ? 'rotate-180' : ''}`} />
            </button>
            {openIdx === i && (
              <div className="animate-fade-up px-5 pb-5 text-sm leading-relaxed text-navy-500">{f.a}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

/* ---------- Fee table ---------- */
export function FeeTable({ rows }: { rows: { service: string; price: string; note?: string }[] }) {
  return (
    <div className="card-soft overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-navy-700 text-left text-white">
            <th className="px-5 py-3.5 font-semibold">Service</th>
            <th className="px-5 py-3.5 font-semibold">Fixed fee</th>
            <th className="hidden px-5 py-3.5 font-semibold md:table-cell">Notes</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className={i % 2 ? 'bg-ivory-100' : 'bg-white'}>
              <td className="px-5 py-3.5 font-medium text-navy-700">{r.service}</td>
              <td className="px-5 py-3.5 font-semibold text-gold-600">{r.price}</td>
              <td className="hidden px-5 py-3.5 text-navy-400 md:table-cell">{r.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ---------- CTA banner ---------- */
export function CtaBanner({ title = 'Not sure where to start? Talk to us — the first consultation is free.', sub }: { title?: string; sub?: string }) {
  return (
    <section className="container-x pb-20 pt-4">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-700 via-navy-800 to-navy-900 px-6 py-12 text-center text-white shadow-xl md:px-12">
        <img src={skylineImg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-15" />
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold-500/15 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 -bottom-16 h-56 w-56 rounded-full bg-teal-500/15 blur-3xl" />
        <h2 className="relative mx-auto max-w-2xl font-serif text-2xl font-bold md:text-3xl">{title}</h2>
        <p className="relative mx-auto mt-3 max-w-xl text-sm text-navy-200 md:text-base">
          {sub ?? 'You’ll leave with a clear view of your options and a fixed written fee quote — no obligation, no hidden costs.'}
        </p>
        <div className="relative mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href={CONTACT.whatsappHref} className="btn-gold"><CalendarCheck className="h-4 w-4" /> Book a Consultation</a>
          <a href={CONTACT.whatsappHref} className="btn-whatsapp"><MessageCircle className="h-4 w-4" /> WhatsApp {CONTACT.whatsapp}</a>
          <a href={CONTACT.phoneHref} className="btn-outline-light"><Phone className="h-4 w-4" /> {CONTACT.phone}</a>
        </div>
      </div>
    </section>
  )
}

/* ---------- Google rating badge ---------- */
export function GoogleRating() {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="flex text-gold-400">
        {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
      </span>
      <span className="text-sm font-semibold">4.8</span>
      <span className="text-xs opacity-70">(369 Google reviews)</span>
    </span>
  )
}

export function ArrowLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-600 transition hover:gap-2.5 hover:text-teal-500">
      {children} <ArrowRight className="h-4 w-4" />
    </Link>
  )
}

/* ---------- Last updated tag ---------- */
export function UpdatedTag({ date }: { date: string }) {
  return <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-navy-400">Last updated · {date}</p>
}

/* ---------- Count-up stat: animates when scrolled into view ---------- */
export function CountUp({ to, decimals = 0, suffix = '', prefix = '' }: {
  to: number; decimals?: number; suffix?: string; prefix?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const render = (v: number) => {
      el.textContent = prefix + v.toFixed(decimals) + suffix
    }
    if (prefersReducedMotion()) { render(to); return }
    const obj = { v: 0 }
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return
        animate(obj, {
          v: to,
          duration: motion.duration.draw,
          ease: motion.easings.ink,
          onUpdate: () => render(obj.v),
        })
        io.disconnect()
      })
    }, { threshold: 0.7 })
    io.observe(el)
    return () => io.disconnect()
  }, [to, decimals, suffix, prefix])
  return <span ref={ref}>{prefix}{(0).toFixed(decimals)}{suffix}</span>
}
