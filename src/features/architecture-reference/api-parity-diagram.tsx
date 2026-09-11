import { useTranslations } from "next-intl";
import { ChevronDownIcon } from "@/components/icons/list-icons";
import { FlowNode } from "@/features/architecture-reference/flow-node";

export function ApiParityDiagram() {
  const t = useTranslations("reference.architecture.apiParity");

  return (
    <section aria-labelledby="api-parity-heading" className="mt-10">
      <h2 id="api-parity-heading" className="text-lg font-bold text-foreground">
        {t("heading")}
      </h2>
      <p className="mt-1.5 max-w-2xl text-body-sm text-muted-foreground">
        {t("description")}
      </p>

      <div className="mt-5 max-w-xl">
        <div className="grid grid-cols-2 gap-4">
          <FlowNode
            label={t("pageNode.label")}
            description={t("pageNode.description")}
          />
          <FlowNode
            label={t("routeNode.label")}
            description={t("routeNode.description")}
          />
        </div>
        <div aria-hidden="true" className="grid grid-cols-2">
          <div className="flex justify-center py-1">
            <ChevronDownIcon className="size-4 text-primary" />
          </div>
          <div className="flex justify-center py-1">
            <ChevronDownIcon className="size-4 text-primary" />
          </div>
        </div>
        <FlowNode
          label={t("queryServiceNode.label")}
          description={t("queryServiceNode.description")}
          emphasis
        />
      </div>

      <p className="mt-4 max-w-2xl text-body-sm text-foreground">
        {t("footnote")}
      </p>
    </section>
  );
}
