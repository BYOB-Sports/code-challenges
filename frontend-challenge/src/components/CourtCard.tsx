import RatingStars from './RatingStars'

type Court = {
  id: number;
  name: string;
  location: string;
  rating: number;
  reviews: { user: string; comment: string; rating: number }[];
  image?: string;
}

export default function CourtCard({ court }: { court: Court }) {
  return (
    <article className="rounded-2xl border bg-white p-3 shadow-sm active:scale-[0.995] transition">
      <div className="h-36 w-full rounded-xl bg-neutral-200 overflow-hidden">
        {court.image ? (
          <img src={court.image} alt={court.name} className="h-full w-full object-cover" loading="lazy" />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-primary/20 to-accent/20" />
        )}
      </div>
      <div className="mt-3">
        <h3 className="font-semibold text-[15px]">{court.name}</h3>
        <p className="text-xs text-neutral-600">{court.location}</p>
        <div className="mt-1 text-xs text-neutral-700 flex items-center gap-2">
          <RatingStars value={court.rating} /> <span>{court.rating.toFixed(1)}</span>
          <span className="text-neutral-400">·</span>
          <span>{court.reviews.length} reviews</span>
        </div>
      </div>
    </article>
  )
}
