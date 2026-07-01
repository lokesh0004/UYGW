"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { stats } from "@/data";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      // ── Split text char-by-char animation ──
      let split: InstanceType<typeof SplitText> | null = null;
      try {
        split = new SplitText(headingRef.current, { type: "chars,words" });
        gsap.from(split.chars, {
          y: 80,
          opacity: 0,
          rotateX: -90,
          stagger: 0.025,
          duration: 0.8,
          ease: "back.out(2)",
          delay: 0.3,
        });
      } catch {
        // SplitText unavailable on free plan — fallback
        gsap.from(headingRef.current, { y: 60, opacity: 0, duration: 1, ease: "power3.out", delay: 0.3 });
      }

      // ── Rest of hero entrance ──
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-badge", { y: 20, opacity: 0, duration: 0.6, delay: 0.1 })
        .from(".hero-sub", { y: 30, opacity: 0, duration: 0.7 }, "-=0.2")
        .from(".hero-actions", { y: 20, opacity: 0, duration: 0.6 }, "-=0.3")
        .from(".hero-stat", { y: 20, opacity: 0, duration: 0.5, stagger: 0.1 }, "-=0.3")
        .from(".hero-card", { x: 60, opacity: 0, duration: 0.7, stagger: 0.15, ease: "back.out(1.4)" }, "-=0.6")
        .from(".hero-blob", { scale: 0, opacity: 0, duration: 1.2, ease: "elastic.out(1, 0.5)" }, 0);

      // ── Parallax on scroll ──
      gsap.to(".hero-blob", {
        scrollTrigger: { trigger: containerRef.current, start: "top top", end: "bottom top", scrub: 1.5 },
        y: -120, scale: 1.2,
      });
      gsap.to(".hero-content", {
        scrollTrigger: { trigger: containerRef.current, start: "top top", end: "bottom top", scrub: 1 },
        y: 80,
      });
      gsap.to(".hero-cards-col", {
        scrollTrigger: { trigger: containerRef.current, start: "top top", end: "bottom top", scrub: 1.5 },
        y: 40,
      });

      // ── Floating cards continuous ──
      gsap.to(".hero-card:nth-child(1)", { y: -12, duration: 2.8, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(".hero-card:nth-child(2)", { y: -10, duration: 3.4, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.8 });
      gsap.to(".hero-card:nth-child(3)", { y: -8, duration: 2.6, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.4 });

      // ── Progress bar fill ──
      gsap.fromTo(".hero-progress", { width: "0%" }, { width: "63%", duration: 2, ease: "power2.out", delay: 1.5 });

      // ── Magnetic buttons ──
      document.querySelectorAll<HTMLElement>(".btn-magnetic").forEach((btn) => {
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

      // ── Stats counter ──
      document.querySelectorAll<HTMLElement>(".stat-counter").forEach((el) => {
        const end = parseFloat(el.dataset.end || "0");
        const suffix = el.dataset.suffix || "";
        const decimals = parseInt(el.dataset.decimals || "0");
        ScrollTrigger.create({
          trigger: el, start: "top 90%", once: true,
         onEnter: () => {
  const counter = { val: 0 };

  gsap.fromTo(
    counter,
    { val: 0 },
    {
      val: end,
      duration: 2.5,
      ease: "power1.out",
      onUpdate: () => {
        const v = decimals
          ? counter.val.toFixed(decimals)
          : Math.round(counter.val);

        el.textContent = v + suffix;
      },
    }
  );
},
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center px-6 md:px-16 pt-28 pb-20 overflow-hidden bg-[#FFFCF8]">

      {/* Decorative blobs */}
      <div className="hero-blob absolute top-10 right-0 w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, #FF6B35 0%, #FF8C42 40%, transparent 70%)" }} />
      <div className="hero-blob absolute -bottom-20 left-1/3 w-[400px] h-[400px] rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #FFB347 0%, transparent 70%)" }} />

      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: "radial-gradient(circle, #d97706 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)"
        }} />

      {/* Content */}
      <div className="hero-content relative z-10 max-w-2xl">
        <div className="hero-badge inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-1.5 text-orange-600 text-sm font-medium mb-7">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          🎓 50,000+ Students Already Learning
        </div>

        <h1 ref={headingRef} className="font-['Syne'] text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] mb-6 text-stone-900">
          Build Skills.
          <br />
          <span className="text-orange-500">Shape Your</span>
          <br />
          Future.
        </h1>

        <p className="hero-sub text-stone-500 text-lg md:text-xl leading-relaxed mb-10 max-w-lg">
          Learn from India's top industry experts. Build real projects. Land your dream job — faster than you think.
        </p>

        <div className="hero-actions flex gap-4 flex-wrap mb-14">
          <button className="btn-magnetic px-8 py-4 rounded-2xl bg-orange-500 text-white font-semibold text-base shadow-[0_6px_30px_rgba(255,107,53,0.45)] hover:bg-orange-600 transition-colors duration-200">
            Explore Courses →
          </button>
          <button className="btn-magnetic px-8 py-4 rounded-2xl border-2 border-stone-200 text-stone-700 font-semibold text-base hover:border-orange-300 hover:text-orange-600 transition-all duration-200 bg-white">
            ▶ Watch Demo
          </button>
        </div>

        {/* Stats */}
        <div className="flex gap-10 flex-wrap">
          {stats.map((s) => (
            <div key={s.label} className="hero-stat">
              <div
                className="stat-counter font-['Syne'] text-3xl font-extrabold text-stone-900"
                data-end={s.end}
                data-suffix={s.suffix}
                data-decimals={s.decimals ?? 0}
              >
                {s.num}
              </div>
              <div className="text-stone-400 text-sm mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating cards */}
      <div className="hero-cards-col absolute right-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4 z-10">
        {/* Card 1 */}
        <div className="hero-card bg-white border border-orange-100 rounded-2xl px-5 py-4 shadow-[0_8px_30px_rgba(255,107,53,0.1)] min-w-[250px]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-xl">⚛️</div>
            <div>
              <div className="font-['Syne'] text-sm font-bold text-stone-800">React Complete Course</div>
              <div className="text-xs text-stone-400">Module 7/12 • 63% done</div>
            </div>
          </div>
          <div className="h-1.5 rounded-full bg-orange-100 overflow-hidden">
            <div className="hero-progress h-full rounded-full bg-gradient-to-r from-orange-400 to-amber-400" />
          </div>
        </div>

        {/* Card 2 */}
        <div className="hero-card ml-10 bg-white border border-orange-100 rounded-2xl px-5 py-4 shadow-[0_8px_30px_rgba(255,107,53,0.1)] min-w-[250px]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-xl">🎉</div>
            <div>
              <div className="font-['Syne'] text-sm font-bold text-stone-800">Certificate Earned!</div>
              <div className="text-xs text-stone-400">Priya S. completed Python course</div>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="hero-card bg-white border border-orange-100 rounded-2xl px-5 py-4 shadow-[0_8px_30px_rgba(255,107,53,0.1)] min-w-[250px]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-xl">🔥</div>
            <div>
              <div className="font-['Syne'] text-sm font-bold text-stone-800">Trending: UI/UX Design</div>
              <div className="text-xs text-stone-400">342 students enrolled today</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
