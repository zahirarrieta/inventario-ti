export default function Loading({ message = "Cargando información..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
      <div className="relative w-12 h-12 mb-4">
        <div className="absolute inset-0 rounded-full border-2 border-ctp-cyan/20" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-ctp-cyan animate-spin" />
      </div>
      <p className="text-sm text-text-muted font-medium">{message}</p>
    </div>
  );
}
