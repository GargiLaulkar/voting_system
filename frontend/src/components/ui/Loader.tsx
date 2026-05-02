export function InlineLoader({ label = 'Loading' }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-civic-accent border-t-transparent" aria-hidden="true" />
      {label}
    </span>
  );
}

export function SkeletonGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" aria-label="Loading elections">
      {Array.from({ length: 3 }, (_, index) => (
        <div key={index} className="h-72 animate-pulse rounded-xl bg-white p-6 shadow-card ring-1 ring-slate-200">
          <div className="h-3 w-24 rounded bg-slate-200" />
          <div className="mt-8 h-6 w-3/4 rounded bg-slate-200" />
          <div className="mt-4 h-4 w-full rounded bg-slate-200" />
          <div className="mt-2 h-4 w-2/3 rounded bg-slate-200" />
          <div className="mt-10 h-11 rounded bg-slate-200" />
        </div>
      ))}
    </div>
  );
}

export function FullPageLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <InlineLoader label="Preparing secure workspace" />
    </div>
  );
}
