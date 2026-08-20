import { Link } from 'react-router'
import { ScrollText, FileSignature, Landmark, MoonStar, HelpCircle, ArrowRight } from 'lucide-react'
import { PageHero, SectionHeading, FaqSection, CtaBanner, LawyerCard, FeeTable, UpdatedTag } from '../components/bits'
import { LAWYERS } from '../data/lawyers'
import { WILLS_FAQS } from '../data/content'

const SERVICES = [
  { icon: ScrollText, title: 'Will writing', body: 'A clear, valid will that names your executors, guardians for your children, and exactly who receives what. Drafted in plain language, signed and witnessed properly, at a published fixed fee.' },
  { icon: FileSignature, title: 'Lasting Power of Attorney', body: 'Appoint someone you trust to decide on your welfare and finances if you lose mental capacity. We prepare and certify LPA Form 1 and Form 2 applications through the Office of the Public Guardian.' },
  { icon: Landmark, title: 'Probate & letters of administration', body: 'We obtain the Grant of Probate where there is a will, or Letters of Administration where there is not — then guide executors through CPF, banks, HDB and distribution to beneficiaries.' },
  { icon: MoonStar, title: 'Muslim wills (wasiat)', body: 'A coordinated Muslim estate plan: wasiat for up to one-third of the estate, faraid for the remainder, CPF nominations and hibbah structured correctly. Handled together with our Syariah team.' },
]

const WILL_FEES = [
  { service: 'Simple will (individual)', price: 'from S$—', note: 'Fixed fee, one round of amendments' },
  { service: 'Mirror wills (couple)', price: 'from S$—', note: 'Two wills, one fee' },
  { service: 'Lasting Power of Attorney (Form 1)', price: 'from S$—', note: 'Includes OPG certification' },
  { service: 'Grant of Probate (uncontested)', price: 'from S$—', note: 'Fixed fee plus court fees' },
  { service: 'Letters of Administration', price: 'from S$—', note: 'Where there is no will' },
  { service: 'Wasiat (Muslim will)', price: 'from S$—', note: 'Coordinated with faraid planning' },
]

export default function Wills() {
  const team = LAWYERS.filter(l => l.areas.includes('Wills & Probate')).slice(0, 3)

  return (
    <main>
      <PageHero
        eyebrow="Wills & Probate"
        title="Wills and probate lawyers in Singapore — peace of mind, in writing"
        answer="A will lets you decide who inherits your assets, who cares for your children and who manages your estate; without one, the Intestate Succession Act decides by formula. I.R.B. Law drafts wills and LPAs at published fixed fees, and obtains Grants of Probate and Letters of Administration for families across Singapore."
        crumbs={[{ label: 'Practice Areas' }, { label: 'Wills & Probate' }]}
      />

      {/* Services */}
      <section className="container-x py-16">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <SectionHeading eyebrow="What we do" title="Plan it now, so your family never has to guess" />
          <UpdatedTag date="30 June 2026" />
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map(s => (
            <article key={s.title} className="card-soft p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-navy-700 text-gold-400">
                <s.icon className="h-5 w-5" />
              </span>
              <h2 className="mt-4 font-serif text-lg font-bold text-navy-700">{s.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-navy-500">{s.body}</p>
            </article>
          ))}
        </div>
        <div className="mt-6 rounded-2xl bg-teal-50 p-5 ring-1 ring-teal-100">
          <p className="text-sm text-teal-800">
            <MoonStar className="mr-1.5 inline h-4 w-4" />
            Planning a Muslim estate? Faraid rules, CPF nominations and the one-third wasiat limit need to work together — see our{' '}
            <Link to="/syariah-law" className="font-semibold underline hover:text-teal-600">Syariah Law page</Link> for the full picture.
          </p>
        </div>
      </section>

      {/* Intestacy explainer */}
      <section className="bg-ivory-200/60 py-16">
        <div className="container-x">
          <div className="grid items-start gap-10 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="Why it matters"
                title="Dying without a will: what the law decides for you"
              />
              <p className="mt-6 text-sm leading-relaxed text-navy-500">
                Under the Intestate Succession Act, your estate is divided by a rigid formula. The outcome surprises most families:
              </p>
              <ul className="mt-5 space-y-3 text-sm text-navy-600">
                {[
                  'Spouse + children → spouse gets half, children share the rest',
                  'Spouse, no children, living parents → spouse half, parents half',
                  'No spouse or children → parents take all, then siblings',
                  'Unmarried partners and stepchildren receive nothing — regardless of how long you were together',
                ].map((t, i) => (
                  <li key={i} className="flex gap-3 rounded-xl bg-white p-4 ring-1 ring-navy-100">
                    <HelpCircle className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" /> {t}
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="btn-navy mt-7">Make my will <ArrowRight className="h-4 w-4" /></Link>
            </div>
            <div className="card-soft p-7">
              <h3 className="font-serif text-xl font-bold text-navy-700">The executor’s to-do list (without help)</h3>
              <ol className="mt-5 space-y-3 text-sm text-navy-500">
                {[
                  'Locate the will and apply to court for the Grant',
                  'Close bank accounts and claim CPF monies',
                  'Transfer or sell HDB / property interests',
                  'Settle debts, taxes and funeral expenses',
                  'Distribute what remains — correctly, with receipts',
                ].map((t, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy-700 text-xs font-bold text-gold-400">{i + 1}</span>
                    {t}
                  </li>
                ))}
              </ol>
              <p className="mt-5 rounded-xl bg-gold-50 p-4 text-sm text-gold-800 ring-1 ring-gold-200">
                Or hand the whole list to us for one fixed fee — most uncontested Grants of Probate complete in two to four months.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fees */}
      <section className="container-x py-16">
        <SectionHeading eyebrow="Fees" title="Fixed fees, published upfront" sub="Exact figures confirmed in writing at your free first consultation." />
        <div className="mt-10"><FeeTable rows={WILL_FEES} /></div>
      </section>

      {/* Team */}
      <section className="container-x pb-4">
        <SectionHeading eyebrow="Your planners" title="The wills & probate team" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {team.map(l => <LawyerCard key={l.id} lawyer={l} />)}
        </div>
      </section>

      <FaqSection faqs={WILLS_FAQS} title="Wills & probate FAQ" sub="Reviewed by Partner Patricia Ng and the estate planning team." />
      <CtaBanner title="A will takes one afternoon. The peace of mind lasts a lifetime." />
    </main>
  )
}
