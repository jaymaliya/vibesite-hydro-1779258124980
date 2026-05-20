"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../../components/CartContext";

const PRODUCT_IMAGES = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBepz7HOLDm7jYu0hrZe1S9DHdDnq2PNjqIvOYLimyScHYJ6uXdpGvKMGwyLAkDFRSzUqmA3XpAdUdAkOIBPKX7MXf-VxcAS5lrXKw4-SDpJUu4pWJyJEnkESqmSLkvk0gDcBOLpkCUDBwM_9_YLqe69owZepspwGcSypreguSpGt9gkVHDYGRF5czcvbpYzpJb1H8mkyMeMFco6mhaS4-yIQRgx_W5yF5TsaEcZHeNaHN4e0I1mHNOKR7AbShQUByWOgiNzD_EWRg",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBepz7HOLDm7jYu0hrZe1S9DHdDnq2PNjqIvOYLimyScHYJ6uXdpGvKMGwyLAkDFRSzUqmA3XpAdUdAkOIBPKX7MXf-VxcAS5lrXKw4-SDpJUu4pWJyJEnkESqmSLkvk0gDcBOLpkCUDBwM_9_YLqe69owZepspwGcSypreguSpGt9gkVHDYGRF5czcvbpYzpJb1H8mkyMeMFco6mhaS4-yIQRgx_W5yF5TsaEcZHeNaHN4e0I1mHNOKR7AbShQUByWOgiNzD_EWRg",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBepz7HOLDm7jYu0hrZe1S9DHdDnq2PNjqIvOYLimyScHYJ6uXdpGvKMGwyLAkDFRSzUqmA3XpAdUdAkOIBPKX7MXf-VxcAS5lrXKw4-SDpJUu4pWJyJEnkESqmSLkvk0gDcBOLpkCUDBwM_9_YLqe69owZepspwGcSypreguSpGt9gkVHDYGRF5czcvbpYzpJb1H8mkyMeMFco6mhaS4-yIQRgx_W5yF5TsaEcZHeNaHN4e0I1mHNOKR7AbShQUByWOgiNzD_EWRg",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBepz7HOLDm7jYu0hrZe1S9DHdDnq2PNjqIvOYLimyScHYJ6uXdpGvKMGwyLAkDFRSzUqmA3XpAdUdAkOIBPKX7MXf-VxcAS5lrXKw4-SDpJUu4pWJyJEnkESqmSLkvk0gDcBOLpkCUDBwM_9_YLqe69owZepspwGcSypreguSpGt9gkVHDYGRF5czcvbpYzpJb1H8mkyMeMFco6mhaS4-yIQRgx_W5yF5TsaEcZHeNaHN4e0I1mHNOKR7AbShQUByWOgiNzD_EWRg",
];

const COLORS = [
  { name: "Ocean Blue", hex: "#afecff", border: "#00d9ff" },
  { name: "Deep Navy", hex: "#1a3a5c", border: "#2563eb" },
  { name: "Arctic White", hex: "#e8f4f8", border: "#bbc9ce" },
  { name: "Midnight Teal", hex: "#0d3d3d", border: "#00d9ff" },
];

const SIZES = ["24 oz", "32 oz"];

const REVIEWS = [
  {
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    date: "March 2024",
    text: "The grip is incredible — I use it at the gym every day and it never slips. The clear body lets me track my intake easily. Best bottle I've owned.",
    avatar: "PS",
  },
  {
    name: "Arjun Mehta",
    location: "Bangalore",
    rating: 5,
    date: "February 2024",
    text: "Bought the 32 oz for my cycling trips. The screw-top is super tight — zero leaks even when thrown in my bag. The blue is exactly as vibrant as shown.",
    avatar: "AM",
  },
  {
    name: "Sneha Iyer",
    location: "Chennai",
    rating: 4,
    date: "January 2024",
    text: "Love the ergonomic shape — fits perfectly in my hand and in standard cup holders. Looks premium and the quality feels worth every rupee.",
    avatar: "SI",
  },
];

const FEATURES = [
  {
    icon: "💧",
    label: "BPA-Free",
    desc: "Food-grade Tritan plastic — totally safe, totally clear.",
  },
  {
    icon: "🔒",
    label: "Leak-Proof Lid",
    desc: "Dark blue screw-top seals airtight. Zero drips, ever.",
  },
  {
    icon: "✋",
    label: "Ergonomic Grip",
    desc: "Textured body molds to your palm — easy one-hand carry.",
  },
];

export default function ProductPage() {
  const router = useRouter();
  const { addItem } = useCart();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState("32 oz");
  const [quantity, setQuantity] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);
  const [addedFeedback, setAddedFeedback] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  const price = selectedSize === "24 oz" ? 799 : 1099;

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => setRazorpayLoaded(true);
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const productItem = {
    id: "hydro-clarity-" + selectedSize.replace(" ", "-").toLowerCase() + "-" + selectedColor,
    name: "Hydro Clarity Bottle",
    price,
    quantity,
    color: COLORS[selectedColor].name,
    size: selectedSize,
    image: PRODUCT_IMAGES[0],
  };

  const handleAddToCart = () => {
    addItem(productItem);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2000);
  };

  const handleBuyNow = () => {
    if (!razorpayLoaded) {
      alert("Payment gateway loading, please try again.");
      return;
    }
    addItem(productItem);
    const options = {
      key: "rzp_test_",
      amount: price * quantity * 100,
      currency: "INR",
      name: "Hydro",
      description: "Hydro Clarity Bottle — " + selectedSize,
      image: PRODUCT_IMAGES[0],
      handler: function () {
        router.push("/checkout");
      },
      prefill: { name: "", email: "", contact: "" },
      theme: { color: "#00d9ff" },
    };
    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  const starRow = (count: number) =>
    Array.from({ length: 5 }).map((_, i) => (
      <span
        key={i}
        style={{
          color: i < count ? "#00d9ff" : "#2a3840",
          fontSize: "16px",
        }}
      >
        ★
      </span>
    ));

  return (
    <div
      style={{
        background: "#0e1417",
        color: "#dde4e6",
        fontFamily: "Inter, sans-serif",
        minHeight: "100vh",
      }}
    >
      {/* NAV */}
      <header
        style={{
          background: "rgba(14,20,23,0.95)",
          borderBottom: "1px solid rgba(175,236,255,0.08)",
          position: "sticky",
          top: 0,
          zIndex: 40,
          backdropFilter: "blur(12px)",
        }}
      >
        <nav className="max-w-6xl mx-auto px-4 flex items-center justify-between" style={{ height: "64px" }}>
          <button
            onClick={() => router.push("/")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #afecff 0%, #00d9ff 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ color: "#0e1417", fontSize: "16px", fontWeight: 800 }}>H</span>
            </div>
            <span style={{ color: "#dde4e6", fontSize: "18px", fontWeight: 700, letterSpacing: "-0.02em" }}>
              Hydro
            </span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {["Shop", "About", "Reviews"].map((item) => (
              <button
                key={item}
                onClick={() => (item === "Shop" ? router.push("/shop") : undefined)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#bbc9ce",
                  fontSize: "14px",
                  fontWeight: 500,
                  transition: "color 0.2s cubic-bezier(0.4,0,0.2,1)",
                }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#afecff")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#bbc9ce")}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/checkout")}
              style={{
                background: "none",
                border: "1px solid rgba(175,236,255,0.2)",
                borderRadius: "8px",
                padding: "8px 16px",
                color: "#afecff",
                fontSize: "14px",
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(175,236,255,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "none";
              }}
            >
              Cart
            </button>
            <button
              className="md:hidden"
              onClick={() => setMenuOpen(true)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#dde4e6",
                fontSize: "22px",
                padding: "8px",
                minWidth: "44px",
                minHeight: "44px",
              }}
              aria-label="Open menu"
            >
              ☰
            </button>
          </div>
        </nav>
      </header>

      {/* MOBILE MENU OVERLAY */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "#0e1417",
            display: "flex",
            flexDirection: "column",
            padding: "24px",
          }}
        >
          <div className="flex justify-between items-center mb-12">
            <span style={{ color: "#dde4e6", fontSize: "18px", fontWeight: 700 }}>Hydro</span>
            <button
              onClick={() => setMenuOpen(false)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#dde4e6",
                fontSize: "28px",
                minWidth: "44px",
                minHeight: "44px",
              }}
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>
          {["Shop", "About", "Reviews", "Cart"].map((item) => (
            <button
              key={item}
              onClick={() => {
                setMenuOpen(false);
                if (item === "Shop") router.push("/shop");
                else if (item === "Cart") router.push("/checkout");
              }}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#dde4e6",
                fontSize: "28px",
                fontWeight: 600,
                textAlign: "left",
                padding: "16px 0",
                borderBottom: "1px solid rgba(175,236,255,0.08)",
              }}
            >
              {item}
            </button>
          ))}
        </div>
      )}

      <main>
        {/* BREADCRUMB */}
        <div className="max-w-6xl mx-auto px-4 pt-6 pb-2">
          <div className="flex items-center gap-2" style={{ fontSize: "13px", color: "#bbc9ce" }}>
            <button
              onClick={() => router.push("/")}
              style={{ background: "none", border: "none", cursor: "pointer", color: "#bbc9ce" }}
            >
              Home
            </button>
            <span>/</span>
            <button
              onClick={() => router.push("/shop")}
              style={{ background: "none", border: "none", cursor: "pointer", color: "#bbc9ce" }}
            >
              Shop
            </button>
            <span>/</span>
            <span style={{ color: "#afecff" }}>Hydro Clarity Bottle</span>
          </div>
        </div>

        {/* PRODUCT SECTION */}
        <section className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* LEFT — IMAGE GALLERY */}
            <div>
              {/* Main image */}
              <div
                style={{
                  borderRadius: "20px",
                  overflow: "hidden",
                  background: "linear-gradient(135deg, #1a2123 0%, #0d1e24 100%)",
                  border: "1px solid rgba(175,236,255,0.1)",
                  aspectRatio: "1/1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <img
                  src={PRODUCT_IMAGES[selectedImage]}
                  alt="Hydro Clarity Bottle — clear blue plastic water bottle with dark blue screw-top lid and ergonomic textured body"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "opacity 0.3s cubic-bezier(0.4,0,0.2,1)",
                  }}
                />
                {/* Made in India badge */}
                <div
                  style={{
                    position: "absolute",
                    top: "16px",
                    left: "16px",
                    background: "rgba(14,20,23,0.85)",
                    border: "1px solid rgba(175,236,255,0.2)",
                    borderRadius: "100px",
                    padding: "4px 12px",
                    fontSize: "11px",
                    color: "#afecff",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  🇮🇳 Made in India
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3 mt-4 overflow-x-auto no-scrollbar">
                {PRODUCT_IMAGES.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    style={{
                      flexShrink: 0,
                      width: "72px",
                      height: "72px",
                      borderRadius: "12px",
                      overflow: "hidden",
                      border:
                        selectedImage === i
                          ? "2px solid #00d9ff"
                          : "2px solid rgba(175,236,255,0.12)",
                      cursor: "pointer",
                      transition: "border-color 0.2s cubic-bezier(0.4,0,0.2,1)",
                      background: "#1a2123",
                      padding: 0,
                    }}
                    aria-label={"View image " + (i + 1) + " of Hydro Clarity Bottle"}
                  >
                    <img
                      src={img}
                      alt={"Hydro Clarity Bottle thumbnail " + (i + 1)}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </button>
                ))}
              </div>

              {/* Trust strip */}
              <div
                className="flex flex-wrap gap-4 mt-6"
                style={{
                  background: "rgba(175,236,255,0.04)",
                  borderRadius: "12px",
                  padding: "14px 16px",
                  border: "1px solid rgba(175,236,255,0.08)",
                }}
              >
                {[
                  { icon: "🚚", text: "Free shipping above ₹499" },
                  { icon: "↩️", text: "30-day returns" },
                  { icon: "🔒", text: "Secure checkout" },
                ].map((t) => (
                  <div key={t.text} className="flex items-center gap-2">
                    <span style={{ fontSize: "14px" }}>{t.icon}</span>
                    <span style={{ fontSize: "12px", color: "#bbc9ce", fontWeight: 500 }}>{t.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — PRODUCT INFO */}
            <div style={{ paddingBottom: "100px" }}>
              {/* Eyebrow */}
              <p
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#00d9ff",
                  marginBottom: "12px",
                }}
              >
                Hydro Collection 2024
              </p>

              {/* Title */}
              <h1
                style={{
                  fontSize: "clamp(2rem, 5vw, 3rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.05,
                  color: "#dde4e6",
                  marginBottom: "16px",
                }}
              >
                Hydro Clarity Bottle
              </h1>

              {/* Rating row */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex">{starRow(5)}</div>
                <span style={{ fontSize: "14px", color: "#bbc9ce", fontWeight: 500 }}>
                  4.8 · 2,340 reviews
                </span>
                <span
                  style={{
                    background: "rgba(0,217,255,0.1)",
                    color: "#00d9ff",
                    fontSize: "11px",
                    fontWeight: 600,
                    padding: "2px 10px",
                    borderRadius: "100px",
                    border: "1px solid rgba(0,217,255,0.25)",
                  }}
                >
                  Bestseller
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-8">
                <span
                  style={{
                    fontSize: "2rem",
                    fontWeight: 700,
                    color: "#afecff",
                    letterSpacing: "-0.02em",
                  }}
                >
                  ₹{price.toLocaleString("en-IN")}
                </span>
                <span
                  style={{
                    fontSize: "1rem",
                    color: "#bbc9ce",
                    textDecoration: "line-through",
                  }}
                >
                  ₹{(price + 400).toLocaleString("en-IN")}
                </span>
                <span
                  style={{
                    background: "rgba(255,178,191,0.12)",
                    color: "#ffb2bf",
                    fontSize: "12px",
                    fontWeight: 600,
                    padding: "2px 10px",
                    borderRadius: "100px",
                    border: "1px solid rgba(255,178,191,0.2)",
                  }}
                >
                  Save ₹400
                </span>
              </div>

              {/* Description */}
              <p
                style={{
                  fontSize: "15px",
                  color: "#bbc9ce",
                  lineHeight: 1.7,
                  marginBottom: "28px",
                }}
              >
                The Hydro Clarity Bottle is engineered for performance and designed for everyday life. Crystal-clear Tritan body, dark blue screw-top that seals tight, and a textured ergonomic grip that feels natural in your hand — gym, commute, or trails.
              </p>

              {/* Color selector */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span style={{ fontSize: "13px", fontWeight: 600, color: "#dde4e6" }}>
                    Color
                  </span>
                  <span style={{ fontSize: "13px", color: "#00d9ff" }}>
                    {COLORS[selectedColor].name}
                  </span>
                </div>
                <div className="flex gap-3">
                  {COLORS.map((c, i) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(i)}
                      aria-label={"Select color " + c.name}
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        background: c.hex,
                        border:
                          selectedColor === i
                            ? "3px solid " + c.border
                            : "3px solid rgba(175,236,255,0.1)",
                        cursor: "pointer",
                        boxShadow:
                          selectedColor === i
                            ? "0 0 0 3px " + c.border + "44"
                            : "none",
                        transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)",
                        minWidth: "44px",
                        minHeight: "44px",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Size selector */}
              <div className="mb-6">
                <p style={{ fontSize: "13px", fontWeight: 600, color: "#dde4e6", marginBottom: "12px" }}>
                  Size
                </p>
                <div className="flex gap-3">
                  {SIZES.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      style={{
                        padding: "10px 24px",
                        borderRadius: "10px",
                        border:
                          selectedSize === s
                            ? "1.5px solid #00d9ff"
                            : "1.5px solid rgba(175,236,255,0.15)",
                        background:
                          selectedSize === s
                            ? "rgba(0,217,255,0.1)"
                            : "rgba(175,236,255,0.03)",
                        color: selectedSize === s ? "#00d9ff" : "#bbc9ce",
                        fontSize: "14px",
                        fontWeight: 600,
                        cursor: "pointer",
                        transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)",
                        minHeight: "44px",
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-8">
                <p style={{ fontSize: "13px", fontWeight: 600, color: "#dde4e6", marginBottom: "12px" }}>
                  Quantity
                </p>
                <div
                  className="flex items-center"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    border: "1.5px solid rgba(175,236,255,0.15)",
                    borderRadius: "10px",
                    overflow: "hidden",
                    background: "rgba(175,236,255,0.03)",
                  }}
                >
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    style={{
                      width: "44px",
                      height: "44px",
                      background: "none",
                      border: "none",
                      color: "#afecff",
                      fontSize: "20px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "background 0.2s",
                    }}
                    aria-label="Decrease quantity"
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.background =
                        "rgba(175,236,255,0.08)")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.background = "none")
                    }
                  >
                    −
                  </button>
                  <span
                    style={{
                      width: "44px",
                      textAlign: "center",
                      fontSize: "16px",
                      fontWeight: 600,
                      color: "#dde4e6",
                    }}
                  >
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    style={{
                      width: "44px",
                      height: "44px",
                      background: "none",
                      border: "none",
                      color: "#afecff",
                      fontSize: "20px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "background 0.2s",
                    }}
                    aria-label="Increase quantity"
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.background =
                        "rgba(175,236,255,0.08)")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.background = "none")
                    }
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Desktop CTAs */}
              <div className="hidden md:flex gap-4">
                <button
                  onClick={handleAddToCart}
                  style={{
                    flex: 1,
                    padding: "16px",
                    borderRadius: "12px",
                    border: "1.5px solid #00d9ff",
                    background: addedFeedback
                      ? "rgba(0,217,255,0.15)"
                      : "rgba(0,217,255,0.06)",
                    color: "#00d9ff",
                    fontSize: "15px",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)",
                    minHeight: "52px",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.background =
                      "rgba(0,217,255,0.12)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.background =
                      addedFeedback ? "rgba(0,217,255,0.15)" : "rgba(0,217,255,0.06)")
                  }
                >
                  {addedFeedback ? "✓ Added to Cart" : "Add to Cart"}
                </button>
                <button
                  onClick={handleBuyNow}
                  style={{
                    flex: 1,
                    padding: "16px",
                    borderRadius: "12px",
                    border: "none",
                    background: "linear-gradient(135deg, #afecff 0%, #00d9ff 100%)",
                    color: "#0e1417",
                    fontSize: "15px",
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)",
                    minHeight: "52px",
                    letterSpacing: "-0.01em",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.transform = "translateY(-1px)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.transform = "translateY(0)")
                  }
                >
                  Buy Now
                </button>
              </div>

              {/* Razorpay note */}
              <p
                className="hidden md:block"
                style={{
                  fontSize: "12px",
                  color: "#bbc9ce",
                  marginTop: "12px",
                  textAlign: "center",
                }}
              >
                Secured by Razorpay · UPI, Cards, NetBanking accepted
              </p>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section
          style={{
            background: "#1a2123",
            borderTop: "1px solid rgba(175,236,255,0.06)",
            borderBottom: "1px solid rgba(175,236,255,0.06)",
          }}
        >
          <div className="max-w-6xl mx-auto px-4 py-16">
            <p
              style={{
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#00d9ff",
                textAlign: "center",
                marginBottom: "12px",
              }}
            >
              Why Hydro Clarity
            </p>
            <h2
              style={{
                fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
                color: "#dde4e6",
                textAlign: "center",
                marginBottom: "48px",
              }}
            >
              Engineered for real life
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {FEATURES.map((f) => (
                <div
                  key={f.label}
                  style={{
                    background: "rgba(175,236,255,0.04)",
                    border: "1px solid rgba(175,236,255,0.1)",
                    borderRadius: "16px",
                    padding: "28px 24px",
                    transition: "border-color 0.2s cubic-bezier(0.4,0,0.2,1)",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(0,217,255,0.3)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(175,236,255,0.1)")
                  }
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "12px",
                      background: "rgba(0,217,255,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "22px",
                      marginBottom: "16px",
                    }}
                  >
                    {f.icon}
                  </div>
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: 700,
                      color: "#dde4e6",
                      marginBottom: "8px",
                    }}
                  >
                    {f.label}
                  </h3>
                  <p style={{ fontSize: "14px", color: "#bbc9ce", lineHeight: 1.6 }}>
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* REVIEWS */}
        <section className="max-w-6xl mx-auto px-4 py-16">
          <p
            style={{
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#00d9ff",
              marginBottom: "12px",
            }}
          >
            Customer Stories
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <h2
              style={{
                fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
                color: "#dde4e6",
              }}
            >
              What our hydrators say
            </h2>
            <div className="flex items-center gap-2">
              <div className="flex">{starRow(5)}</div>
              <span style={{ fontSize: "14px", color: "#bbc9ce" }}>
                4.8 avg · 2,340 verified reviews
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {REVIEWS.map((r) => (
              <div
                key={r.name}
                style={{
                  background: "#1a2123",
                  border: "1px solid rgba(175,236,255,0.08)",
                  borderRadius: "16px",
                  padding: "24px",
                  transition: "border-color 0.2s cubic-bezier(0.4,0,0.2,1)",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(0,217,255,0.2)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(175,236,255,0.08)")
                }
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #afecff 0%, #00d9ff 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "#0e1417",
                      flexShrink: 0,
                    }}
                  >
                    {r.avatar}
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#dde4e6",
                        lineHeight: 1.2,
                      }}
                    >
                      {r.name}
                    </p>
                    <p style={{ fontSize: "12px", color: "#bbc9ce" }}>
                      {r.location} · {r.date}
                    </p>
                  </div>
                </div>
                <div className="flex mb-3">{starRow(r.rating)}</div>
                <p style={{ fontSize: "14px", color: "#bbc9ce", lineHeight: 1.7 }}>
                  "{r.text}"
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* BOTTOM CTA BANNER */}
        <section
          style={{
            background: "linear-gradient(135deg, #1a2123 0%, #0d1e24 100%)",
            borderTop: "1px solid rgba(175,236,255,0.08)",
            marginBottom: "80px",
          }}
        >
          <div className="max-w-6xl mx-auto px-4 py-16 text-center">
            <p
              style={{
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#00d9ff",
                marginBottom: "12px",
              }}
            >
              Limited Stock
            </p>
            <h2
              style={{
                fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
                color: "#dde4e6",
                marginBottom: "8px",
              }}
            >
              Start hydrating smarter
            </h2>
            <p
              style={{
                fontSize: "15px",
                color: "#bbc9ce",
                marginBottom: "32px",
                lineHeight: 1.6,
              }}
            >
              Free shipping · 30-day returns · Made in India
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleAddToCart}
                style={{
                  padding: "16px 40px",
                  borderRadius: "12px",
                  border: "1.5px solid #00d9ff",
                  background: "rgba(0,217,255,0.06)",
                  color: "#00d9ff",
                  fontSize: "15px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)",
                  minHeight: "52px",
                }}
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                style={{
                  padding: "16px 40px",
                  borderRadius: "12px",
                  border: "none",
                  background: "linear-gradient(135deg, #afecff 0%, #00d9ff 100%)",
                  color: "#0e1417",
                  fontSize: "15px",
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)",
                  minHeight: "52px",
                  letterSpacing: "-0.01em",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.transform = "translateY(-1px)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.transform = "translateY(0)")
                }
              >
                Buy Now · ₹{price.toLocaleString("en-IN")}
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* MOBILE STICKY BAR */}
      <div
        className="md:hidden"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: "rgba(14,20,23,0.98)",
          borderTop: "1px solid rgba(175,236,255,0.12)",
          padding: "12px 16px",
          display: "flex",
          gap: "12px",
          alignItems: "center",
          backdropFilter: "blur(16px)",
        }}
      >
        <div style={{ flex: "0 0 auto" }}>
          <p style={{ fontSize: "11px", color: "#bbc9ce", lineHeight: 1 }}>Total</p>
          <p style={{ fontSize: "18px", fontWeight: 700, color: "#afecff", lineHeight: 1.2 }}>
            ₹{(price * quantity).toLocaleString("en-IN")}
          </p>
        </div>
        <button
          onClick={handleAddToCart}
          style={{
            flex: 1,
            padding: "14px",
            borderRadius: "10px",
            border: "1.5px solid #00d9ff",
            background: addedFeedback ? "rgba(0,217,255,0.15)" : "rgba(0,217,255,0.06)",
            color: "#00d9ff",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)",
            minHeight: "48px",
          }}
        >
          {addedFeedback ? "✓ Added" : "Add to Cart"}
        </button>
        <button
          onClick={handleBuyNow}
          style={{
            flex: 1,
            padding: "14px",
            borderRadius: "10px",
            border: "none",
            background: "linear-gradient(135deg, #afecff 0%, #00d9ff 100%)",
            color: "#0e1417",
            fontSize: "14px",
            fontWeight: 700,
            cursor: "pointer",
            transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)",
            minHeight: "48px",
          }}
        >
          Buy Now
        </button>
      </div>

      {/* FOOTER */}
      <footer
        style={{
          background: "#0e1417",
          borderTop: "1px solid rgba(175,236,255,0.06)",
          paddingBottom: "80px",
        }}
        className="md:pb-0"
      >
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <button
              onClick={() => router.push("/")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #afecff 0%, #00d9ff 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ color: "#0e1417", fontSize: "14px", fontWeight: 800 }}>H</span>
              </div>
              <span style={{ color: "#dde4e6", fontSize: "16px", fontWeight: 700 }}>Hydro</span>
            </button>
            <p style={{ fontSize: "13px", color: "#bbc9ce" }}>
              © 2024 Hydro. Made with care in India.
            </p>
            <div className="flex gap-6">
              {["Privacy", "Terms", "Contact"].map((l) => (
                <button
                  key={l}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#bbc9ce",
                    fontSize: "13px",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLElement).style.color = "#afecff")
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.color = "#bbc9ce")
                  }
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}