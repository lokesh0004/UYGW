"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { categories } from "@/data";

gsap.registerPlugin(ScrollTrigger);

export default function Categories() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Heading slide in
    gsap.from(".cat-heading", {
      scrollTrigger: { trigger: ".cat-heading", start: "top 88%" },
      y: 40, opacity: 0, duration: 0.8, ease: "power3.out",
    });

    // Cards cascade in with slight rotation
    gsap.from(".cat-card", {
      scrollTrigger: { trigger: ".cat-grid", start: "top 85%" },
      y: 50, opacity: 0, rotation: 3, duration: 0.6,
      stagger: { amount: 0.7, from: "start" },
      ease: "back.out(1.4)",
    });

    // Hover tilt effect
    document.querySelectorAll<HTMLElement>(".cat-card").forEach((card) => {
      card.addEventListener("mousemove", (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(card, { rotateX: -y * 10, rotateY: x * 10, transformPerspective: 600, duration: 0.3, ease: "power2.out" });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" });
      });
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="px-6 md:px-16 py-24 bg-white">
      <div className="cat-heading mb-14">
        <span className="block text-xs font-bold tracking-[3px] uppercase text-orange-500 mb-3">
          Browse Categories
        </span>
        <h2 className="font-['Syne'] text-4xl md:text-5xl font-extrabold text-stone-900 mb-3">
          Pick Your Path
        </h2>
        <p className="text-stone-400 text-lg max-w-md">
          From programming to business — every discipline, expertly taught.
        </p>
      </div>

      <div className="cat-grid grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {categories.map((cat) => (
          <div key={cat.name}
            className={`cat-card ${cat.color} border rounded-2xl p-5 text-center cursor-pointer
              transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(255,107,53,0.15)]`}
          >
            <div className="text-3xl mb-2">{cat.emoji}</div>
            <div className="text-sm font-semibold text-stone-800 mb-1">{cat.name}</div>
            <div className="text-xs text-stone-400">{cat.count}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
