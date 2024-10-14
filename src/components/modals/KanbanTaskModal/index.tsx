import { KanbanTaskItem } from "@/core/types";
import {
  Dialog,
  Stack,
  DialogContent,
  Typography,
  Box,
  Chip,
  Divider,
} from "@mui/material";
import { memo } from "react";

import BaseCell from "@/primitives/Cells/Base";

import styles from "./styles.module.css";
import Spacing from "@/primitives/Spacing";

import KanbanTaskCommentCard from "@/components/KanbanTaskCommentCard";
import formatDate, { DateFormat } from "@/helpers/date/format";

import { taskPriorityColorsMap } from "@/core/helpers/constant";

export interface KanbanTaksModalProps {
  opened: boolean;
  onChangeOpened: (value: boolean) => void;
  task: KanbanTaskItem;
}

const KanbanTaskModal = ({
  opened,
  onChangeOpened,
  task,
}: KanbanTaksModalProps) => {
  return (
    <Dialog
      classes={{ paper: styles.container }}
      open={opened}
      onClose={onChangeOpened}
      scroll="paper"
      maxWidth={false}
    >
      <DialogContent classes={{ root: styles.content }}>
        <Stack className={styles.left}>
          <Typography variant="h5">{task.name}</Typography>
          <Spacing v={2} />
          <Typography>{task.description}</Typography>
          {!!task.labels.length && (
            <>
              <Spacing v={2} />
              <Box className={styles.labelContainer}>
                {task.labels.map((label, index) => (
                  <Chip key={index} label={label} />
                ))}
              </Box>
            </>
          )}
          <Spacing v={2} />
          <Typography variant="h6">Comments</Typography>
          <Divider />
          <Spacing v={2} />
          <Stack gap={1} useFlexGap>
            {task.comments.map((item) => (
              <KanbanTaskCommentCard key={item.id} item={item} />
            ))}
          </Stack>
          <Spacing v={2} />
        </Stack>
        <Stack className={styles.right}>
          <BaseCell text="Task Id" value={"#" + task.id} />
          <BaseCell text="Created by" value={task.createdBy.name} />
          <BaseCell text="Assigned to" value={task.assignedTo[0]?.name || ""} />
          {task.assignedTo.slice(1).map((assignee) => (
            <BaseCell key={assignee.id} text="" value={assignee.name} />
          ))}
          <BaseCell
            text="Priority"
            value={
              <Typography
                fontWeight="fontWeightBold"
                color={taskPriorityColorsMap[task.priority]}
              >
                {task.priority.toLocaleUpperCase()}
              </Typography>
            }
          />
          <BaseCell
            text="Due to"
            value={formatDate(task.deadline, DateFormat.date)}
          />
          <BaseCell
            text="Created at"
            value={formatDate(task.createdAt, DateFormat.date)}
          />
          <BaseCell
            text="Edited at"
            value={formatDate(task.editedAt, DateFormat.date)}
          />
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default memo(KanbanTaskModal);
