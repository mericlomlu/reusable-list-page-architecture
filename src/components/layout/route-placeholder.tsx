import { PageContainer } from "@/components/layout/page-container";
import { cn } from "@/lib/utils";

interface RoutePlaceholderProps {
  eyebrow?: string;
  title: string;
  description: string;
}

export function RoutePlaceholder({
  eyebrow,
  title,
  description,
}: RoutePlaceholderProps) {
  return (
    <PageContainer>
      {eyebrow ? (
        <p className="font-mono text-eyebrow text-muted-foreground uppercase tracking-wide">
          {eyebrow}
        </p>
      ) : null}
      <h1
        className={cn(
          "font-extrabold tracking-tight text-foreground",
          eyebrow ? "mt-2 text-2xl" : "text-3xl",
        )}
      >
        {title}
      </h1>
      <p className="mt-3 max-w-xl text-sm text-muted-foreground">
        {description}
      </p>
    </PageContainer>
  );
}
