import { DefaultMantineColor, Tuple } from "@mantine/core";

type ExtendedCustomColors = "customeColor" | DefaultMantineColor;

declare module "@mantine/core" {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, Tuple<string, 1>>;
  }
}
