export default function ReviewSkeleton() {
    return (
      <div className="border rounded-2xl p-4 shadow-sm bg-white dark:bg-gray-800 flex items-start space-x-3 animate-pulse relative overflow-hidden">
        {/* Shimmer overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-gray-600/30 to-transparent animate-shimmer" />
  
        {/* Avatar placeholder */}
        <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700 flex-shrink-0"></div>
  
        {/* Text placeholders */}
        <div className="flex-1 space-y-2">
          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
        </div>
      </div>
    );
  }
  