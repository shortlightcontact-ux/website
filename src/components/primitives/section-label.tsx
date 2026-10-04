import type { ReactNode } from "react";

type SectionLabelProps = {
  index?: string;
  children: ReactNode;
  className?: string;
};

export function SectionLabel({ index, children, className }: SectionLabelProps) {
  return (
    <div
      className={`flex items-center gap-4 text-[0.6875rem] uppercase tracking-[0.28em] text-taupe ${className ?? ""}`}
    >
      {index ? <span className="tabular-nums">{index}</span> : null}
      <span className="h-px w-10 bg-current opacity-40" aria-hidden="true" />
      <span>{children}</span>
    </div>
  );
}
