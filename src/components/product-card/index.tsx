import { Card, Text, Badge, Group, Rating, Flex, Box } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import type { Product } from "../../types/product.types";
import React, { useCallback } from "react";
import LazyImage from "../lazy-image";
import { AppRoutes } from "../../utils/constants/appRoutes.constant";

interface ProductCardProps {
  product: Product;
  viewMode: "grid" | "list";
  index?: number;
}

const ProductCard = ({ product, viewMode, index = 0 }: ProductCardProps) => {
  const isAboveFold = index < 4;
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate(`${AppRoutes.productDetails(product.id)}`);
  }, [navigate, product.id]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  }, []);

  if (viewMode === "list") {
    return (
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="link"
        aria-label={`View details for ${
          product.name
        } - $${product.price.toFixed(2)}`}
        style={{ cursor: "pointer" }}
      >
        <Flex gap="md" align="flex-start">
          <Box w={120} h={120} style={{ flexShrink: 0 }}>
            <LazyImage
              src={product.image}
              alt={product.name}
              height={120}
              width={120}
              radius="md"
              fit="cover"
              priority={isAboveFold}
            />
          </Box>
          <Box style={{ flex: 1, minWidth: 0 }}>
            <Group justify="space-between" mb="xs" wrap="nowrap">
              <Text fw={500} lineClamp={1} style={{ flex: 1 }}>
                {product.name}
              </Text>
              <Badge color="blue" variant="light" style={{ flexShrink: 0 }}>
                {product.category}
              </Badge>
            </Group>
            <Text size="sm" c="dimmed" lineClamp={2} mb="xs">
              {product.description}
            </Text>
            <Group justify="space-between" align="center">
              <Text fw={700} size="lg" c="blue">
                ${product.price.toFixed(2)}
              </Text>
              <Rating
                value={product.rating}
                fractions={2}
                readOnly
                size="sm"
                aria-label={`Rating: ${product.rating} out of 5 stars`}
              />
            </Group>
          </Box>
        </Flex>
      </Card>
    );
  }

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="link"
      aria-label={`View details for ${product.name} - $${product.price.toFixed(
        2
      )}`}
      style={{ cursor: "pointer" }}
    >
      <Card.Section>
        <LazyImage
          src={product.image}
          alt={product.name}
          height={160}
          fit="cover"
          priority={isAboveFold}
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500} lineClamp={1} style={{ flex: 1 }}>
          {product.name}
        </Text>
      </Group>

      <Badge color="blue" variant="light" mb="xs">
        {product.category}
      </Badge>

      <Text size="sm" c="dimmed" lineClamp={2} mb="sm">
        {product.description}
      </Text>

      <Group justify="space-between" align="center">
        <Text fw={700} size="lg" c="blue">
          ${product.price.toFixed(2)}
        </Text>
        <Rating
          value={product.rating}
          fractions={2}
          readOnly
          size="xs"
          aria-label={`Rating: ${product.rating} out of 5 stars`}
        />
      </Group>
    </Card>
  );
};

export default React.memo(ProductCard);
