import { useEffect, useState } from "react";

export default function SplashScreen({ onFinish }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onFinish?.();
    }, 1500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-500 to-blue-700 dark:from-gray-800 dark:to-gray-900 flex flex-col items-center justify-center text-white z-50">
      <span className="text-5xl animate-bounce">🎾</span>
      <h1 className="text-2xl font-bold mt-4">Tennis Courts</h1>
      <p className="text-sm mt-2 opacity-80">Loading courts...</p>
    </div>
  );
}
