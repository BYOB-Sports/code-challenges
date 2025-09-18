import Nav from "./components/nav";
import Hero from "./components/hero";
import Features from "./components/Features";
import ScrollingCompanies from "./components/ScrollingUsers";
import Testimonials from "./components/Testimonials";
import AIFeatures from "./components/AIFeatures";
import Footer from "./components/Footer";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-6xl px-1 py-8">
        <Hero />
        <Features />
        <div className="mt-10">
          <ScrollingCompanies />
        </div>
        <Testimonials />
        <AIFeatures />
        
        {/* Tennis Courts App Section */}
        <section className="mt-16 bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Tennis Court Reviews</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Discover and review tennis courts in your area. Find the perfect court for your next match with detailed reviews, photos, and amenities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/courts"
                className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                Browse Courts
              </Link>
              <Link 
                href="/courts"
                className="border border-green-600 text-green-600 px-8 py-3 rounded-lg hover:bg-green-50 transition-colors font-semibold"
              >
                Find Courts Near Me
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
