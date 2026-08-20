import { useMemo, useState } from 'react'
import { Clock, ArrowRight, BookOpen } from 'lucide-react'
import { PageHero, SectionHeading, CtaBanner, LawyerAvatar } from '../components/bits'
import { ARTICLES } from '../data/content'
import { LAWYERS, AREA_TITLES } from '../data/lawyers'

const LANG_TABS = ['English', 'Bahasa Melayu', '中文']

export default function Learning() {
  const [area, setArea] = useState<string | null>(null)
  const [lang, setLang] = useState('English')

  const filtered = useMemo(() => ARTICLES.filter(a => !area || a.area === area), [area])

  const author = (id: string) => LAWYERS.find(l => l.id === id)!

  return (
    <main>
      <PageHero
        eyebrow="Learning Centre"
        title="Plain-language legal guides, written by the lawyers themselves"
        answer="The I.R.B. Law Learning Centre publishes plain-language guides on Singapore family law, Syariah matters, criminal defence, wills, conveyancing and more. Every article is written or reviewed by a named lawyer, leads with a direct answer, and shows when it was last updated — in English, Bahasa Melayu and Chinese."
        crumbs={[{ label: 'Learning Centre' }]}
      >
        <div className="flex items-center gap-1 rounded-full bg-white/10 p-1 ring-1 ring-white/20 backdrop-blur">
          {LANG_TABS.map(l => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${lang === l ? 'bg-gold-500 text-navy-900' : 'text-white/70 hover:text-white'}`}
            >
              {l}
            </button>
          ))}
        </div>
      </PageHero>

      <section className="container-x py-14">
        <SectionHeading eyebrow="Browse by practice area" title="Start with your situation" />
        <div className="mt-8 flex flex-wrap gap-2">
          <button
            onClick={() => setArea(null)}
            className={`rounded-full px-4 py-2 text-xs font-semibold ring-1 transition ${!area ? 'bg-navy-700 text-white ring-navy-700' : 'bg-white text-navy-600 ring-navy-200 hover:bg-navy-50'}`}
          >
            All topics
          </button>
          {AREA_TITLES.map(a => (
            <button
              key={a}
              onClick={() => setArea(a)}
              className={`rounded-full px-4 py-2 text-xs font-semibold ring-1 transition ${area === a ? 'bg-navy-700 text-white ring-navy-700' : 'bg-white text-navy-600 ring-navy-200 hover:bg-navy-50'}`}
            >
              {a}
            </button>
          ))}
        </div>

        {lang !== 'English' && (
          <p className="mt-6 rounded-xl bg-teal-50 px-4 py-3 text-sm text-teal-700 ring-1 ring-teal-100">
            {lang === 'Bahasa Melayu'
              ? 'Terjemahan Bahasa Melayu sedang disediakan — artikel penuh akan diterbitkan di sini. Sementara itu, layanan konsultasi penuh tersedia dalam Bahasa Melayu.'
              : '中文翻译正在准备中 —— 完整文章将在此发布。在此期间，我们提供全中文咨询服务。'}
          </p>
        )}

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map(a => {
            const au = author(a.authorId)
            return (
              <article key={a.id} className="card-soft group flex flex-col p-6 transition hover:-translate-y-1 hover:shadow-[0_14px_40px_-12px_rgba(27,42,74,0.25)]">
                <span className="tag-chip w-fit">{a.area}</span>
                <h2 className="mt-3 font-serif text-lg font-bold leading-snug text-navy-700 group-hover:text-navy-900">{a.title}</h2>
                <p className="mt-3 line-clamp-4 flex-1 text-sm leading-relaxed text-navy-500">
                  <span className="font-semibold text-navy-700">In short: </span>{a.summary}
                </p>
                <div className="mt-5 flex items-center gap-3 border-t border-navy-100 pt-4">
                  <LawyerAvatar lawyer={au} />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-navy-700">{au.name}</p>
                    <p className="text-[11px] text-navy-400">{au.role}</p>
                    <p className="mt-0.5 flex items-center gap-1 text-[11px] text-navy-400">
                      <Clock className="h-3 w-3" /> {a.readTime} · Updated {a.updated}
                    </p>
                  </div>
                </div>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-600 transition group-hover:gap-2.5">
                  Read the guide <ArrowRight className="h-4 w-4" />
                </span>
              </article>
            )
          })}
        </div>

        {filtered.length === 0 && (
          <div className="card-soft mt-10 p-10 text-center">
            <BookOpen className="mx-auto h-8 w-8 text-navy-300" />
            <p className="mt-3 font-serif text-lg font-bold text-navy-700">Guides for this topic are on the way</p>
            <p className="mt-1 text-sm text-navy-400">Meanwhile, a free consultation answers your specific question directly.</p>
          </div>
        )}
      </section>

      <CtaBanner title="Can’t find your question answered? Ask a lawyer directly — free." />
    </main>
  )
}
