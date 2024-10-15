import { columnIdGenerator } from "@/mocks/columns";
import { KanbanColumnItem, KanbanFlowItem, KanbanTaskItem } from "../types";
import { getFlowPermissions } from "../helpers/flow";

export type FlowStoreState = {
  flow: KanbanFlowItem;
};

export enum FlowStoreActionTypes {
  add = "add",
  remove = "remove",
  update = "update",
  swapTask = "swapTask",
}

type FlowStoreActionAdd = {
  type: FlowStoreActionTypes.add;
  payload: { position: number; name: string };
};

type FlowStoreActionRemove = {
  type: FlowStoreActionTypes.remove;
  payload: number;
};

type FlowStoreActionUpdate = {
  type: FlowStoreActionTypes.update;
  payload: { id: number; config: Partial<KanbanColumnItem> };
};

type FlowStoreActionSwapTask = {
  type: FlowStoreActionTypes.swapTask;
  payload: { srcId: string; dstId: string; srcIdx: number; dstIdx: number };
};

export type FlowStoreActions =
  | FlowStoreActionAdd
  | FlowStoreActionRemove
  | FlowStoreActionUpdate
  | FlowStoreActionSwapTask;

export const FlowStore = (
  state: FlowStoreState,
  { type, payload }: FlowStoreActions
) => {
  const flow = state.flow;
  switch (type) {
    case FlowStoreActionTypes.add: {
      if (!getFlowPermissions(state.flow).canAddColumns) return state;
      const newColumn: KanbanColumnItem = {
        id: columnIdGenerator(),
        name: payload.name,
        tasks: [],
      };
      return {
        ...state,
        flow: {
          ...flow,
          columns: flow.columns.toSpliced(payload.position, 0, newColumn),
        },
      };
    }
    case FlowStoreActionTypes.remove: {
      if (!getFlowPermissions(state.flow).canDeleteColumns) return state;
      const idx = flow.columns.findIndex((col) => col.id === payload);
      if (idx < 0) return state;
      return {
        ...state,
        flow: { ...flow, columns: flow.columns.toSpliced(idx, 1) },
      };
    }
    case FlowStoreActionTypes.update: {
      const idx = flow.columns.findIndex((col) => col.id === payload.id);
      if (idx < 0) return state;
      const oldColumn = flow.columns[idx];
      const newColumn = {
        ...oldColumn,
        name: payload.config.name || oldColumn.name,
      };
      return {
        ...state,
        flow: {
          ...flow,
          columns: flow.columns.toSpliced(idx, 1, newColumn),
        },
      };
    }
    case FlowStoreActionTypes.swapTask: {
      const { srcId, dstId, srcIdx, dstIdx } = payload;
      const srcCol = flow.columns.find((col) => srcId === "column-" + col.id);
      const dstCol = flow.columns.find((col) => dstId === "column-" + col.id);
      const srcTask = srcCol?.tasks[srcIdx];

      if (!srcCol || !dstCol || !srcTask) return state;

      const columns = flow.columns.map((col) => {
        let newTasks: KanbanTaskItem[] | null = null;
        if (col.id === srcCol.id) {
          newTasks = srcCol.tasks.toSpliced(srcIdx, 1);
        }
        if (col.id === dstCol.id) {
          newTasks = (newTasks || dstCol.tasks).toSpliced(dstIdx, 0, srcTask);
        }
        if (newTasks) {
          return { ...col, tasks: newTasks };
        }
        return col;
      });

      return { ...state, flow: { ...flow, columns } };
    }
  }
};

export const flowActions = {
  add: (position: number, name: string) =>
    ({
      type: FlowStoreActionTypes.add,
      payload: { name, position },
    } as const),
  remove: (id: number) =>
    ({ type: FlowStoreActionTypes.remove, payload: id } as const),
  update: (id: number, name: string) =>
    ({
      type: FlowStoreActionTypes.update,
      payload: { id, config: { name } },
    } as const),
  swapTask: (srcId: string, dstId: string, srcIdx: number, dstIdx: number) =>
    ({
      type: FlowStoreActionTypes.swapTask,
      payload: { srcId, dstId, srcIdx, dstIdx },
    } as const),
};
