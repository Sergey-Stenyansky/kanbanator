import { PropsWithChildren, useReducer } from "react";

import { FlowStore } from "@/core/reducers/flow";

import { flow } from "@/mocks/flow";

import { KanbanFlow } from "@/core/types";

import { getFlowPermissions, prepareFlow } from "@/core/helpers/flow";

import { BoardContext } from "./context";
import { KanbanDataResponse } from "@/core/services/api/types";

const BoardContextProvider = ({
  data,
  children,
}: PropsWithChildren<{ data: KanbanDataResponse }>) => {
  const [flowState, flowDispatch] = useReducer(
    FlowStore,
    flow,
    (flow: KanbanFlow) => ({ flow: prepareFlow(flow, data) })
  );

  const permisisons = getFlowPermissions(flowState.flow);

  const contextValue = {
    flowState,
    flowDispatch,
    flowPermissions: permisisons,
  };

  return (
    <BoardContext.Provider value={contextValue}>
      {children}
    </BoardContext.Provider>
  );
};

export default BoardContextProvider;
