import type { Metadata } from "next";
import localFont from "next/font/local";
import {
  AppBar,
  CssBaseline,
  IconButton,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";

import AccountCircle from "@mui/icons-material/AccountCircle";
import { defaultTheme } from "@/theme/factory";

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
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={defaultTheme}>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Kanbanator
                </Typography>
                <IconButton size="large" color="inherit">
                  <AccountCircle />
                </IconButton>
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
