import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <p className="text-sm leading-relaxed">
              Find the best basketball and tennis courts near you. Read reviews,
              share your experience, and connect with other players.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-white transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="/courts" className="hover:text-white transition">
                  Courts
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-white transition">
                  Reviews
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/faq" className="hover:text-white transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Stay Updated</h3>
            <form className="flex flex-col  gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-md text-white border border-gray-500 w-full sm:flex-1"
              />
              <button className="px-4 py-2 bg-white text-black rounded-md font-medium hover:bg-gray-200 transition">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-700 pt-6 flex flex-col sm:flex-row items-center justify-between text-sm">
          <p>© {new Date().getFullYear()} Byob Sports. All rights reserved.</p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <Link
              href="https://twitter.com"
              target="_blank"
              className="hover:text-white"
            >
              Twitter
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              className="hover:text-white"
            >
              Instagram
            </Link>
            <Link
              href="https://youtube.com"
              target="_blank"
              className="hover:text-white"
            >
              YouTube
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
