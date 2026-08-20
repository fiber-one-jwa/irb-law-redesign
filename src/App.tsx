import { Routes, Route } from 'react-router'
import { Header, Footer, StickyMobileBar, ScrollToTop } from './components/Layout'
import Home from './pages/Home'
import Lawyers from './pages/Lawyers'
import Syariah from './pages/Syariah'
import Divorce from './pages/Divorce'
import Criminal from './pages/Criminal'
import Wills from './pages/Wills'
import Fees from './pages/Fees'
import Learning from './pages/Learning'
import Contact from './pages/Contact'

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Header />
      <div className="flex-1 pb-14 md:pb-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lawyers" element={<Lawyers />} />
          <Route path="/syariah-law" element={<Syariah />} />
          <Route path="/divorce-family-law" element={<Divorce />} />
          <Route path="/criminal-defence" element={<Criminal />} />
          <Route path="/wills-probate" element={<Wills />} />
          <Route path="/fees" element={<Fees />} />
          <Route path="/learning-centre" element={<Learning />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
      <Footer />
      <StickyMobileBar />
    </div>
  )
}
