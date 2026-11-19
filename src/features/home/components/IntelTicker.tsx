const intelItems = [
  'Track the deal',
  'Read the discount',
  'Close the case',
  'Stay in budget',
  'Surveil the stores',
]

/** Scrolling intel strip (seamless marquee). */
export function IntelTicker() {
  const sequence = [...intelItems, ...intelItems]

  return (
    <div className="overflow-hidden border-y border-border bg-card/50">
      <div className="animate-ticker flex w-max py-2.5">
        {sequence.map((item, i) => (
          <span
            key={i}
            className="flex items-center font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground"
          >
            <span className="px-4">{item}</span>
            <span className="h-1 w-1 bg-primary" aria-hidden />
          </span>
        ))}
      </div>
    </div>
  )
}
