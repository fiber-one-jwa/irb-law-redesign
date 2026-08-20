import { useCallback, useMemo, useState } from 'react'
import { Users, Wand2, X, ArrowRight } from 'lucide-react'
import { LAWYERS, LANGUAGES, AREA_TITLES, type Lawyer } from '../data/lawyers'
import { PageHero, LawyerCard, SectionHeading, CtaBanner, LawyerAvatar } from '../components/bits'
import { ActionSearch } from '../components/ActionSearch'
import { useReveal } from '../hooks/useReveal'
import { CONTACT } from '../data/content'

const SENIORITIES = ['Partner', 'Senior Associate', 'Associate']

const MATCH_QUESTIONS: { issue: string; areas: string[] }[] = [
  { issue: 'I’m going through a divorce or separation', areas: ['Family & Divorce'] },
  { issue: 'I need help with a Muslim family or inheritance matter', areas: ['Syariah Law'] },
  { issue: 'I’ve been arrested or charged', areas: ['Criminal Defence'] },
  { issue: 'I want to write a will or settle an estate', areas: ['Wills & Probate'] },
  { issue: 'I’m buying or selling property', areas: ['Conveyancing & Property'] },
  { issue: 'I have a workplace problem', areas: ['Employment'] },
  { issue: 'I’ve been injured in an accident', areas: ['Personal Injury'] },
  { issue: 'I need help with my business', areas: ['Corporate & SME'] },
]

function MatchWidget() {
  const [picked, setPicked] = useState<string | null>(null)
  const [lang, setLang] = useState<string | null>(null)

  const results = useMemo(() => {
    if (!picked) return []
    const q = MATCH_QUESTIONS.find(m => m.issue === picked)!
    let list = LAWYERS.filter(l => l.areas.some(a => q.areas.includes(a)))
    if (lang) list = list.filter(l => l.languages.includes(lang))
    const rank = (l: Lawyer) => (l.seniority === 'Partner' ? 0 : l.seniority === 'Senior Associate' ? 1 : 2)
    return [...list].sort((a, b) => rank(a) - rank(b)).slice(0, 4)
  }, [picked, lang])

  return (
    <div className="card-soft overflow-hidden">
      <div className="bg-gradient-to-r from-teal-600 to-teal-500 px-6 py-5 text-white md:px-8">
        <h2 className="flex items-center gap-2.5 font-serif text-xl font-bold md:text-2xl">
          <Wand2 className="h-6 w-6" /> Not sure who you need?
        </h2>
        <p className="mt-1 text-sm text-teal-50">Answer one question — we’ll show you the lawyers who handle exactly that.</p>
      </div>
      <div className="p-6 md:p-8">
        <p className="text-sm font-semibold text-navy-700">1. What brings you here today?</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {MATCH_QUESTIONS.map(q => (
            <button
              key={q.issue}
              onClick={() => setPicked(q.issue)}
              className={`rounded-full px-4 py-2 text-xs font-medium ring-1 transition ${
                picked === q.issue ? 'bg-navy-700 text-white ring-navy-700' : 'bg-white text-navy-600 ring-navy-200 hover:bg-navy-50'
              }`}
            >
              {q.issue}
            </button>
          ))}
        </div>
        {picked && (
          <div className="animate-fade-up">
            <p className="mt-6 text-sm font-semibold text-navy-700">2. Preferred language? <span className="font-normal text-navy-400">(optional)</span></p>
            <div className="mt-3 flex flex-wrap gap-2">
              {LANGUAGES.map(l => (
                <button
                  key={l}
                  onClick={() => setLang(lang === l ? null : l)}
                  className={`rounded-full px-4 py-2 text-xs font-medium ring-1 transition ${
                    lang === l ? 'bg-teal-500 text-white ring-teal-500' : 'bg-white text-navy-600 ring-navy-200 hover:bg-teal-50'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
            <div className="mt-7">
              <p className="text-sm font-semibold text-navy-700">Recommended for you:</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {results.map(l => (
                  <div key={l.id} className="flex items-center gap-4 rounded-2xl bg-ivory-100 p-4 ring-1 ring-navy-100">
                    <LawyerAvatar lawyer={l} />
                    <div className="min-w-0 flex-1">
                      <p className="font-serif text-sm font-bold text-navy-700">{l.name}</p>
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-gold-600">{l.role}</p>
                      <p className="mt-1 text-[11px] text-navy-400">{l.languages.join(' · ')}</p>
                    </div>
                    <a href={CONTACT.whatsappHref} className="shrink-0 rounded-full bg-navy-700 px-3.5 py-2 text-[11px] font-semibold text-white hover:bg-navy-600">
                      Book
                    </a>
                  </div>
                ))}
              </div>
              {results.length === 0 && <p className="mt-3 text-sm text-navy-400">No exact match — try a different language, or <a href={CONTACT.whatsappHref} className="text-teal-600 underline">ask us directly</a>.</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function Lawyers() {
  const [query, setQuery] = useState('')
  const [area, setArea] = useState<string | null>(null)
  const [lang, setLang] = useState<string | null>(null)
  const [seniority, setSeniority] = useState<string | null>(null)

  const filtered = useMemo(() => {
    return LAWYERS.filter(l => {
      if (query && !l.name.toLowerCase().includes(query.toLowerCase())) return false
      if (area && !l.areas.includes(area)) return false
      if (lang && !l.languages.includes(lang)) return false
      if (seniority && l.seniority !== seniority) return false
      return true
    })
  }, [query, area, lang, seniority])

  const clear = () => { setQuery(''); setArea(null); setLang(null); setSeniority(null) }
  const hasFilter = query || area || lang || seniority

  const gridRef = useReveal<HTMLDivElement>(0.05)

  const handlePick = useCallback((value: string) => {
    if ((AREA_TITLES as readonly string[]).includes(value)) {
      setArea(value)
      setQuery('')
    } else {
      setQuery(value)
      setArea(null)
    }
  }, [])

  return (
    <main>
      <PageHero
        eyebrow="Our People"
        title="Meet the lawyers of I.R.B. Law LLP"
        answer="Our team of 29 lawyers — 11 partners, 10 senior associates and 8 associates — covers family and Syariah law, criminal defence, wills, conveyancing and more, in English, Malay, Tamil and Chinese. Search by name or filter by practice area, language and seniority to find the right lawyer for you."
        crumbs={[{ label: 'Our Lawyers' }]}
      />

      {/* Matching widget */}
      <section className="container-x pt-14">
        <MatchWidget />
      </section>

      {/* Directory */}
      <section className="container-x py-14">
        <SectionHeading
          eyebrow="Directory"
          title="All 29 lawyers"
          sub="Every lawyer at IRB is listed here — no anonymous teams, no bait-and-switch. The person you choose is the person who handles your matter."
        />

        {/* Filters */}
        <div className="card-soft sticky top-[76px] z-30 mt-10 p-4 md:p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <ActionSearch onLawyerPick={handlePick} />
            <div className="flex flex-wrap gap-2">
              <select value={area ?? ''} onChange={e => setArea(e.target.value || null)} className="rounded-full border border-navy-200 bg-white px-4 py-2.5 text-xs font-medium text-navy-700 outline-none">
                <option value="">All practice areas</option>
                {AREA_TITLES.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
              <select value={lang ?? ''} onChange={e => setLang(e.target.value || null)} className="rounded-full border border-navy-200 bg-white px-4 py-2.5 text-xs font-medium text-navy-700 outline-none">
                <option value="">All languages</option>
                {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
              <select value={seniority ?? ''} onChange={e => setSeniority(e.target.value || null)} className="rounded-full border border-navy-200 bg-white px-4 py-2.5 text-xs font-medium text-navy-700 outline-none">
                <option value="">All seniority levels</option>
                {SENIORITIES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              {hasFilter && (
                <button onClick={clear} className="flex items-center gap-1 rounded-full bg-navy-50 px-4 py-2.5 text-xs font-semibold text-navy-500 hover:bg-navy-100">
                  <X className="h-3.5 w-3.5" /> Clear
                </button>
              )}
            </div>
          </div>
        </div>

        <p className="mt-6 flex items-center gap-2 text-sm text-navy-400">
          <Users className="h-4 w-4 text-gold-500" /> Showing {filtered.length} of {LAWYERS.length} lawyers
        </p>

        <div ref={gridRef} className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(l => (
            <div key={l.id} id={l.id} data-reveal>
              <LawyerCard lawyer={l} />
            </div>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="card-soft mt-6 p-10 text-center">
            <p className="font-serif text-lg font-bold text-navy-700">No lawyers match those filters</p>
            <p className="mt-2 text-sm text-navy-400">Try widening your search, or WhatsApp us and we’ll point you to the right person.</p>
            <a href={CONTACT.whatsappHref} className="btn-gold mt-5">Ask us directly <ArrowRight className="h-4 w-4" /></a>
          </div>
        )}
      </section>

      <CtaBanner title="The right lawyer changes everything. Let’s find yours." />
    </main>
  )
}
