import { tasks } from "@/mocks/tasks";
import { comments } from "@/mocks/comments";
import { columns } from "@/mocks/columns";

import { KanbanFlow, KanbanFlowItem, KanbanUser } from "../types";

export const prepareFlow = (
  flow: KanbanFlow,
  data: { users: KanbanUser[] }
) => {
  const { users } = data;
  return {
    ...flow,
    columns: flow.columns.map((id) => {
      const foundColumn = columns.find((col) => id === col.id)!;
      const columnTasks = foundColumn.tasks.map((taskId) => {
        const foundTask = tasks.find((task) => taskId === task.id)!;
        const createdBy = users.find(
          (user) => foundTask.createdBy === user.id
        )!;
        const assignedTo = foundTask.assignedTo.map(
          (userId) => users.find((user) => user.id === userId)!
        );
        const taskComments = foundTask.comments.map((commentId) => {
          const comment = comments.find((comment) => comment.id === commentId)!;
          const author = users.find((user) => user.id === comment.author)!;
          return { ...comment, author };
        });
        return { ...foundTask, createdBy, assignedTo, comments: taskComments };
      });
      return { ...foundColumn, tasks: columnTasks };
    }),
  };
};

export const getFlowPermissions = (flow: KanbanFlowItem) => {
  return { canAddColumns: true, canDeleteColumns: flow.columns.length > 3 };
};
