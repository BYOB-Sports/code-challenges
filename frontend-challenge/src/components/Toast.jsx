import { useEffect, useState, useRef } from "react";

export default function Toast({ id, message, type = "success", onClose }) {
  const [progress, setProgress] = useState(100);
  const [exiting, setExiting] = useState(false);

  const timerRef = useRef(null);
  const remainingRef = useRef(2000);
  const lastTimestampRef = useRef(null);

  useEffect(() => {
    if (!message) return;
    startTimer();
    return () => stopTimer();
  }, [message]);

  const startTimer = () => {
    lastTimestampRef.current = Date.now();
    timerRef.current = setInterval(() => {
      const now = Date.now();
      const elapsed = now - lastTimestampRef.current;
      lastTimestampRef.current = now;

      remainingRef.current -= elapsed;
      if (remainingRef.current <= 0) {
        triggerClose();
      } else {
        setProgress((remainingRef.current / 2000) * 100);
      }
    }, 20);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const triggerClose = () => {
    setExiting(true);
    setTimeout(() => onClose(id), 300); // fade out
  };

  if (!message) return null;

  const bgColor =
    type === "success"
      ? "bg-green-600 dark:bg-green-700"
      : type === "error"
      ? "bg-red-600 dark:bg-red-700"
      : "bg-gray-800 dark:bg-gray-700";

  const barColor =
    type === "success"
      ? "bg-green-400"
      : type === "error"
      ? "bg-red-400"
      : "bg-gray-500";

  return (
    <div
      aria-live="polite"
      className={`relative min-w-[220px] text-center ${bgColor} text-white text-sm px-5 py-3 rounded-xl shadow-lg
        transform transition-all duration-300 ease-out
        ${exiting ? "opacity-0 translate-y-3" : "opacity-100 translate-y-0"}
        hover:scale-105`}
      onMouseEnter={stopTimer}
      onMouseLeave={startTimer}
    >
      {message}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-black/20 rounded-b overflow-hidden">
        <div
          className={`${barColor} h-1`}
          style={{ width: `${progress}%`, transition: "width 0.02s linear" }}
        />
      </div>
    </div>
  );
}
