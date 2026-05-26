export function AmbientEffects() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute left-[8%] top-40 h-48 w-48 rounded-full bg-[var(--color-soft-gold)]/18 blur-3xl" />
      <div className="absolute right-[6%] top-[26%] h-56 w-56 rounded-full bg-[var(--color-burgundy)]/14 blur-3xl" />
      <div className="absolute bottom-[16%] left-[35%] h-64 w-64 rounded-full bg-[var(--color-muted-green)]/12 blur-3xl" />

      <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(var(--color-soft-gold)_0.6px,transparent_0.6px)] [background-size:22px_22px]" />
    </div>
  );
}
