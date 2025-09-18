import { useEffect, useState } from "react";
import StarInput from "./StarInput.tsx";

export default function ReviewForm({
  onSubmit,
  onPosted,
}: {
  onSubmit: (rating: number, text: string, user: string) => void;
  onPosted?: () => void;
}) {
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [user, setUser] = useState("You");
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (!ok) return;
    const t = setTimeout(() => setOk(false), 1200);
    return () => clearTimeout(t);
  }, [ok]);

  return (
    <form
      className="form panel"
      onSubmit={(e) => {
        e.preventDefault();
        if (!text.trim()) return;
        onSubmit(rating, text.trim(), user.trim() || "You");
        setText("");
        setOk(true);
        onPosted?.();
      }}
    >
      <div className="field">
        <label>Rating</label>
        <StarInput value={rating} onChange={setRating} />
      </div>

      <div className="field">
        <label>Your name</label>
        <input
          type="text"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          placeholder="You"
        />
      </div>

      <div className="field">
        <label>Review</label>
        <textarea
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Quick thoughts…"
        />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span className={`mini-toast ${ok ? "show" : ""}`}>Posted ✓</span>
        <button
          className="btn primary"
          type="submit"
          style={{ marginLeft: "auto" }}
        >
          Post review
        </button>
      </div>
    </form>
  );
}
