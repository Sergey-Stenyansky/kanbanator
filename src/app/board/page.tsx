"use client";

import { Stack } from "@mui/material";
import BoardContent from "./elements/BoardContent";

import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { KanbanFlowItem, KanbanTaskItem } from "@/core/types";
import { prepareFlow } from "@/core/helpers/flow";
import { useState } from "react";

import { flow } from "@/mocks/flow";

export default function Board() {
  const [internalFlow, setInternalFlow] = useState<KanbanFlowItem>(() =>
    prepareFlow(flow)
  );

  const onDragEnd = (res: DropResult) => {
    if (!res.destination) return;

    if (res.reason !== "DROP") return;

    const srcCol = internalFlow.columns.find(
      (col) => res.source.droppableId === "column-" + col.id
    );
    const dstCol = internalFlow.columns.find(
      (col) => res.destination?.droppableId === "column-" + col.id
    );
    const srcTask = srcCol?.tasks[res.source.index];

    if (!srcCol || !dstCol || !srcTask) return;

    setInternalFlow((oldValue) => ({
      ...oldValue,
      columns: oldValue.columns.map((col) => {
        let newTasks: KanbanTaskItem[] | null = null;
        if (col.id === srcCol.id) {
          newTasks = srcCol.tasks.toSpliced(res.source.index, 1);
        }
        if (col.id === dstCol.id) {
          newTasks = (newTasks || dstCol.tasks).toSpliced(
            res.destination!.index,
            0,
            srcTask
          );
        }
        if (newTasks) {
          return { ...col, tasks: newTasks };
        }
        return col;
      }),
    }));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Stack>
        <BoardContent flow={internalFlow} />
      </Stack>
    </DragDropContext>
  );
}
