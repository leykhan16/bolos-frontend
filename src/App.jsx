import { useState } from "react";
import Services from "./pages/Services";
import Booking from "./pages/Booking";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";

export default function App() {
  const [page, setPage] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const isAdmin = window.location.hash === "#/admin";
  if (isAdmin) return <Admin />;
  const navItems = ["home", "services", "booking", "contact"];
  function goTo(p) {
    setPage(p);
    setMenuOpen(false);
  }

  return (
    <div>
      <nav style={nav.bar}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img
            src="/12b.jpeg"
            alt="Bolos Logo"
            style={{
              height: "42px",
              width: "42px",
              borderRadius: "6px",
              objectFit: "cover",
            }}
          />
          <div style={nav.logo}>
            BOLOS
            <span style={nav.logoSub}>Pest Control & Fumigation Services</span>
          </div>
        </div>
        <div style={nav.links} className="desktop-nav">
          {navItems.map((p) => (
            <button
              key={p}
              onClick={() => goTo(p)}
              style={{ ...nav.btn, ...(page === p ? nav.btnActive : {}) }}
            >
              {p === "booking"
                ? "Book Now"
                : p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
        <button
          style={nav.burger}
          className="burger-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "X" : "="}
        </button>
      </nav>

      {menuOpen && (
        <div style={nav.mobileMenu} className="mobile-menu">
          {navItems.map((p) => (
            <button
              key={p}
              onClick={() => goTo(p)}
              style={{
                ...nav.mobileBtn,
                ...(page === p ? nav.mobileBtnActive : {}),
              }}
            >
              {p === "booking"
                ? "Book Now"
                : p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      )}

      {page === "home" && <Home setPage={goTo} />}
      {page === "services" && <Services />}
      {page === "booking" && <Booking />}
      {page === "contact" && <Contact />}

      <footer style={footer}>
        <img
          src="/12b.jpeg"
          alt="logo"
          style={{
            height: "48px",
            width: "48px",
            borderRadius: "8px",
            objectFit: "cover",
            marginBottom: "12px",
          }}
        />
        <strong
          style={{
            color: "var(--gold-light)",
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: "18px",
            display: "block",
          }}
        >
          BOLOS PEST CONTROL & FUMIGATION SERVICES
        </strong>
        <p style={{ marginTop: "4px", fontSize: "13px" }}>Lagos, Nigeria</p>
        <div
          style={{
            display: "flex",
            gap: "20px",
            justifyContent: "center",
            flexWrap: "wrap",
            marginTop: "12px",
            fontSize: "13px",
          }}
        >
          <a href="https://wa.me/message/F3OI62QFRSYHI1" style={footerLink}>
            WhatsApp
          </a>
          <a href="tel:07038537646" style={footerLink}>
            07038537646
          </a>
          <a href="mailto:bolospestcontrolservice@gmail.com" style={footerLink}>
            Email Us
          </a>
        </div>
        <p style={{ fontSize: "11px", marginTop: "16px", opacity: 0.4 }}>
          2025 All Rights Reserved
        </p>
      </footer>
    </div>
  );
}

function Home({ setPage }) {
  return (
    <div>
      <div style={hero.wrap}>
        <div style={hero.overlay} />
        <div style={hero.content} className="fade-up">
          <span style={hero.tag}>Lagos, Nigeria - Licensed and Certified</span>
          <h1 style={hero.title}>
            SILENCE PEST,
            <br />
            <span style={hero.gold}>AMPLIFY PEACE.</span>
            <br />
            THE BOLOS WAY.
          </h1>
          <p style={hero.sub}>
            Fast, effective, and long-lasting pest control for homes, offices,
            and commercial properties across Nigeria.
          </p>
          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              marginTop: "8px",
            }}
          >
            <button style={hero.btnPrimary} onClick={() => setPage("booking")}>
              Book an Inspection
            </button>
            <button style={hero.btnOutline} onClick={() => setPage("services")}>
              View Services
            </button>
          </div>
          <div style={hero.badge}>
            FREE Inspection - 5% discount for first-time customers
          </div>
        </div>
        <div style={hero.stats}>
          {[
            ["FREE", "Inspection"],
            ["5%", "First-time Discount"],
            ["24h", "Response Time"],
            ["100%", "Safe Chemicals"],
          ].map(([val, label]) => (
            <div key={label} style={hero.stat}>
              <strong style={hero.statVal}>{val}</strong>
              <span style={hero.statLabel}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          background: "var(--dark)",
          padding: "40px 5%",
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <img
          src="/12b.jpeg"
          alt="Bolos Services"
          style={{
            borderRadius: "12px",
            maxWidth: "340px",
            width: "100%",
            objectFit: "cover",
          }}
        />
        <img
          src="/12b.jpeg"
          alt="Bolos Fumigation"
          style={{
            borderRadius: "12px",
            maxWidth: "340px",
            width: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      <div style={section.wrap}>
        <p style={section.label}>Why Choose Us</p>
        <h2 style={section.title}>The Bolos Difference</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))",
            gap: "20px",
            marginTop: "28px",
          }}
        >
          {[
            [
              "shield",
              "Safe and Professional",
              "Licensed technicians using industry-approved methods.",
            ],
            [
              "leaf",
              "Eco-Friendly",
              "Child and pet safe chemicals on every job.",
            ],
            [
              "target",
              "Effective and Reliable",
              "Long-lasting solutions that actually work.",
            ],
            [
              "check",
              "Peace of Mind",
              "Guaranteed results or we come back for free.",
            ],
          ].map(([, title, desc]) => (
            <div key={title} style={featureCard}>
              <h3 style={{ fontSize: "18px", marginBottom: "8px" }}>{title}</h3>
              <p style={{ color: "var(--muted)", fontSize: "13px" }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={cta}>
        <h2
          style={{
            fontSize: "clamp(24px,4vw,40px)",
            color: "#fff",
            fontFamily: "'Bebas Neue',sans-serif",
          }}
        >
          TIRED OF PESTS TAKING OVER YOUR SPACE?
        </h2>
        <p style={{ color: "#8a9e8c", margin: "8px 0 20px" }}>
          Do not wait - act now before the infestation spreads.
        </p>
        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <button style={hero.btnPrimary} onClick={() => setPage("booking")}>
            Book Now
          </button>
          <a href="https://wa.me/message/F3OI62QFRSYHI1" style={whatsappBtn}>
            WhatsApp Us
          </a>
        </div>
      </div>
    </div>
  );
}

const nav = {
  bar: {
    background: "var(--dark)",
    padding: "0 5%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "64px",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  logo: {
    color: "var(--gold-light)",
    fontFamily: "'Bebas Neue',sans-serif",
    fontSize: "18px",
    lineHeight: 1,
    display: "flex",
    flexDirection: "column",
  },
  logoSub: {
    fontFamily: "'DM Sans',sans-serif",
    fontSize: "9px",
    color: "#8a9e8c",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    fontWeight: 500,
  },
  links: { display: "flex", gap: "4px" },
  btn: {
    background: "none",
    border: "none",
    color: "#c8d8ca",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: 500,
    padding: "8px 14px",
    borderRadius: "4px",
    fontFamily: "'DM Sans',sans-serif",
  },
  btnActive: { background: "var(--green)", color: "#fff" },
  burger: {
    display: "none",
    background: "none",
    border: "none",
    color: "#fff",
    fontSize: "22px",
    cursor: "pointer",
  },
  mobileMenu: {
    background: "var(--dark)",
    display: "flex",
    flexDirection: "column",
    borderTop: "1px solid rgba(255,255,255,.08)",
  },
  mobileBtn: {
    background: "none",
    border: "none",
    color: "#c8d8ca",
    padding: "16px 5%",
    fontSize: "15px",
    fontWeight: 500,
    cursor: "pointer",
    fontFamily: "'DM Sans',sans-serif",
    textAlign: "left",
    borderBottom: "1px solid rgba(255,255,255,.06)",
  },
  mobileBtnActive: { background: "var(--green)", color: "#fff" },
};
const hero = {
  wrap: {
    background: "linear-gradient(135deg,#0a1a0d 0%,#1a3a20 100%)",
    padding: "70px 5% 0",
    position: "relative",
    overflow: "hidden",
    minHeight: "540px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  overlay: {
    position: "absolute",
    right: "-80px",
    top: "-80px",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    background: "rgba(200,146,42,.06)",
    pointerEvents: "none",
  },
  content: {
    position: "relative",
    zIndex: 1,
    maxWidth: "680px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  tag: {
    background: "var(--gold)",
    color: "var(--dark)",
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "2px",
    padding: "4px 12px",
    borderRadius: "2px",
    display: "inline-block",
    width: "fit-content",
  },
  title: {
    fontSize: "clamp(40px,7vw,80px)",
    color: "#fff",
    lineHeight: 0.92,
    fontFamily: "'Bebas Neue',sans-serif",
  },
  gold: { color: "var(--gold-light)" },
  sub: { color: "#8a9e8c", fontSize: "15px", maxWidth: "480px" },
  btnPrimary: {
    background: "var(--green)",
    color: "#fff",
    border: "none",
    padding: "13px 28px",
    borderRadius: "4px",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "'DM Sans',sans-serif",
  },
  btnOutline: {
    background: "transparent",
    color: "var(--gold-light)",
    border: "1.5px solid var(--gold)",
    padding: "12px 28px",
    borderRadius: "4px",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "'DM Sans',sans-serif",
  },
  badge: {
    background: "rgba(200,146,42,.15)",
    border: "1px solid rgba(200,146,42,.3)",
    color: "var(--gold-light)",
    padding: "10px 16px",
    borderRadius: "6px",
    fontSize: "13px",
    display: "inline-block",
    width: "fit-content",
  },
  stats: {
    display: "flex",
    gap: "24px",
    flexWrap: "wrap",
    background: "rgba(0,0,0,.3)",
    padding: "20px 0",
    marginTop: "40px",
    borderTop: "1px solid rgba(255,255,255,.08)",
    position: "relative",
    zIndex: 1,
  },
  stat: { display: "flex", flexDirection: "column" },
  statVal: {
    fontSize: "26px",
    fontFamily: "'Bebas Neue',sans-serif",
    color: "var(--gold-light)",
  },
  statLabel: { fontSize: "11px", color: "#8a9e8c", letterSpacing: ".5px" },
};
const section = {
  wrap: { padding: "60px 5%", maxWidth: "1100px", margin: "0 auto" },
  label: {
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "2px",
    color: "var(--gold)",
    textTransform: "uppercase",
    marginBottom: "8px",
    display: "block",
  },
  title: { fontSize: "clamp(28px,4vw,44px)", color: "var(--dark)" },
};
const featureCard = {
  background: "var(--white)",
  border: "1px solid var(--border)",
  borderRadius: "10px",
  padding: "24px",
};
const cta = {
  background: "var(--dark)",
  padding: "60px 5%",
  textAlign: "center",
};
const whatsappBtn = {
  background: "#25d366",
  color: "#fff",
  border: "none",
  padding: "13px 28px",
  borderRadius: "4px",
  fontSize: "14px",
  fontWeight: 600,
  cursor: "pointer",
  fontFamily: "'DM Sans',sans-serif",
  textDecoration: "none",
  display: "inline-block",
};
const footer = {
  background: "#0a1a0d",
  color: "#8a9e8c",
  textAlign: "center",
  padding: "40px 5%",
};
const footerLink = { color: "#8a9e8c", textDecoration: "none" };
