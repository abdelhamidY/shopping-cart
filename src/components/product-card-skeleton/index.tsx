import { Card, Skeleton, Group, Stack } from "@mantine/core";

interface ProductCardSkeletonProps {
  viewMode?: "grid" | "list";
}

const ProductCardSkeleton = ({ viewMode = "grid" }: ProductCardSkeletonProps) => {
  if (viewMode === "list") {
    return (
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group gap="md" align="flex-start" wrap="nowrap">
          <Skeleton height={120} width={120} radius="md" />
          <Stack gap="xs" style={{ flex: 1 }}>
            <Group justify="space-between">
              <Skeleton height={20} width="60%" />
              <Skeleton height={20} width={80} radius="xl" />
            </Group>
            <Skeleton height={14} width="100%" />
            <Skeleton height={14} width="80%" />
            <Group justify="space-between" mt="xs">
              <Skeleton height={24} width={80} />
              <Skeleton height={16} width={100} />
            </Group>
          </Stack>
        </Group>
      </Card>
    );
  }

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Skeleton height={160} radius={0} />
      </Card.Section>
      <Stack gap="xs" mt="md">
        <Skeleton height={20} width="80%" />
        <Skeleton height={20} width={80} radius="xl" />
        <Skeleton height={14} width="100%" />
        <Skeleton height={14} width="90%" />
        <Group justify="space-between" mt="xs">
          <Skeleton height={24} width={80} />
          <Skeleton height={16} width={80} />
        </Group>
      </Stack>
    </Card>
  );
};

export default ProductCardSkeleton;
