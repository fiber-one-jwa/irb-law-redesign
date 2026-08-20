import { Link } from 'react-router'
import { MoonStar, ScrollText, Landmark, Languages, MessageCircle, Scale } from 'lucide-react'
import { PageHero, SectionHeading, FaqSection, CtaBanner, LawyerCard, UpdatedTag } from '../components/bits'
import { LAWYERS } from '../data/lawyers'
import { SYARIAH_FAQS, CONTACT } from '../data/content'

const SUB_SECTIONS = [
  {
    icon: MoonStar,
    title: 'Syariah Divorce (Talak & Khuluk)',
    body: 'Divorce in the Syariah Court begins with mandatory counselling, followed by mediation and, where needed, a hearing. Talak is pronounced by the husband; khuluk is initiated by the wife with a redemption payment; fasakh is an annulment granted on specific grounds. We prepare the papers, represent you at every stage, and explain each step in Malay or English.',
    anchor: 'divorce',
  },
  {
    icon: Scale,
    title: 'Faraid (Muslim Inheritance)',
    body: 'Faraid fixes how a Muslim estate is shared among heirs — spouse, children, parents and others. The Syariah Court issues an inheritance certificate that CPF, banks and HDB rely on. We obtain the certificate, resolve disputes between heirs, and coordinate with the civil courts where probate is also required.',
    anchor: 'faraid',
  },
  {
    icon: ScrollText,
    title: 'Wasiat & Hibbah (Muslim Wills & Gifts)',
    body: 'A wasiat lets a Muslim direct up to one-third of the estate to non-heirs — charity, a stepchild, a friend. Hibbah (lifetime gifts) and CPF nominations work alongside faraid but must be structured carefully to avoid challenges. We draft wasiat that stand up, and advise families before grief turns into conflict.',
    anchor: 'wasiat',
  },
]

const STAGED_FEES = [
  { service: 'Stage 1 — Filing & counselling phase', price: 'from S$—', note: 'Originating Summons, counselling attendance' },
  { service: 'Stage 2 — Mediation', price: 'from S$—', note: 'Preparation and representation at mediation' },
  { service: 'Stage 3 — Hearing (if contested)', price: 'from S$—', note: 'Quoted only if the matter proceeds' },
  { service: 'Faraid inheritance certificate', price: 'from S$—', note: 'Fixed fee, application to Syariah Court' },
  { service: 'Wasiat drafting', price: 'from S$—', note: 'Includes one round of amendments' },
]

export default function Syariah() {
  const team = LAWYERS.filter(l => l.areas.includes('Syariah Law')).slice(0, 6)

  return (
    <main>
      <PageHero
        eyebrow="Syariah Law"
        title="Syariah lawyers in Singapore who speak your language — in every sense"
        answer="Syariah law in Singapore governs marriage, divorce and inheritance for Muslims. The Syariah Court, established under the Administration of Muslim Law Act, hears divorce applications, custody (hadanah), maintenance (nafkah) and division of matrimonial assets (harta sepencarian), while faraid rules determine how a Muslim’s estate is inherited."
        crumbs={[{ label: 'Practice Areas' }, { label: 'Syariah Law' }]}
      >
        <div className="flex flex-wrap gap-3">
          <a href={CONTACT.whatsappHref} className="btn-gold">Book a free consultation</a>
          <span className="btn-outline-light !cursor-default"><Languages className="h-4 w-4" /> Bahasa Melayu · English · தமிழ் · 中文</span>
        </div>
      </PageHero>

      {/* Sub-sections */}
      <section className="container-x py-16">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <SectionHeading
            eyebrow="What we handle"
            title="The full breadth of Muslim family law"
          />
          <UpdatedTag date="18 June 2026" />
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {SUB_SECTIONS.map(s => (
            <article key={s.anchor} id={s.anchor} className="card-soft flex flex-col p-7">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-600 ring-1 ring-teal-100">
                <s.icon className="h-5 w-5" />
              </span>
              <h2 className="mt-4 font-serif text-xl font-bold text-navy-700">{s.title}</h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-navy-500">{s.body}</p>
              <Link to="/learning-centre" className="mt-4 text-sm font-semibold text-teal-600 hover:text-teal-500">Read the full guide →</Link>
            </article>
          ))}
        </div>
      </section>
