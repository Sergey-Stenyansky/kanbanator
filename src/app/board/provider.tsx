import { PropsWithChildren, useReducer } from "react";

import { FlowStore } from "@/core/reducers/flow";

import { flow } from "@/mocks/flow";

import { KanbanFlow } from "@/core/types";

import { prepareFlow } from "@/core/helpers/flow";

import { BoardContext } from "./context";

const BoardContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const [flowState, flowDispatch] = useReducer(
    FlowStore,
    flow,
    (flow: KanbanFlow) => ({ flow: prepareFlow(flow) })
  );

  const contextValue = { flowState, flowDispatch };

  return (
    <BoardContext.Provider value={contextValue}>
      {children}
    </BoardContext.Provider>
  );
};

export default BoardContextProvider;
