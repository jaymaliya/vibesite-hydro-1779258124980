"use client";
import { useRouter } from "next/navigation";
import { useCart } from "../../components/CartContext";
import { useState, useEffect, useRef, Suspense } from "react";

const products = [
  { id: 1, img: "/product-1.jpg", name: "clear blue plastic", description: "A clear blue plastic water bottle with a dark blue screw-top lid and an ergonomically", price: 0, badge: "NEW" },
  { id: 2, img: "/product-2.jpg", name: "tall, slim, transparent", description: "A tall, slim, transparent blue plastic water bottle with an opaque royal blue screw-top", price: 20, badge: "" },
  { id: 3, img: "/product-3.jpg", name: "tall, contoured, transparent", description: "A tall, contoured, transparent light blue plastic water bottle with a royal blue", price: 30, badge: "" }
];

function ShopContent() {
  const router = useRouter();
  const { addItem } = useCart();
  const [activeFilter, setActiveFilter] = useState("Capacity");
  const [addedStates, setAddedStates] = useState<{ [key: number]: boolean }>({});
  const [cartHover, setCartHover] = useState(false);

  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    els.forEach(el => el.classList.add('is-hidden'));
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.remove('is-hidden');
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      }),
      { threshold: 0.12 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const handleAddToCart = (p: typeof products[0], e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({ id: crypto.randomUUID(), name: p.name, price: p.price, quantity: 1, image: p.img });
    setAddedStates(prev => ({ ...prev, [p.id]: true }));
    setTimeout(() => {
      setAddedStates(prev => ({ ...prev, [p.id]: false }));
    }, 1500);
  };

  const handleCardClick = (p: typeof products[0]) => {
    router.push(`/product?name=${encodeURIComponent(p.name)}&price=${p.price}&img=${encodeURIComponent(p.img)}`);
  };

  const filters = ["Capacity", "Color", "Features"];

  return (
    <div style={{ background: "#0a0a0a", color: "#dde4e6", minHeight: "100vh", fontFamily: "sans-serif" }}>
      <style>{`
        .is-hidden { opacity: 0; transform: translateY(32px); transition: opacity 0.6s cubic-bezier(0.4,0,0.2,1), transform 0.6s cubic-bezier(0.4,0,0.2,1); }
        .visible { opacity: 1; transform: translateY(0); }
        .card-hover { transition: transform 0.25s cubic-bezier(0.4,0,0.2,1), box-shadow 0.25s cubic-bezier(0.4,0,0.2,1); }
        .card-hover:hover { transform: translateY(-6px); box-shadow: 0 0 40px rgba(0,217,255,0.15); }
        .btn-lift { transition: transform 0.15s cubic-bezier(0.4,0,0.2,1), box-shadow 0.15s cubic-bezier(0.4,0,0.2,1); }
        .btn-lift:hover { transform: scale(1.02); box-shadow: 0 4px 20px rgba(0,217,255,0.25); }
        .btn-lift:active { transform: scale(0.98); }
        .product-img-wrap { overflow: hidden; }
        .product-img-wrap img { transition: transform 0.7s ease-out; }
        .product-img-wrap:hover img { transform: scale(1.06); }
        .spec-icon-wrap { transition: border-color 0.3s, box-shadow 0.3s; }
        .spec-item:hover .spec-icon-wrap { border-color: rgba(0,217,255,0.6); box-shadow: 0 0 30px rgba(0,217,255,0.2); }
        .nav-link { transition: all 0.3s; }
        .nav-link:hover { color: rgba(0,217,255,0.8); filter: drop-shadow(0 0 15px rgba(0,217,255,0.4)); }
        .footer-link { transition: color 0.3s; }
        .footer-link:hover { color: rgba(0,217,255,0.8); }
        @media (max-width: 768px) {
          .product-grid { grid-template-columns: 1fr !important; }
          .spec-strip { flex-direction: column !important; }
          .footer-grid { grid-template-columns: 1fr !important; }
          .footer-links { justify-content: flex-start !important; }
          .header-row { flex-direction: column !important; align-items: flex-start !important; }
        }
      `}</style>

      {/* TopNavBar */}
      <nav style={{
        background: "rgba(10,10,10,0.8)",
        backdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 50,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 2rem",
        height: "80px"
      }}>
        <div
          onClick={() => router.push('/')}
          style={{ fontWeight: "bold", fontSize: "1.5rem", letterSpacing: "-0.02em", color: "#dde4e6", cursor: "pointer" }}
        >
          Hydro
        </div>
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          <span
            onClick={() => router.push('/shop')}
            className="nav-link"
            style={{ color: "rgba(0,217,255,0.9)", fontWeight: "bold", borderBottom: "2px solid rgba(0,217,255,0.9)", paddingBottom: "4px", cursor: "pointer", fontSize: "0.95rem" }}
          >
            Shop
          </span>
          <span
            onClick={() => router.push('/shop')}
            className="nav-link"
            style={{ color: "rgba(221,228,230,0.6)", fontWeight: "500", cursor: "pointer", fontSize: "0.95rem" }}
          >
            Science
          </span>
          <span
            onClick={() => router.push('/')}
            className="nav-link"
            style={{ color: "rgba(221,228,230,0.6)", fontWeight: "500", cursor: "pointer", fontSize: "0.95rem" }}
          >
            About
          </span>
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <span
            onMouseEnter={() => setCartHover(true)}
            onMouseLeave={() => setCartHover(false)}
            onClick={() => router.push('/checkout')}
            style={{
              cursor: "pointer",
              color: cartHover ? "rgba(0,217,255,0.9)" : "#dde4e6",
              fontSize: "1.5rem",
              transition: "color 0.2s",
              fontFamily: "'Material Symbols Outlined', sans-serif"
            }}
          >
            shopping_cart
          </span>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ paddingTop: "8rem", paddingBottom: "4rem", paddingLeft: "2rem", paddingRight: "2rem", maxWidth: "1600px", margin: "0 auto" }}>

        {/* Header & Filters */}
        <header
          className="reveal header-row"
          style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem", gap: "1.5rem", flexWrap: "wrap" }}
        >
          <div>
            <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: "bold", color: "#dde4e6", marginBottom: "0.75rem", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              Engineered Hydration
            </h1>
            <p style={{ fontSize: "1.125rem", color: "rgba(221,228,230,0.6)", maxWidth: "42rem" }}>
              Precision instruments for optimal performance. Discover our range of scientifically engineered vessels.
            </p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center" }}>
            <span style={{ fontSize: "0.75rem", color: "rgba(221,228,230,0.5)", textTransform: "uppercase", letterSpacing: "0.15em", marginRight: "0.5rem" }}>
              Filter By:
            </span>
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className="btn-lift"
                style={{
                  padding: "0.5rem 1.5rem",
                  borderRadius: "9999px",
                  border: activeFilter === f ? "1px solid rgba(0,217,255,0.6)" : "1px solid rgba(255,255,255,0.15)",
                  background: activeFilter === f ? "rgba(0,217,255,0.1)" : "transparent",
                  color: activeFilter === f ? "rgba(0,217,255,0.9)" : "rgba(221,228,230,0.6)",
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </header>

        {/* Product Grid */}
        <div
          className="product-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem", marginBottom: "5rem" }}
        >
          {products.map((p, idx) => (
            <article
              key={p.id}
              className="card-hover reveal"
              onClick={() => handleCardClick(p)}
              style={{
                position: "relative",
                borderRadius: "0.75rem",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(12px)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
                marginTop: idx === 1 ? "3rem" : idx === 2 ? "6rem" : "0"
              }}
            >
              {/* Image Area */}
              <div
                className="product-img-wrap"
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "3/4",
                  background: "rgba(255,255,255,0.02)",
                  padding: "2rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden"
                }}
              >
                {p.badge && (
                  <div style={{
                    position: "absolute",
                    top: "1rem",
                    left: "1rem",
                    zIndex: 30,
                    background: "rgba(0,217,255,0.15)",
                    border: "1px solid rgba(0,217,255,0.4)",
                    color: "rgba(0,217,255,0.9)",
                    fontSize: "0.7rem",
                    fontWeight: "700",
                    letterSpacing: "0.12em",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "9999px",
                    textTransform: "uppercase"
                  }}>
                    {p.badge}
                  </div>
                )}
                <img
                  src={p.img}
                  alt={p.name}
                  style={{ objectFit: "contain", height: "100%", width: "100%", position: "relative", zIndex: 10 }}
                />
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, #0a0a0a, transparent)",
                  opacity: 0.8,
                  zIndex: 20
                }} />
              </div>

              {/* Card Body */}
              <div style={{
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                background: "rgba(0,0,0,0.3)",
                position: "relative",
                zIndex: 30
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                  <h2 style={{ fontSize: "1.125rem", fontWeight: "700", color: "#dde4e6", lineHeight: 1.3 }}>
                    {p.name}
                  </h2>
                  <span style={{ color: "#ff006e", fontSize: "1.125rem", fontWeight: "700", whiteSpace: "nowrap", marginLeft: "0.5rem" }}>
                    {p.price === 0 ? "Free" : `₹${p.price.toLocaleString()}`}
                  </span>
                </div>
                <p style={{ fontSize: "0.9rem", color: "rgba(221,228,230,0.55)", marginBottom: "1rem", flexGrow: 1, lineHeight: 1.6 }}>
                  {p.description}
                </p>

                {/* Tags */}
                <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem", flexWrap: "wrap" }}>
                  {idx === 0 && (
                    <>
                      <span style={{ padding: "0.25rem 0.75rem", borderRadius: "9999px", border: "1px solid rgba(0,217,255,0.4)", color: "rgba(0,217,255,0.9)", fontSize: "0.7rem", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.08em" }}>BPA Free</span>
                      <span style={{ padding: "0.25rem 0.75rem", borderRadius: "9999px", border: "1px solid rgba(0,217,255,0.4)", color: "rgba(0,217,255,0.9)", fontSize: "0.7rem", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.08em" }}>High Flow</span>
                    </>
                  )}
                  {idx === 1 && (
                    <>
                      <span style={{ padding: "0.25rem 0.75rem", borderRadius: "9999px", border: "1px solid rgba(0,217,255,0.4)", color: "rgba(0,217,255,0.9)", fontSize: "0.7rem", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.08em" }}>Active Grip</span>
                      <span style={{ padding: "0.25rem 0.75rem", borderRadius: "9999px", border: "1px solid rgba(0,217,255,0.4)", color: "rgba(0,217,255,0.9)", fontSize: "0.7rem", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.08em" }}>Slim Fit</span>
                    </>
                  )}
                  {idx === 2 && (
                    <>
                      <span style={{ padding: "0.25rem 0.75rem", borderRadius: "9999px", border: "1px solid rgba(0,217,255,0.4)", color: "rgba(0,217,255,0.9)", fontSize: "0.7rem", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.08em" }}>Thermal</span>
                      <span style={{ padding: "0.25rem 0.75rem", borderRadius: "9999px", border: "1px solid rgba(0,217,255,0.4)", color: "rgba(0,217,255,0.9)", fontSize: "0.7rem", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.08em" }}>Stable Base</span>
                    </>
                  )}
                </div>

                {/* Add to Cart Button */}
                <button
                  className="btn-lift"
                  onClick={(e) => handleAddToCart(p, e)}
                  style={{
                    padding: "0.6rem 1.25rem",
                    borderRadius: "9999px",
                    border: "1px solid rgba(0,217,255,0.5)",
                    background: addedStates[p.id] ? "rgba(0,217,255,0.2)" : "transparent",
                    color: addedStates[p.id] ? "rgba(0,217,255,1)" : "rgba(0,217,255,0.8)",
                    fontSize: "0.8rem",
                    fontWeight: "600",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    width: "100%",
                    transition: "all 0.2s"
                  }}
                >
                  {addedStates[p.id] ? "Added ✓" : "Add to Cart"}
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Trust Strip */}
        <div
          className="reveal"
          style={{
            background: "rgba(0,217,255,0.04)",
            border: "1px solid rgba(0,217,255,0.1)",
            borderRadius: "0.75rem",
            padding: "0.9rem 1.5rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "2rem",
            flexWrap: "wrap",
            marginBottom: "4rem",
            fontSize: "0.82rem",
            color: "rgba(221,228,230,0.55)"
          }}
        >
          <span>★★★★★ 4.8</span>
          <span style={{ color: "rgba(0,217,255,0.3)" }}>|</span>
          <span>10,000+ customers</span>
          <span style={{ color: "rgba(0,217,255,0.3)" }}>|</span>
          <span>Free Shipping</span>
          <span style={{ color: "rgba(0,217,255,0.3)" }}>|</span>
          <span>Made in India</span>
        </div>

        {/* Spec Strip */}
        <section
          className="reveal spec-strip"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: "4rem",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            gap: "2rem",
            flexWrap: "wrap"
          }}
        >
          <div
            className="spec-item"
            style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", maxWidth: "20rem", cursor: "pointer" }}
          >
            <div
              className="spec-icon-wrap"
              style={{
                width: "5rem",
                height: "5rem",
                borderRadius: "9999px",
                background: "rgba(255,255,255,0.05)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.25rem",
                border: "1px solid rgba(255,255,255,0.15)"
              }}
            >
              <span style={{ fontSize: "2.25rem", color: "rgba(0,217,255,0.9)" }}>🌡️</span>
            </div>
            <h3 style={{ fontSize: "1.125rem", fontWeight: "700", color: "#dde4e6", marginBottom: "0.5rem" }}>
              Temperature Retention
            </h3>
            <p style={{ fontSize: "0.9rem", color: "rgba(221,228,230,0.55)", lineHeight: 1.6 }}>
              Advanced vacuum insulation keeps liquids vitalized for up to 24 hours.
            </p>
          </div>

          <div
            className="spec-item"
            style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", maxWidth: "20rem", cursor: "pointer" }}
          >
            <div
              className="spec-icon-wrap"
              style={{
                width: "5rem",
                height: "5rem",
                borderRadius: "9999px",
                background: "rgba(255,255,255,0.05)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.25rem",
                border: "1px solid rgba(255,255,255,0.15)"
              }}
            >
              <span style={{ fontSize: "2.25rem", color: "rgba(0,217,255,0.9)" }}>💧</span>
            </div>
            <h3 style={{ fontSize: "1.125rem", fontWeight: "700", color: "#dde4e6", marginBottom: "0.5rem" }}>
              Self-Cleaning Technology
            </h3>
            <p style={{ fontSize: "0.9rem", color: "rgba(221,228,230,0.55)", lineHeight: 1.6 }}>
              Integrated UV-C LED purification systems eradicate biological contaminants.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        style={{
          background: "rgba(0,0,0,0.6)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "3rem 2rem",
          display: "grid",
          gridTemplateColumns: "1fr 3fr",
          gap: "2rem",
          maxWidth: "100%"
        }}
        className="footer-grid"
      >
        <div>
          <div
            onClick={() => router.push('/')}
            style={{ fontWeight: "bold", fontSize: "1.5rem", color: "#dde4e6", marginBottom: "0.75rem", cursor: "pointer" }}
          >
            Hydro
          </div>
          <p style={{ fontSize: "0.875rem", color: "rgba(221,228,230,0.5)" }}>
            © 2024 Hydro. Engineered for Vitality.
          </p>
        </div>
        <div
          className="footer-links"
          style={{ display: "flex", flexWrap: "wrap", gap: "2rem", justifyContent: "flex-end", alignItems: "flex-start" }}
        >
          {[
            { label: "Shop All", path: "/shop" },
            { label: "Our Science", path: "/shop" },
            { label: "Sustainability", path: "/" },
            { label: "Contact Us", path: "/" },
            { label: "Privacy Policy", path: "/" },
            { label: "Terms of Service", path: "/" }
          ].map((link) => (
            <span
              key={link.label}
              className="footer-link"
              onClick={() => router.push(link.path)}
              style={{ color: "rgba(221,228,230,0.55)", fontSize: "0.875rem", cursor: "pointer" }}
            >
              {link.label}
            </span>
          ))}
        </div>
      </footer>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div style={{ background: "#0a0a0a", color: "#dde4e6", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>Loading...</div>}>
      <ShopContent />
    </Suspense>
  );
}