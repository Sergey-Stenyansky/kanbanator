import { KanbanTaskConfig, KanbanTaskPriority } from "@/core/types";
import {
  Dialog,
  DialogContent,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  DialogActions,
  Button,
} from "@mui/material";

import { memo, ChangeEvent, useState, useEffect } from "react";

import ContextMenuItem from "@/primitives/ContextMenuItem";

import Spacing from "@/primitives/Spacing";

import TextInput from "@/primitives/TextInput";
import ContextMenu from "@/primitives/ContextMenu";
import { useToggle } from "react-use";

import styles from "./styles.module.css";

import DateField from "@/primitives/DateField";

export interface SetKanbanTaksModalProps {
  opened: boolean;
  onSubmit: (args?: KanbanTaskConfig) => void;
}

export type TaskPriorityItem = {
  text: string;
  value: KanbanTaskPriority;
};

export const priorityItems: TaskPriorityItem[] = [
  { text: "Low", value: KanbanTaskPriority.low },
  { text: "Medium", value: KanbanTaskPriority.medium },
  { text: "High", value: KanbanTaskPriority.high },
  { text: "Critical", value: KanbanTaskPriority.critical },
];

const SetKanbanTaskModal = ({ opened, onSubmit }: SetKanbanTaksModalProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<KanbanTaskPriority | undefined>();
  const [contextOpen, setContextOpen] = useToggle(false);
  const [deadline, setDeadline] = useState("");

  const isValid = !!name.trim();

  useEffect(() => {
    if (!opened) return;
    setName("");
    setDescription("");
    setPriority(undefined);
    setDeadline("");
  }, [opened]);

  return (
    <Dialog
      classes={{ paper: styles.container }}
      open={opened}
      onClose={() => onSubmit()}
      scroll="paper"
      maxWidth={false}
    >
      <DialogContent>
        <Typography variant="h5">New Task</Typography>
        <Spacing v={2} />
        <TextInput
          sx={{ width: "100%" }}
          label="Name"
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
          onClear={() => setName("")}
          required
        />
        <Spacing v={2} />
        <TextInput
          sx={{ width: "100%" }}
          label="Description"
          value={description}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setDescription(e.target.value)
          }
          onClear={() => setDescription("")}
          multiline
          rows={4}
        />
        <Spacing v={1} />
        <ContextMenu
          open={contextOpen}
          onChangeOpen={setContextOpen}
          onSelect={(value: KanbanTaskPriority) => setPriority(value)}
          trigger={(context, ref) => (
            <List ref={ref}>
              <ListItemButton onClick={context.toggle} sx={{ padding: 0 }}>
                <ListItemText
                  primary="Priority"
                  secondary={
                    priorityItems.find((item) => item.value === priority)
                      ?.text || "Set priority"
                  }
                />
              </ListItemButton>
            </List>
          )}
          popup={(context) => (
            <>
              {priorityItems.map((item) => (
                <ContextMenuItem
                  key={item.value}
                  value={item.value}
                  primary={item.text}
                  onClick={context.submit}
                  selected={item.value === priority}
                  label={item.text}
                />
              ))}
            </>
          )}
        />
        <Spacing v={2} />
        <DateField title="Due to" value={deadline} onChange={setDeadline} />
      </DialogContent>
      <DialogActions>
        <Button
          disabled={!isValid}
          autoFocus
          onClick={() => {
            onSubmit({ name, description, priority, deadline, assignedTo: [] });
          }}
        >
          Create Task
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default memo(SetKanbanTaskModal);
