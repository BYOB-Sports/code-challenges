type Props = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder = "Search courts or city..." }: Props) {
  return (
    <div className="mt-3">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
      />
    </div>
  )
}
