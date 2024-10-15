"use client";

import { Stack } from "@mui/material";
import BoardContent from "./elements/BoardContent";

import { DragDropContext } from "@hello-pangea/dnd";

import { useKanbanFlow } from "./hooks";

export default function Board() {
  const { flowStore, onDragEnd } = useKanbanFlow();
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Stack>
        <BoardContent flow={flowStore.flow} />
      </Stack>
    </DragDropContext>
  );
}
