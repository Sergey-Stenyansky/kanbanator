"use client";

import BoardContent from "./elements/BoardContent";

import { DragDropContext } from "@hello-pangea/dnd";

import { useKanbanFlow } from "./hooks";
import BoardContextProvider from "./provider";

function PageContent() {
  const { flowState, onDragEnd } = useKanbanFlow();
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <BoardContent flow={flowState.flow} />
    </DragDropContext>
  );
}

export default function Board() {
  return (
    <BoardContextProvider>
      <PageContent />
    </BoardContextProvider>
  );
}
