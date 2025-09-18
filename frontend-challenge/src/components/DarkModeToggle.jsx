import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [dark, setDark] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="fixed top-4 right-4 z-50 p-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg hover:scale-110 active:scale-95 transition"
    >
      {dark ? "🌙" : "☀️"}
    </button>
  );
}
