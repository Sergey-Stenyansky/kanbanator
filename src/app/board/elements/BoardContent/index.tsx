import { KanbanColumnItem, KanbanFlowItem } from "@/core/types";
import { Box, Stack, Typography, Button } from "@mui/material";
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

export interface BoardContentProps {
  flow: KanbanFlowItem | null;
}

const BoardContent = ({ flow }: BoardContentProps) => {
  const { flowDispatch } = useBoardContext();
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
    <Box sx={{ m: 2 }}>
      <Button autoFocus startIcon={<Add />} onClick={() => setOpened(true)}>
        Add Column
      </Button>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 3,
        }}
      >
        {flow?.columns.map((column, index) => (
          <BoardColumn key={index} item={column} />
        ))}
        <SetColumnModal opened={opened} onSubmit={handleSumbit} />
      </Box>
    </Box>
  );
};

const BoardColumn = ({ item }: { item: KanbanColumnItem }) => {
  const [opened, setOpened] = useToggle(false);
  const { flowDispatch } = useBoardContext();
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
    <Box>
      <Spacing v={1} />
      <Typography
        sx={{ cursor: "pointer" }}
        onClick={() => setOpened(true)}
        variant="h6"
      >
        {item.name}
      </Typography>
      <SetColumnModal opened={opened} onSubmit={handleSumbit} column={item} />
      <Spacing v={2} />
      <Droppable droppableId={"column-" + item.id}>
        {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
          <Stack
            ref={provided.innerRef}
            sx={{
              backgroundColor: snapshot.isDraggingOver
                ? "lightgreen"
                : "lightblue",
              height: "100%",
            }}
            ml={1}
            mb={1}
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
