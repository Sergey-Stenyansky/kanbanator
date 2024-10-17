"use client";

import { DropResult } from "@hello-pangea/dnd";

import { flowActions } from "@/core/reducers/flow";
import { useBoardContext } from "../context";

export const useKanbanFlow = () => {
  const { flowState, flowDispatch } = useBoardContext();

  const onDragEnd = (res: DropResult) => {
    if (!res.destination) return;

    if (res.reason !== "DROP") return;

    flowDispatch(
      flowActions.swapTask(
        res.source.droppableId,
        res.destination.droppableId,
        res.source.index,
        res.destination!.index
      )
    );
  };

  return {
    flowState,
    flowDispatch,
    onDragEnd,
  };
};
