import { useParams, useNavigate } from "react-router-dom";
import { useCallback } from "react";
import {
  Container,
  Grid,
  Image,
  Text,
  Badge,
  Group,
  Button,
  Rating,
  Stack,
  Loader,
  Center,
  Alert,
  Card,
  Title,
} from "@mantine/core";
import {
  IconArrowLeft,
  IconAlertCircle,
  IconShoppingCart,
} from "@tabler/icons-react";
import { useProduct } from "../../hooks/useProduct.hook";
import { useCartStore } from "../../stores/cartStore";
import SEO from "../../components/seo";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import { AppRoutes } from "../../utils/constants/appRoutes.constant";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: product, isLoading, isError, error } = useProduct(id || "");
  const addToCart = useCartStore(state => state.addToCart);
  const items = useCartStore(state => state.items);

  const currentCartItem = product
    ? items.find(item => item.product.id === product.id)
    : null;
  const isAtMaxQuantity =
    currentCartItem && product
      ? currentCartItem.quantity >= product.stock
      : false;

  const handleBackToProducts = useCallback(() => {
    navigate(AppRoutes.home);
  }, [navigate]);

  const handleViewCart = useCallback(() => {
    navigate(AppRoutes.cart);
  }, [navigate]);

  const handleAddToCart = useCallback(() => {
    if (!product) return;

    const result = addToCart(product);

    if (result.success) {
      notifications.show({
        title: "Success",
        message: "Product added to cart successfully",
        color: "green",
        icon: <IconCheck size={18} />,
      });
    } else if (result.reason === "out-of-stock") {
      notifications.show({
        title: "Out of Stock",
        message: "This product is currently out of stock",
        color: "red",
        icon: <IconX size={18} />,
      });
    } else if (result.reason === "max-quantity") {
      notifications.show({
        title: "Maximum Quantity Reached",
        message: "Cannot add more items - maximum quantity already in cart",
        color: "orange",
        icon: <IconX size={18} />,
      });
    }
  }, [product, addToCart]);

  if (isLoading) {
    return (
      <>
        <SEO
          title="Loading Product - Smart Education"
          description="Loading product details. Please wait..."
        />
        <Center
          h="100vh"
          role="status"
          aria-live="polite"
          aria-label="Loading product details"
        >
          <Loader size="xl" />
        </Center>
      </>
    );
  }

  if (isError || !product) {
    return (
      <>
        <SEO
          title="Product Not Found - Smart Education"
          description="The requested product could not be found. Browse our collection of educational products instead."
        />
        <Container py="xl">
          <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red">
            {error?.message || "Product not found"}
          </Alert>
          <Button
            leftSection={<IconArrowLeft size={16} />}
            variant="light"
            mt="md"
            onClick={handleBackToProducts}
          >
            Back to Products
          </Button>
        </Container>
      </>
    );
  }

  return (
    <>
      <SEO
        title={`${product.name} - ${product.category} | Smart Education`}
        description={`${product.description} - Price: $${product.price.toFixed(
          2
        )}. Brand: ${product.brand}. Rating: ${product.rating}/5. ${
          product.stock > 0 ? `${product.stock} in stock` : "Out of stock"
        }.`}
        keywords={`${product.name}, ${product.category}, ${product.brand}, education, learning`}
        type="product"
        ogImage={product.image}
      />
      <Container size="lg" py="xl">
        <Button
          leftSection={<IconArrowLeft size={16} />}
          variant="light"
          mb="xl"
          onClick={handleBackToProducts}
        >
          Back to Products
        </Button>

        <Card shadow="sm" padding="xl" radius="md" withBorder>
          <Grid gutter="xl">
            <Grid.Col span={{ base: 12, md: 5 }}>
              <Image
                src={product.image}
                alt={product.name}
                radius="md"
                fit="cover"
                h={400}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 7 }}>
              <Stack gap="md">
                <Badge color="blue" variant="light" size="lg" w="fit-content">
                  {product.category}
                </Badge>

                <Title order={1} size="xl">
                  {product.name}
                </Title>

                <Group>
                  <Rating
                    value={product.rating}
                    fractions={2}
                    readOnly
                    aria-label={`Product rating: ${product.rating} out of 5 stars`}
                  />
                  <Text size="sm" c="dimmed">
                    ({product.rating.toFixed(1)})
                  </Text>
                </Group>

                <Text size="xl" fw={700} c="blue">
                  ${product.price.toFixed(2)}
                </Text>

                <Text c="dimmed">{product.description}</Text>

                <Group gap="xl" mt="md">
                  <div>
                    <Text size="sm" c="dimmed">
                      Brand
                    </Text>
                    <Text fw={500}>{product.brand}</Text>
                  </div>
                  <div>
                    <Text size="sm" c="dimmed">
                      Stock
                    </Text>
                    <Text fw={500} c={product.stock > 0 ? "green" : "red"}>
                      {product.stock > 0
                        ? `${product.stock} available`
                        : "Out of stock"}
                    </Text>
                  </div>
                </Group>

                <Group mt="xl">
                  <Button
                    size="lg"
                    disabled={product.stock === 0 || isAtMaxQuantity}
                    leftSection={<IconShoppingCart size={18} />}
                    onClick={handleAddToCart}
                  >
                    {isAtMaxQuantity ? "Max Quantity in Cart" : "Add to Cart"}
                  </Button>
                  <Button size="lg" variant="outline" onClick={handleViewCart}>
                    View Cart
                  </Button>
                </Group>
              </Stack>
            </Grid.Col>
          </Grid>
        </Card>
      </Container>
    </>
  );
};

export default ProductDetails;
