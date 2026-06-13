export function LoadingSkeleton({ lines = 3, className = '' }: { lines?: number; className?: string }) {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 bg-slate-700/50 rounded"
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
        <div key={i} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5">
          <LoadingSkeleton lines={3} />
        </div>
      ))}
    </div>
  );
}
