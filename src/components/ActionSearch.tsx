import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { Search, CalendarCheck, Phone, MessageCircle, CornerDownLeft, Scale, UserRound } from 'lucide-react'
import { LAWYERS, AREA_TITLES } from '../data/lawyers'
import { CONTACT } from '../data/content'

interface Item {
  id: string
  group: 'Actions' | 'Lawyers' | 'Practice areas'
  label: string
  hint?: string
  icon: typeof UserRound
  run: () => void
}

/**
 * Action search bar — debounced input, ⌘K shortcut, animated grouped suggestions.
 * Searches lawyers, practice areas and firm actions from one box.
 */
export function ActionSearch({ onLawyerPick }: { onLawyerPick: (name: string) => void }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [debounced, setDebounced] = useState('')
  const [active, setActive] = useState(0)
  const rootRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const t = window.setTimeout(() => setDebounced(query.trim().toLowerCase()), 150)
    return () => clearTimeout(t)
  }, [query])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
        setOpen(true)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const items = useMemo<Item[]>(() => {
    const q = debounced
    const actions: Item[] = [
      { id: 'book', group: 'Actions', label: 'Book a free consultation', hint: CONTACT.whatsapp, icon: CalendarCheck, run: () => window.open(CONTACT.whatsappHref, '_blank') },
      { id: 'call', group: 'Actions', label: 'Call the office', hint: CONTACT.phone, icon: Phone, run: () => { window.location.href = CONTACT.phoneHref } },
      { id: 'whatsapp', group: 'Actions', label: 'WhatsApp us now', hint: 'Replies within hours', icon: MessageCircle, run: () => window.open(CONTACT.whatsappHref, '_blank') },
    ]
    const lawyers: Item[] = LAWYERS
      .filter(l => !q || l.name.toLowerCase().includes(q) || l.areas.some(a => a.toLowerCase().includes(q)))
      .slice(0, q ? 6 : 3)
      .map(l => ({
        id: `lawyer-${l.id}`,
        group: 'Lawyers',
        label: l.name,
        hint: `${l.role} · ${l.areas[0]}`,
        icon: UserRound,
        run: () => { onLawyerPick(l.name); setOpen(false); setQuery('') },
      }))
    const areas: Item[] = AREA_TITLES
      .filter(a => !q || a.toLowerCase().includes(q))
      .slice(0, q ? 4 : 2)
      .map(a => ({
        id: `area-${a}`,
        group: 'Practice areas',
        label: a,
        hint: 'View lawyers in this practice',
        icon: Scale,
        run: () => { onLawyerPick(a); setOpen(false); setQuery('') },
      }))
    const all = [...actions, ...lawyers, ...areas]
    if (!q) return all
    return all.filter(i => i.group === 'Actions' ? i.label.toLowerCase().includes(q) : true)
  }, [debounced, onLawyerPick, navigate])

  useEffect(() => { setActive(0) }, [debounced])

  const grouped = useMemo(() => {
    const map = new Map<string, { item: Item; idx: number }[]>()
    items.forEach((item, idx) => {
      if (!map.has(item.group)) map.set(item.group, [])
      map.get(item.group)!.push({ item, idx })
    })
    return map
  }, [items])

  return (
    <div ref={rootRef} className="relative flex-1">
      <div
        className={`flex cursor-text items-center gap-2.5 rounded-full border bg-white px-4 py-2.5 transition ${
          open ? 'border-gold-400 ring-2 ring-gold-200' : 'border-navy-200'
        }`}
        onClick={() => { inputRef.current?.focus(); setOpen(true) }}
      >
        <Search className="h-4 w-4 shrink-0 text-navy-300" />
        <input
          ref={inputRef}
          value={query}
          onChange={e => { setQuery(e.target.value); setOpen(true) }}
          onFocus={() => setOpen(true)}
          onKeyDown={e => {
            if (e.key === 'ArrowDown') { e.preventDefault(); setActive(a => Math.min(a + 1, items.length - 1)) }
            if (e.key === 'ArrowUp') { e.preventDefault(); setActive(a => Math.max(a - 1, 0)) }
            if (e.key === 'Enter' && items[active]) { e.preventDefault(); items[active].run() }
          }}
          placeholder="Search lawyers, services, actions…"
          className="w-full bg-transparent text-sm text-navy-700 outline-none placeholder:text-navy-300"
        />
        <span className="hidden shrink-0 items-center gap-1 sm:flex">
          <kbd className="kbd">⌘</kbd>
          <kbd className="kbd">K</kbd>
        </span>
      </div>

      {open && items.length > 0 && (
        <div className="animate-drop-in absolute left-0 right-0 top-[calc(100%+8px)] z-50 max-h-[340px] overflow-y-auto rounded-2xl border border-navy-100 bg-white p-2 shadow-[0_20px_50px_-12px_rgba(27,42,74,0.35)]">
          {Array.from(grouped.entries()).map(([group, rows]) => (
            <div key={group} className="mb-1 last:mb-0">
              <p className="font-mono-caps px-3 pb-1 pt-2 text-[10px] text-navy-300">{group}</p>
              {rows.map(({ item, idx }) => (
                <button
                  key={item.id}
                  onMouseEnter={() => setActive(idx)}
                  onClick={() => item.run()}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${
                    active === idx ? 'bg-navy-700 text-white' : 'text-navy-700 hover:bg-navy-50'
                  }`}
                >
                  <item.icon className={`h-4 w-4 shrink-0 ${active === idx ? 'text-gold-400' : 'text-navy-300'}`} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">{item.label}</span>
                    {item.hint && <span className={`block truncate text-[11px] ${active === idx ? 'text-navy-200' : 'text-navy-400'}`}>{item.hint}</span>}
                  </span>
                  {active === idx && <CornerDownLeft className="h-3.5 w-3.5 shrink-0 text-gold-400" />}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
