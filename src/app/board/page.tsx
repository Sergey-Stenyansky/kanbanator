"use client";

import BoardContent from "./elements/BoardContent";

import { DragDropContext } from "@hello-pangea/dnd";

import { useKanbanFlow } from "./hooks";
import BoardContextProvider from "./provider";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BoardContextProvider>
        <PageContent />
      </BoardContextProvider>
    </LocalizationProvider>
  );
}
