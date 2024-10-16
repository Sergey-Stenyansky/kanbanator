// export type KanbanTaskPriority = "low" | "medium" | "high" | "critical";
export enum KanbanTaskPriority {
  low = "low",
  medium = "medium",
  high = "high",
  critical = "critical",
}

export type KanbanTaskComment = {
  id: number;
  content: string;
  author: number;
  createdAt: string;
};

export type KanbanTaskCommentItem = Omit<KanbanTaskComment, "author"> & {
  author: KanbanUser;
};

export type KanbanTask = {
  id: number;
  name: string;
  createdBy: number;
  assignedTo: number[];
  description: string;
  deadline: string;
  priority: KanbanTaskPriority;
  createdAt: string;
  editedAt: string;
  comments: number[];
  labels: string[];
};

export type KanbanTaskItem = Omit<
  KanbanTask,
  "createdBy" | "assignedTo" | "comments"
> & {
  createdBy: KanbanUser;
  assignedTo: KanbanUser[];
  comments: KanbanTaskCommentItem[];
};

export type KanbanUser = {
  id: number;
  name: string;
  avatarUrl?: string;
  role: string;
};

export type KanbanColumn = {
  id: number;
  name: string;
  tasks: number[];
};

export type KanbanColumnItem = Omit<KanbanColumn, "tasks"> & {
  tasks: KanbanTaskItem[];
};

export type KanbanFlow = {
  id: number;
  name: string;
  columns: number[];
};

export type KanbanFlowItem = Omit<KanbanFlow, "columns"> & {
  columns: KanbanColumnItem[];
};
