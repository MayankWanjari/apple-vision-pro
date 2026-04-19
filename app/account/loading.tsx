export default function AccountLoading() {
  return (
    <div className="min-h-screen bg-bg-light pt-24 pb-32 animate-pulse">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="h-16 w-48 bg-black/10 rounded mb-12" />
        <div className="grid lg:grid-cols-[240px_1fr] gap-12">
          <div className="space-y-3">
            <div className="h-24 bg-black/5 rounded-2xl" />
            <div className="h-8 w-full bg-black/10 rounded" />
            <div className="h-8 w-full bg-black/10 rounded" />
            <div className="h-8 w-full bg-black/10 rounded" />
          </div>
          <div className="space-y-6">
            <div className="h-12 w-96 bg-black/10 rounded" />
            <div className="h-32 bg-black/5 rounded-2xl" />
            <div className="h-32 bg-black/5 rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
