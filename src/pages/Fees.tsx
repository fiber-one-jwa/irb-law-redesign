import { BadgeDollarSign, Layers, Timer, Gift } from 'lucide-react'
import { PageHero, SectionHeading, FeeTable, CtaBanner, UpdatedTag } from '../components/bits'
import { FIXED_FEES } from '../data/content'

const MODELS = [
  {
    icon: BadgeDollarSign,
    title: 'Fixed fees',
    body: 'One price for a defined piece of work — a will, an uncontested divorce, an HDB conveyance. You approve the exact amount in writing before we start, and that is what you pay. Best for: commodity services with a clear scope.',
  },
  {
    icon: Layers,
    title: 'Staged fees',
    body: 'For matters that unfold in phases — a Syariah divorce, a contested probate — we fix a fee per stage. You only pay for the stage you actually reach. If your case settles at mediation, you never pay the hearing fee.',
  },
  {
    icon: Timer,
    title: 'Hourly rates (rarely)',
    body: 'For genuinely unpredictable work — complex commercial disputes, for instance — we may bill by time, but always with a capped estimate in writing and monthly itemised statements. No meter running silently in the background.',
  },
]

export default function Fees() {
  return (
    <main>
      <PageHero
        eyebrow="Transparent pricing"
        title="Our fees, published — because trust starts before you sign anything"
        answer="I.R.B. Law publishes fixed fees for common legal services: wills, LPAs, deed polls, notarisation, uncontested divorces, HDB conveyancing and Syariah divorces. Every engagement begins with a free consultation and a written fee quote, so you always know the full cost before work begins."
        crumbs={[{ label: 'Fees' }]}
      />

      <section className="container-x py-16">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <SectionHeading
            eyebrow="The table"
            title="Fixed fees for everyday legal services"
            sub="Figures are confirmed in writing at your free first consultation. Placeholder amounts are shown pending publication of the current schedule."
          />
          <UpdatedTag date="20 July 2026" />
        </div>
        <div className="mt-10"><FeeTable rows={FIXED_FEES} /></div>
        <p className="mt-4 text-xs leading-relaxed text-navy-400">
          All fees exclude GST and disbursements (court fees, HDB fees, search fees), which are itemised separately in your written quote.
          Singapore Law Society publicity rules prohibit claims of being the “cheapest” — we don’t make them. We publish our prices instead and let you compare.
        </p>
      </section>

      <section className="bg-ivory-200/60 py-16">
        <div className="container-x">
          <SectionHeading eyebrow="How we charge" title="Three pricing models, all of them written down" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {MODELS.map(m => (
              <article key={m.title} className="card-soft p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-700 text-gold-400">
                  <m.icon className="h-5 w-5" />
                </span>
                <h2 className="mt-4 font-serif text-xl font-bold text-navy-700">{m.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-navy-500">{m.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-16">
        <div className="card-soft flex flex-col items-center gap-5 bg-gradient-to-br from-navy-700 to-navy-900 p-10 text-center text-white">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-500/20 ring-1 ring-gold-500/40">
            <Gift className="h-7 w-7 text-gold-400" />
          </span>
          <h2 className="font-serif text-2xl font-bold md:text-3xl">The free-first-consultation promise</h2>
          <p className="max-w-2xl text-sm leading-relaxed text-navy-200 md:text-base">
            Every new client relationship at IRB begins the same way: a free consultation where we listen, tell you honestly
            whether you need a lawyer, and hand you a written fee quote. If you don’t engage us, you pay nothing — and you
            keep the advice.
          </p>
        </div>
      </section>

      <CtaBanner title="Want your written quote? It starts with a free conversation." />
    </main>
  )
}
