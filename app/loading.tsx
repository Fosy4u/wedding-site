export default function Loading() {
  return (
    <div className="grid min-h-screen place-items-center bg-[var(--color-warm-black)] px-6 text-center text-[var(--color-ivory)]">
      <div className="space-y-5">
        <div className="mx-auto h-14 w-14 animate-spin rounded-full border-2 border-[var(--color-soft-gold)]/35 border-t-[var(--color-soft-gold)]" />
        <p className="font-heading text-3xl">Preparing your invitation</p>
      </div>
    </div>
  );
}
