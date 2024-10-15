"use client";

import { DropResult } from "@hello-pangea/dnd";
import { KanbanFlow } from "@/core/types";
import { prepareFlow } from "@/core/helpers/flow";
import { useReducer } from "react";

import { flow } from "@/mocks/flow";
import { flowActions, FlowStore } from "@/core/reducers/flow";

export const useKanbanFlow = () => {
  const [flowStore, flowDispatch] = useReducer(
    FlowStore,
    flow,
    (flow: KanbanFlow) => ({ flow: prepareFlow(flow) })
  );

  const addColumn = (position: number, name: string) => {
    flowDispatch(flowActions.add(position, name));
  };

  const removeColumn = (id: number) => {
    flowDispatch(flowActions.remove(id));
  };

  const setColumnName = (id: number, name: string) => {
    flowDispatch(flowActions.update(id, name));
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
    flowStore,
    onDragEnd,
  };
};
