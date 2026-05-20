"use client";

import React from "react";

function InstagramIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

function NewsletterForm() {
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
      aria-label="Newsletter subscription form"
    >
      {submitted ? (
        <p
          style={{
            color: "#00d9ff",
            fontFamily: "Inter, sans-serif",
            fontSize: "0.9375rem",
            fontWeight: 500,
          }}
        >
          Thanks for subscribing! 🎉
        </p>
      ) : (
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            required
            aria-label="Email address for newsletter"
            style={{
              flex: "1 1 160px",
              minWidth: "0",
              padding: "0.625rem 1rem",
              borderRadius: "9999px",
              border: "1.5px solid rgba(0,217,255,0.25)",
              backgroundColor: "rgba(255,255,255,0.05)",
              color: "#dde4e6",
              fontFamily: "Inter, sans-serif",
              fontSize: "0.9375rem",
              outline: "none",
              transition: "border-color 0.2s cubic-bezier(0.4,0,0.2,1), box-shadow 0.2s cubic-bezier(0.4,0,0.2,1)",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#00d9ff";
              e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,217,255,0.12)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "rgba(0,217,255,0.25)";
              e.currentTarget.style.boxShadow = "none";
            }}
          />
          <button
            type="submit"
            style={{
              padding: "0.625rem 1.25rem",
              borderRadius: "9999px",
              backgroundColor: "#00d9ff",
              color: "#0e1417",
              fontFamily: "Inter, sans-serif",
              fontSize: "0.9375rem",
              fontWeight: 700,
              border: "none",
              cursor: "pointer",
              transition:
                "transform 0.15s cubic-bezier(0.4,0,0.2,1), box-shadow 0.15s cubic-bezier(0.4,0,0.2,1), background-color 0.15s cubic-bezier(0.4,0,0.2,1)",
              boxShadow: "0 0 12px rgba(0,217,255,0.2)",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.02)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 0 24px rgba(0,217,255,0.4)";
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#afecff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 0 12px rgba(0,217,255,0.2)";
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#00d9ff";
            }}
            onMouseDown={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.98)";
            }}
            onMouseUp={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.02)";
            }}
          >
            Subscribe
          </button>
        </div>
      )}
    </form>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const linkStyle: React.CSSProperties = {
    color: "#bbc9ce",
    fontFamily: "Inter, sans-serif",
    fontSize: "0.9375rem",
    fontWeight: 400,
    textDecoration: "none",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
    textAlign: "left",
    transition: "color 0.2s cubic-bezier(0.4,0,0.2,1)",
  };

  const headingStyle: React.CSSProperties = {
    color: "#dde4e6",
    fontFamily: "Inter, sans-serif",
    fontSize: "0.75rem",
    fontWeight: 600,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    marginBottom: "1rem",
  };

  return (
    <footer
      style={{
        backgroundColor: "#111819",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        fontFamily: "Inter, sans-serif",
        width: "100%",
      }}
    >
      {/* Main Footer Grid */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "4rem 1.5rem 2rem",
        }}
      >
        {/* Brand Row */}
        <div
          style={{
            marginBottom: "3rem",
            paddingBottom: "2rem",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
          }}
        >
          <span
            style={{
              color: "#dde4e6",
              fontFamily: "Inter, sans-serif",
              fontSize: "1.75rem",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            Hydro
          </span>
          <p
            style={{
              color: "#bbc9ce",
              fontSize: "1rem",
              lineHeight: "1.6",
              maxWidth: "380px",
              margin: 0,
            }}
          >
            Engineered for clarity. Designed for every day. Stay hydrated in style with Hydro — BPA-free, ergonomic bottles built for life on the move.
          </p>
        </div>

        {/* Links & Newsletter Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "2.5rem",
            marginBottom: "3rem",
          }}
        >
          {/* Quick Links */}
          <div>
            <p style={headingStyle}>Quick Links</p>
            <nav
              aria-label="Footer navigation"
              style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
            >
              <a
                href="/"
                style={linkStyle}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#00d9ff";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#bbc9ce";
                }}
              >
                Home
              </a>
              <a
                href="/shop"
                style={linkStyle}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#00d9ff";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#bbc9ce";
                }}
              >
                Shop
              </a>
              <a
                href="/science"
                style={linkStyle}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#00d9ff";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#bbc9ce";
                }}
              >
                Science
              </a>
              <a
                href="/about"
                style={linkStyle}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#00d9ff";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#bbc9ce";
                }}
              >
                About
              </a>
              <a
                href="/contact"
                style={linkStyle}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#00d9ff";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#bbc9ce";
                }}
              >
                Contact
              </a>
            </nav>
          </div>

          {/* Support */}
          <div>
            <p style={headingStyle}>Support</p>
            <nav
              aria-label="Support links"
              style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
            >
              <a
                href="/faq"
                style={linkStyle}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#00d9ff";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#bbc9ce";
                }}
              >
                FAQ
              </a>
              <a
                href="/shipping"
                style={linkStyle}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#00d9ff";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#bbc9ce";
                }}
              >
                Shipping & Returns
              </a>
              <a
                href="/warranty"
                style={linkStyle}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#00d9ff";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#bbc9ce";
                }}
              >
                Warranty
              </a>
              <a
                href="/privacy"
                style={linkStyle}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#00d9ff";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#bbc9ce";
                }}
              >
                Privacy Policy
              </a>
            </nav>
          </div>

          {/* Newsletter */}
          <div style={{ gridColumn: "span 2" }}>
            <p style={headingStyle}>Stay Hydrated</p>
            <p
              style={{
                color: "#bbc9ce",
                fontSize: "0.9375rem",
                marginBottom: "1rem",
                lineHeight: 1.5,
              }}
            >
              Get hydration tips, new arrivals, and exclusive offers delivered to your inbox.
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: "1.5rem",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          {/* Copyright */}
          <p
            style={{
              color: "#bbc9ce",
              fontSize: "0.875rem",
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            © {currentYear} Hydro. All rights reserved. Made with care in India.
          </p>

          {/* Social Links */}
          <div
            style={{ display: "flex", alignItems: "center", gap: "1rem" }}
            aria-label="Social media links"
          >
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Hydro on Instagram"
              style={{
                color: "#bbc9ce",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0.5rem",
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.1)",
                transition:
                  "color 0.2s cubic-bezier(0.4,0,0.2,1), border-color 0.2s cubic-bezier(0.4,0,0.2,1), box-shadow 0.2s cubic-bezier(0.4,0,0.2,1), transform 0.15s cubic-bezier(0.4,0,0.2,1)",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = "#00d9ff";
                el.style.borderColor = "rgba(0,217,255,0.4)";
                el.style.boxShadow = "0 0 12px rgba(0,217,255,0.2)";
                el.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = "#bbc9ce";
                el.style.borderColor = "rgba(255,255,255,0.1)";
                el.style.boxShadow = "none";
                el.style.transform = "scale(1)";
              }}
            >
              <InstagramIcon />
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Hydro on Twitter / X"
              style={{
                color: "#bbc9ce",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0.5rem",
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.1)",
                transition:
                  "color 0.2s cubic-bezier(0.4,0,0.2,1), border-color 0.2s cubic-bezier(0.4,0,0.2,1), box-shadow 0.2s cubic-bezier(0.4,0,0.2,1), transform 0.15s cubic-bezier(0.4,0,0.2,1)",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = "#00d9ff";
                el.style.borderColor = "rgba(0,217,255,0.4)";
                el.style.boxShadow = "0 0 12px rgba(0,217,255,0.2)";
                el.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = "#bbc9ce";
                el.style.borderColor = "rgba(255,255,255,0.1)";
                el.style.boxShadow = "none";
                el.style.transform = "scale(1)";
              }}
            >
              <TwitterIcon />
            </a>

            <a
              href="https://wa.me"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact Hydro on WhatsApp"
              style={{
                color: "#bbc9ce",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0.5rem",
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.1)",
                transition:
                  "color 0.2s cubic-bezier(0.4,0,0.2,1), border-color 0.2s cubic-bezier(0.4,0,0.2,1), box-shadow 0.2s cubic-bezier(0.4,0,0.2,1), transform 0.15s cubic-bezier(0.4,0,0.2,1)",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = "#00d9ff";
                el.style.borderColor = "rgba(0,217,255,0.4)";
                el.style.boxShadow = "0 0 12px rgba(0,217,255,0.2)";
                el.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = "#bbc9ce";
                el.style.borderColor = "rgba(255,255,255,0.1)";
                el.style.boxShadow = "none";
                el.style.transform = "scale(1)";
              }}
            >
              <WhatsAppIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}