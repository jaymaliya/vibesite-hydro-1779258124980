"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "./CartContext";

export default function Navbar() {
  const router = useRouter();
  const { totalItems } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [badgeAnimate, setBadgeAnimate] = useState(false);
  const prevTotal = useRef(totalItems);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (totalItems !== prevTotal.current) {
      setBadgeAnimate(true);
      const t = setTimeout(() => setBadgeAnimate(false), 400);
      prevTotal.current = totalItems;
      return () => clearTimeout(t);
    }
  }, [totalItems]);

  const navLinkStyle: React.CSSProperties = {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "0.9375rem",
    fontWeight: 500,
    letterSpacing: "0.04em",
    fontFamily: "Inter, sans-serif",
    color: "#bbc9ce",
    padding: "0",
    transition: "color 0.2s cubic-bezier(0.4, 0, 0.2, 1), filter 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    lineHeight: 1.5,
  };

  const activeNavLinkStyle: React.CSSProperties = {
    ...navLinkStyle,
    color: "#00d9ff",
    fontWeight: 700,
    borderBottom: "2px solid #00d9ff",
    paddingBottom: "2px",
  };

  const mobileNavLinkStyle: React.CSSProperties = {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "1.125rem",
    fontWeight: 500,
    letterSpacing: "0.04em",
    fontFamily: "Inter, sans-serif",
    color: "#bbc9ce",
    padding: "0.75rem 0",
    textAlign: "left",
    width: "100%",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    transition: "color 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: "rgba(26, 33, 35, 0.82)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        boxShadow: scrolled
          ? "0 4px 32px rgba(0,0,0,0.45), 0 1px 0 rgba(0,217,255,0.06)"
          : "none",
        transition: "box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 1.5rem",
          height: "80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <button
          onClick={() => router.push("/")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            fontFamily: "Inter, sans-serif",
            fontSize: "1.5rem",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "#dde4e6",
            lineHeight: 1,
          }}
          aria-label="Hydro — go to homepage"
        >
          Hydro
        </button>

        {/* Desktop Nav Links */}
        <nav
          aria-label="Main navigation"
          style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}
          className="hidden md:flex"
        >
          <button
            onClick={() => router.push("/shop")}
            style={activeNavLinkStyle}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "#afecff";
              (e.currentTarget as HTMLButtonElement).style.filter =
                "drop-shadow(0 0 10px rgba(0,217,255,0.35))";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "#00d9ff";
              (e.currentTarget as HTMLButtonElement).style.filter = "none";
            }}
          >
            Shop
          </button>
          <button
            onClick={() => router.push("/science")}
            style={navLinkStyle}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "#afecff";
              (e.currentTarget as HTMLButtonElement).style.filter =
                "drop-shadow(0 0 10px rgba(0,217,255,0.35))";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "#bbc9ce";
              (e.currentTarget as HTMLButtonElement).style.filter = "none";
            }}
          >
            Science
          </button>
          <button
            onClick={() => router.push("/about")}
            style={navLinkStyle}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "#afecff";
              (e.currentTarget as HTMLButtonElement).style.filter =
                "drop-shadow(0 0 10px rgba(0,217,255,0.35))";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "#bbc9ce";
              (e.currentTarget as HTMLButtonElement).style.filter = "none";
            }}
          >
            About
          </button>
        </nav>

        {/* Right side: Cart + Hamburger */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {/* Cart Button */}
          <button
            onClick={() => router.push("/cart")}
            aria-label={`Shopping cart — ${totalItems} item${totalItems !== 1 ? "s" : ""}`}
            style={{
              position: "relative",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#00d9ff",
              padding: "0.5rem",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "color 0.2s cubic-bezier(0.4, 0, 0.2, 1), transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "#afecff";
              (e.currentTarget as HTMLButtonElement).style.filter =
                "drop-shadow(0 0 12px rgba(0,217,255,0.4))";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "#00d9ff";
              (e.currentTarget as HTMLButtonElement).style.filter = "none";
            }}
            onMouseDown={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.92)";
            }}
            onMouseUp={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
            }}
          >
            {/* Cart SVG Icon */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>

            {/* Badge */}
            {totalItems > 0 && (
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: "2px",
                  right: "2px",
                  backgroundColor: "#ff4d6d",
                  color: "#ffffff",
                  borderRadius: "50%",
                  width: "18px",
                  height: "18px",
                  fontSize: "0.625rem",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  lineHeight: 1,
                  fontFamily: "Inter, sans-serif",
                  transform: badgeAnimate ? "scale(1.4)" : "scale(1)",
                  transition: "transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                  border: "2px solid rgba(26, 33, 35, 0.9)",
                }}
              >
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </button>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Close mobile menu" : "Open mobile menu"}
            aria-expanded={mobileOpen}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#dde4e6",
              padding: "0.5rem",
              borderRadius: "0.5rem",
              fontSize: "1.5rem",
              lineHeight: 1,
              transition: "color 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu Slide-Down */}
      <div
        aria-hidden={!mobileOpen}
        style={{
          overflow: "hidden",
          maxHeight: mobileOpen ? "320px" : "0px",
          transition: "max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
          backgroundColor: "rgba(26, 33, 35, 0.97)",
          borderTop: mobileOpen ? "1px solid rgba(255,255,255,0.07)" : "none",
        }}
        className="md:hidden"
      >
        <nav
          aria-label="Mobile navigation"
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "0 1.5rem 1rem",
          }}
        >
          <button
            onClick={() => {
              router.push("/shop");
              setMobileOpen(false);
            }}
            style={{ ...mobileNavLinkStyle, color: "#00d9ff", fontWeight: 700 }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "#afecff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "#00d9ff";
            }}
          >
            Shop
          </button>
          <button
            onClick={() => {
              router.push("/science");
              setMobileOpen(false);
            }}
            style={mobileNavLinkStyle}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "#afecff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "#bbc9ce";
            }}
          >
            Science
          </button>
          <button
            onClick={() => {
              router.push("/about");
              setMobileOpen(false);
            }}
            style={mobileNavLinkStyle}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "#afecff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "#bbc9ce";
            }}
          >
            About
          </button>
          <button
            onClick={() => {
              router.push("/cart");
              setMobileOpen(false);
            }}
            style={{ ...mobileNavLinkStyle, borderBottom: "none" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "#afecff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "#bbc9ce";
            }}
          >
            Cart{totalItems > 0 ? ` (${totalItems})` : ""}
          </button>
        </nav>
      </div>
    </header>
  );
}