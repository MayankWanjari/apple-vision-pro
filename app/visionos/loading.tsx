export default function VisionOSLoading() {
  return (
    <div className="min-h-screen bg-bg-dark flex items-center
         justify-center animate-pulse">
      <div className="text-center">
        <div className="h-3 w-32 bg-white/10 rounded mx-auto mb-6" />
        <div className="h-24 w-[600px] max-w-[90vw] bg-white/10
             rounded mx-auto" />
        <div className="h-6 w-96 max-w-[80vw] bg-white/5 rounded
             mx-auto mt-8" />
      </div>
    </div>
  );
}
