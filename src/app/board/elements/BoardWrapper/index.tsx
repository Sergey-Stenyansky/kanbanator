"use client";

import BoardContextProvider from "@/app/board/provider";

import BoardContent from "../BoardContent";
import { KanbanDataResponse } from "@/core/services/api/types";

const BoardWrapper = ({ data }: { data: KanbanDataResponse }) => {
  return (
    <BoardContextProvider data={data}>
      <BoardContent />
    </BoardContextProvider>
  );
};

export default BoardWrapper;
