import { memo } from "react";
import { icons } from "./icons";
import type { IconFontSize, IconColor } from "@/theme/types";
import { SxProps } from "@mui/material";

export type InternalIcons = keyof typeof icons;

interface InternalIconProps {
  icon: InternalIcons;
  size?: IconFontSize;
  color?: IconColor;
  htmlColor?: string;
  sx?: SxProps;
}

function InternalIcon({ icon, size, color, htmlColor, sx }: InternalIconProps) {
  const Component = icons[icon];
  return (
    <Component fontSize={size} color={color} htmlColor={htmlColor} sx={sx} />
  );
}

export default memo(InternalIcon);
