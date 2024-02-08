export default function Loading() {
  return (
    <div className="flex-1 flex h-full bg-base-300">
      <div className="card m-auto flex items-center justify-center gap-4">
        <span className="loading loading-ring w-[100px]"></span>
        <div className="card-title">Loading...</div>
      </div>
    </div>
  );
}
