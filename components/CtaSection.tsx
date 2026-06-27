"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
    });
    tl.from(".cta-bg-circle", { scale: 0, opacity: 0, duration: 1.2, ease: "elastic.out(1, 0.5)" })
      .from(".cta-label", { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" }, "-=0.6")
      .from(".cta-title", { y: 30, opacity: 0, duration: 0.7, ease: "power3.out" }, "-=0.4")
      .from(".cta-sub", { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" }, "-=0.4")
      .from(".cta-btns", { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" }, "-=0.3");

    // Magnetic buttons
    document.querySelectorAll<HTMLElement>(".cta-btn").forEach((btn) => {
      btn.addEventListener("mousemove", (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.4, ease: "power2.out" });
      });
      btn.addEventListener("mouseleave", () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
      });
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative px-6 md:px-16 py-28 text-center overflow-hidden bg-white">
      {/* Big orange circle bg */}
      <div className="cta-bg-circle absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,107,53,0.10) 0%, rgba(255,140,66,0.05) 40%, transparent 70%)" }} />

      <div className="relative z-10">
        <span className="cta-label block text-xs font-bold tracking-[3px] uppercase text-orange-500 mb-4">
          Get Started Today
        </span>
        <h2 className="cta-title font-['Syne'] text-4xl md:text-6xl font-extrabold text-stone-900 mb-5 leading-tight">
          Your Next Chapter<br />Starts Here 🚀
        </h2>
        <p className="cta-sub text-stone-400 text-lg mb-12 max-w-lg mx-auto leading-relaxed">
          Join over 1 lakh students already building their dream careers on CourseHub.
        </p>
        <div className="cta-btns flex gap-4 justify-center flex-wrap">
          <button className="cta-btn px-10 py-4 rounded-2xl bg-orange-500 text-white font-bold text-base
            shadow-[0_6px_30px_rgba(255,107,53,0.45)] hover:bg-orange-600 transition-colors duration-200">
            Join for Free
          </button>
          <button className="cta-btn px-10 py-4 rounded-2xl border-2 border-stone-200 text-stone-700 font-bold
            text-base hover:border-orange-400 hover:text-orange-600 transition-all duration-200 bg-white">
            Browse All Courses
          </button>
        </div>
      </div>
    </section>
  );
}
