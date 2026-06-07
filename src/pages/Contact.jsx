import { useState } from 'react'
import { sendMessage } from '../api'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ full_name:'', email:'', phone:'', subject:'', message:'' })

  function handleChange(e) { setForm({ ...form, [e.target.name]: e.target.value }) }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!form.full_name || !form.email || !form.subject || !form.message) {
      setError('Please fill in all required fields.')
      return
    }
    setLoading(true)
    try {
      await sendMessage({ ...form, phone: form.phone || null })
      setSubmitted(true)
    } catch {
      setError('Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) return (
    <div style={{ padding:'60px 5%' }} className="fade-in">
      <div style={successBox}>
        <div style={{ fontSize:'48px', marginBottom:'16px' }}>📨</div>
        <h2 style={{ fontSize:'32px', marginBottom:'8px' }}>Message Sent!</h2>
        <p style={{ color:'var(--muted)' }}>We will get back to you within 24 hours.</p>
      </div>
    </div>
  )

  return (
    <div style={{ padding:'60px 5%', maxWidth:'1100px', margin:'0 auto' }} className="fade-in">
      <p style={labelStyle}>Get in Touch</p>
      <h2 style={titleStyle}>Contact Us</h2>
      <p style={subStyle}>Reach out via WhatsApp, email, or phone — or send a message below.</p>

      <div style={contactGrid}>
        <div style={{ display:'flex', flexDirection:'column', gap:'14px' }}>

          <a href="https://wa.me/message/F3OI62QFRSYHI1" style={contactCard}>
            <div style={{ ...contactIcon, background:'#dcf8c6' }}>💬</div>
            <div>
              <strong style={cardTitle}>WhatsApp</strong>
              <span style={cardValue}>Click to chat directly</span>
              <span style={cardSub}>Usually replies within 1 hour</span>
            </div>
          </a>

          <a href="tel:09049805982" style={contactCard}>
            <div style={{ ...contactIcon, background:'var(--green-pale)' }}>📞</div>
            <div>
              <strong style={cardTitle}>Phone</strong>
              <span style={cardValue}>09049805982</span>
              <span style={cardSub}>Mon–Sat, 8am–6pm</span>
            </div>
          </a>

          <a href="tel:07038537646" style={contactCard}>
            <div style={{ ...contactIcon, background:'var(--green-pale)' }}>📞</div>
            <div>
              <strong style={cardTitle}>Phone</strong>
              <span style={cardValue}>07038537646</span>
              <span style={cardSub}>Mon–Sat, 8am–6pm</span>
            </div>
          </a>

          <a href="mailto:bolospestcontrolservice@gmail.com" style={contactCard}>
            <div style={{ ...contactIcon, background:'#e8eaf6' }}>📧</div>
            <div>
              <strong style={cardTitle}>Email</strong>
              <span style={cardValue}>bolospestcontrolservice@gmail.com</span>
              <span style={cardSub}>We reply within 24 hours</span>
            </div>
          </a>

          <div style={addressBox}>
            <strong style={{ display:'block', marginBottom:'4px', fontSize:'14px' }}>📍 Location</strong>
            <span style={{ fontSize:'13px' }}>Lagos, Nigeria</span>
            <div style={{ marginTop:'10px', paddingTop:'10px', borderTop:'1px solid rgba(26,92,46,.2)', fontSize:'12px', color:'var(--green)' }}>
              <strong>Business Hours</strong><br />
              Monday – Saturday: 8:00 AM – 6:00 PM<br />
              Sunday: Emergency calls only
            </div>
          </div>

        </div>

        <div style={formCard}>
          <h3 style={{ fontSize:'22px', marginBottom:'20px' }}>Send a Message</h3>
          <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
            <div>
              <label style={labelEl}>Your Name *</label>
              <input style={input} name="full_name" placeholder="John Mensah" value={form.full_name} onChange={handleChange} />
            </div>
            <div>
              <label style={labelEl}>Email *</label>
              <input style={input} name="email" type="email" placeholder="john@email.com" value={form.email} onChange={handleChange} />
            </div>
            <div>
              <label style={labelEl}>Phone (optional)</label>
              <input style={input} name="phone" placeholder="+234..." value={form.phone} onChange={handleChange} />
            </div>
            <div>
              <label style={labelEl}>Subject *</label>
              <input style={input} name="subject" placeholder="Enquiry about pest control" value={form.subject} onChange={handleChange} />
            </div>
            <div>
              <label style={labelEl}>Message *</label>
              <textarea style={{ ...input, minHeight:'100px', resize:'vertical' }} name="message" placeholder="Tell us about your pest problem..." value={form.message} onChange={handleChange} />
            </div>
            {error && <p style={{ color:'#c0392b', fontSize:'13px' }}>{error}</p>}
            <button type="submit" style={{ ...submitBtn, opacity: loading ? .7 : 1 }} disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

const labelStyle  = { fontSize:'11px', fontWeight:700, letterSpacing:'2px', color:'var(--gold)', textTransform:'uppercase', marginBottom:'8px', display:'block' }
const titleStyle  = { fontSize:'clamp(28px,4vw,44px)', color:'var(--dark)', marginBottom:'8px' }
const subStyle    = { color:'var(--muted)', marginBottom:'32px' }
const contactGrid = { display:'grid', gridTemplateColumns:'1fr 1.4fr', gap:'32px', alignItems:'start' }
const contactCard = { display:'flex', alignItems:'flex-start', gap:'14px', padding:'18px 20px', background:'#fff', border:'1px solid var(--border)', borderRadius:'10px', textDecoration:'none', color:'inherit', transition:'border-color .2s' }
const contactIcon = { width:'42px', height:'42px', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'20px', flexShrink:0 }
const cardTitle   = { display:'block', fontSize:'14px', fontWeight:600, marginBottom:'2px' }
const cardValue   = { display:'block', fontSize:'13px', color:'var(--text)' }
const cardSub     = { display:'block', fontSize:'12px', color:'var(--muted)' }
const addressBox  = { background:'var(--green-pale)', borderRadius:'10px', padding:'16px 18px', color:'var(--green)' }
const formCard    = { background:'#fff', border:'1px solid var(--border)', borderRadius:'12px', padding:'28px' }
const labelEl     = { fontSize:'13px', fontWeight:600, color:'var(--text)', display:'block', marginBottom:'6px' }
const input       = { padding:'10px 14px', border:'1px solid var(--border)', borderRadius:'6px', fontSize:'14px', fontFamily:"'DM Sans',sans-serif", color:'var(--text)', background:'var(--bg)', outline:'none', width:'100%' }
const submitBtn   = { background:'var(--green)', color:'#fff', border:'none', padding:'13px 32px', borderRadius:'6px', fontSize:'15px', fontWeight:600, cursor:'pointer', fontFamily:"'DM Sans',sans-serif", width:'100%' }
const successBox  = { background:'var(--green-pale)', border:'1px solid #a3d4b0', borderRadius:'12px', padding:'48px', textAlign:'center', maxWidth:'480px' }
