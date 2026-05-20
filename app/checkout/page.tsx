"use client";
import { useRouter } from "next/navigation";
import { useCart } from "../../components/CartContext";
import { useState, useEffect, useRef, Suspense } from "react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

function CheckoutInner() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const shippingCost = totalPrice > 500 ? 0 : 99;
  const orderTotal = totalPrice + shippingCost;

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

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Enter a valid email";
    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    if (!phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^\d{10}$/.test(phone))
      newErrors.phone = "Enter a valid 10-digit phone number";
    if (!address.trim()) newErrors.address = "Address is required";
    if (!city.trim()) newErrors.city = "City is required";
    if (!state.trim()) newErrors.state = "State is required";
    if (!zip.trim()) newErrors.zip = "Postal code is required";
    else if (!/^\d{6}$/.test(zip))
      newErrors.zip = "Enter a valid 6-digit PIN code";
    return newErrors;
  };

  const handlePayment = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setIsLoading(true);

    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: orderTotal }),
      });
      const order = await res.json();

      const rzp = new window.Razorpay({
        key: "rzp_test_",
        amount: order.amount,
        currency: "INR",
        name: "Hydro",
        description: "Order Payment",
        handler: () => {
          clearCart();
          router.push("/");
        },
      });
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div
        style={{ background: "#0a0a0a", minHeight: "100vh" }}
        className="flex flex-col"
      >
        <header
          style={{
            borderBottom: "1px solid rgba(68,68,68,0.4)",
          }}
          className="w-full px-6 md:px-16 py-6 flex justify-center items-center"
        >
          <h1
            onClick={() => router.push("/")}
            style={{
              fontFamily: "'Inter', sans-serif",
              color: "#ffffff",
              cursor: "pointer",
              fontSize: "1.5rem",
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            Hydro
          </h1>
        </header>
        <main className="flex-grow flex flex-col items-center justify-center gap-6 px-6">
          <p style={{ color: "#aaaaaa", fontSize: "1.125rem" }}>
            Your cart is empty.
          </p>
          <button
            onClick={() => router.push("/shop")}
            style={{
              background: "#00d9ff",
              color: "#0a0a0a",
              fontWeight: 700,
              borderRadius: "9999px",
              padding: "0.75rem 2.5rem",
              fontSize: "1rem",
              boxShadow: "0 0 40px rgba(0, 217, 255, 0.15)",
              transition:
                "transform 0.25s cubic-bezier(0.4,0,0.2,1), box-shadow 0.25s cubic-bezier(0.4,0,0.2,1)",
              border: "none",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform =
                "scale(1.02)";
              (e.currentTarget as HTMLButtonElement).style.filter =
                "brightness(1.1)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform =
                "scale(1)";
              (e.currentTarget as HTMLButtonElement).style.filter =
                "brightness(1)";
            }}
          >
            Start Shopping
          </button>
        </main>
        <footer
          style={{
            borderTop: "1px solid rgba(68,68,68,0.1)",
          }}
          className="w-full py-6 text-center"
        >
          <p
            style={{
              color: "#666666",
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            © 2024 Hydro. Engineered for Vitality.
          </p>
        </footer>
      </div>
    );
  }

  return (
    <div
      style={{ background: "#0a0a0a", minHeight: "100vh", color: "#ffffff" }}
      className="flex flex-col page-enter"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        .is-hidden { opacity: 0; transform: translateY(24px); }
        .visible { opacity: 1; transform: translateY(0); transition: opacity 0.6s ease, transform 0.6s ease; }
        .page-enter { animation: pageFadeIn 0.5s ease both; }
        @keyframes pageFadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .input-ghost {
          background: transparent;
          border: none;
          border-bottom: 1px solid #444444;
          border-radius: 0;
          padding-left: 0;
          padding-right: 0;
          color: #ffffff;
          width: 100%;
          font-size: 1rem;
          padding-top: 0.5rem;
          padding-bottom: 0.5rem;
          outline: none;
          transition: border-bottom-color 0.2s ease;
        }
        .input-ghost::placeholder { color: #666666; }
        .input-ghost:focus { box-shadow: none; border-bottom-color: #00d9ff; }
        .input-ghost.error { border-bottom-color: #ff4444; }
        .glass-card {
          background-color: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          border: 1px solid #444444;
        }
        .glow-effect { box-shadow: 0 0 40px rgba(0, 217, 255, 0.15); }
        .btn-lift { transition: transform 0.25s cubic-bezier(0.4,0,0.2,1), box-shadow 0.25s cubic-bezier(0.4,0,0.2,1), filter 0.2s ease; }
        .btn-lift:hover { transform: scale(1.02); filter: brightness(1.1); }
        .btn-lift:active { transform: scale(0.98); }
      `}</style>

      {/* Header */}
      <header
        style={{
          borderBottom: "1px solid rgba(68,68,68,0.2)",
        }}
        className="w-full px-6 md:px-16 py-6 flex justify-center items-center"
      >
        <h1
          onClick={() => router.push("/")}
          style={{
            fontFamily: "'Inter', sans-serif",
            color: "#ffffff",
            cursor: "pointer",
            fontSize: "1.5rem",
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          Hydro
        </h1>
      </header>

      {/* Main */}
      <main
        className="flex-grow py-12 px-6 md:px-16 w-full"
        style={{ maxWidth: "1440px", margin: "0 auto" }}
      >
        <div
          className="grid gap-10 reveal"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "2.5rem",
            }}
            className="lg-grid"
          >
            <style>{`
              @media (min-width: 1024px) {
                .lg-grid { grid-template-columns: 7fr 5fr !important; }
              }
              @media (min-width: 768px) {
                .md-two-col { grid-template-columns: 1fr 1fr !important; }
                .md-three-col { grid-template-columns: 1fr 1fr 1fr !important; }
              }
            `}</style>

            {/* Left Column: Form */}
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <h2
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "2rem",
                    fontWeight: 700,
                    color: "#ffffff",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Checkout
                </h2>
                <p style={{ color: "#aaaaaa", fontSize: "1rem" }}>
                  Please provide your details below.
                </p>
              </div>

              <form
                style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
                onSubmit={(e) => {
                  e.preventDefault();
                  handlePayment();
                }}
              >
                {/* Contact */}
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <h3
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "1.25rem",
                      fontWeight: 600,
                      color: "#ffffff",
                    }}
                  >
                    Contact
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <label
                      htmlFor="email"
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color: "#ffffff",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                      }}
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`input-ghost${errors.email ? " error" : ""}`}
                    />
                    {errors.email && (
                      <span style={{ color: "#ff4444", fontSize: "0.75rem" }}>
                        {errors.email}
                      </span>
                    )}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <label
                      htmlFor="phone"
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color: "#ffffff",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                      }}
                    >
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="10-digit mobile number"
                      value={phone}
                      onChange={(e) =>
                        setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
                      }
                      className={`input-ghost${errors.phone ? " error" : ""}`}
                    />
                    {errors.phone && (
                      <span style={{ color: "#ff4444", fontSize: "0.75rem" }}>
                        {errors.phone}
                      </span>
                    )}
                  </div>
                </div>

                {/* Shipping Address */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    paddingTop: "1.25rem",
                    borderTop: "1px solid rgba(68,68,68,0.3)",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "1.25rem",
                      fontWeight: 600,
                      color: "#ffffff",
                    }}
                  >
                    Shipping Address
                  </h3>

                  {/* First / Last Name */}
                  <div
                    className="md-two-col"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr",
                      gap: "1rem",
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      <label
                        htmlFor="firstName"
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          color: "#ffffff",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                        }}
                      >
                        First Name
                      </label>
                      <input
                        id="firstName"
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className={`input-ghost${errors.firstName ? " error" : ""}`}
                      />
                      {errors.firstName && (
                        <span style={{ color: "#ff4444", fontSize: "0.75rem" }}>
                          {errors.firstName}
                        </span>
                      )}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      <label
                        htmlFor="lastName"
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          color: "#ffffff",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                        }}
                      >
                        Last Name
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className={`input-ghost${errors.lastName ? " error" : ""}`}
                      />
                      {errors.lastName && (
                        <span style={{ color: "#ff4444", fontSize: "0.75rem" }}>
                          {errors.lastName}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Address */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <label
                      htmlFor="address"
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color: "#ffffff",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                      }}
                    >
                      Address
                    </label>
                    <input
                      id="address"
                      type="text"
                      placeholder="Street Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className={`input-ghost${errors.address ? " error" : ""}`}
                    />
                    {errors.address && (
                      <span style={{ color: "#ff4444", fontSize: "0.75rem" }}>
                        {errors.address}
                      </span>
                    )}
                  </div>

                  {/* City / State / ZIP */}
                  <div
                    className="md-three-col"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr",
                      gap: "1rem",
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      <label
                        htmlFor="city"
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          color: "#ffffff",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                        }}
                      >
                        City
                      </label>
                      <input
                        id="city"
                        type="text"
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className={`input-ghost${errors.city ? " error" : ""}`}
                      />
                      {errors.city && (
                        <span style={{ color: "#ff4444", fontSize: "0.75rem" }}>
                          {errors.city}
                        </span>
                      )}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      <label
                        htmlFor="state"
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          color: "#ffffff",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                        }}
                      >
                        State
                      </label>
                      <input
                        id="state"
                        type="text"
                        placeholder="State"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className={`input-ghost${errors.state ? " error" : ""}`}
                      />
                      {errors.state && (
                        <span style={{ color: "#ff4444", fontSize: "0.75rem" }}>
                          {errors.state}
                        </span>
                      )}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      <label
                        htmlFor="zip"
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          color: "#ffffff",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                        }}
                      >
                        Postal Code
                      </label>
                      <input
                        id="zip"
                        type="text"
                        placeholder="PIN Code"
                        value={zip}
                        onChange={(e) =>
                          setZip(e.target.value.replace(/\D/g, "").slice(0, 6))
                        }
                        className={`input-ghost${errors.zip ? " error" : ""}`}
                      />
                      {errors.zip && (
                        <span style={{ color: "#ff4444", fontSize: "0.75rem" }}>
                          {errors.zip}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* Right Column: Order Summary */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div
                className="glass-card"
                style={{
                  borderRadius: "0.75rem",
                  padding: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                  position: "sticky",
                  top: "1.5rem",
                }}
              >
                {/* Order Summary Heading */}
                <h3
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    color: "#ffffff",
                    borderBottom: "1px solid rgba(68,68,68,0.3)",
                    paddingBottom: "1rem",
                  }}
                >
                  Order Summary
                </h3>

                {/* Item List */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    borderBottom: "1px solid rgba(68,68,68,0.3)",
                    paddingBottom: "1rem",
                  }}
                >
                  {items.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                      }}
                    >
                      <div
                        style={{
                          width: "6rem",
                          height: "6rem",
                          borderRadius: "0.5rem",
                          overflow: "hidden",
                          background: "rgba(255,255,255,0.05)",
                          flexShrink: 0,
                        }}
                      >
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              transition: "transform 0.6s ease",
                            }}
                            onMouseEnter={(e) => {
                              (e.currentTarget as HTMLImageElement).style.transform =
                                "scale(1.05)";
                            }}
                            onMouseLeave={(e) => {
                              (e.currentTarget as HTMLImageElement).style.transform =
                                "scale(1)";
                            }}
                          />
                        ) : (
                          <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBepz7HOLDm7jYu0hrZe1S9DHdDnq2PNjqIvOYLimyScHYJ6uXdpGvKMGwyLAkDFRSzUqmA3XpAdUdAkOIBPKX7MXf-VxcAS5lrXKw4-SDpJUu4pWJyJEnkESqmSLkvk0gDcBOLpkCUDBwM_9_YLqe69owZepspwGcSypreguSpGt9gkVHDYGRF5czcvbpYzpJb1H8mkyMeMFco6mhaS4-yIQRgx_W5yF5TsaEcZHeNaHN4e0I1mHNOKR7AbShQUByWOgiNzD_EWRg"
                            alt={item.name}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        )}
                      </div>
                      <div style={{ flexGrow: 1 }}>
                        <h4
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "1rem",
                            fontWeight: 700,
                            color: "#ffffff",
                          }}
                        >
                          {item.name}
                        </h4>
                        {item.color && (
                          <p style={{ color: "#aaaaaa", fontSize: "0.875rem" }}>
                            {item.color}
                            {item.size ? ` / ${item.size}` : ""}
                          </p>
                        )}
                        <p style={{ color: "#aaaaaa", fontSize: "0.875rem" }}>
                          Qty: {item.quantity}
                        </p>
                        <div
                          style={{
                            marginTop: "0.5rem",
                            display: "inline-block",
                            padding: "0.25rem 0.75rem",
                            borderRadius: "9999px",
                            border: "1px solid #00d9ff",
                            color: "#00d9ff",
                            fontSize: "0.7rem",
                            fontWeight: 600,
                            textTransform: "uppercase",
                            letterSpacing: "0.06em",
                          }}
                        >
                          Insulated
                        </div>
                      </div>
                      <div
                        style={{
                          fontSize: "1rem",
                          fontWeight: 600,
                          color: "#ffffff",
                          textAlign: "right",
                          flexShrink: 0,
                        }}
                      >
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.625rem",
                    borderBottom: "1px solid rgba(68,68,68,0.3)",
                    paddingBottom: "1rem",
                    fontSize: "0.9375rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      color: "#aaaaaa",
                    }}
                  >
                    <span>Subtotal</span>
                    <span>₹{totalPrice.toLocaleString("en-IN")}</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      color: "#aaaaaa",
                    }}
                  >
                    <span>Shipping</span>
                    <span>
                      {shippingCost === 0
                        ? "FREE"
                        : `₹${shippingCost}`}
                    </span>
                  </div>
                </div>

                {/* Grand Total */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    paddingTop: "0.5rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "1.25rem",
                      fontWeight: 700,
                      color: "#ffffff",
                    }}
                  >
                    Total
                  </span>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "1.25rem",
                      fontWeight: 700,
                      color: "#00d9ff",
                    }}
                  >
                    ₹{orderTotal.toLocaleString("en-IN")}
                  </span>
                </div>

                {/* Pay Button */}
                <button
                  onClick={handlePayment}
                  disabled={isLoading}
                  className="btn-lift glow-effect"
                  style={{
                    width: "100%",
                    padding: "1rem",
                    borderRadius: "9999px",
                    background: "#00d9ff",
                    color: "#0a0a0a",
                    fontSize: "1rem",
                    fontWeight: 700,
                    border: "none",
                    cursor: isLoading ? "not-allowed" : "pointer",
                    opacity: isLoading ? 0.7 : 1,
                    marginTop: "0.5rem",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {isLoading ? "Processing..." : "Pay with Razorpay"}
                </button>

                {/* Trust Badges */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "1.5rem",
                    paddingTop: "1rem",
                    flexWrap: "wrap",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "0.25rem",
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#00d9ff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <span
                      style={{
                        color: "#aaaaaa",
                        fontSize: "0.7rem",
                        textAlign: "center",
                        fontWeight: 500,
                        letterSpacing: "0.04em",
                      }}
                    >
                      Secure Checkout
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "0.25rem",
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#00d9ff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <span
                      style={{
                        color: "#aaaaaa",
                        fontSize: "0.7rem",
                        textAlign: "center",
                        fontWeight: 500,
                        letterSpacing: "0.04em",
                      }}
                    >
                      Money-back Guarantee
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "0.25rem",
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#00d9ff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="1" y="3" width="15" height="13" rx="1" />
                      <path d="M16 8h4l3 5v3h-7V8z" />
                      <circle cx="5.5" cy="18.5" r="2.5" />
                      <circle cx="18.5" cy="18.5" r="2.5" />
                    </svg>
                    <span
                      style={{
                        color: "#aaaaaa",
                        fontSize: "0.7rem",
                        textAlign: "center",
                        fontWeight: 500,
                        letterSpacing: "0.04em",
                      }}
                    >
                      Fast Delivery
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid rgba(68,68,68,0.1)",
        }}
        className="w-full py-6 text-center"
      >
        <p
          style={{
            color: "#666666",
            fontSize: "0.75rem",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          © 2024 Hydro. Engineered for Vitality.
        </p>
      </footer>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div style={{ background: "#0a0a0a", minHeight: "100vh" }} />}>
      <CheckoutInner />
    </Suspense>
  );
}