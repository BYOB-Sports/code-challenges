import { useState } from "react";
import { Send } from "lucide-react";

export default function ReviewForm({ onSubmit }: { onSubmit: (text: string) => void }) {
  const [text, setText] = useState("");

  return (
    <form
      className="fixed bottom-0 inset-x-0 mx-auto max-w-md bg-white/90 dark:bg-gray-900/80 backdrop-blur border-t border-gray-200 dark:border-gray-700 p-3 flex gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        if (!text.trim()) return;
        onSubmit(text);
        setText("");
      }}
    >
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a review..."
        className="flex-1 rounded-full border border-gray-200 dark:border-gray-700 px-4 py-2 text-sm 
                   bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 
                   focus:outline-none focus:ring-2 focus:ring-brand-green"
      />
      <button
        type="submit"
        className="px-4 py-2 rounded-full bg-brand-green hover:bg-brand-green-dark text-white active:scale-95 transition flex items-center justify-center shadow-card"
      >
        <Send className="h-4 w-4" />
      </button>
    </form>
  );
}