"use client";

import { KanbanUser } from "@/core/types";

import BoardContextProvider from "@/app/board/provider";

import BoardContent from "../BoardContent";

const BoardWrapper = ({ users }: { users: KanbanUser[] }) => {
  return (
    <BoardContextProvider users={users}>
      <BoardContent />
    </BoardContextProvider>
  );
};

export default BoardWrapper;
