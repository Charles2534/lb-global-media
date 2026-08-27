export type NumberedItem = {
  title: string;
  body: string;
};

export function NumberedList({
  items,
  tone = "dark",
  columns = 1,
}: {
  items: NumberedItem[];
  tone?: "dark" | "paper";
  columns?: 1 | 2 | 3;
}) {
  const ruleClass = tone === "dark" ? "rule-on-dark" : "rule-on-paper";
  const numberClass = tone === "dark" ? "text-paper/30" : "text-paper-foreground/30";
  const bodyClass = tone === "dark" ? "text-paper/70" : "text-paper-foreground/85";

  const gridClass =
    columns === 3
      ? "sm:grid-cols-3"
      : columns === 2
      ? "sm:grid-cols-2"
      : "";

  return (
    <ol className={`grid grid-cols-1 gap-x-10 gap-y-8 ${gridClass}`}>
      {items.map((item, i) => (
        <li key={item.title} className={`border-t pt-6 ${ruleClass}`}>
          <span className={`font-display block text-3xl font-semibold ${numberClass}`}>
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="font-display mt-3 text-lg font-semibold">{item.title}</h3>
          <p className={`mt-2 text-sm leading-relaxed ${bodyClass}`}>{item.body}</p>
        </li>
      ))}
    </ol>
  );
}
