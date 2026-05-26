type CountdownItemProps = {
  label: string;
  value: number;
};

export function CountdownItem({ label, value }: CountdownItemProps) {
  return (
    <div className="rounded-2xl border border-[var(--color-soft-gold)]/40 bg-[var(--color-warm-black)]/80 px-5 py-6 text-center shadow-[0_0_30px_rgba(209,168,111,0.2)]">
      <div className="font-heading text-4xl text-[var(--color-ivory)] md:text-5xl">
        {String(value).padStart(2, "0")}
      </div>
      <div className="mt-1 text-xs uppercase tracking-[0.24em] text-[var(--color-soft-gold)]">
        {label}
      </div>
    </div>
  );
}
