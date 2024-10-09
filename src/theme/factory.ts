"use client";

import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

import { PaletteMode } from "@mui/material/styles";

export const themeFactory = ({ mode }: { mode: PaletteMode }) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: "#556cd6",
      },
      secondary: {
        main: "#19857b",
      },
      error: {
        main: red.A200,
      },
    },
    spacing: 8,
  });

export const defaultTheme = themeFactory({ mode: "light" });
