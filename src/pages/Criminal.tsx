import { Siren, Gavel, FileText, ShieldAlert, MessageCircle, PhoneCall, Scale } from 'lucide-react'
import { PageHero, SectionHeading, FaqSection, CtaBanner, LawyerCard, UpdatedTag } from '../components/bits'
import { LAWYERS } from '../data/lawyers'
import { CRIMINAL_FAQS, CONTACT } from '../data/content'

const BAIL_STEPS = [
  { t: 'Arrest & investigation', d: 'You may be held for investigation. Give your particulars, then you may remain silent on the alleged offence. Ask to contact a lawyer at the first practicable opportunity.' },
  { t: 'Charge & first mention', d: 'The charge is read in court. Bail is addressed here — most offences are bailable with a bailor and bond. We apply for bail or a reduced amount immediately.' },
  { t: 'Representations', d: 'We submit written representations to the Attorney-General’s Chambers seeking withdrawal, reduction or composition of charges — often the most consequential document in your case.' },
  { t: 'Plea or trial', d: 'If you plead guilty, we mitigate for the lightest lawful sentence. If you claim trial, we cross-examine, challenge evidence and hold the prosecution to its burden.' },
]

const OFFENCES = [
  { icon: ShieldAlert, title: 'Offences against the person', list: 'Assault, voluntarily causing hurt, affray, criminal force, outrage of modesty' },
  { icon: FileText, title: 'Property & dishonesty', list: 'Theft, cheating, criminal breach of trust, misappropriation, forgery' },
  { icon: Gavel, title: 'Traffic & regulatory', list: 'Drink driving, dangerous driving, driving without valid licence or insurance' },
  { icon: Scale, title: 'Drug & other charges', list: 'Consumption and possession offences, rioting, public nuisance, contempt' },
]

export default function Criminal() {
  const team = LAWYERS.filter(l => l.areas.includes('Criminal Defence')).slice(0, 3)

  return (
    <main>
      <PageHero
        eyebrow="Criminal Defence"
        title="Charged with an offence in Singapore? Get a defence lawyer today."
        answer="A criminal defence lawyer protects your rights from the moment of arrest: advising you during investigation, applying for bail, submitting representations to the prosecution, and defending you at trial or mitigation. I.R.B. Law’s criminal team is reachable 24 hours a day on WhatsApp for urgent arrest situations."
        crumbs={[{ label: 'Practice Areas' }, { label: 'Criminal Defence' }]}
      >
        <div className="flex flex-wrap gap-3">
          <a href={CONTACT.whatsappHref} className="btn-gold"><MessageCircle className="h-4 w-4" /> 24-hour WhatsApp: {CONTACT.whatsapp}</a>
          <a href={CONTACT.phoneHref} className="btn-outline-light"><PhoneCall className="h-4 w-4" /> {CONTACT.phone}</a>
        </div>
      </PageHero>

      {/* Emergency block */}
      <section className="container-x pt-14">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-red-900 via-navy-800 to-navy-900 p-7 text-white shadow-xl md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-start">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-red-500/20 ring-1 ring-red-400/40">
              <Siren className="h-7 w-7 text-red-300" />
            </span>
            <div className="flex-1">
              <h2 className="font-serif text-2xl font-bold md:text-3xl">Arrested? What to do right now.</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
                  <p className="font-semibold text-gold-300">1 · Exercise your right to silence</p>
                  <p className="mt-2 text-sm leading-relaxed text-navy-100">Beyond stating your identity, you are not obliged to answer questions about the alleged offence during investigation. Politely say you wish to speak to a lawyer first.</p>
                </div>
                <div className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
                  <p className="font-semibold text-gold-300">2 · Ask for a lawyer</p>
                  <p className="mt-2 text-sm leading-relaxed text-navy-100">Request to contact your lawyer as soon as practicable. Call {CONTACT.phone} or WhatsApp {CONTACT.whatsapp} — our criminal team responds around the clock.</p>
                </div>
                <div className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
                  <p className="font-semibold text-gold-300">3 · Don’t sign what you don’t understand</p>
                  <p className="mt-2 text-sm leading-relaxed text-navy-100">Read every statement carefully before signing. You are entitled to have inaccuracies corrected. A signed statement is very hard to walk back later.</p>
                </div>
                <div className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
                  <p className="font-semibold text-gold-300">4 · Tell your family to call us</p>
                  <p className="mt-2 text-sm leading-relaxed text-navy-100">Family members can engage a lawyer on your behalf. We can attend the police station, advise on bail, and begin representations immediately.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bail process */}
      <section className="container-x py-16">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <SectionHeading eyebrow="Bail & beyond" title="From arrest to resolution — the road map" />
          <UpdatedTag date="2 July 2026" />
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-4">
          {BAIL_STEPS.map((s, i) => (
            <div key={i} className="card-soft p-6">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-700 font-serif text-sm font-bold text-gold-400">{i + 1}</span>
              <h3 className="mt-3 font-serif text-lg font-bold text-navy-700">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-500">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Offence categories */}
      <section className="bg-ivory-200/60 py-16">
        <div className="container-x">
          <SectionHeading eyebrow="What we defend" title="Every charge deserves a serious defence" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {OFFENCES.map(o => (
              <article key={o.title} className="card-soft p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-navy-700 text-gold-400">
                  <o.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-serif text-lg font-bold text-navy-700">{o.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-500">{o.list}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="container-x pt-16">
        <SectionHeading eyebrow="Your defenders" title="The criminal defence team" sub="Founded by Managing Partner Mohamed Baiross — called to the Bar in 2008 — the team appears daily in the State Courts and High Court." />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {team.map(l => <LawyerCard key={l.id} lawyer={l} />)}
        </div>
      </section>

      <FaqSection faqs={CRIMINAL_FAQS} title="Criminal defence FAQ" sub="Reviewed by Managing Partner Mohamed Baiross." />
      <CtaBanner title="The earlier we’re involved, the more options you have." sub="WhatsApp us now — for urgent arrest matters, our line is monitored 24 hours a day." />
    </main>
  )
}
