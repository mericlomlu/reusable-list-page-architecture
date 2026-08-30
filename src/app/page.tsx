import { PageContainer } from "@/components/layout/page-container";

export default function OverviewPage() {
  return (
    <PageContainer>
      <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
        Reusable List Page Architecture
      </h1>
      <p className="mt-3 max-w-2xl text-base text-muted-foreground">
        An interactive showcase of reusable list page patterns built with
        Next.js and TypeScript, demonstrated across a fictional Developer
        Workspace. Overview content lands in a later slice.
      </p>
    </PageContainer>
  );
}
