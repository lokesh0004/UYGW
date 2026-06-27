import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import Courses from "@/components/Courses";
import Instructors from "@/components/Instructors";
import Testimonials from "@/components/Testimonials";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-[#FFFCF8] text-stone-900 min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <Categories />
      <Courses />
      <Instructors />
      <Testimonials />
      <CtaSection />
      <Footer />
    </main>
  );
}
