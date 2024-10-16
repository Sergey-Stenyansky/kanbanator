import {
  Dialog,
  Stack,
  DialogContent,
  Typography,
  Button,
  DialogActions,
} from "@mui/material";
import { memo, useState, ChangeEvent, useEffect } from "react";
import Spacing from "@/primitives/Spacing";

import TextInput from "@/primitives/TextInput";
import { KanbanColumnItem } from "@/core/types";
import { useBoardContext } from "@/app/board/context";

export interface SetColumnModalProps {
  opened: boolean;
  onSubmit: (args?: { name?: string; deleteAction?: boolean }) => void;
  column?: KanbanColumnItem;
}

const SetColumnModal = ({ opened, onSubmit, column }: SetColumnModalProps) => {
  const { flowPermissions } = useBoardContext();
  const [name, setName] = useState("");
  useEffect(() => {
    if (!opened) return;
    setName(column?.name || "");
  }, [opened, column]);
  return (
    <Dialog open={opened} onClose={() => onSubmit()} scroll="paper">
      <DialogContent>
        <Stack>
          <Typography variant="h5">
            {column ? "Edit column" : "Create column"}
          </Typography>
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
        </Stack>
      </DialogContent>
      <DialogActions>
        {!!column && flowPermissions.canDeleteColumns && (
          <Button autoFocus onClick={() => onSubmit({ deleteAction: true })}>
            Delete column
          </Button>
        )}
        <Button
          autoFocus
          disabled={!name.trim()}
          onClick={() => onSubmit({ name })}
        >
          {column ? "Save changes" : "Create column"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default memo(SetColumnModal);
