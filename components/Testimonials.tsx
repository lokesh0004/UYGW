"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { testimonials } from "@/data";

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".testi-heading", {
      scrollTrigger: { trigger: ".testi-heading", start: "top 88%" },
      y: 40, opacity: 0, duration: 0.8, ease: "power3.out",
    });
    gsap.from(".testi-card", {
      scrollTrigger: { trigger: ".testi-grid", start: "top 85%" },
      y: 50, opacity: 0, duration: 0.7,
      stagger: 0.15, ease: "power3.out",
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="px-6 md:px-16 py-24 bg-orange-50">
      <div className="testi-heading mb-14">
        <span className="block text-xs font-bold tracking-[3px] uppercase text-orange-500 mb-3">Testimonials</span>
        <h2 className="font-['Syne'] text-4xl md:text-5xl font-extrabold text-stone-900 mb-3">
          Real Results,<br />Real Students
        </h2>
        <p className="text-stone-400 text-lg max-w-md">
          Don't take our word for it — hear from students who transformed their careers.
        </p>
      </div>

      <div className="testi-grid grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div key={t.name}
            className="testi-card bg-white border border-orange-100 rounded-3xl p-7
              shadow-[0_4px_20px_rgba(255,107,53,0.07)] hover:shadow-[0_8px_40px_rgba(255,107,53,0.14)]
              transition-shadow duration-300"
          >
            <div className="text-amber-400 text-lg mb-4">
              {"★".repeat(t.rating)}{"☆".repeat(5 - t.rating)}
            </div>
            <p className="text-stone-600 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
            <div className="flex items-center gap-3">
              <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${t.avatarGradient} flex items-center justify-center font-bold text-white`}>
                {t.initial}
              </div>
              <div>
                <div className="font-['Syne'] font-bold text-stone-900 text-sm">{t.name}</div>
                <div className="text-stone-400 text-xs">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
