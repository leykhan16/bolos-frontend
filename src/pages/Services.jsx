import { useState, useEffect } from 'react'
import { getServices } from '../api'

const icons = { home:'🏠', building:'🏢', bug:'🐜', mouse:'🐭', bed:'🛏️', droplet:'🦟' }

export default function Services() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [hovered, setHovered] = useState(null)

  useEffect(() => {
    getServices()
      .then(res => { setServices(res.data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return (
    <div style={{ padding:'80px', textAlign:'center', color:'var(--muted)' }}>
      <div style={{ fontSize:'32px', marginBottom:'12px' }}>🐛</div>
      Loading services...
    </div>
  )

  return (
    <div style={{ padding:'60px 5%', maxWidth:'1100px', margin:'0 auto' }} className="fade-in">
      <p style={labelStyle}>What We Offer</p>
      <h2 style={titleStyle}>Our Services</h2>
      <p style={subStyle}>Tailored pest control using industry-approved, eco-friendly methods.</p>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:'20px', marginTop:'32px' }}>
        {services.map((s, i) => (
          <div
            key={s.id}
            style={{
              ...card,
              transform: hovered === s.id ? 'translateY(-6px)' : 'translateY(0)',
              boxShadow: hovered === s.id ? '0 16px 40px rgba(26,92,46,.15)' : '0 2px 8px rgba(0,0,0,.06)',
              animationDelay: `${i * 80}ms`,
            }}
            className="fade-up"
            onMouseEnter={() => setHovered(s.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <div style={iconWrap}>{icons[s.icon] || '🐛'}</div>
            <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'10px' }}>
              <h3 style={{ fontSize:'18px' }}>{s.name}</h3>
              {s.popular && <span style={badge}>Popular</span>}
            </div>
            <p style={{ color:'var(--muted)', fontSize:'13px', marginBottom:'16px', lineHeight:1.7 }}>{s.description}</p>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <span style={price}>From ₦{s.price_from.toLocaleString()}</span>
              <span style={duration}>⏱ {s.duration_hrs}hrs</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const labelStyle = { fontSize:'11px', fontWeight:700, letterSpacing:'2px', color:'var(--gold)', textTransform:'uppercase', marginBottom:'8px', display:'block' }
const titleStyle = { fontSize:'clamp(28px,4vw,44px)', color:'var(--dark)', marginBottom:'8px' }
const subStyle   = { color:'var(--muted)', maxWidth:'520px', marginBottom:'8px' }
const card       = { background:'#fff', border:'1px solid var(--border)', borderRadius:'12px', padding:'24px', transition:'transform .25s, box-shadow .25s', cursor:'default' }
const iconWrap   = { width:'52px', height:'52px', background:'var(--green-pale)', borderRadius:'12px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'26px', marginBottom:'16px' }
const badge      = { background:'var(--green-pale)', color:'var(--green)', fontSize:'11px', fontWeight:700, padding:'3px 9px', borderRadius:'20px' }
const price      = { fontSize:'14px', fontWeight:700, color:'var(--green)' }
const duration   = { fontSize:'12px', color:'var(--muted)' }
