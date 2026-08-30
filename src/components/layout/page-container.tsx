import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[1180px] px-4 pt-6 pb-10 sm:px-6 sm:pt-8 sm:pb-12 lg:px-12 lg:pt-10 lg:pb-20",
        className,
      )}
    >
      {children}
    </div>
  );
}
