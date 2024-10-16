import { memo, useState, ReactElement } from "react";

import { Menu, Stack } from "@mui/material";
import { isBoolean } from "@/helpers/type";

type ContextMenuArgs = {
  toggle: () => void;
  submit: (value: any) => void;
};

type ContextMenuCb = (
  args: ContextMenuArgs,
  triggerRef?: (el: Element | null) => void
) => ReactElement;

interface ComponentProps {
  trigger: ContextMenuCb;
  popup: ContextMenuCb;
  open: boolean;
  onChangeOpen: (value: boolean) => void;
  onSelect: (value: any) => void;
}

const menuWrapperStyles = { minWidth: 180 };

const ContextMenu = ({
  trigger,
  popup,
  open,
  onChangeOpen,
  onSelect,
}: ComponentProps) => {
  const [triggerElement, setTriggerElement] = useState<Element | null>(null);
  const context = {
    toggle: (value?: boolean) =>
      isBoolean(value) ? onChangeOpen(value) : onChangeOpen(!open),
    submit: (value: any) => {
      onSelect(value);
      onChangeOpen(false);
    },
  };
  return (
    <>
      {trigger(context, setTriggerElement)}
      <Menu
        open={open}
        onClose={() => context.toggle(false)}
        anchorEl={triggerElement}
      >
        <Stack sx={menuWrapperStyles}>{popup(context)}</Stack>
      </Menu>
    </>
  );
};

export default memo(ContextMenu);
