export function CardList({
  items,
  tone = "dark",
}: {
  items: string[];
  tone?: "dark" | "paper";
}) {
  const cardClass =
    tone === "dark"
      ? "border-paper/15 bg-paper/[0.03] text-paper/85"
      : "border-paper-foreground/15 bg-paper-foreground/[0.03] text-paper-foreground/85";

  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li
          key={item}
          className={`rounded-xl border px-5 py-4 text-sm font-medium leading-snug ${cardClass}`}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
