import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import {
  HeartHandshake, MoonStar, ShieldCheck, ScrollText, Building2, Briefcase, Bandage, Landmark,
  Phone, MessageCircle, CalendarCheck, Award, Gavel, Star, Quote, ArrowRight, ChevronRight,
} from 'lucide-react'
import heroImg from '../assets/hero.jpg'
import consultImg from '../assets/consult.jpg'
import { LAWYERS, PRACTICE_AREAS } from '../data/lawyers'
import { CONTACT, HOME_FAQS, TESTIMONIALS, MEDIA_OUTLETS } from '../data/content'
import { SectionHeading, LawyerCard, FaqSection, CtaBanner, GoogleRating, CountUp } from '../components/bits'
import { Seal } from '../components/Seal'
import { useReveal } from '../hooks/useReveal'
import { animate, stagger, motion, prefersReducedMotion } from '../lib/motion'

const ICONS: Record<string, typeof HeartHandshake> = {
  HeartHandshake, MoonStar, ShieldCheck, ScrollText, Building2, Briefcase, Bandage, Landmark,
}

const AREA_ROUTES: Record<string, string> = {
  'syariah': '/syariah-law',
  'family-divorce': '/divorce-family-law',
  'criminal-defence': '/criminal-defence',
  'wills-probate': '/wills-probate',
}

/* The signature object: the firm's promise, on paper — a fixed written fee quote,
   typed out line by line, signed, and stamped with the seal. */
function FeeQuoteDocument() {
  const linesRef = useRef<HTMLDivElement>(null)
  const [typed, setTyped] = useState(0)
  const lines = [
    ['MATTER', 'Uncontested divorce — simplified track'],
    ['PROFESSIONAL FEES', 'Fixed · quoted in writing'],
    ['DISBURSEMENTS', 'Court & filing fees, itemised'],
    ['HOURLY METER', 'None. Ever.'],
  ] as const

  useEffect(() => {
    if (prefersReducedMotion()) { setTyped(lines.length); return }
    const timers = lines.map((_, i) => window.setTimeout(() => setTyped(i + 1), 700 + i * 520))
    return () => timers.forEach(t => clearTimeout(t))
  }, [])

  useEffect(() => {
    const el = linesRef.current
    if (!el || prefersReducedMotion()) return
    animate(el, {
      opacity: [0, 1],
      translateY: [motion.travel.enter, 0],
      rotate: [2.5, -0.8],
      duration: motion.duration.slow,
      ease: motion.easings.ink,
      delay: 350,
    })
  }, [])

  return (
    <div ref={linesRef} className="relative mx-auto w-full max-w-md opacity-0 lg:mx-0">
      <div className="doc-paper relative rounded-sm p-6 pl-12 pt-7 text-navy-800 md:p-7 md:pl-14">
        <span className="doc-fold" />
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-navy-400">
          I.R.B. Law LLP · Fee quotation
        </p>
        <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.22em] text-gold-600">
          Ref IRB/2026/0847 · valid 30 days
        </p>
        <div className="mt-4 space-y-[9px] border-t border-navy-800/10 pt-4">
          {lines.slice(0, typed).map(([k, v]) => (
            <div key={k} className="animate-drop-in flex items-baseline justify-between gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-navy-400">{k}</span>
              <span className="text-right text-[13px] font-medium text-navy-700">{v}</span>
            </div>
          ))}
          {typed < lines.length && (
            <span className="inline-block h-3.5 w-1.5 animate-pulse bg-gold-500 align-middle" />
          )}
        </div>
        <div className="mt-6 flex items-end justify-between border-t border-navy-800/10 pt-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-navy-400">Approved</p>
            <p className="doc-signature mt-1 text-2xl text-navy-700">M. Baiross</p>
          </div>
          <p className="max-w-[130px] text-right font-mono text-[9px] uppercase leading-relaxed tracking-[0.12em] text-navy-400">
            What we quote is what you pay
          </p>
        </div>
      </div>
      <Seal size={128} className="absolute -bottom-10 -right-4 md:-right-8" delay={2600} />
      <div className="mt-14 flex justify-center lg:justify-start">
        <span className="rounded-full bg-white/95 px-4 py-2 text-navy-700 shadow-md ring-1 ring-navy-700/10">
          <GoogleRating />
        </span>
      </div>
    </div>
  )
}

export default function Home() {
  const featured = LAWYERS.filter(l => l.featured).concat(LAWYERS.filter(l => !l.featured).slice(0, 2))
  const gridRef = useReveal<HTMLDivElement>()
  const stepsRef = useReveal<HTMLDivElement>()
  const quotesRef = useReveal<HTMLDivElement>()
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = heroRef.current
    if (!el || prefersReducedMotion()) return
    animate(el.querySelectorAll('[data-hero]'), {
      opacity: [0, 1],
      translateY: [motion.travel.enter, 0],
      duration: motion.duration.slow,
      ease: motion.easings.ink,
      delay: stagger(motion.stagger.relaxed, { start: 150 }),
    })
  }, [])

  return (
    <main>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-navy-800 text-white">
        <div className="absolute inset-0">
          <img src={heroImg} alt="The I.R.B. Law LLP team" className="h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-800/85 to-navy-800/40" />
        </div>
        <div ref={heroRef} className="container-x relative grid gap-10 py-16 md:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <p data-hero className="font-mono-caps text-[11px] text-gold-400 opacity-0">Where Law Meets Heart · Est. 2012</p>
            <h1 data-hero className="mt-4 font-serif text-4xl font-bold leading-[1.12] opacity-0 md:text-5xl lg:text-[3.4rem]">
              Singapore lawyers for life’s hardest moments —{' '}
              <span className="italic text-gold-400">and its everyday ones.</span>
            </h1>
            <p data-hero className="mt-6 max-w-xl text-base leading-relaxed text-navy-100 opacity-0 md:text-lg">
              Since 2012, our 50+ legal professionals have guided Singapore families through divorce, Syariah matters,
              criminal charges and estate planning. Named on The Straits Times × Statista “Singapore’s Best Law Firms”
              list, rated 4.8★ from 369 Google reviews, and trusted in 30 reported court judgments.
            </p>
            <div data-hero className="mt-8 flex flex-col gap-3 opacity-0 sm:flex-row">
              <a href={CONTACT.whatsappHref} className="btn-gold"><CalendarCheck className="h-4 w-4" /> Book a Consultation</a>
              <a href={CONTACT.whatsappHref} className="btn-whatsapp"><MessageCircle className="h-4 w-4" /> WhatsApp Us</a>
              <a href={CONTACT.phoneHref} className="btn-outline-light"><Phone className="h-4 w-4" /> {CONTACT.phone}</a>
            </div>
            <p data-hero className="mt-5 text-sm text-navy-200 opacity-0">First consultation free · Fixed written fee quotes · English / Malay / Tamil / 中文</p>
          </div>
          <div className="hidden lg:block">
            <FeeQuoteDocument />
          </div>
        </div>
      </section>

      {/* ============ TRUST BAR ============ */}
      <section className="border-b border-navy-700/5 bg-white">
        <div className="container-x grid grid-cols-2 gap-6 py-8 md:grid-cols-4">
          {[
            { icon: Award, big: <span>ST × Statista</span>, small: 'Singapore’s Best Law Firms list' },
            { icon: Star, big: <span><CountUp to={4.8} decimals={1} />★ / <CountUp to={369} /></span>, small: 'Google rating & reviews' },
            { icon: Gavel, big: <span><CountUp to={30} /> judgments</span>, small: 'Reported decisions, 2023–2026' },
            { icon: HeartHandshake, big: <span>Est. 2012</span>, small: '50+ legal professionals' },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-3.5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold-50 ring-1 ring-gold-200">
                <s.icon className="h-5 w-5 text-gold-600" />
              </span>
              <div>
                <p className="font-serif text-lg font-bold text-navy-700">{s.big}</p>
                <p className="text-xs text-navy-400">{s.small}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
