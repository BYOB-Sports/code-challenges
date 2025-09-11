import { Search } from "lucide-react";

export default function SearchBar({
  value, onChange, placeholder = "Search courts or locations..."
}: { value: string; onChange: (s: string) => void; placeholder?: string }) {
  return (
    <div className="mt-3 relative">
      <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search courts"
        className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 bg-white
                   focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
}