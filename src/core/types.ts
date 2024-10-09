export type KanbanTicketType = "bug" | "feature";

export type KanbanUser = {
  id: number;
  name: string;
  avatarUrl: string;
};

export type KanbanTicket = {
  id: number;
  title: string;
  category: string;
  textContent: string;
  type: KanbanTicketType;
  participants: KanbanUser[];
  urgentItems: number;
};

export type KanbanColumn = {
  name: string;
  tickets: KanbanTicket[];
};

export type KanbanFlow = {
  name: string;
  columns: KanbanColumn[];
};
