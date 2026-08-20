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
