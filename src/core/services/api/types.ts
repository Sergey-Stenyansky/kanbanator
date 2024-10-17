import {
  KanbanColumn,
  KanbanTask,
  KanbanTaskComment,
  KanbanUser,
} from "@/core/types";

export type KanbanDataResponse = {
  users: KanbanUser[];
  tasks: KanbanTask[];
  comments: KanbanTaskComment[];
  columns: KanbanColumn[];
};
