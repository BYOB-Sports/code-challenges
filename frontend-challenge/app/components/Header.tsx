"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <header className="flex flex-col">
      <div className="flex justify-between items-center px-6 py-4 max-w-6xl w-full mx-auto">
        <h1
          onClick={() => router.push("/")}
          className="text-2xl font-bold cursor-pointer"
        >
          <img
            src="https://static.wixstatic.com/media/0e971e_abf30d995b7b4d6fa06af31df6bec7ec~mv2.png/v1/fill/w_280,h_120,al_c,lg_1,q_85,enc_auto/0e971e_abf30d995b7b4d6fa06af31df6bec7ec~mv2.png"
            alt="Byob Sports Logo"
            className="h-8 sm:h-14"
          />
        </h1>

        {/* Desktop nav */}
        <nav className="hidden sm:flex gap-6 text-sm font-medium text-gray-700">
          <a href="#courts" className="hover:text-black">Courts</a>
          <a href="#reviews" className="hover:text-black">Reviews</a>
          <a href="#about" className="hover:text-black">About</a>
          <a href="#contact" className="hover:text-black">Contact</a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden p-2 flex flex-col rounded-md"
          onClick={() => setMobileNavOpen(true)}
        >
          <span className="block w-10 h-[1px] bg-black mb-2"></span>
          <span className="block w-10 h-[1px] bg-black mb"></span>
        </button>
      </div>

      {/* Mobile nav overlay */}
      <div
        className={`fixed inset-0 z-50 bg-white flex flex-col transform transition-transform duration-300 ease-in-out ${
          mobileNavOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-6">
          <button
            className="text-2xl font-bold"
            onClick={() => setMobileNavOpen(false)}
          >
            ✕
          </button>
        </div>

        <nav className="flex-1 flex flex-col items-center justify-center gap-8 text-xl font-semibold text-slate-800">
          <a href="#courts" onClick={() => setMobileNavOpen(false)}>Courts</a>
          <a href="#reviews" onClick={() => setMobileNavOpen(false)}>Reviews</a>
          <a href="#about" onClick={() => setMobileNavOpen(false)}>About</a>
          <a href="#contact" onClick={() => setMobileNavOpen(false)}>Contact</a>
          <a href="#pricing" onClick={() => setMobileNavOpen(false)}>Pricing</a>
          <a href="#faq" onClick={() => setMobileNavOpen(false)}>FAQ</a>
        </nav>
      </div>
    </header>
  );
}
