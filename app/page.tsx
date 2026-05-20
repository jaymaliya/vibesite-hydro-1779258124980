"use client";
import { useRouter } from "next/navigation";
import { useCart } from "../components/CartContext";
import { useState, useEffect, useRef, Suspense } from "react";

export default function HydroProductPage() {
  const router = useRouter();
  const { addItem } = useCart();
  const [selectedColor, setSelectedColor] = useState("Midnight Blue");
  const [selectedSize, setSelectedSize] = useState("24 oz");
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const [cartHover, setCartHover] = useState(false);

  const IMG_URL =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBepz7HOLDm7jYu0hrZe1S9DHdDnq2PNjqIvOYLimyScHYJ6uXdpGvKMGwyLAkDFRSzUqmA3XpAdUdAkOIBPKX7MXf-VxcAS5lrXKw4-SDpJUu4pWJyJEnkESqmSLkvk0gDcBOLpkCUDBwM_9_YLqe69owZepspwGcSypreguSpGt9gkVHDYGRF5czcvbpYzpJb1H8mkyMeMFco6mhaS4-yIQRgx_W5yF5TsaEcZHeNaHN4e0I1mHNOKR7AbShQUByWOgiNzD_EWRg";

  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    els.forEach((el) => el.classList.add("is-hidden"));
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.remove("is-hidden");
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const handleAddToCart = () => {
    addItem({
      id: "hydro-clarity-bottle-" + selectedSize + "-" + selectedColor,
      name: "Hydro Clarity Bottle",
      price: 45.0,
      quantity: quantity,
      color: selectedColor,
      size: selectedSize,
      image: IMG_URL,
    });
  };

  const handleBuyNow = () => {
    addItem({
      id: "hydro-clarity-bottle-" + selectedSize + "-" + selectedColor,
      name: "Hydro Clarity Bottle",
      price: 45.0,
      quantity: quantity,
      color: selectedColor,
      size: selectedSize,
      image: IMG_URL,
    });
    router.push("/checkout");
  };

  const colors = [
    { name: "Midnight Blue", bg: "#0a1128" },
    { name: "Arctic White", bg: "#e0e0e0" },
    { name: "Stealth Black", bg: "#2a2a2a" },
  ];

  const accordionItems = [
    {
      key: "description",
      label: "Description",
      content:
        "The Hydro Clarity Bottle is engineered for those who demand purity and performance. Crafted from premium BPA-free Tritan plastic with double-wall vacuum insulation, this bottle keeps beverages cold for 24 hours and hot for 12 hours. Its sleek, minimalist design fits most car cup holders and gym bag pockets.",
    },
    {
      key: "features",
      label: "Features",
      content:
        "Double-wall vacuum insulation | BPA-free Tritan construction | Leak-proof lid with carry loop | Wide mouth for easy filling and cleaning | Fits standard cup holders | Sweat-free exterior",
    },
    {
      key: "specifications",
      label: "Specifications",
      content:
        "Capacity: 24 oz / 32 oz | Weight: 0.5 lbs | Height: 9.5\" (24 oz) | Material: BPA-free Tritan | Lid: Twist-lock leak-proof | Dishwasher safe: Yes (lid only)",
    },
  ];

  return (
    <div
      className="page-enter"
      style={{
        background: "#080f1e",
        color: "#e8eaf6",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Inter', sans-serif",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap');

        .material-symbols-outlined {
          font-family: 'Material Symbols Outlined';
          font-weight: normal;
          font-style: normal;
          font-size: 24px;
          line-height: 1;
          letter-spacing: normal;
          text-transform: none;
          display: inline-block;
          white-space: nowrap;
          word-wrap: normal;
          direction: ltr;
          -webkit-font-feature-settings: 'liga';
          -webkit-font-smoothing: antialiased;
        }

        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        .is-hidden { opacity: 0; transform: translateY(28px); transition: opacity 0.65s cubic-bezier(0.4,0,0.2,1), transform 0.65s cubic-bezier(0.4,0,0.2,1); }
        .visible { opacity: 1 !important; transform: none !important; }

        .page-enter { animation: pageEnter 0.5s cubic-bezier(0.4,0,0.2,1) both; }
        @keyframes pageEnter { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }

        .btn-lift { transition: transform 0.15s cubic-bezier(0.4,0,0.2,1), box-shadow 0.15s cubic-bezier(0.4,0,0.2,1) !important; }
        .btn-lift:hover { transform: scale(1.02); }
        .btn-lift:active { transform: scale(0.98); }

        .card-hover { transition: transform 0.25s cubic-bezier(0.4,0,0.2,1), box-shadow 0.25s cubic-bezier(0.4,0,0.2,1); }
        .card-hover:hover { transform: translateY(-4px); box-shadow: 0 20px 60px rgba(0,217,255,0.12); }
      `}</style>

      {/* NAV */}
      <nav
        style={{
          background: "rgba(10,15,30,0.8)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 50,
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 24px",
          height: "80px",
          transition: "all 0.3s",
          boxSizing: "border-box",
        }}
      >
        <div
          onClick={() => router.push("/")}
          style={{
            fontSize: "22px",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "#e8eaf6",
            cursor: "pointer",
          }}
        >
          Hydro
        </div>
        <ul
          style={{
            display: "flex",
            alignItems: "center",
            gap: "32px",
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
          className="hidden-mobile"
        >
          <style>{`
            @media (max-width: 767px) { .hidden-mobile { display: none !important; } }
          `}</style>
          <li>
            <span
              onClick={() => router.push("/shop")}
              style={{
                color: "#00d9ff",
                fontWeight: 700,
                borderBottom: "2px solid #00d9ff",
                paddingBottom: "4px",
                cursor: "pointer",
                transition: "all 0.3s",
                textDecoration: "none",
                display: "block",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.filter =
                  "drop-shadow(0 0 15px rgba(0,217,255,0.4))")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.filter = "none")
              }
            >
              Shop
            </span>
          </li>
          <li>
            <span
              onClick={() => router.push("/shop")}
              style={{
                color: "#9fa8b8",
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#b2ebf2";
                e.currentTarget.style.filter =
                  "drop-shadow(0 0 15px rgba(0,217,255,0.4))";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#9fa8b8";
                e.currentTarget.style.filter = "none";
              }}
            >
              Science
            </span>
          </li>
          <li>
            <span
              onClick={() => router.push("/")}
              style={{
                color: "#9fa8b8",
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#b2ebf2";
                e.currentTarget.style.filter =
                  "drop-shadow(0 0 15px rgba(0,217,255,0.4))";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#9fa8b8";
                e.currentTarget.style.filter = "none";
              }}
            >
              About
            </span>
          </li>
        </ul>
        <div style={{ display: "flex", alignItems: "center" }}>
          <button
            onClick={() => router.push("/checkout")}
            style={{
              background: "none",
              border: "none",
              color: "#00d9ff",
              cursor: "pointer",
              padding: "8px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#b2ebf2";
              e.currentTarget.style.filter =
                "drop-shadow(0 0 15px rgba(0,217,255,0.4))";
              e.currentTarget.style.transform = "scale(0.95)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#00d9ff";
              e.currentTarget.style.filter = "none";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <span className="material-symbols-outlined">shopping_cart</span>
          </button>
        </div>
      </nav>

      {/* MAIN */}
      <main
        style={{
          flexGrow: 1,
          paddingTop: "128px",
          paddingBottom: "80px",
          paddingLeft: "24px",
          paddingRight: "24px",
          boxSizing: "border-box",
        }}
      >
        <style>{`
          @media (min-width: 768px) {
            .product-grid { display: grid !important; grid-template-columns: repeat(12, 1fr) !important; gap: 32px !important; }
            .col-7 { grid-column: span 7 !important; }
            .col-5 { grid-column: span 5 !important; }
            .footer-grid { display: grid !important; grid-template-columns: repeat(4, 1fr) !important; }
          }
          @media (max-width: 767px) {
            .product-grid { display: flex !important; flex-direction: column !important; gap: 32px !important; }
            .footer-grid { display: flex !important; flex-direction: column !important; gap: 24px !important; align-items: center !important; }
          }
        `}</style>

        {/* Product Hero */}
        <div className="product-grid reveal" style={{ maxWidth: "1280px", margin: "0 auto" }}>
          {/* Left: Image Gallery */}
          <div className="col-7" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Main Image */}
            <div
              className="card-hover"
              style={{
                width: "100%",
                aspectRatio: "4/5",
                background: "#111827",
                borderRadius: "12px",
                overflow: "hidden",
                position: "relative",
                border: "1px solid rgba(255,255,255,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(0,217,255,0.05)",
                  opacity: 0,
                  filter: "blur(32px)",
                  pointerEvents: "none",
                  transition: "opacity 0.7s",
                }}
              />
              <img
                alt="Hydro Clarity Bottle Main Angle"
                src={IMG_URL}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.7s cubic-bezier(0.4,0,0.2,1)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              />
            </div>
            {/* Thumbnails */}
            <div
              className="no-scrollbar"
              style={{
                display: "flex",
                gap: "16px",
                overflowX: "auto",
                paddingBottom: "8px",
              }}
            >
              {[
                { alt: "Angle 1", active: true },
                { alt: "Angle 2", active: false },
                { alt: "Angle 3", active: false },
              ].map((thumb, i) => (
                <button
                  key={i}
                  style={{
                    flexShrink: 0,
                    width: "96px",
                    height: "128px",
                    borderRadius: "8px",
                    overflow: "hidden",
                    border: thumb.active
                      ? "2px solid #00d9ff"
                      : "2px solid transparent",
                    opacity: thumb.active ? 1 : 0.5,
                    transition: "all 0.3s",
                    cursor: "pointer",
                    background: "none",
                    padding: 0,
                  }}
                  onMouseEnter={(e) =>
                    !thumb.active &&
                    (e.currentTarget.style.opacity = "1")
                  }
                  onMouseLeave={(e) =>
                    !thumb.active &&
                    (e.currentTarget.style.opacity = "0.5")
                  }
                >
                  <img
                    alt={thumb.alt}
                    src={IMG_URL}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="col-5" style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                position: "sticky",
                top: "100px",
                display: "flex",
                flexDirection: "column",
                gap: "24px",
              }}
            >
              {/* Header & Price */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                  {["BPA Free", "Insulated"].map((badge) => (
                    <span
                      key={badge}
                      style={{
                        display: "inline-flex",
                        padding: "4px 12px",
                        borderRadius: "9999px",
                        border: "1px solid rgba(0,217,255,0.4)",
                        color: "#b2ebf2",
                        fontSize: "10px",
                        fontWeight: 600,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        background: "rgba(0,217,255,0.08)",
                      }}
                    >
                      {badge}
                    </span>
                  ))}
                </div>
                <h1
                  style={{
                    fontSize: "clamp(28px, 4vw, 40px)",
                    fontWeight: 700,
                    color: "#e8eaf6",
                    margin: 0,
                    lineHeight: 1.2,
                  }}
                >
                  Hydro Clarity Bottle
                </h1>
                <div
                  style={{
                    fontSize: "clamp(24px, 3vw, 32px)",
                    fontWeight: 700,
                    color: "#80deea",
                    marginTop: "8px",
                  }}
                >
                  $45.00
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: "1px", width: "100%", background: "rgba(255,255,255,0.08)" }} />

              {/* Color Selector */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#9fa8b8",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  Color: {selectedColor}
                </div>
                <div style={{ display: "flex", gap: "16px" }}>
                  {colors.map((c) => (
                    <button
                      key={c.name}
                      aria-label={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        background: c.bg,
                        border:
                          selectedColor === c.name
                            ? "2px solid #00d9ff"
                            : "2px solid transparent",
                        boxShadow:
                          selectedColor === c.name
                            ? "0 0 15px rgba(0,217,255,0.2), 0 0 0 4px #080f1e"
                            : "0 0 0 4px transparent",
                        cursor: "pointer",
                        transition: "all 0.3s",
                        padding: 0,
                      }}
                      onMouseEnter={(e) => {
                        if (selectedColor !== c.name) {
                          e.currentTarget.style.border = "2px solid rgba(255,255,255,0.3)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedColor !== c.name) {
                          e.currentTarget.style.border = "2px solid transparent";
                        }
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#9fa8b8",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  Size
                </div>
                <div style={{ display: "flex", gap: "16px" }}>
                  {["24 oz", "32 oz"].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      style={{
                        padding: "12px 24px",
                        borderRadius: "12px",
                        border:
                          selectedSize === size
                            ? "1px solid rgba(0,217,255,0.5)"
                            : "1px solid rgba(255,255,255,0.12)",
                        background:
                          selectedSize === size
                            ? "rgba(0,217,255,0.1)"
                            : "transparent",
                        color:
                          selectedSize === size ? "#b2ebf2" : "#e8eaf6",
                        fontSize: "14px",
                        fontWeight: 500,
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        if (selectedSize !== size) {
                          e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedSize !== size) {
                          e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                        }
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity + Actions */}
              <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "16px" }}>
                {/* Quantity */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "16px",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: "9999px",
                    padding: "4px 8px",
                    width: "fit-content",
                  }}
                >
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    style={{
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "none",
                      border: "none",
                      color: "#e8eaf6",
                      cursor: "pointer",
                      borderRadius: "50%",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#00d9ff";
                      e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#e8eaf6";
                      e.currentTarget.style.background = "none";
                    }}
                  >
                    <span className="material-symbols-outlined">remove</span>
                  </button>
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 700,
                      width: "32px",
                      textAlign: "center",
                      color: "#e8eaf6",
                    }}
                  >
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    style={{
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "none",
                      border: "none",
                      color: "#e8eaf6",
                      cursor: "pointer",
                      borderRadius: "50%",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#00d9ff";
                      e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#e8eaf6";
                      e.currentTarget.style.background = "none";
                    }}
                  >
                    <span className="material-symbols-outlined">add</span>
                  </button>
                </div>

                {/* Buttons */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "16px",
                    marginTop: "8px",
                  }}
                >
                  <button
                    className="btn-lift"
                    onClick={handleAddToCart}
                    style={{
                      width: "100%",
                      padding: "16px",
                      borderRadius: "9999px",
                      background: "rgba(0,217,255,0.15)",
                      border: "1px solid rgba(0,217,255,0.4)",
                      color: "#b2ebf2",
                      fontSize: "16px",
                      fontWeight: 700,
                      cursor: "pointer",
                      boxShadow: "0 0 20px rgba(0,217,255,0.15)",
                      transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow =
                        "0 0 30px rgba(0,217,255,0.3)";
                      e.currentTarget.style.filter = "brightness(1.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow =
                        "0 0 20px rgba(0,217,255,0.15)";
                      e.currentTarget.style.filter = "brightness(1)";
                    }}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="btn-lift"
                    onClick={handleBuyNow}
                    style={{
                      width: "100%",
                      padding: "16px",
                      borderRadius: "9999px",
                      background: "#80deea",
                      border: "none",
                      color: "#0a1128",
                      fontSize: "16px",
                      fontWeight: 700,
                      cursor: "pointer",
                      transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.filter = "brightness(1.1)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.filter = "brightness(1)")
                    }
                  >
                    Buy Now
                  </button>
                </div>
              </div>

              {/* Accordion */}
              <div
                style={{
                  marginTop: "24px",
                  borderTop: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {accordionItems.map((item) => (
                  <div key={item.key}>
                    <div
                      style={{
                        padding: "16px 0",
                        borderBottom: "1px solid rgba(255,255,255,0.08)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        setActiveAccordion(
                          activeAccordion === item.key ? null : item.key
                        )
                      }
                      onMouseEnter={(e) => {
                        const label = e.currentTarget.querySelector(".acc-label") as HTMLElement;
                        const icon = e.currentTarget.querySelector(".acc-icon") as HTMLElement;
                        if (label) label.style.color = "#b2ebf2";
                        if (icon) icon.style.color = "#b2ebf2";
                      }}
                      onMouseLeave={(e) => {
                        const label = e.currentTarget.querySelector(".acc-label") as HTMLElement;
                        const icon = e.currentTarget.querySelector(".acc-icon") as HTMLElement;
                        if (activeAccordion !== item.key) {
                          if (label) label.style.color = "#e8eaf6";
                          if (icon) icon.style.color = "#9fa8b8";
                        }
                      }}
                    >
                      <span
                        className="acc-label"
                        style={{
                          fontSize: "16px",
                          fontWeight: 600,
                          color:
                            activeAccordion === item.key
                              ? "#b2ebf2"
                              : "#e8eaf6",
                          transition: "color 0.2s",
                        }}
                      >
                        {item.label}
                      </span>
                      <span
                        className="acc-icon material-symbols-outlined"
                        style={{
                          color:
                            activeAccordion === item.key
                              ? "#b2ebf2"
                              : "#9fa8b8",
                          transition: "color 0.2s, transform 0.3s",
                          transform:
                            activeAccordion === item.key
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                        }}
                      >
                        expand_more
                      </span>
                    </div>
                    {activeAccordion === item.key && (
                      <div
                        style={{
                          padding: "12px 0 16px",
                          fontSize: "14px",
                          color: "#9fa8b8",
                          lineHeight: 1.7,
                          borderBottom: "1px solid rgba(255,255,255,0.08)",
                        }}
                      >
                        {item.content}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer
        style={{
          background: "#06080f",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          paddingTop: "64px",
          paddingBottom: "64px",
          paddingLeft: "24px",
          paddingRight: "24px",
          boxSizing: "border-box",
        }}
      >
        <div
          className="footer-grid"
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
          }}
        >
          {/* Brand */}
          <div
            style={{
              gridColumn: "1 / -1",
              fontSize: "22px",
              fontWeight: 700,
              color: "#e8eaf6",
              marginBottom: "24px",
              textAlign: "left",
            }}
          >
            Hydro
          </div>

          {/* Col 1 */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <span
              onClick={() => router.push("/shop")}
              style={{
                color: "#9fa8b8",
                fontSize: "14px",
                cursor: "pointer",
                transition: "color 0.3s",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#00d9ff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#9fa8b8")}
            >
              Shop All
            </span>
            <span
              onClick={() => router.push("/shop")}
              style={{
                color: "#9fa8b8",
                fontSize: "14px",
                cursor: "pointer",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#00d9ff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#9fa8b8")}
            >
              Our Science
            </span>
          </div>

          {/* Col 2 */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <span
              onClick={() => router.push("/")}
              style={{
                color: "#9fa8b8",
                fontSize: "14px",
                cursor: "pointer",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#00d9ff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#9fa8b8")}
            >
              Sustainability
            </span>
            <span
              onClick={() => router.push("/")}
              style={{
                color: "#9fa8b8",
                fontSize: "14px",
                cursor: "pointer",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#00d9ff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#9fa8b8")}
            >
              Contact Us
            </span>
          </div>

          {/* Col 3 */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <span
              onClick={() => router.push("/")}
              style={{
                color: "#9fa8b8",
                fontSize: "14px",
                cursor: "pointer",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#00d9ff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#9fa8b8")}
            >
              Privacy Policy
            </span>
            <span
              onClick={() => router.push("/")}
              style={{
                color: "#9fa8b8",
                fontSize: "14px",
                cursor: "pointer",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#00d9ff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#9fa8b8")}
            >
              Terms of Service
            </span>
          </div>

          {/* Copyright */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-end",
              color: "#9fa8b8",
              fontSize: "11px",
              marginTop: "0",
            }}
          >
            © 2024 Hydro. Engineered for Vitality.
          </div>
        </div>
      </footer>
    </div>
  );
}