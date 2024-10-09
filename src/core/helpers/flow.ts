import { KanbanFlow } from "../types";

export const createDefaultFlow = (): KanbanFlow => ({
  name: "Kanban Board",
  columns: [
    {
      name: "Backlog",
      tickets: [
        {
          title: "Create App Layout Base",
          id: 1,
          category: "MVP",
          type: "feature",
          participants: [{ id: 1, name: "John Silver", avatarUrl: "test" }],
          urgentItems: 2,
          textContent: "",
        },
        {
          title: "Fix App Layout Base",
          id: 2,
          category: "MVP",
          type: "bug",
          participants: [{ id: 1, name: "John Silver", avatarUrl: "test" }],
          urgentItems: 1,
          textContent: "",
        },
      ],
    },
    { name: "In progress", tickets: [] },
    { name: "Done", tickets: [] },
  ],
});
