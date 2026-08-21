export function PillList({
  items,
  tone = "dark",
}: {
  items: string[];
  tone?: "dark" | "paper";
}) {
  const pillClass =
    tone === "dark"
      ? "border-paper/20 text-paper/80"
      : "border-paper-foreground/20 text-paper-foreground/80";

  return (
    <ul className="flex flex-wrap gap-3">
      {items.map((item) => (
        <li
          key={item}
          className={`rounded-full border px-4 py-2 text-sm ${pillClass}`}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
