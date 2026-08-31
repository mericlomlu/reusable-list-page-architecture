import type { ReactNode } from "react";

interface ReferencePageHeaderProps {
  eyebrow: string;
  title: string;
  description: ReactNode;
}

export function ReferencePageHeader({
  eyebrow,
  title,
  description,
}: ReferencePageHeaderProps) {
  return (
    <header className="mb-8 flex flex-col gap-1.5">
      <p className="font-mono text-eyebrow text-muted-foreground uppercase tracking-wide">
        {eyebrow}
      </p>
      <h1 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-[28px]">
        {title}
      </h1>
      <p className="max-w-xl text-sm text-muted-foreground">{description}</p>
    </header>
  );
}
