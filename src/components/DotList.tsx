export function DotList({
  items,
  tone = "dark",
  columns = 3,
}: {
  items: string[];
  tone?: "dark" | "paper";
  columns?: 1 | 3 | 4;
}) {
  const textClass = tone === "dark" ? "text-paper/70" : "text-paper-foreground/70";
  const dotClass = tone === "dark" ? "bg-paper/40" : "bg-paper-foreground/40";
  const gridClass =
    columns === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : columns === 3 ? "sm:grid-cols-3" : "";

  return (
    <ul className={`grid grid-cols-1 gap-x-8 gap-y-4 ${gridClass}`}>
      {items.map((item) => (
        <li key={item} className={`flex items-center gap-2.5 text-sm ${textClass}`}>
          <span className={`h-1 w-1 shrink-0 rounded-full ${dotClass}`} aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );
}
