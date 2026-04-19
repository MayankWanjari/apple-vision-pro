export default function TechSpecsLoading() {
  return (
    <div className="min-h-screen bg-bg-light pt-24 pb-32 animate-pulse">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <div className="h-3 w-40 bg-black/10 rounded mx-auto mb-4" />
          <div className="h-20 w-96 bg-black/10 rounded mx-auto" />
        </div>
        <div className="grid lg:grid-cols-[240px_1fr] gap-16">
          <div className="space-y-2">
            <div className="h-4 w-full bg-black/10 rounded" />
            <div className="h-4 w-full bg-black/10 rounded" />
            <div className="h-4 w-full bg-black/10 rounded" />
          </div>
          <div className="space-y-6">
            <div className="h-10 w-48 bg-black/10 rounded" />
            <div className="h-16 bg-black/5 rounded" />
            <div className="h-16 bg-black/5 rounded" />
            <div className="h-16 bg-black/5 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
