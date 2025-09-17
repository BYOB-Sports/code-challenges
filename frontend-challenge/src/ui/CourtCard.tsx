import { MapPin, Star } from "lucide-react"
import { Court } from "../types"

export default function CourtCard({ court, onSelect }: { court: Court, onSelect?: ()=>void }) {
  return (
    <div
      onClick={onSelect}
      className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer hover:scale-[1.01] transition"
    >
      <div className="relative">
        <img
          src={court.image}
          className="w-full h-40 object-cover"
          alt={court.name}
        />
        <span className="absolute top-3 right-3 bg-white/90 text-sm font-medium px-2 py-1 rounded-full flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-500" /> {court.rating}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-base text-slate-800">{court.name}</h3>
        <div className="flex items-center text-sm text-slate-500 mt-1">
          <MapPin className="w-4 h-4 mr-1" /> {court.location}
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {court.tags.slice(0, 3).map((t) => (
            <span
              key={t}
              className="px-3 py-1 text-xs rounded-full bg-blue-50 text-blue-600 font-medium"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
