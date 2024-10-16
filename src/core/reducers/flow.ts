import { columnIdGenerator, taskIdGenerator } from "@/helpers/idGenerator";
import {
  KanbanColumnItem,
  KanbanFlowItem,
  KanbanTaskConfig,
  KanbanTaskItem,
  KanbanTaskPriority,
} from "../types";
import { getFlowPermissions } from "../helpers/flow";
import dayjs from "dayjs";
import formatDate, { DateFormat } from "@/helpers/date/format";
import { users } from "@/mocks/users";

export type FlowStoreState = {
  flow: KanbanFlowItem;
};

export enum FlowStoreActionTypes {
  addTask = "addTask",
  addColumn = "addColumn",
  removeColumn = "removeColumn",
  updateColumn = "updateColumn",
  swapTask = "swapTask",
}

type FlowStoreActionAddTask = {
  type: FlowStoreActionTypes.addTask;
  payload: { columnId: number; config: KanbanTaskConfig; position?: number };
};

type FlowStoreActionAddColumn = {
  type: FlowStoreActionTypes.addColumn;
  payload: { name: string; position?: number };
};

type FlowStoreActionRemoveColumn = {
  type: FlowStoreActionTypes.removeColumn;
  payload: number;
};

type FlowStoreActionUpdateColumn = {
  type: FlowStoreActionTypes.updateColumn;
  payload: { id: number; config: Partial<KanbanColumnItem> };
};

type FlowStoreActionSwapTask = {
  type: FlowStoreActionTypes.swapTask;
  payload: { srcId: string; dstId: string; srcIdx: number; dstIdx: number };
};

export type FlowStoreActions =
  | FlowStoreActionAddTask
  | FlowStoreActionAddColumn
  | FlowStoreActionRemoveColumn
  | FlowStoreActionUpdateColumn
  | FlowStoreActionSwapTask;

export const FlowStore = (
  state: FlowStoreState,
  { type, payload }: FlowStoreActions
) => {
  const flow = state.flow;
  switch (type) {
    case FlowStoreActionTypes.addTask: {
      const column = state.flow.columns.find(
        (col) => col.id === payload.columnId
      );
      if (!column) return state;
      const newTask: KanbanTaskItem = {
        id: taskIdGenerator(),
        name: payload.config.name,
        description: payload.config.description || "",
        deadline: payload.config.deadline || "",
        assignedTo: (payload.config.assignedTo || [])
          .map((userId) => users.find((user) => userId === user.id)!)
          .filter(Boolean),
        createdAt: formatDate(dayjs(), DateFormat.fullDateISO),
        editedAt: formatDate(dayjs(), DateFormat.fullDateISO),
        createdBy: { id: 1, name: "Jacob Burton", role: "deeveloper" },
        comments: [],
        priority: payload.config.priority || KanbanTaskPriority.low,
        labels: payload.config.labels || [],
      };

      return {
        ...state,
        flow: {
          ...flow,
          columns: flow.columns.map((col) => {
            if (col.id !== column.id) return col;
            return {
              ...col,
              tasks: col.tasks.toSpliced(
                payload.position || col.tasks.length - 1,
                0,
                newTask
              ),
            };
          }),
        },
      };
    }
    case FlowStoreActionTypes.addColumn: {
      if (!getFlowPermissions(state.flow).canAddColumns) return state;
      const newColumn: KanbanColumnItem = {
        id: columnIdGenerator(),
        name: payload.name,
        tasks: [],
      };
      const position = payload.position || state.flow.columns.length;
      return {
        ...state,
        flow: {
          ...flow,
          columns: flow.columns.toSpliced(position, 1, newColumn),
        },
      };
    }
    case FlowStoreActionTypes.removeColumn: {
      if (!getFlowPermissions(state.flow).canDeleteColumns) return state;
      const idx = flow.columns.findIndex((col) => col.id === payload);
      if (idx < 0) return state;
      return {
        ...state,
        flow: { ...flow, columns: flow.columns.toSpliced(idx, 1) },
      };
    }
    case FlowStoreActionTypes.updateColumn: {
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
  addTask: (columnId: number, config: KanbanTaskConfig, position?: number) =>
    ({
      type: FlowStoreActionTypes.addTask,
      payload: { columnId, config, position },
    } as const),
  addColumn: (name: string, position?: number) =>
    ({
      type: FlowStoreActionTypes.addColumn,
      payload: { name, position },
    } as const),
  removeColumn: (id: number) =>
    ({ type: FlowStoreActionTypes.removeColumn, payload: id } as const),
  updateColumn: (id: number, name: string) =>
    ({
      type: FlowStoreActionTypes.updateColumn,
      payload: { id, config: { name } },
    } as const),
  swapTask: (srcId: string, dstId: string, srcIdx: number, dstIdx: number) =>
    ({
      type: FlowStoreActionTypes.swapTask,
      payload: { srcId, dstId, srcIdx, dstIdx },
    } as const),
};
