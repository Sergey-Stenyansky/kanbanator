import { KanbanFlow } from "@/core/types";
import { idGenerator } from "@/helpers/idGenerator";

export const flowIdGenerator = idGenerator();

export const flow: KanbanFlow = {
  id: flowIdGenerator(),
  name: "Kanban Board",
  columns: [1, 2, 3],
};
