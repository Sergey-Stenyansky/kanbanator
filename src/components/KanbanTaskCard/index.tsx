import { KanbanTaskItem, KanbanTaskPriority, KanbanUser } from "@/core/types";
import {
  CardContent,
  Typography,
  Box,
  Chip,
  Avatar,
  AvatarGroup,
  Card,
  Divider,
} from "@mui/material";
import { flexJcStart, flexSpaceBetween } from "@/theme/commonStyles";
import Spacing from "@/primitives/Spacing";

import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
} from "@hello-pangea/dnd";
import { useToggle } from "react-use";
import KanbanTaskModal from "../modals/KanbanTaskModal";

import { taskPriorityColorsMap } from "@/core/helpers/constant";

import styles from "./style.module.css";
import { useEffect } from "react";

const KanbanTaskCard = ({
  task,
  index,
  forceOpen,
}: {
  task: KanbanTaskItem;
  index: number;
  forceOpen?: boolean;
}) => {
  const [opened, toggleOpened] = useToggle(false);
  useEffect(() => {
    if (forceOpen) {
      const open = () => toggleOpened(true);
      setTimeout(open, 200);
    }
  }, [forceOpen, toggleOpened]);
  return (
    <>
      <Draggable draggableId={"task-" + task.id} index={index}>
        {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
          <Card
            ref={provided.innerRef}
            sx={{ backgroundColor: snapshot.isDragging ? "lightcoral" : "" }}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={toggleOpened}
          >
            <CardContent>
              <KanbanTaskCardHeader
                title={task.name}
                id={task.id}
                priority={task.priority}
              />
              <Divider />
              <Spacing v={1} />
              <KanbanTaskCardFooter
                assingedTo={task.assignedTo}
                labels={task.labels}
              />
            </CardContent>
          </Card>
        )}
      </Draggable>
      <KanbanTaskModal
        opened={opened}
        onChangeOpened={toggleOpened}
        task={task}
      />
    </>
  );
};

const KanbanTaskCardFooter = ({
  labels,
  assingedTo,
}: {
  labels: string[];
  assingedTo: KanbanUser[];
}) => (
  <Box sx={{ ...flexSpaceBetween, alignItems: "center" }}>
    {!!labels && (
      <Box sx={flexJcStart} gap={1}>
        {labels.map((label, index) => (
          <Chip key={index} label={label} />
        ))}
      </Box>
    )}
    {!!assingedTo.length && (
      <AvatarGroup max={3} classes={{ avatar: styles.avatar }}>
        {assingedTo.map((user) => (
          <Avatar key={user.id} alt={user.name} src={user.avatarUrl} />
        ))}
      </AvatarGroup>
    )}
  </Box>
);

const KanbanTaskCardHeader = ({
  title,
  id,
  priority,
}: {
  title: string;
  id: number;
  priority: KanbanTaskPriority;
}) => (
  <Box sx={flexSpaceBetween}>
    <Typography gutterBottom sx={{ fontSize: 16 }}>
      {title}
    </Typography>
    <Box gap={2} sx={flexJcStart}>
      <Typography
        gutterBottom
        color={taskPriorityColorsMap[priority]}
        fontWeight="fontWeightBold"
      >
        {priority.toUpperCase()}
      </Typography>
      <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
        #{id}
      </Typography>
    </Box>
  </Box>
);

export default KanbanTaskCard;
