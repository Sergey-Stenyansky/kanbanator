import { KanbanColumn } from "@/core/types";

export const columns: KanbanColumn[] = [
  {
    id: 1,
    name: "Backlog",
    tasks: [1, 2],
  },
  { id: 2, name: "In progress", tasks: [] },
  { id: 3, name: "Done", tasks: [] },
];
