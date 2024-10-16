"use client";

import { DropResult } from "@hello-pangea/dnd";

import { flowActions } from "@/core/reducers/flow";
import { useBoardContext } from "../context";

export const useKanbanFlow = () => {
  const { flowState, flowDispatch } = useBoardContext();

  const addColumn = (name: string, position?: number) => {
    flowDispatch(flowActions.addColumn(name, position));
  };

  const removeColumn = (id: number) => {
    flowDispatch(flowActions.removeColumn(id));
  };

  const setColumnName = (id: number, name: string) => {
    flowDispatch(flowActions.updateColumn(id, name));
  };

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
    addColumn,
    removeColumn,
    setColumnName,
    flowState,
    onDragEnd,
  };
};
