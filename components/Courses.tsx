"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { courses } from "@/data";
import { Course } from "@/types";

gsap.registerPlugin(ScrollTrigger);

const tabs = ["All", "Trending", "New", "Free"];

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="text-amber-400 text-sm">
      {"★".repeat(rating)}{"☆".repeat(5 - rating)}
    </span>
  );
}

function CourseCard({ course }: { course: Course }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current!.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(cardRef.current, { rotateY: x * 10, rotateX: -y * 10, transformPerspective: 800, duration: 0.4, ease: "power2.out" });
    gsap.to(cardRef.current?.querySelector(".card-shine"), { opacity: 0.15, x: x * 30, y: y * 30, duration: 0.3 });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, { rotateY: 0, rotateX: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
    gsap.to(cardRef.current?.querySelector(".card-shine"), { opacity: 0, duration: 0.3 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="course-card relative bg-white border border-stone-100 rounded-3xl overflow-hidden cursor-pointer
        transition-shadow duration-300 hover:shadow-[0_20px_60px_rgba(255,107,53,0.15)]"
    >
      {/* Shine overlay */}
      <div className="card-shine absolute inset-0 z-10 pointer-events-none opacity-0 rounded-3xl"
        style={{ background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.8) 0%, transparent 60%)" }} />

      {/* Thumbnail */}
      <div className={`h-48 bg-gradient-to-br ${course.thumbGradient} flex items-center justify-center text-5xl relative`}>
        {course.emoji}
        {course.badge && (
          <span className={`absolute top-3 left-3 ${course.badgeColor} rounded-lg px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider`}>
            {course.badge}
          </span>
        )}
      </div>

      <div className="p-5">
        {/* Instructor */}
        <div className="flex items-center gap-2 mb-2.5">
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
            style={{ background: course.instructorColor }}>
            {course.instructorInitials}
          </div>
          <span className="text-stone-400 text-xs font-medium">{course.instructor}</span>
          <span className="ml-auto text-[10px] text-orange-500 font-semibold bg-orange-50 px-2 py-0.5 rounded-full">{course.category}</span>
        </div>

        <h3 className="font-['Syne'] text-base font-bold text-stone-900 leading-snug mb-3">{course.title}</h3>

        <div className="flex gap-4 flex-wrap mb-4 text-stone-400 text-xs">
          <span>⏱ {course.hours}h</span>
          <span>📚 {course.lessons} lessons</span>
          {course.hasCertificate && <span>🏆 Certificate</span>}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-stone-100">
          {course.price === "FREE" ? (
            <span className="font-['Syne'] text-xl font-extrabold text-emerald-500">FREE</span>
          ) : (
            <div>
              <span className="font-['Syne'] text-xl font-extrabold text-stone-900">₹{course.price}</span>
              {course.originalPrice && (
                <span className="text-sm text-stone-300 line-through ml-2">₹{course.originalPrice}</span>
              )}
            </div>
          )}
          <div className="flex items-center gap-1">
            <StarRating rating={course.rating} />
            <span className="text-stone-400 text-xs">({course.ratingCount.toLocaleString()})</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Courses() {
  const [activeTab, setActiveTab] = useState("All");
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".courses-heading", {
      scrollTrigger: { trigger: ".courses-heading", start: "top 88%" },
      y: 40, opacity: 0, duration: 0.8, ease: "power3.out",
    });
    gsap.from(".course-card", {
      scrollTrigger: { trigger: ".courses-grid", start: "top 85%" },
      y: 60, opacity: 0, duration: 0.7, stagger: 0.1, ease: "power3.out",
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="px-6 md:px-16 py-24 bg-[#FFFCF8]">
      <div className="courses-heading flex justify-between items-end flex-wrap gap-5 mb-12">
        <div>
          <span className="block text-xs font-bold tracking-[3px] uppercase text-orange-500 mb-3">Courses</span>
          <h2 className="font-['Syne'] text-4xl md:text-5xl font-extrabold text-stone-900">Best Sellers</h2>
        </div>
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200
                ${activeTab === tab
                  ? "bg-orange-500 text-white shadow-[0_4px_14px_rgba(255,107,53,0.4)]"
                  : "bg-white border border-stone-200 text-stone-500 hover:border-orange-300 hover:text-orange-500"
                }`}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="courses-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => <CourseCard key={course.id} course={course} />)}
      </div>
    </section>
  );
}
