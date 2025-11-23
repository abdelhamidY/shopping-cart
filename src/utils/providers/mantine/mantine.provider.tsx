import { createTheme, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import type { PropsWithChildren } from "react";

const theme = createTheme({
  spacing: {
    lg: "1.5rem",
    xl: "2.5rem",
    md: "1rem",
    sm: "0.5rem",
    xs: "0.25rem",
  },
});

const ThemeProvider = ({ children }: PropsWithChildren) => {
  return (
    <MantineProvider theme={theme}>
      <Notifications position="top-right" zIndex={1000} />
      {children}
    </MantineProvider>
  );
};

export default ThemeProvider;
