"use client";

import { useState } from "react";

function NameGroup({
  label,
  names,
  tone,
  previewCount = 8,
}: {
  label: string;
  names: string[];
  tone: "dark" | "paper";
  previewCount?: number;
}) {
  const [expanded, setExpanded] = useState(false);

  if (names.length === 0) return null;

  const isLong = names.length > previewCount;
  const shown = expanded || !isLong ? names : names.slice(0, previewCount);
  const labelClass = tone === "dark" ? "text-paper/45" : "text-paper-foreground/45";
  const valueClass = tone === "dark" ? "text-paper/80" : "text-paper-foreground/80";
  const toggleClass =
    tone === "dark"
      ? "text-paper/50 decoration-paper/30 hover:text-paper"
      : "text-paper-foreground/50 decoration-paper-foreground/30 hover:text-paper-foreground";

  return (
    <div>
      <dt className={`font-mono text-xs uppercase tracking-wide ${labelClass}`}>{label}</dt>
      <dd className={`mt-1 text-sm leading-relaxed ${valueClass}`}>
        {shown.join(", ")}
        {isLong && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className={`ml-2 font-mono text-xs uppercase tracking-widest underline underline-offset-2 ${toggleClass}`}
          >
            {expanded ? "Show less" : `Show ${names.length - previewCount} more`}
          </button>
        )}
      </dd>
    </div>
  );
}

export function CastCrewList({
  director,
  writer,
  producers,
  cast,
  tone = "dark",
}: {
  director: string[];
  writer: string[];
  producers: string[];
  cast: string[];
  tone?: "dark" | "paper";
}) {
  return (
    <dl className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
      <NameGroup label="Director" names={director} tone={tone} />
      <NameGroup label="Writer" names={writer} tone={tone} />
      <NameGroup label="Producers" names={producers} tone={tone} />
      <div className="sm:col-span-2">
        <NameGroup label="Cast" names={cast} tone={tone} previewCount={8} />
      </div>
    </dl>
  );
}
