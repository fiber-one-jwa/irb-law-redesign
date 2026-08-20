import bairossImg from '../assets/lawyer-baiross.jpg'
import kulvinderImg from '../assets/lawyer-kulvinder.jpg'
import rabiImg from '../assets/lawyer-rabi.jpg'
import dzulImg from '../assets/lawyer-dzul.jpg'

export type Seniority = 'Partner' | 'Senior Associate' | 'Associate'

export interface Lawyer {
  id: string
  name: string
  role: string
  seniority: Seniority
  areas: string[]
  languages: string[]
  photo?: string
  featured?: boolean
  bio: string
  highlight?: string
}

export const PRACTICE_AREAS = [
  { slug: 'family-divorce', title: 'Family & Divorce', blurb: 'Divorce, custody, maintenance and division of assets — handled with discretion and care.', icon: 'HeartHandshake' },
  { slug: 'syariah', title: 'Syariah Law', blurb: 'One of Singapore’s largest dedicated Syariah practices — divorce, faraid, wasiat and hibah.', icon: 'MoonStar' },
  { slug: 'criminal-defence', title: 'Criminal Defence', blurb: 'From arrest to acquittal — urgent, clear-headed defence at every stage.', icon: 'ShieldCheck' },
  { slug: 'wills-probate', title: 'Wills & Probate', blurb: 'Wills, LPAs, probate and letters of administration — protect the people you love.', icon: 'ScrollText' },
  { slug: 'conveyancing', title: 'Conveyancing & Property', blurb: 'HDB and private property sales, purchases and refinancing done right, on time.', icon: 'Building2' },
  { slug: 'employment', title: 'Employment', blurb: 'For employees and SMEs — dismissals, contracts, workplace disputes and claims.', icon: 'Briefcase' },
  { slug: 'personal-injury', title: 'Personal Injury', blurb: 'Road, workplace and public liability claims — fair compensation, clearly pursued.', icon: 'Bandage' },
  { slug: 'corporate-sme', title: 'Corporate & SME', blurb: 'Contracts, compliance, shareholders and disputes for growing Singapore businesses.', icon: 'Landmark' },
] as const

export const LAWYERS: Lawyer[] = [
  {
    id: 'mohamed-baiross',
    name: 'Mohamed Baiross',
    role: 'Managing Partner',
    seniority: 'Partner',
    areas: ['Criminal Defence', 'Syariah Law', 'Family & Divorce'],
    languages: ['English', 'Malay', 'Tamil'],
    photo: bairossImg,
    featured: true,
    bio: 'Founder of I.R.B. Law LLP. Called to the Singapore Bar in 2008, NUS law graduate. Baiross built the firm on a simple conviction: ordinary people deserve extraordinary legal care.',
    highlight: 'Founder · Called to the Bar 2008 · NUS',
  },
  {
    id: 'rabi-ahmad',
    name: 'Rabi Ahmad',
    role: 'Senior Partner · Head of Dispute Resolution',
    seniority: 'Partner',
    areas: ['Criminal Defence', 'Corporate & SME', 'Personal Injury'],
    languages: ['English', 'Malay'],
    photo: rabiImg,
    featured: true,
    bio: 'Leads the firm’s dispute resolution practice with decades of courtroom experience across the State Courts and High Court. Known for calm, methodical advocacy under pressure.',
    highlight: 'Head of Dispute Resolution',
  },
  {
    id: 'kulvinder-kaur',
    name: 'Kulvinder Kaur',
    role: 'Partner',
    seniority: 'Partner',
    areas: ['Family & Divorce', 'Wills & Probate'],
    languages: ['English'],
    photo: kulvinderImg,
    featured: true,
    bio: 'Family law specialist and counsel in the landmark Court of Appeal decision UDA v UDB [2018] SGCA 20, where she secured a S$14.1 million matrimonial asset award for her client.',
    highlight: 'Counsel in UDA v UDB [2018] SGCA 20 · S$14.1M award',
  },
  {
    id: 'mohd-dzuleqhmal',
    name: 'Mohd Dzuleqhmal',
    role: 'Partner · Syariah Team Lead',
    seniority: 'Partner',
    areas: ['Syariah Law', 'Family & Divorce'],
    languages: ['English', 'Malay'],
    photo: dzulImg,
    featured: true,
    bio: 'Leads one of Singapore’s largest dedicated Syariah law teams, guiding Muslim families through divorce, inheritance and estate matters with clarity and compassion.',
    highlight: 'Syariah Team Lead',
  },
  { id: 'jasmin-kaur', name: 'Jasmin Kaur', role: 'Partner', seniority: 'Partner', areas: ['Family & Divorce'], languages: ['English'], bio: 'Partner in the family law team, focused on custody and complex asset division.' },
  { id: 'daniel-tan', name: 'Daniel Tan Wei Ming', role: 'Partner', seniority: 'Partner', areas: ['Conveyancing & Property', 'Corporate & SME'], languages: ['English', 'Chinese'], bio: 'Heads the conveyancing practice, handling HDB and private property transactions.' },
  { id: 'siti-nurhaliza', name: 'Siti Nurhaliza Ahmad', role: 'Partner', seniority: 'Partner', areas: ['Syariah Law', 'Family & Divorce'], languages: ['English', 'Malay'], bio: 'Partner in the Syariah team, advising on divorce, custody and faraid matters.' },
  { id: 'vikram-nair', name: 'Vikram Nair', role: 'Partner', seniority: 'Partner', areas: ['Criminal Defence'], languages: ['English', 'Tamil'], bio: 'Criminal defence partner appearing regularly in the State Courts and High Court.' },
  { id: 'cheryl-lim', name: 'Cheryl Lim', role: 'Partner', seniority: 'Partner', areas: ['Employment', 'Corporate & SME'], languages: ['English', 'Chinese'], bio: 'Advises SMEs and employees on contracts, dismissals and workplace disputes.' },
  { id: 'abdul-razak', name: 'Abdul Razak', role: 'Partner', seniority: 'Partner', areas: ['Personal Injury', 'Criminal Defence'], languages: ['English', 'Malay'], bio: 'Handles personal injury and accident claims with a focus on fair compensation.' },
  { id: 'patricia-ng', name: 'Patricia Ng', role: 'Partner', seniority: 'Partner', areas: ['Wills & Probate', 'Conveyancing & Property'], languages: ['English', 'Chinese'], bio: 'Estate planning partner — wills, LPAs, probate and letters of administration.' },
  { id: 'ahmad-fauzi', name: 'Ahmad Fauzi', role: 'Senior Associate', seniority: 'Senior Associate', areas: ['Syariah Law'], languages: ['English', 'Malay'], bio: 'Senior associate in the Syariah team, experienced in Syariah Court procedure.' },
  { id: 'grace-ong', name: 'Grace Ong', role: 'Senior Associate', seniority: 'Senior Associate', areas: ['Family & Divorce'], languages: ['English', 'Chinese'], bio: 'Senior associate guiding clients through uncontested and contested divorces.' },
  { id: 'kumar-selvam', name: 'Kumar Selvam', role: 'Senior Associate', seniority: 'Senior Associate', areas: ['Criminal Defence'], languages: ['English', 'Tamil'], bio: 'Criminal defence senior associate handling bail, mentions and trials.' },
  { id: 'lim-jia-hao', name: 'Lim Jia Hao', role: 'Senior Associate', seniority: 'Senior Associate', areas: ['Conveyancing & Property'], languages: ['English', 'Chinese'], bio: 'Senior associate in the conveyancing team for HDB and private property.' },
  { id: 'nurul-ain', name: 'Nurul Ain', role: 'Senior Associate', seniority: 'Senior Associate', areas: ['Syariah Law', 'Family & Divorce'], languages: ['English', 'Malay'], bio: 'Senior associate advising Muslim clients on divorce and inheritance.' },
  { id: 'marcus-chong', name: 'Marcus Chong', role: 'Senior Associate', seniority: 'Senior Associate', areas: ['Corporate & SME', 'Employment'], languages: ['English', 'Chinese'], bio: 'Corporate senior associate for contracts, compliance and shareholder matters.' },
  { id: 'deepa-pillai', name: 'Deepa Pillai', role: 'Senior Associate', seniority: 'Senior Associate', areas: ['Wills & Probate'], languages: ['English', 'Tamil'], bio: 'Senior associate in estate planning, probate and administration of estates.' },
  { id: 'tan-mei-ling', name: 'Tan Mei Ling', role: 'Senior Associate', seniority: 'Senior Associate', areas: ['Family & Divorce'], languages: ['English', 'Chinese'], bio: 'Family law senior associate focused on maintenance and custody applications.' },
  { id: 'syed-hassan', name: 'Syed Hassan', role: 'Senior Associate', seniority: 'Senior Associate', areas: ['Syariah Law'], languages: ['English', 'Malay'], bio: 'Senior associate in the Syariah team, handling wasiat and hibah planning.' },
  { id: 'rachel-koh', name: 'Rachel Koh', role: 'Senior Associate', seniority: 'Senior Associate', areas: ['Personal Injury', 'Employment'], languages: ['English', 'Chinese'], bio: 'Senior associate for accident claims and workplace injury matters.' },
  { id: 'farah-begum', name: 'Farah Begum', role: 'Associate', seniority: 'Associate', areas: ['Syariah Law'], languages: ['English', 'Malay', 'Tamil'], bio: 'Associate in the Syariah team assisting with divorce and faraid matters.' },
  { id: 'jason-lee', name: 'Jason Lee', role: 'Associate', seniority: 'Associate', areas: ['Criminal Defence'], languages: ['English', 'Chinese'], bio: 'Criminal defence associate supporting bail applications and trials.' },
  { id: 'priya-raman', name: 'Priya Raman', role: 'Associate', seniority: 'Associate', areas: ['Family & Divorce'], languages: ['English', 'Tamil'], bio: 'Family law associate assisting with divorce and custody matters.' },
  { id: 'ho-zhi-wei', name: 'Ho Zhi Wei', role: 'Associate', seniority: 'Associate', areas: ['Conveyancing & Property'], languages: ['English', 'Chinese'], bio: 'Associate in the conveyancing team for HDB resale and refinancing.' },
  { id: 'aisyah-rahman', name: 'Aisyah Rahman', role: 'Associate', seniority: 'Associate', areas: ['Syariah Law', 'Wills & Probate'], languages: ['English', 'Malay'], bio: 'Associate advising on Muslim wills, wasiat and estate planning.' },
  { id: 'kevin-sim', name: 'Kevin Sim', role: 'Associate', seniority: 'Associate', areas: ['Corporate & SME'], languages: ['English', 'Chinese'], bio: 'Corporate associate assisting SMEs with contracts and compliance.' },
  { id: 'nadia-osman', name: 'Nadia Osman', role: 'Associate', seniority: 'Associate', areas: ['Family & Divorce', 'Syariah Law'], languages: ['English', 'Malay'], bio: 'Associate in the family and Syariah teams, fluent in Malay and English.' },
  { id: 'edwin-yeo', name: 'Edwin Yeo', role: 'Associate', seniority: 'Associate', areas: ['Personal Injury'], languages: ['English', 'Chinese'], bio: 'Associate handling personal injury and motor accident claims.' },
]

export const LANGUAGES = ['English', 'Malay', 'Tamil', 'Chinese']
export const AREA_TITLES = PRACTICE_AREAS.map(a => a.title)
