import { useState } from 'react'
import Services from './pages/Services'
import Booking from './pages/Booking'
import Contact from './pages/Contact'

export default function App() {
  const [page, setPage] = useState('home')

  return (
    <div>
      {/* ── NAV ── */}
      <nav style={nav.bar}>
        <div style={nav.logo}>
          BOLOS
          <span style={nav.logoSub}>Fumigation & Pest Control</span>
        </div>
        <div style={nav.links}>
          {['home','services','booking','contact'].map(p => (
            <button
              key={p}
              onClick={() => setPage(p)}
              style={{ ...nav.btn, ...(page === p ? nav.btnActive : {}) }}
            >
              {p === 'booking' ? 'Book Now' : p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      </nav>

      {/* ── PAGES ── */}
      {page === 'home'     && <Home setPage={setPage} />}
      {page === 'services' && <Services />}
      {page === 'booking'  && <Booking />}
      {page === 'contact'  && <Contact />}
    </div>
  )
}

function Home({ setPage }) {
  return (
    <div>
      {/* Hero */}
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

        {/* Stats bar */}
        <div style={hero.stats}>
          {[['2,400+','Jobs Completed'],['8 yrs','In Business'],['100%','Safe Chemicals'],['24h','Response Time']].map(([val, label]) => (
            <div key={label} style={hero.stat}>
              <strong style={hero.statVal}>{val}</strong>
              <span style={hero.statLabel}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Why us */}
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
  links:   { display:'flex', gap:'8px' },
  btn:     { background:'none', border:'none', color:'#c8d8ca', cursor:'pointer', fontSize:'13px', fontWeight:500, padding:'8px 14px', borderRadius:'4px', fontFamily:"'DM Sans',sans-serif", transition:'all .2s' },
  btnActive: { background:'var(--green)', color:'#fff' },
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
  stats:     { display:'flex', gap:'32px', flexWrap:'wrap', background:'rgba(0,0,0,.3)', padding:'20px 0', marginTop:'40px', borderTop:'1px solid rgba(255,255,255,.08)', position:'relative', zIndex:1 },
  stat:      { display:'flex', flexDirection:'column' },
  statVal:   { fontSize:'28px', fontFamily:"'Bebas Neue',sans-serif", color:'var(--gold-light)' },
  statLabel: { fontSize:'12px', color:'#8a9e8c', letterSpacing:'.5px' },
}

const section = {
  wrap:  { padding:'60px 5%', maxWidth:'1100px', margin:'0 auto' },
  label: { fontSize:'11px', fontWeight:700, letterSpacing:'2px', color:'var(--gold)', textTransform:'uppercase', marginBottom:'8px' },
  title: { fontSize:'clamp(28px,4vw,44px)', color:'var(--dark)' },
}

const featureCard = { background:'var(--white)', border:'1px solid var(--border)', borderRadius:'10px', padding:'24px' }
const featureIcon = { fontSize:'32px', marginBottom:'14px' }
