import { Baby, HandCoins, Split, CalendarCheck } from 'lucide-react'
import { PageHero, SectionHeading, FaqSection, CtaBanner, LawyerCard, FeeTable, UpdatedTag } from '../components/bits'
import { LAWYERS } from '../data/lawyers'
import { DIVORCE_FAQS, CONTACT } from '../data/content'

const TIMELINE = [
  { t: 'Week 1', d: 'Free consultation. We map your situation, explain your options, and give you a fixed written fee quote.' },
  { t: 'Weeks 2–4', d: 'Papers drafted and filed. For uncontested matters, both parties sign the agreed terms on divorce, children and assets.' },
  { t: 'Months 1–4', d: 'Interim Judgment granted. Contested matters proceed to mediation — most settle here, converting to agreed terms.' },
  { t: 'Months 4–6', d: 'Final Judgment. An uncontested divorce typically concludes in 4–6 months; contested matters may take 12 months or longer.' },
]

const DIVORCE_FEES = [
  { service: 'Uncontested divorce (simplified track)', price: 'from S$—', note: 'Fixed fee including all filings' },
  { service: 'Contested divorce — Stage 1 (pleadings)', price: 'from S$—', note: 'Quoted in writing before work begins' },
  { service: 'Contested divorce — mediation stage', price: 'from S$—', note: 'Payable only if the stage is reached' },
  { service: 'Variation of existing orders', price: 'from S$—', note: 'Custody, care & control, maintenance' },
  { service: 'Prenuptial / postnuptial agreement', price: 'from S$—', note: 'Fixed drafting fee' },
]

const TOPICS = [
  { icon: Baby, title: 'Child custody, care & control', body: 'Courts decide custody on one principle: the child’s welfare. Joint custody is the norm; care and control usually sits with one parent, with structured access for the other. We help you build a parenting plan the court will endorse — and your children can live with.' },
  { icon: HandCoins, title: 'Maintenance', body: 'Maintenance for wives and children is assessed on means, needs and the family’s standard of living. We prepare the financial picture the court actually relies on — and enforce or vary orders when circumstances change.' },
  { icon: Split, title: 'Division of assets', body: 'HDB flats, CPF, savings and businesses acquired in marriage are divided by weighing direct and indirect contributions. Our partner Kulvinder Kaur was counsel in the landmark Court of Appeal case on this very question — UDA v UDB [2018] SGCA 20 — securing a S$14.1 million award.' },
]

export default function Divorce() {
  const team = LAWYERS.filter(l => l.areas.includes('Family & Divorce')).slice(0, 3)

  return (
    <main>
      <PageHero
        eyebrow="Family & Divorce"
        title="Divorce lawyers in Singapore who handle the law — and the human part"
        answer="A divorce in Singapore starts with filing a Writ for Divorce at the Family Justice Courts and, where children are involved, mandatory mediation. Uncontested divorces typically conclude in four to six months; contested matters take a year or more. I.R.B. Law handles both on published fixed fees, with a dedicated lawyer from start to finish."
        crumbs={[{ label: 'Practice Areas' }, { label: 'Divorce & Family' }]}
      >
        <a href={CONTACT.whatsappHref} className="btn-gold"><CalendarCheck className="h-4 w-4" /> Book a free consultation</a>
      </PageHero>

      {/* Process timeline */}
      <section className="container-x py-16">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <SectionHeading eyebrow="The process" title="What actually happens, step by step" />
          <UpdatedTag date="25 May 2026" />
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-4">
          {TIMELINE.map((s, i) => (
            <div key={i} className="relative">
              {i < TIMELINE.length - 1 && <div className="absolute left-full top-6 hidden h-px w-5 bg-gold-300 md:block" />}
              <div className="card-soft h-full p-6">
                <span className="font-serif text-sm font-bold text-gold-600">{s.t}</span>
                <p className="mt-2 text-sm leading-relaxed text-navy-500">{s.d}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-teal-50 p-5 ring-1 ring-teal-100">
            <p className="font-serif font-bold text-teal-700">Uncontested: ~4–6 months</p>
            <p className="mt-1 text-sm text-teal-800/70">Both parties agree on all terms. One fixed fee, one hearing, done.</p>
          </div>
          <div className="rounded-2xl bg-gold-50 p-5 ring-1 ring-gold-200">
            <p className="font-serif font-bold text-gold-700">Contested: 12+ months</p>
            <p className="mt-1 text-sm text-gold-800/70">Disputes over children or assets. Staged fees — pay only for stages reached.</p>
          </div>
        </div>
      </section>

      {/* Key topics */}
      <section className="bg-ivory-200/60 py-16">
        <div className="container-x">
          <SectionHeading eyebrow="The three big questions" title="Children, money, property — answered before you commit" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {TOPICS.map(t => (
              <article key={t.title} className="card-soft p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-700 text-gold-400">
                  <t.icon className="h-5 w-5" />
                </span>
                <h2 className="mt-4 font-serif text-xl font-bold text-navy-700">{t.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-navy-500">{t.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Fees */}
      <section className="container-x py-16">
        <SectionHeading
          eyebrow="Fees"
          title="Published fixed fees — because you have enough uncertainty already"
          sub="Exact figures are confirmed in writing at your free first consultation, before any work begins."
        />
        <div className="mt-10"><FeeTable rows={DIVORCE_FEES} /></div>
      </section>

      {/* Team */}
      <section className="container-x pb-4">
        <SectionHeading eyebrow="Your advocates" title="The family law team" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {team.map(l => <LawyerCard key={l.id} lawyer={l} />)}
        </div>
      </section>

      <FaqSection faqs={DIVORCE_FAQS} title="Divorce in Singapore: your questions, answered" sub="Reviewed by Partner Kulvinder Kaur, counsel in UDA v UDB [2018] SGCA 20." />
      <CtaBanner title="You don’t have to decide anything today. Just talk to us." />
    </main>
  )
}
