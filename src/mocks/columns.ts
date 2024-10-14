import { KanbanColumn } from "@/core/types";
import { idGenerator } from "@/helpers/idGenerator";

export const columnIdGenerator = idGenerator();

export const columns: KanbanColumn[] = [
  {
    id: columnIdGenerator(),
    name: "Backlog",
    tasks: [1, 2],
  },
  { id: columnIdGenerator(), name: "In progress", tasks: [] },
  { id: columnIdGenerator(), name: "Done", tasks: [] },
];
