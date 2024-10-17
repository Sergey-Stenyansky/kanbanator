import { KanbanColumnItem } from "@/core/types";
import { Box, Stack, Typography, Button } from "@mui/material";
import KanbanTaskCard from "@/components/KanbanTaskCard";

import Spacing from "@/primitives/Spacing";
import {
  DragDropContext,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
} from "@hello-pangea/dnd";
import { useToggle } from "react-use";
import SetColumnModal from "../SetColumnModal";
import { useBoardContext } from "@/app/board/context";
import { flowActions } from "@/core/reducers/flow";
import { Add } from "@mui/icons-material";

import { useKanbanFlow } from "@/app/board/hooks";
import KanbanTaskModal from "@/components/modals/KanbanTaskModal";
import { Suspense } from "react";

const boardContentStyles = {
  display: "grid",
  gridAutoColumns: "300px",
  gridAutoFlow: "column",
  overflow: "auto",
  gap: 3,
  padding: 1,
  minHeight: "720px",
};

const BoardContent = () => {
  const { flowState, onDragEnd, flowDispatch } = useKanbanFlow();
  const [opened, setOpened] = useToggle(false);
  const handleSumbit = (args?: { name?: string; deleteAction?: boolean }) => {
    if (!args) {
      return setOpened(false);
    }
    if (args.name) {
      flowDispatch(flowActions.add(args.name));
      return setOpened(false);
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box sx={{ p: 2 }}>
        <Box>
          <Button autoFocus startIcon={<Add />} onClick={() => setOpened(true)}>
            Add Column
          </Button>
        </Box>
        <Box sx={boardContentStyles}>
          {flowState.flow?.columns.map((column, index) => (
            <BoardColumn key={index} item={column} />
          ))}
          <SetColumnModal opened={opened} onSubmit={handleSumbit} />
        </Box>
      </Box>
      <Suspense fallback={null}>
        <KanbanTaskModal />
      </Suspense>
    </DragDropContext>
  );
};

const BoardColumn = ({ item }: { item: KanbanColumnItem }) => {
  const [opened, setOpened] = useToggle(false);
  const { flowDispatch, setTaskId } = useBoardContext();
  const handleSumbit = (args?: { name?: string; deleteAction?: boolean }) => {
    if (!args) {
      return setOpened(false);
    }
    if (args.name) {
      flowDispatch(flowActions.update(item.id, args.name));
      return setOpened(false);
    }
    if (args.deleteAction) {
      flowDispatch(flowActions.remove(item.id));
      return setOpened(false);
    }
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Spacing v={1} />
      <Typography
        sx={{ cursor: "pointer" }}
        onClick={() => setOpened(true)}
        variant="h6"
      >
        {item.name}
      </Typography>
      <SetColumnModal opened={opened} onSubmit={handleSumbit} column={item} />
      <Spacing v={1} />
      <Droppable droppableId={"column-" + item.id}>
        {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
          <Stack
            ref={provided.innerRef}
            sx={{
              backgroundColor: snapshot.isDraggingOver
                ? "lightgreen"
                : "lightblue",
              height: "100%",
              flex: 1,
            }}
            p={1}
            gap={1}
            useFlexGap
            {...provided.droppableProps}
          >
            {item.tasks.map((task, index) => (
              <KanbanTaskCard
                index={index}
                key={task.id}
                task={task}
                onClick={() => setTaskId(task.id)}
              />
            ))}
          </Stack>
        )}
      </Droppable>
    </Box>
  );
};

export default BoardContent;
