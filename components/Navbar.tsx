"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const navLinks = ["Courses", "Instructors", "Pricing", "Blog"];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // gsap.set pehle invisible + upar set karta hai (no flash)
    gsap.set(navRef.current, { autoAlpha: 0, y: -80 });
    // phir animate karo visible position pe
    gsap.to(navRef.current, {
      autoAlpha: 1,
      y: 0,
      duration: 1,
      ease: "power4.out",
      delay: 0.1,
    });

    // Scroll-based shadow
    const onScroll = () => {
      if (!navRef.current) return;
      if (window.scrollY > 20) {
        navRef.current.style.boxShadow = "0 2px 40px rgba(255,107,53,0.08)";
        navRef.current.style.background = "rgba(255,252,248,0.96)";
      } else {
        navRef.current.style.boxShadow = "none";
        navRef.current.style.background = "rgba(255,252,248,0.85)";
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 w-full z-50 flex items-center justify-between px-6 md:px-16 py-4
        backdrop-blur-xl border-b border-orange-100 transition-all duration-300"
      style={{ background: "rgba(255,252,248,0.85)", visibility: "hidden" }}
    >
      {/* Logo */}
      <div className="font-['Syne'] text-2xl font-extrabold text-stone-900">
        Course<span className="text-orange-500">Hub</span>
      </div>

      {/* Links */}
      <ul className="hidden md:flex gap-10 list-none">
        {navLinks.map((link) => (
          <li key={link}>
            <a href="#" className="text-stone-500 text-sm font-medium hover:text-orange-500 transition-colors duration-200">
              {link}
            </a>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="flex gap-3">
        <button className="px-5 py-2 rounded-xl border border-stone-200 text-stone-700 text-sm font-medium hover:border-orange-300 hover:text-orange-600 transition-all duration-200 bg-white">
          Log In
        </button>
        <button className="px-5 py-2 rounded-xl bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 transition-all duration-200 shadow-[0_4px_14px_rgba(255,107,53,0.4)]">
          Start Free →
        </button>
      </div>
    </nav>
  );
}
