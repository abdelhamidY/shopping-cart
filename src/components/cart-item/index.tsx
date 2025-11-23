import { memo, useCallback } from "react";
import {
  Card,
  Image,
  Text,
  Group,
  ActionIcon,
  NumberInput,
  Flex,
  Box,
} from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import type { CartItem as CartItemType } from "../../types/cart.types";
import { useCartStore } from "../../stores/cartStore";

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const { product, quantity } = item;
  const itemTotal = product.price * quantity;

  const handleQuantityChange = useCallback((value: number | string) => {
    updateQuantity(product.id, Number(value) || 1);
  }, [product.id, updateQuantity]);

  const handleRemove = useCallback(() => {
    removeFromCart(product.id);
  }, [product.id, removeFromCart]);

  return (
    <Card shadow="sm" padding="md" radius="md" withBorder>
      <Flex gap="md" align="center">
        <Box w={80} h={80} style={{ flexShrink: 0 }}>
          <Image
            src={product.image}
            w={80}
            h={80}
            alt={product.name}
            radius="md"
            fit="cover"
          />
        </Box>

        <Box style={{ flex: 1, minWidth: 0 }}>
          <Text fw={500} lineClamp={1}>
            {product.name}
          </Text>
          <Text size="sm" c="dimmed">
            ${product.price.toFixed(2)} each
          </Text>
        </Box>

        <Group gap="md" align="center">
          <NumberInput
            value={quantity}
            onChange={handleQuantityChange}
            min={1}
            max={product.stock}
            w={80}
            size="sm"
            aria-label={`Quantity for ${product.name}`}
          />

          <Box w={100} ta="right">
            <Text fw={700} c="blue">
              ${itemTotal.toFixed(2)}
            </Text>
            <Text size="xs" c="dimmed">
              {quantity} × ${product.price.toFixed(2)}
            </Text>
          </Box>

          <ActionIcon
            color="red"
            variant="light"
            size="lg"
            onClick={handleRemove}
            aria-label={`Remove ${product.name} from cart`}
          >
            <IconTrash size={18} />
          </ActionIcon>
        </Group>
      </Flex>
    </Card>
  );
};

export default memo(CartItem);
