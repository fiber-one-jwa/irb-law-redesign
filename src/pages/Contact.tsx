import { useState } from 'react'
import { MapPin, Phone, MessageCircle, Mail, Clock, TrainFront, CheckCircle2, Send } from 'lucide-react'
import { PageHero, SectionHeading } from '../components/bits'
import { CONTACT } from '../data/content'
import { LAWYERS, AREA_TITLES } from '../data/lawyers'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', contact: '', area: '', lawyer: '', message: '' })
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  return (
    <main>
      <PageHero
        eyebrow="Contact"
        title="Talk to a lawyer — your first consultation is free"
        answer="I.R.B. Law LLP is at 60 Albert Street, #06-07 OG Albert Complex, Singapore 189969, near Bugis and Lavender MRT. Call +65 6298 2537, WhatsApp +65 6980 7814, or book below. Office hours are Monday to Friday, 9:30am–6:00pm; weekend consultations are available by appointment."
        crumbs={[{ label: 'Contact' }]}
      />

      <section className="container-x py-16">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Info column */}
          <div className="space-y-6">
            <div className="card-soft overflow-hidden">
              {/* Map placeholder styled as map card */}
              <div className="relative flex h-56 items-center justify-center bg-gradient-to-br from-navy-600 to-navy-800">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.5) 1px, transparent 0)', backgroundSize: '24px 24px' }} />
                <div className="relative text-center text-white">
                  <MapPin className="mx-auto h-9 w-9 text-gold-400" />
                  <p className="mt-2 font-serif text-lg font-bold">OG Albert Complex, #06-07</p>
                  <p className="text-sm text-navy-200">60 Albert Street, Singapore 189969</p>
                  <a
                    href="https://maps.google.com/?q=60+Albert+Street+OG+Albert+Complex+Singapore+189969"
                    target="_blank"
                    rel="noreferrer"
                    className="btn-gold mt-4 !py-2 text-xs"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
              <div className="p-6">
                <h2 className="flex items-center gap-2 font-serif text-base font-bold text-navy-700">
                  <TrainFront className="h-4 w-4 text-teal-600" /> Getting here by MRT
                </h2>
                <ul className="mt-3 space-y-2 text-sm text-navy-500">
                  <li><span className="font-semibold text-navy-700">Bugis (EW12/DT14):</span> Exit C, ~6 min walk via Albert Street</li>
                  <li><span className="font-semibold text-navy-700">Lavender (EW11):</span> Exit B, ~8 min walk along Kallang Road</li>
                  <li><span className="font-semibold text-navy-700">Parking:</span> OG Albert Complex carpark, hourly rates</li>
                </ul>
              </div>
            </div>

            <div className="card-soft p-6">
              <h2 className="font-serif text-base font-bold text-navy-700">Reach us directly</h2>
              <ul className="mt-4 space-y-3 text-sm">
                <li><a href={CONTACT.phoneHref} className="flex items-center gap-3 rounded-xl bg-navy-50 p-3 font-medium text-navy-700 transition hover:bg-navy-100"><Phone className="h-4 w-4 text-gold-600" /> {CONTACT.phone}</a></li>
                <li><a href={CONTACT.whatsappHref} className="flex items-center gap-3 rounded-xl bg-teal-50 p-3 font-medium text-teal-800 transition hover:bg-teal-100"><MessageCircle className="h-4 w-4 text-teal-600" /> WhatsApp {CONTACT.whatsapp} (24h for urgent criminal matters)</a></li>
                <li><a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 rounded-xl bg-navy-50 p-3 font-medium text-navy-700 transition hover:bg-navy-100"><Mail className="h-4 w-4 text-gold-600" /> {CONTACT.email}</a></li>
                <li className="flex items-center gap-3 rounded-xl bg-ivory-200 p-3 font-medium text-navy-600"><Clock className="h-4 w-4 text-gold-600" /> {CONTACT.hours}</li>
              </ul>
            </div>
          </div>

          {/* Form column */}
          <div className="card-soft h-fit p-7 md:p-9">
            {sent ? (
              <div className="flex flex-col items-center py-14 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-50 ring-1 ring-teal-200">
                  <CheckCircle2 className="h-8 w-8 text-teal-600" />
                </span>
                <h2 className="mt-5 font-serif text-2xl font-bold text-navy-700">Request received</h2>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-navy-500">
                  Thank you, {form.name.split(' ')[0] || 'friend'}. A member of our team will call or WhatsApp you within one working day to confirm your free consultation.
                </p>
              </div>
            ) : (
              <>
                <SectionHeading eyebrow="Book now" title="Request your free consultation" sub="Tell us a little about your situation. Everything you share is confidential and protected by lawyer-client privilege." />
                <form
                  className="mt-8 space-y-4"
                  onSubmit={e => { e.preventDefault(); setSent(true) }}
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-xs font-semibold text-navy-700">Your name *</label>
                      <input required value={form.name} onChange={e => set('name', e.target.value)} placeholder="Full name"
                        className="mt-1.5 w-full rounded-xl border border-navy-200 px-4 py-3 text-sm outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-200" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-navy-700">Phone or email *</label>
                      <input required value={form.contact} onChange={e => set('contact', e.target.value)} placeholder="How do we reach you?"
                        className="mt-1.5 w-full rounded-xl border border-navy-200 px-4 py-3 text-sm outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-200" />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-xs font-semibold text-navy-700">Practice area</label>
                      <select value={form.area} onChange={e => set('area', e.target.value)}
                        className="mt-1.5 w-full rounded-xl border border-navy-200 px-4 py-3 text-sm text-navy-700 outline-none focus:border-gold-400">
                        <option value="">Not sure yet</option>
                        {AREA_TITLES.map(a => <option key={a}>{a}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-navy-700">Preferred lawyer</label>
                      <select value={form.lawyer} onChange={e => set('lawyer', e.target.value)}
                        className="mt-1.5 w-full rounded-xl border border-navy-200 px-4 py-3 text-sm text-navy-700 outline-none focus:border-gold-400">
                        <option value="">No preference — recommend one for me</option>
                        {LAWYERS.map(l => <option key={l.id}>{l.name} — {l.role}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-navy-700">Your situation (briefly)</label>
                    <textarea rows={4} value={form.message} onChange={e => set('message', e.target.value)}
                      placeholder="A sentence or two is enough — we'll ask the right questions at the consultation."
                      className="mt-1.5 w-full rounded-xl border border-navy-200 px-4 py-3 text-sm outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-200" />
                  </div>
                  <button type="submit" className="btn-gold w-full !py-3.5 text-base">
                    <Send className="h-4 w-4" /> Request my free consultation
                  </button>
                  <p className="text-center text-xs text-navy-400">
                    Prefer to talk now? Call <a href={CONTACT.phoneHref} className="font-semibold text-navy-600 underline">{CONTACT.phone}</a> or WhatsApp{' '}
                    <a href={CONTACT.whatsappHref} className="font-semibold text-teal-600 underline">{CONTACT.whatsapp}</a>
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
