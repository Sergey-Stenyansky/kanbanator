export type KanbanUser = {
  id: number;
  name: string;
  avatarUrl?: string;
  role: string;
};

export type KanbanTaskPriority = "low" | "medium" | "high" | "critical";

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
  comments: number;
  labels: string[];
};
