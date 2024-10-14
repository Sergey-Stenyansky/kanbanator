import { KanbanTaskComment } from "@/core/types";
import { idGenerator } from "@/helpers/idGenerator";

export const commentIdGenerator = idGenerator();

export const comments: KanbanTaskComment[] = [
  {
    id: commentIdGenerator(),
    author: 1,
    createdAt: "2024-10-10 14:00",
    content: "some text",
  },
  {
    id: commentIdGenerator(),
    author: 2,
    createdAt: "2024-10-10 14:00",
    content: "some text",
  },
  {
    id: commentIdGenerator(),
    author: 3,
    createdAt: "2024-10-10 14:00",
    content: "some text",
  },
  {
    id: commentIdGenerator(),
    author: 3,
    createdAt: "2024-10-10 14:00",
    content: "some text",
  },
  {
    id: commentIdGenerator(),
    author: 3,
    createdAt: "2024-10-10 14:00",
    content: "some text",
  },
];
