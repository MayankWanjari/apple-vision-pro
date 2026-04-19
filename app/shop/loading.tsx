export default function ShopLoading() {
  return (
    <div className="min-h-screen bg-bg-light pt-24 pb-32 animate-pulse">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1
           lg:grid-cols-2 gap-12 px-6 lg:px-12">
        {/* Left: image skeleton */}
        <div className="aspect-square lg:aspect-auto lg:h-[600px]
             bg-black/5 rounded-2xl" />
        {/* Right: form skeleton */}
        <div className="space-y-6">
          <div className="h-4 w-20 bg-black/10 rounded" />
          <div className="h-14 w-3/4 bg-black/10 rounded" />
          <div className="h-6 w-32 bg-black/10 rounded" />
          <div className="space-y-3 mt-8">
            <div className="h-20 bg-black/5 rounded-2xl" />
            <div className="h-20 bg-black/5 rounded-2xl" />
            <div className="h-20 bg-black/5 rounded-2xl" />
          </div>
          <div className="h-14 bg-black/10 rounded-full mt-8" />
        </div>
      </div>
    </div>
  );
}
