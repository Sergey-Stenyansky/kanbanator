import { createContext, Dispatch, useContext } from "react";
import { FlowStoreActions, FlowStoreState } from "@/core/reducers/flow";
import { getFlowPermissions } from "@/core/helpers/flow";

export type BoardContextType = {
  flowState: FlowStoreState;
  flowDispatch: Dispatch<FlowStoreActions>;
  taskId: number | null,
  setTaskId: (id: number | null) => void
  flowPermissions: ReturnType<typeof getFlowPermissions>;
};

export const BoardContext = createContext<BoardContextType>(null!);
export const useBoardContext = () => useContext(BoardContext);
