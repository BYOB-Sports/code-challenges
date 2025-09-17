import { Court } from "@/lib/types";
import Link from "next/link";
import React from "react";

export default function CourtCard({ court }: { court: Court }) {
  const photo = court.photos && court.photos.length > 0 ? court.photos[0] : null;

  return (
    <Link href={`/court/${court.id}`} className="block group">
      <article className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-transform duration-300 transform group-hover:-translate-y-1">
        {photo && (
          <div className="relative w-full h-48 sm:h-48 md:h-56 overflow-hidden">
            <img
              src={photo}
              alt={court.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/70 transition-colors duration-300" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-white text-sm font-medium bg-black/20 px-3 py-1 rounded-full">
                View Court
              </span>
            </div>
          </div>
        )}

        <div className="p-4 flex justify-between items-start">
          <div>
            <h3 className="text-xl ">{court.name}</h3>

            {/* Address hidden by default, shows on hover */}
            <p className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {court.address} · {court.city} | {court.surface}
            </p>
          </div>

          <div className="text-sm text-slate-700 text-right">
            <div className="font-medium">{court.rating.toFixed(1)}</div>
          </div>
        </div>
      </article>
    </Link>
  );
}
