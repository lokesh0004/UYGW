"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { instructors } from "@/data";

gsap.registerPlugin(ScrollTrigger);

export default function Instructors() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".instr-heading", {
      scrollTrigger: { trigger: ".instr-heading", start: "top 88%" },
      y: 40, opacity: 0, duration: 0.8, ease: "power3.out",
    });
    gsap.from(".instr-card", {
      scrollTrigger: { trigger: ".instr-grid", start: "top 85%" },
      scale: 0.88, y: 30, opacity: 0, duration: 0.6,
      stagger: 0.12, ease: "back.out(1.6)",
    });

    // Hover: lift + glow
    document.querySelectorAll<HTMLElement>(".instr-card").forEach((card) => {
      card.addEventListener("mouseenter", () => {
        gsap.to(card, { y: -8, boxShadow: "0 20px 50px rgba(255,107,53,0.18)", duration: 0.35, ease: "power2.out" });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(card, { y: 0, boxShadow: "0 2px 10px rgba(0,0,0,0.04)", duration: 0.5, ease: "elastic.out(1, 0.5)" });
      });
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="px-6 md:px-16 py-24 bg-white">
      <div className="instr-heading mb-14">
        <span className="block text-xs font-bold tracking-[3px] uppercase text-orange-500 mb-3">Instructors</span>
        <h2 className="font-['Syne'] text-4xl md:text-5xl font-extrabold text-stone-900 mb-3">
          Learn From the Best
        </h2>
        <p className="text-stone-400 text-lg max-w-md">
          Top professionals from India's leading tech companies and institutions.
        </p>
      </div>

      <div className="instr-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {instructors.map((instr) => (
          <div key={instr.name}
            className="instr-card bg-white border border-stone-100 rounded-3xl p-7 text-center cursor-pointer shadow-[0_2px_10px_rgba(0,0,0,0.04)]"
          >
            <div className={`w-18 h-18 rounded-full mx-auto mb-4 bg-gradient-to-br ${instr.gradient}
              flex items-center justify-center text-2xl font-extrabold text-white`}
              style={{ width: 76, height: 76 }}>
              {instr.initials}
            </div>
            <div className="font-['Syne'] text-lg font-bold text-stone-900 mb-0.5">{instr.name}</div>
            <div className="text-orange-500 text-xs font-semibold mb-0.5">{instr.role}</div>
            <div className="text-stone-400 text-xs mb-5">{instr.company}</div>
            <div className="flex justify-center gap-5 pt-4 border-t border-stone-100">
              <div>
                <div className="font-['Syne'] text-base font-bold text-stone-900">{instr.students}</div>
                <div className="text-stone-400 text-[11px]">Students</div>
              </div>
              <div>
                <div className="font-['Syne'] text-base font-bold text-stone-900">{instr.courses}</div>
                <div className="text-stone-400 text-[11px]">Courses</div>
              </div>
              <div>
                <div className="font-['Syne'] text-base font-bold text-stone-900">{instr.rating}★</div>
                <div className="text-stone-400 text-[11px]">Rating</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
