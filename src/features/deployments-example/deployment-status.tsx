import type { IconComponent } from "@/components/icons/icon";
import { CheckIcon, ClockIcon } from "@/components/icons/list-icons";
import { CloseIcon } from "@/components/icons/nav-icons";
import type { DeploymentStatus } from "@/features/deployments-example/types";
import { cn } from "@/lib/utils";

const STATUS_LABEL: Record<DeploymentStatus, string> = {
  ready: "Ready",
  building: "Building",
  failed: "Failed",
};

const STATUS_ICON: Record<DeploymentStatus, IconComponent> = {
  ready: CheckIcon,
  building: ClockIcon,
  failed: CloseIcon,
};

// The icon (not the label text) carries the status color. --warning at
// normal text weight/size fails WCAG AA contrast against the card
// background in light mode (~3:1, needs 4.5:1); keeping the label in
// text-foreground avoids that while the icon shape + label text already
// satisfy "status never relies on color alone".
const STATUS_ICON_CLASS: Record<DeploymentStatus, string> = {
  ready: "text-success",
  building: "text-warning",
  failed: "text-destructive",
};

export function DeploymentStatusBadge({
  status,
}: {
  status: DeploymentStatus;
}) {
  const Icon = STATUS_ICON[status];
  return (
    <span className="inline-flex items-center gap-1.5 text-caption font-semibold text-foreground">
      <Icon
        className={cn("size-3 shrink-0", STATUS_ICON_CLASS[status])}
        strokeWidth={2}
      />
      {STATUS_LABEL[status]}
    </span>
  );
}
