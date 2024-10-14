import { users } from "@/mocks/users";
import { tasks } from "@/mocks/tasks";
import { columns } from "@/mocks/columns";

import { KanbanFlow } from "../types";

export const prepareFlow = (flow: KanbanFlow) => ({
  ...flow,
  columns: flow.columns.map((id) => {
    const foundColumn = columns.find((col) => id === col.id)!;
    const columnTasks = foundColumn.tasks.map((taskId) => {
      const foundTask = tasks.find((task) => taskId === task.id)!;
      const createdBy = users.find((user) => foundTask.createdBy === user.id)!;
      const assignedTo = foundTask.assignedTo.map(
        (userId) => users.find((user) => user.id === userId)!
      );
      return { ...foundTask, createdBy, assignedTo };
    });
    return { ...foundColumn, tasks: columnTasks };
  }),
});
