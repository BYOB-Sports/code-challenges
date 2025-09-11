export default function CourtCardSkeleton() {
  return (
    <div className="block rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden p-3 flex gap-3">
      <div className="skeleton h-16 w-16 rounded-xl"></div>
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="skeleton h-4 w-24 mb-2"></div>
          <div className="skeleton h-3 w-16 mb-2"></div>
          <div className="skeleton h-3 w-32"></div>
        </div>
        <div className="flex gap-2 mt-2">
          <div className="skeleton h-4 w-12 rounded-full"></div>
          <div className="skeleton h-4 w-12 rounded-full"></div>
        </div>
      </div>
      <div className="skeleton h-3 w-10 mt-1"></div>
    </div>
  );
}