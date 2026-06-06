import { useState } from 'react'
import Services from './pages/Services'
import Booking from './pages/Booking'
import Contact from './pages/Contact'
import Admin from './pages/Admin'

export default function App() {
  const [page, setPage] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)

  // 💡 Admin is accessed by typing /admin in the URL bar
  // We detect it from the hash instead of showing it in nav
  const isAdmin = window.location.hash === '#/admin'

  if (isAdmin) return <Admin />

  const navItems = ['home', 'services', 'booking', 'contact']

  function goTo(p) {
    setPage(p)
    setMenuOpen(false)
  }

  return (
    <div>
      {/* ── NAV ── */}
      <nav style={nav.bar}>
        <div style={nav.logo}>
          BOLOS
          <span style={nav.logoSub}>Fumigation & Pest Control</span>
        </div>

        {/* Desktop links */}
        <div style={nav.links} className="desktop-nav">
          {navItems.map(p => (
            <button
              key={p}
              onClick={() => goTo(p)}
              style={{ ...nav.btn, ...(page === p ? nav.btnActive : {}) }}
            >
              {p === 'booking' ? 'Book Now' : p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button style={nav.burger} className="burger-btn" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div style={nav.mobileMenu} className="mobile-menu">
          {navItems.map(p => (
            <button
              key={p}
              onClick={() => goTo(p)}
              style={{ ...nav.mobileBtn, ...(page === p ? nav.mobileBtnActive : {}) }}
            >
              {p === 'booking' ? 'Book Now' : p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      )}

      {/* ── PAGES ── */}
      {page === 'home'     && <Home setPage={goTo} />}
      {page === 'services' && <Services />}
      {page === 'booking'  && <Booking />}
      {page === 'contact'  && <Contact />}

      {/* Footer */}
      <footer style={footer}>
        <strong style={{ color:'var(--gold-light)', fontFamily:"'Bebas Neue',sans-serif", fontSize:'16px' }}>
          BOLOS FUMIGATION & PEST CONTROL
        </strong>
        <p style={{ marginTop:'6px', fontSize:'13px' }}>© 2025 · Licensed & Insured · All Rights Reserved</p>
        <p style={{ fontSize:'11px', marginTop:'4px', opacity:.5 }}>
          Admin access: add <code>#/admin</code> to the URL
        </p>
      </footer>
    </div>
  )
}

function Home({ setPage }) {
  return (
    <div>
      <div style={hero.wrap}>
        <div style={hero.overlay} />
        <div style={hero.content} className="fade-up">
          <span style={hero.tag}>Licensed & Certified Pest Control</span>
          <h1 style={hero.title}>WE ELIMINATE<br /><span style={hero.gold}>EVERY PEST.</span><br />GUARANTEED.</h1>
          <p style={hero.sub}>Professional fumigation for homes, businesses and industrial facilities.</p>
          <div style={{ display:'flex', gap:'12px', flexWrap:'wrap', marginTop:'8px' }}>
            <button style={hero.btnPrimary} onClick={() => setPage('booking')}>Book an Inspection</button>
            <button style={hero.btnOutline} onClick={() => setPage('services')}>View Services</button>
          </div>
        </div>
        <div style={hero.stats}>
          {[['2,400+','Jobs Completed'],['8 yrs','In Business'],['100%','Safe Chemicals'],['24h','Response Time']].map(([val, label]) => (
            <div key={label} style={hero.stat}>
              <strong style={hero.statVal}>{val}</strong>
              <span style={hero.statLabel}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={section.wrap}>
        <p style={section.label}>Why Choose Us</p>
        <h2 style={section.title}>The Bolos Difference</h2>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:'20px', marginTop:'28px' }}>
          {[
            ['🛡️','Fully Licensed','Certified by national pest control authorities.'],
            ['🌿','Eco-Friendly','Child and pet safe chemicals used on every job.'],
            ['⚡','Fast Response','Emergency same-day service available.'],
            ['✅','Guaranteed','We come back free if pests return within 30 days.'],
          ].map(([icon, title, desc]) => (
            <div key={title} style={featureCard}>
              <div style={featureIcon}>{icon}</div>
              <h3 style={{ fontSize:'18px', marginBottom:'8px' }}>{title}</h3>
              <p style={{ color:'var(--muted)', fontSize:'13px' }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Styles ── */
const nav = {
  bar:     { background:'var(--dark)', padding:'0 5%', display:'flex', alignItems:'center', justifyContent:'space-between', height:'60px', position:'sticky', top:0, zIndex:100 },
  logo:    { color:'var(--gold-light)', fontFamily:"'Bebas Neue',sans-serif", fontSize:'20px', lineHeight:1, display:'flex', flexDirection:'column' },
  logoSub: { fontFamily:"'DM Sans',sans-serif", fontSize:'10px', color:'#8a9e8c', letterSpacing:'2px', textTransform:'uppercase', fontWeight:500 },
  links:   { display:'flex', gap:'8px', '@media(maxWidth:600px)': { display:'none' } },
  btn:     { background:'none', border:'none', color:'#c8d8ca', cursor:'pointer', fontSize:'13px', fontWeight:500, padding:'8px 14px', borderRadius:'4px', fontFamily:"'DM Sans',sans-serif" },
  btnActive: { background:'var(--green)', color:'#fff' },
  burger:  { display:'none', background:'none', border:'none', color:'#fff', fontSize:'22px', cursor:'pointer',
             '@media(maxWidth:600px)': { display:'block' } },
  mobileMenu: { background:'var(--dark)', display:'flex', flexDirection:'column', borderTop:'1px solid rgba(255,255,255,.08)' },
  mobileBtn:  { background:'none', border:'none', color:'#c8d8ca', padding:'16px 5%', fontSize:'15px', fontWeight:500, cursor:'pointer', fontFamily:"'DM Sans',sans-serif", textAlign:'left', borderBottom:'1px solid rgba(255,255,255,.06)' },
  mobileBtnActive: { background:'var(--green)', color:'#fff' },
}

const hero = {
  wrap:      { background:'linear-gradient(135deg,#0a1a0d 0%,#1a3a20 100%)', padding:'70px 5% 0', position:'relative', overflow:'hidden', minHeight:'520px', display:'flex', flexDirection:'column', justifyContent:'space-between' },
  overlay:   { position:'absolute', right:'-80px', top:'-80px', width:'500px', height:'500px', borderRadius:'50%', background:'rgba(200,146,42,.06)', pointerEvents:'none' },
  content:   { position:'relative', zIndex:1, maxWidth:'680px', display:'flex', flexDirection:'column', gap:'16px' },
  tag:       { background:'var(--gold)', color:'var(--dark)', fontSize:'11px', fontWeight:700, letterSpacing:'2px', padding:'4px 12px', borderRadius:'2px', display:'inline-block', width:'fit-content' },
  title:     { fontSize:'clamp(44px,8vw,88px)', color:'#fff', lineHeight:.92, fontFamily:"'Bebas Neue',sans-serif" },
  gold:      { color:'var(--gold-light)' },
  sub:       { color:'#8a9e8c', fontSize:'15px', maxWidth:'480px' },
  btnPrimary:{ background:'var(--green)', color:'#fff', border:'none', padding:'13px 28px', borderRadius:'4px', fontSize:'14px', fontWeight:600, cursor:'pointer', fontFamily:"'DM Sans',sans-serif" },
  btnOutline:{ background:'transparent', color:'var(--gold-light)', border:'1.5px solid var(--gold)', padding:'12px 28px', borderRadius:'4px', fontSize:'14px', fontWeight:600, cursor:'pointer', fontFamily:"'DM Sans',sans-serif" },
  stats:     { display:'flex', gap:'24px', flexWrap:'wrap', background:'rgba(0,0,0,.3)', padding:'20px 0', marginTop:'40px', borderTop:'1px solid rgba(255,255,255,.08)', position:'relative', zIndex:1 },
  stat:      { display:'flex', flexDirection:'column' },
  statVal:   { fontSize:'28px', fontFamily:"'Bebas Neue',sans-serif", color:'var(--gold-light)' },
  statLabel: { fontSize:'12px', color:'#8a9e8c', letterSpacing:'.5px' },
}

const section    = {
  wrap:  { padding:'60px 5%', maxWidth:'1100px', margin:'0 auto' },
  label: { fontSize:'11px', fontWeight:700, letterSpacing:'2px', color:'var(--gold)', textTransform:'uppercase', marginBottom:'8px', display:'block' },
  title: { fontSize:'clamp(28px,4vw,44px)', color:'var(--dark)' },
}
const featureCard = { background:'var(--white)', border:'1px solid var(--border)', borderRadius:'10px', padding:'24px' }
const featureIcon = { fontSize:'32px', marginBottom:'14px' }
const footer      = { background:'var(--dark)', color:'#8a9e8c', textAlign:'center', padding:'32px 5%', marginTop:'60px' }
