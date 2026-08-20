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
      {/* top info bar */}
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
      {/* main nav */}
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
        {/* mobile menu */}
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
