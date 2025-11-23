import {
  Container,
  Title,
  Text,
  Stack,
  Group,
  Button,
  Card,
  Divider,
} from "@mantine/core";
import { IconArrowLeft, IconTrash, IconShoppingCart } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { useCartStore, selectTotalItems, selectTotalPrice } from "../../stores/cartStore";
import CartItem from "../../components/cart-item";
import SEO from "../../components/seo";
import { AppRoutes } from "../../utils/constants/appRoutes.constant";

const Cart = () => {
  const navigate = useNavigate();

  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const totalItems = useCartStore(selectTotalItems);
  const totalPrice = useCartStore(selectTotalPrice);

  const handleContinueShopping = useCallback(() => {
    navigate(AppRoutes.home);
  }, [navigate]);

  const handleClearCart = useCallback(() => {
    clearCart();
  }, [clearCart]);

  if (items.length === 0) {
    return (
      <>
        <SEO
          title="Shopping Cart - Smart Education"
          description="Your shopping cart is empty. Browse our collection of educational products and add items to your cart."
        />
        <Container size="lg" py="xl">
        <Button
          leftSection={<IconArrowLeft size={16} />}
          variant="light"
          mb="xl"
          onClick={handleContinueShopping}
        >
          Continue Shopping
        </Button>

        <Card shadow="sm" padding="xl" radius="md" withBorder ta="center">
          <IconShoppingCart size={64} color="gray" />
          <Title order={2} mt="md">
            Your cart is empty
          </Title>
          <Text c="dimmed" mt="sm">
            Add some products to your cart to see them here.
          </Text>
          <Button mt="xl" size="lg" onClick={handleContinueShopping}>
            Browse Products
          </Button>
        </Card>
      </Container>
      </>
    );
  }

  return (
    <>
      <SEO
        title={`Shopping Cart (${totalItems} ${totalItems === 1 ? 'item' : 'items'}) - Smart Education`}
        description={`Review your cart with ${totalItems} ${totalItems === 1 ? 'item' : 'items'} totaling $${totalPrice.toFixed(2)}. Complete your purchase of educational products.`}
      />
      <Container size="lg" py="xl">
      <Group justify="space-between" mb="xl">
        <Button
          leftSection={<IconArrowLeft size={16} />}
          variant="light"
          onClick={handleContinueShopping}
        >
          Continue Shopping
        </Button>
        <Button
          leftSection={<IconTrash size={16} />}
          variant="light"
          color="red"
          onClick={handleClearCart}
        >
          Clear Cart
        </Button>
      </Group>

      <Title order={1} mb="xl">
        Shopping Cart ({totalItems} {totalItems === 1 ? "item" : "items"})
      </Title>

      <Stack gap="md">
        {items.map((item) => (
          <CartItem key={item.product.id} item={item} />
        ))}
      </Stack>

      <Card shadow="sm" padding="lg" radius="md" withBorder mt="xl">
        <Stack gap="sm">
          <Group justify="space-between">
            <Text size="lg">Subtotal ({totalItems} items)</Text>
            <Text size="lg" fw={500}>
              ${totalPrice.toFixed(2)}
            </Text>
          </Group>
          <Divider />
          <Group justify="space-between">
            <Text size="xl" fw={700}>
              Total
            </Text>
            <Text size="xl" fw={700} c="blue">
              ${totalPrice.toFixed(2)}
            </Text>
          </Group>
          <Button size="lg" mt="md" fullWidth>
            Proceed to Checkout
          </Button>
        </Stack>
      </Card>
    </Container>
    </>
  );
};

export default Cart;
