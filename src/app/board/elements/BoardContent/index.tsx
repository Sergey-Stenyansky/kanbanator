import { KanbanColumnItem, KanbanFlowItem } from "@/core/types";
import { Box, Stack, Typography } from "@mui/material";
import KanbanTaskCard from "@/components/KanbanTaskCard";

import Spacing from "@/primitives/Spacing";

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
      <Stack ml={1} mb={1} useFlexGap gap={1}>
        {item.tasks.map((task) => (
          <KanbanTaskCard key={task.id} task={task} />
        ))}
      </Stack>
    </Box>
  );
};

export default BoardContent;
