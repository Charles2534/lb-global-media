export function DotList({
  items,
  tone = "dark",
}: {
  items: string[];
  tone?: "dark" | "paper";
}) {
  const textClass = tone === "dark" ? "text-paper/70" : "text-paper-foreground/70";
  const dotClass = tone === "dark" ? "bg-paper/40" : "bg-paper-foreground/40";

  return (
    <ul className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-3">
      {items.map((item) => (
        <li key={item} className={`flex items-center gap-2.5 text-sm ${textClass}`}>
          <span className={`h-1 w-1 shrink-0 rounded-full ${dotClass}`} aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );
}
