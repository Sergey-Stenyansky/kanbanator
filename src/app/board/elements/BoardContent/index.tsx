import {
  KanbanColumnItem,
  KanbanFlowItem,
  KanbanTaskConfig,
} from "@/core/types";
import { Box, Stack, Typography, Button, IconButton } from "@mui/material";
import KanbanTaskCard from "@/components/KanbanTaskCard";

import Spacing from "@/primitives/Spacing";
import {
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
} from "@hello-pangea/dnd";
import { useToggle } from "react-use";
import SetColumnModal from "../SetColumnModal";
import { useBoardContext } from "@/app/board/context";
import { flowActions } from "@/core/reducers/flow";
import { Add } from "@mui/icons-material";
import InternalIcon from "@/primitives/InternalIcon";
import SetKanbanTaskModal from "@/components/modals/SetKanbanTaskModal";

export interface BoardContentProps {
  flow: KanbanFlowItem | null;
}

const boardContentStyles = {
  display: "grid",
  gridAutoColumns: "300px",
  gridAutoFlow: "column",
  overflow: "auto",
  gap: 3,
  padding: 1,
  minHeight: "720px",
};

const BoardContent = ({ flow }: BoardContentProps) => {
  const { flowDispatch } = useBoardContext();
  const [opened, setOpened] = useToggle(false);
  const handleSumbit = (args?: { name?: string; deleteAction?: boolean }) => {
    if (!args) {
      return setOpened(false);
    }
    if (args.name) {
      flowDispatch(flowActions.addColumn(args.name));
      return setOpened(false);
    }
  };
  return (
    <Box sx={{ p: 2 }}>
      <Box>
        <Button autoFocus startIcon={<Add />} onClick={() => setOpened(true)}>
          Add Column
        </Button>
      </Box>
      <Box sx={boardContentStyles}>
        {flow?.columns.map((column, index) => (
          <BoardColumn key={index} item={column} />
        ))}
        <SetColumnModal opened={opened} onSubmit={handleSumbit} />
      </Box>
    </Box>
  );
};

const BoardColumn = ({ item }: { item: KanbanColumnItem }) => {
  const [addColumnOpened, setAddColumnOpened] = useToggle(false);
  const [addTaskOpened, setAddTaskOpened] = useToggle(false);
  const { flowDispatch } = useBoardContext();
  const handleSumbitAddColumn = (args?: {
    name?: string;
    deleteAction?: boolean;
  }) => {
    if (!args) {
      return setAddColumnOpened(false);
    }
    if (args.name) {
      flowDispatch(flowActions.updateColumn(item.id, args.name));
      return setAddColumnOpened(false);
    }
    if (args.deleteAction) {
      flowDispatch(flowActions.removeColumn(item.id));
      return setAddColumnOpened(false);
    }
  };
  const handleSubmitAddTask = (args?: KanbanTaskConfig) => {
    if (!args) {
      return setAddTaskOpened(false);
    }
    flowDispatch(flowActions.addTask(item.id, args));
    setAddTaskOpened(false);
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Spacing v={1} />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          sx={{ cursor: "pointer" }}
          onClick={() => setAddColumnOpened(true)}
          variant="h6"
        >
          {item.name}
        </Typography>
        <IconButton onClick={() => setAddTaskOpened(true)}>
          <InternalIcon icon="add" />
        </IconButton>
      </Box>
      <SetColumnModal
        opened={addColumnOpened}
        onSubmit={handleSumbitAddColumn}
        column={item}
      />
      <SetKanbanTaskModal
        opened={addTaskOpened}
        onSubmit={handleSubmitAddTask}
      />
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
              <KanbanTaskCard index={index} key={task.id} task={task} />
            ))}
          </Stack>
        )}
      </Droppable>
    </Box>
  );
};

export default BoardContent;
