import React from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="bg-white rounded p-2 flex items-center gap-2 shadow-sm">
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 p-2 outline-none text-sm"
      />
      <Search className="w-4 h-4 text-gray-400" />
    </div>
  );
}
