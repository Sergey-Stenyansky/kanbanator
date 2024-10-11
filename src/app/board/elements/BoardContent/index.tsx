import { KanbanColumnItem, KanbanFlowItem } from "@/core/types";
import { Box, Stack, Typography } from "@mui/material";
import KanbanTaskCard from "@/components/KanbanTaskCard";

import Spacing from "@/primitives/Spacing";
import {
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
} from "@hello-pangea/dnd";

export interface BoardContentProps {
  flow: KanbanFlowItem | null;
}

const BoardContent = ({ flow }: BoardContentProps) => (
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: 3,
      ml: 2,
    }}
  >
    {flow?.columns.map((column, index) => (
      <BoardColumn key={index} item={column} />
    ))}
  </Box>
);

const BoardColumn = ({ item }: { item: KanbanColumnItem }) => {
  return (
    <Box>
      <Spacing v={1} />
      <Typography variant="h6">{item.name}</Typography>
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
