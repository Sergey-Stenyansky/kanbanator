import { KanbanUser } from "@/core/types";
import { idGenerator } from "@/helpers/idGenerator";

export const userIdGenerator = idGenerator();

export const users: KanbanUser[] = [
  {
    id: userIdGenerator(),
    name: "Ava Parry",
    role: "Developer",
    avatarUrl: "https://i.pravatar.cc/300",
  },
  {
    id: userIdGenerator(),
    name: "Oliver Harding",
    role: "Developer",
    avatarUrl: "https://i.pravatar.cc/300",
  },
  {
    id: userIdGenerator(),
    name: "Lydia Carr",
    role: "Project Lead",
    avatarUrl: "https://i.pravatar.cc/300",
  },
  {
    id: userIdGenerator(),
    name: "Jake Cooper",
    role: "QA",
    avatarUrl: "https://i.pravatar.cc/300",
  },
];
