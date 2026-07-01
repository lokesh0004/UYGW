"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const footerLinks = {
  Platform: ["Courses", "Instructors", "Pricing", "Blog"],
  Company: ["About Us", "Careers", "Press", "Contact"],
  Support: ["Help Center", "Privacy Policy", "Terms of Service", "Refund Policy"],
};

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".footer-col", {
      scrollTrigger: { trigger: footerRef.current, start: "top 90%" },
      y: 30, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power2.out",
    });
  }, { scope: footerRef });

  return (
    <footer ref={footerRef} className="bg-stone-50 border-t border-stone-100 px-6 md:px-16 pt-16 pb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        {/* Brand */}
        <div className="footer-col">
          <div className="font-['Syne'] text-2xl font-extrabold text-stone-900 mb-3">
            Course<span className="text-orange-500">Hub</span>
          </div>
          <p className="text-stone-400 text-sm leading-relaxed">
            India's #1 online learning platform — expert instructors, lifetime access, and real results.
          </p>
          <div className="flex gap-3 mt-5">
            {["𝕏", "in", "▶", "📷"].map((icon) => (
              <button key={icon}
                className="w-9 h-9 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-sm
                  text-stone-500 hover:border-orange-300 hover:text-orange-500 transition-all duration-200">
                {icon}
              </button>
            ))}
          </div>
        </div>

        {Object.entries(footerLinks).map(([heading, links]) => (
          <div key={heading} className="footer-col">
            <h4 className="font-['Syne'] text-sm font-bold text-stone-900 mb-5">{heading}</h4>
            <ul className="flex flex-col gap-3">
              {links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-stone-400 text-sm hover:text-orange-500 transition-colors duration-200">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-stone-100 pt-6 flex flex-wrap justify-between items-center gap-3">
        <p className="text-stone-400 text-xs">© 2026 CourseHub. All rights reserved.</p>
        <p className="text-stone-400 text-xs">Made with ❤️ in India 🇮🇳</p>
      </div>
    </footer>
  );
}
