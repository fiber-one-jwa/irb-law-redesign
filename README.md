# I.R.B. Law LLP — Website Redesign

A modern UI/UX redesign concept for [irblaw.com.sg](https://irblaw.com.sg/lawyers/), a Singapore consumer law firm ("Where Law Meets Heart").

Built with React + TypeScript + Vite + Tailwind CSS, with motion powered by Anime.js.

## Highlights

- **9 pages** — Home, Lawyers directory, Syariah Law pillar, Divorce & Family, Criminal Defence, Wills & Probate, Fees, Learning Centre, Contact
- **Signature motion** — the firm's notarial seal draws itself and stamps onto a typed fee-quotation document in the hero; all animation resolves from a single `src/lib/motion.ts` theme (easing/duration/stagger tokens)
- **⌘K Action Search** — debounced, keyboard-navigable command-bar search across lawyers, practice areas and firm actions (Lawyers page)
- **Lawyer matching widget** — pick your issue, get recommended lawyers
- **Mobile-first** — sticky Call / WhatsApp bar, fully responsive
- **SEO/GEO built in** — direct-answer intros under every H1, 8–12 FAQs per practice page, "Last updated" dates, schema.org placeholders (LegalService / Person / FAQPage) in `index.html`

## Design tokens

| Role | Value |
| --- | --- |
| Primary | Deep navy `#1B2A4A` |
| Accent | Gold `#C9A227` |
| Secondary | Teal `#2E8B8B` |
| Background | Ivory `#FAF7F1` |
| Display | Playfair Display |
| Body | Inter |
| Utility/captions | IBM Plex Mono |

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build   # outputs to dist/
```

## Notes

- Content uses only facts supplied in the design brief; fee figures are placeholders ("from S$—") pending the firm's published schedule.
- No superlatives ("best", "cheapest") are used in copy, per Singapore Law Society publicity rules — affordability is proven through published fixed fees and free first consultations instead.
- AI-generated imagery lives in `src/assets/` (hero, portraits, skyline, consultation room).
