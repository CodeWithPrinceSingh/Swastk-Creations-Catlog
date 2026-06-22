export default function Loader({ label = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3">
      <div className="w-8 h-8 border-2 border-rose-200 border-t-rose-600 rounded-full animate-spin" />
      <p className="text-sm text-inkmuted">{label}</p>
    </div>
  );
}
