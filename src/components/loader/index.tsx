import { Loader as MantineLoader, Stack, Button, Text } from "@mantine/core";
import type { LoaderProps } from "./LoaderProps.types";

export default function Loader({
  error,
  isLoading,
  pastDelay,
  retry,
  timedOut,
  isSmall,
}: LoaderProps) {
  if (isLoading) {
    return (
      <Stack h="90vh" justify="center" align="center" role="status" aria-live="polite" aria-label="Loading content">
        <MantineLoader size={isSmall ? "sm" : "xl"} color="blue" />
      </Stack>
    );
  }

  if (error) {
    return (
      <Stack align="center" mt="md">
        <Text c="red">Error!</Text>
        <Button onClick={retry}>Retry</Button>
      </Stack>
    );
  }

  if (timedOut) {
    return (
      <Stack align="center" mt="md">
        <Text>Taking a long time...</Text>
        <Button onClick={retry}>Retry</Button>
      </Stack>
    );
  }

  if (pastDelay) {
    return (
      <Stack align="center" mt="md">
        <Text>Loading...</Text>
      </Stack>
    );
  }

  return null;
}
