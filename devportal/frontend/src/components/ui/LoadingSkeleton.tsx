export function LoadingSkeleton({ lines = 3, className = '' }: { lines?: number; className?: string }) {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded"
          style={{
            width: `${85 - i * 10}%`,
            animation: `pulse-skeleton 1.5s ease-in-out infinite`,
            animationDelay: `${i * 150}ms`,
          }}
        />
      ))}
    </div>
  );
}

export function CardSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 rounded-xl p-5">
          <LoadingSkeleton lines={3} />
        </div>
      ))}
    </div>
  );
}
