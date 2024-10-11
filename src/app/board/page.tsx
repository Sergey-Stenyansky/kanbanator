"use client";

import { Stack } from "@mui/material";
import BoardContent from "./elements/BoardContent";

import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { KanbanFlowItem } from "@/core/types";

const flow: KanbanFlowItem = {
  id: 1,
  name: "Kanban Board",
  columns: [
    {
      id: 1,
      name: "Backlog",
      tasks: [
        {
          id: 1,
          name: "Fix Header",
          createdAt: "2024-10-10 14:00",
          editedAt: "2024-10-10 14:00",
          deadline: "2024-10-10 16:00",
          createdBy: {
            id: 1,
            name: "Ava Parry",
            role: "Developer",
            avatarUrl: "https://i.pravatar.cc/300",
          },
          assignedTo: [
            {
              id: 1,
              name: "Ava Parry",
              role: "Developer",
              avatarUrl: "https://i.pravatar.cc/300",
            },
          ],
          priority: "low",
          description: "test",
          comments: 0,
          labels: ["blocker", "bug"],
        },
        {
          id: 2,
          name: "Fix Description",
          createdAt: "2024-10-10 14:00",
          editedAt: "2024-10-10 14:00",
          deadline: "2024-10-10 16:00",
          createdBy: {
            id: 1,
            name: "Ava Parry",
            role: "Developer",
            avatarUrl: "https://i.pravatar.cc/300",
          },
          assignedTo: [
            {
              id: 1,
              name: "Ava Parry",
              role: "Developer",
              avatarUrl: "https://i.pravatar.cc/300",
            },
          ],
          priority: "medium",
          description: "test",
          comments: 0,
          labels: ["financial risk", "bug"],
        },
      ],
    },
    { id: 2, name: "In progress", tasks: [] },
    { id: 3, name: "Done", tasks: [] },
  ],
};

export default function Board() {
  const onDragEnd = (res: DropResult) => {
    console.log(res);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Stack>
        <BoardContent flow={flow} />
      </Stack>
    </DragDropContext>
  );
}
