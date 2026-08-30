import type { ReactNode } from "react";
import { PageContainer } from "@/components/layout/page-container";

interface ListPageShellProps {
  eyebrow?: string;
  title: string;
  description?: string;
  toolbar: ReactNode;
  pagination?: ReactNode;
  children: ReactNode;
}

export function ListPageShell({
  eyebrow,
  title,
  description,
  toolbar,
  pagination,
  children,
}: ListPageShellProps) {
  return (
    <PageContainer>
      <header className="mb-7 flex flex-col gap-1.5">
        {eyebrow ? (
          <p className="font-mono text-eyebrow text-muted-foreground uppercase tracking-wide">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-[28px]">
          {title}
        </h1>
        {description ? (
          <p className="max-w-xl text-sm text-muted-foreground">
            {description}
          </p>
        ) : null}
      </header>
      <div className="mb-3.5">{toolbar}</div>
      {children}
      {pagination ? <div className="mt-5">{pagination}</div> : null}
    </PageContainer>
  );
}
