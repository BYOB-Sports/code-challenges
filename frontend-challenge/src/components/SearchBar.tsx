import React from 'react'

type Props = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder='Search by name or city' }: Props) {
  return (
    <label className="block mb-3">
      <span className="sr-only">Search</span>
      <input
        type="search"
        inputMode="search"
        className="w-full rounded-2xl bg-slate-900 border border-slate-800 px-4 py-3 text-base placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  )
}
