export default function Loading() {
  return (
    <main className="min-h-screen bg-slate-950 p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="h-10 w-48 bg-slate-800 rounded-lg animate-pulse mb-8" />

        <div className="space-y-12">
          {[1, 2].map((i) => (
            <div key={i} className="relative pl-8 border-l border-slate-800">
              <div className="absolute -left-1.5 top-0 w-3 h-3 bg-slate-800 rounded-full" />
              <div className="h-6 w-20 bg-slate-800 rounded mb-4 animate-pulse" />

              <div className="grid gap-4 md:grid-cols-2">
                {[1, 2].map((j) => (
                  <div
                    key={j}
                    className="h-44 bg-slate-900/50 border border-slate-800 rounded-xl animate-pulse"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
