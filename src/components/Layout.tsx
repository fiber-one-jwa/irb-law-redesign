import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { Menu, X, Phone, MessageCircle, MapPin, Clock, Mail, Scale } from 'lucide-react'
import { CONTACT } from '../data/content'

const NAV = [
  { to: '/', label: 'Home' },
  { to: '/lawyers', label: 'Our Lawyers' },
  { to: '/syariah-law', label: 'Syariah Law' },
  { to: '/divorce-family-law', label: 'Divorce & Family' },
  { to: '/criminal-defence', label: 'Criminal Defence' },
  { to: '/wills-probate', label: 'Wills & Probate' },
  { to: '/fees', label: 'Fees' },
  { to: '/learning-centre', label: 'Learning Centre' },
  { to: '/contact', label: 'Contact' },
]

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-3">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-navy-600 to-navy-800 ring-1 ring-gold-500/50">
        <Scale className="h-5 w-5 text-gold-400" />
      </span>
      <span className="leading-tight">
        <span className={`block font-serif text-lg font-bold tracking-tight ${light ? 'text-white' : 'text-navy-700'}`}>
          I.R.B. Law <span className="text-gold-500">LLP</span>
        </span>
        <span className={`block text-[10px] font-medium uppercase tracking-[0.24em] ${light ? 'text-navy-100/80' : 'text-navy-400'}`}>
          Where Law Meets Heart
        </span>
      </span>
    </Link>
  )
}

function LangSwitcher({ light = false }: { light?: boolean }) {
  const [lang, setLang] = useState('EN')
  return (
    <div className={`flex items-center rounded-full p-0.5 text-[11px] font-semibold ${light ? 'bg-white/10 ring-1 ring-white/20' : 'bg-navy-50 ring-1 ring-navy-100'}`}>
      {['EN', 'MS', '中文'].map(l => (
        <button
          key={l}
          onClick={() => setLang(l === '中文' ? '中文' : l)}
          className={`rounded-full px-2.5 py-1 transition ${lang === l ? 'bg-gold-500 text-navy-900' : light ? 'text-white/70 hover:text-white' : 'text-navy-400 hover:text-navy-700'}`}
        >
          {l}
        </button>
      ))}
    </div>
  )
}

export function Header() {
  const [open, setOpen] = useState(false)
  const loc = useLocation()
  useEffect(() => { setOpen(false) }, [loc.pathname])

  return (
    <header className="sticky top-0 z-50">
      <div className="hidden bg-navy-800 text-navy-100 md:block">
        <div className="container-x flex h-9 items-center justify-between text-xs">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5"><Phone className="h-3 w-3 text-gold-400" /> {CONTACT.phone}</span>
            <span className="flex items-center gap-1.5"><MapPin className="h-3 w-3 text-gold-400" /> 60 Albert Street, #06-07 OG Albert Complex, S189969</span>
            <span className="flex items-center gap-1.5"><Clock className="h-3 w-3 text-gold-400" /> Mon–Fri 9:30am–6:00pm</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-gold-300">Free first consultation</span>
            <LangSwitcher light />
          </div>
        </div>
      </div>
      <div className="border-b border-navy-700/5 bg-white/90 backdrop-blur-md">
        <div className="container-x flex h-[72px] items-center justify-between">
          <Logo />
          <nav className="hidden items-center gap-1 xl:flex">
            {NAV.map(n => (
              <NavLink
                key={n.to}
                to={n.to}
                className={({ isActive }) =>
                  `rounded-full px-3.5 py-2 text-[13px] font-medium transition ${
                    isActive ? 'bg-navy-700 text-white' : 'text-navy-600 hover:bg-navy-50 hover:text-navy-800'
                  }`
                }
              >
                {n.label}
              </NavLink>
            ))}
            <a href={CONTACT.whatsappHref} className="btn-gold ml-2 !px-5 !py-2.5">Book a Consultation</a>
          </nav>
          <button className="xl:hidden text-navy-700" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>
        {open && (
          <nav className="border-t border-navy-700/5 bg-white px-4 py-4 xl:hidden animate-fade-up">
            <div className="grid grid-cols-2 gap-1">
              {NAV.map(n => (
                <NavLink
                  key={n.to}
                  to={n.to}
                  className={({ isActive }) =>
                    `rounded-xl px-4 py-3 text-sm font-medium ${isActive ? 'bg-navy-700 text-white' : 'text-navy-600 hover:bg-navy-50'}`
                  }
                >
                  {n.label}
                </NavLink>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <a href={CONTACT.whatsappHref} className="btn-gold flex-1">Book a Consultation</a>
              <span className="ml-3"><LangSwitcher /></span>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

export function Footer() {
  return (
    <footer className="bg-navy-800 text-navy-100">
      <div className="container-x grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo light />
          <p className="mt-4 text-sm leading-relaxed text-navy-200">
            Trust. Integrity. Results. Founded in 2012, I.R.B. Law LLP is home to over 50 legal professionals serving Singapore families and businesses.
          </p>
          <div className="mt-4"><LangSwitcher light /></div>
        </div>
        <div>
          <h3 className="font-serif text-base font-semibold text-gold-400">Visit Us</h3>
          <address className="mt-4 text-sm not-italic leading-relaxed text-navy-200">
            I.R.B. Law LLP<br />
            60 Albert Street, #06-07<br />
            OG Albert Complex<br />
            Singapore 189969<br /><br />
            Nearest MRT: Bugis / Lavender
          </address>
        </div>
        <div>
          <h3 className="font-serif text-base font-semibold text-gold-400">Contact</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-navy-200">
            <li className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-gold-400" /> <a href={CONTACT.phoneHref} className="hover:text-white">{CONTACT.phone}</a></li>
            <li className="flex items-center gap-2"><MessageCircle className="h-3.5 w-3.5 text-gold-400" /> <a href={CONTACT.whatsappHref} className="hover:text-white">WhatsApp {CONTACT.whatsapp}</a></li>
            <li className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-gold-400" /> <a href={`mailto:${CONTACT.email}`} className="hover:text-white">{CONTACT.email}</a></li>
            <li className="flex items-center gap-2"><Clock className="h-3.5 w-3.5 text-gold-400" /> Mon–Fri 9:30am–6:00pm</li>
            <li className="pl-5 text-xs text-navy-300">Weekends by appointment</li>
          </ul>
        </div>
        <div>
          <h3 className="font-serif text-base font-semibold text-gold-400">Practice Areas</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-navy-200">
            <li><Link to="/divorce-family-law" className="hover:text-white">Family & Divorce</Link></li>
            <li><Link to="/syariah-law" className="hover:text-white">Syariah Law</Link></li>
            <li><Link to="/criminal-defence" className="hover:text-white">Criminal Defence</Link></li>
            <li><Link to="/wills-probate" className="hover:text-white">Wills & Probate</Link></li>
            <li><Link to="/contact" className="hover:text-white">Conveyancing & Property</Link></li>
            <li><Link to="/contact" className="hover:text-white">Employment</Link></li>
            <li><Link to="/contact" className="hover:text-white">Personal Injury</Link></li>
            <li><Link to="/contact" className="hover:text-white">Corporate & SME</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-navy-300 md:flex-row">
          <p>© 2026 I.R.B. Law LLP. All rights reserved. UEN T12LL0847K (placeholder).</p>
          <p>Information on this site is general guidance, not legal advice. Fees are published transparently — no claim to be the “best” or “cheapest”, just clear prices and honest counsel.</p>
        </div>
      </div>
    </footer>
  )
}

export function StickyMobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 border-t border-navy-700/10 bg-white/95 shadow-[0_-4px_20px_rgba(27,42,74,0.15)] backdrop-blur md:hidden">
      <a href={CONTACT.phoneHref} className="flex items-center justify-center gap-2 bg-navy-700 py-3.5 text-sm font-semibold text-white">
        <Phone className="h-4 w-4" /> Call Us
      </a>
      <a href={CONTACT.whatsappHref} className="flex items-center justify-center gap-2 bg-teal-500 py-3.5 text-sm font-semibold text-white">
        <MessageCircle className="h-4 w-4" /> WhatsApp
      </a>
    </div>
  )
}

export function Breadcrumbs({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-navy-300">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li><Link to="/" className="hover:text-gold-400">Home</Link></li>
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <span className="text-navy-400">/</span>
            {it.to ? <Link to={it.to} className="hover:text-gold-400">{it.label}</Link> : <span className="text-gold-300">{it.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}
