import type { Metadata } from "next";
import {
  AppBar,
  CssBaseline,
  ThemeProvider,
  Toolbar,
  Typography,
  Avatar,
} from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";

import { defaultTheme } from "@/theme/factory";
import Link from "next/link";

import styles from "./styles.module.css";
import Spacing from "@/primitives/Spacing";

export const metadata: Metadata = {
  title: "Kanbanator",
  description: "Simple Kanban board management app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ minHeight: "100vh" }}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={defaultTheme}>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Kanbanator
                </Typography>
                <Link className={styles.profileLink} href="/profile">
                  <Typography>Jacob Burton</Typography>
                  <Spacing h={2} />
                  <Avatar alt="Jacob Burton" src="https://i.pravatar.cc/300" />
                </Link>
              </Toolbar>
            </AppBar>
            {children}
            <CssBaseline />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
