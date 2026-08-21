export function SectionHeading({
  index,
  eyebrow,
  title,
  tone = "dark",
  align = "left",
}: {
  index?: string;
  eyebrow?: string;
  title: string;
  tone?: "dark" | "paper";
  align?: "left" | "center";
}) {
  const mutedClass = tone === "dark" ? "text-paper/50" : "text-paper-foreground/50";

  return (
    <div className={align === "center" ? "text-center" : ""}>
      <div
        className={`flex items-center gap-3 font-mono text-xs uppercase tracking-widest ${mutedClass} ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        {index && <span className="text-gradient font-semibold">{index}</span>}
        {eyebrow && <span>{eyebrow}</span>}
      </div>
      <h2 className="font-display mt-3 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
        {title}
      </h2>
    </div>
  );
}
