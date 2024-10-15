import { createContext, Dispatch, useContext } from "react";
import { FlowStoreActions, FlowStoreState } from "@/core/reducers/flow";

export type BoardContextType = {
  flowState: FlowStoreState;
  flowDispatch: Dispatch<FlowStoreActions>;
};

export const BoardContext = createContext<BoardContextType>(null!);
export const useBoardContext = () => useContext(BoardContext);
