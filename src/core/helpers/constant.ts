import { KanbanTaskPriority } from "@/core/types";
import { BaseColors } from "@/theme/types";

export const taskPriorityColorsMap: Record<KanbanTaskPriority, BaseColors> = {
  low: "success",
  medium: "info",
  high: "warning",
  critical: "warning",
};
