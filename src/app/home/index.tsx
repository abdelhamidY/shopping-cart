import {
  Alert,
  Button,
  Card,
  Center,
  Container,
  Group,
  Indicator,
  Pagination,
  SegmentedControl,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import {
  IconAlertCircle,
  IconPackageOff,
  IconShoppingCart,
} from "@tabler/icons-react";
import { useCallback, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ProductCard from "../../components/product-card";
import ProductCardSkeleton from "../../components/product-card-skeleton";
import SEO from "../../components/seo";
import { useProducts } from "../../hooks/useProducts.hook";
import { selectTotalItems, useCartStore } from "../../stores/cartStore";
import { AppRoutes } from "../../utils/constants/appRoutes.constant";
import { VIEW_MODE_OPTIONS } from "../../utils/constants/viewMode.contant";

const ITEMS_PER_PAGE = 20;

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const navigate = useNavigate();

  const cartItemCount = useCartStore(selectTotalItems);

  const handlePageChange = useCallback(
    (newPage: number) => {
      setSearchParams({ page: String(newPage) });
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [setSearchParams]
  );

  const handleGoToFirstPage = useCallback(() => {
    setSearchParams({ page: "1" });
  }, [setSearchParams]);

  const handleViewModeChange = useCallback((value: string) => {
    setViewMode(value as "grid" | "list");
  }, []);

  const handleNavigateToCart = useCallback(() => {
    navigate(AppRoutes.cart);
  }, [navigate]);

  const { data, isLoading, isError, error } = useProducts(page, ITEMS_PER_PAGE);

  if (isLoading) {
    return (
      <>
        <SEO
          title="Smart Education - Browse Educational Products"
          description="Browse thousands of educational products including electronics, accessories, and learning tools. Find the perfect products for your educational needs."
        />
        <Container size="xl" py="xl">
          <Stack gap="lg">
            <Group justify="space-between" align="center">
              <Skeleton height={28} width={200} />
              <Group gap="md">
                <Skeleton height={36} width={100} radius="md" />
                <Skeleton height={36} width={80} radius="md" />
              </Group>
            </Group>
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="md">
              {Array.from({ length: 8 }).map(item => (
                <ProductCardSkeleton key={item as number} viewMode="grid" />
              ))}
            </SimpleGrid>
          </Stack>
        </Container>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <SEO
          title="Error - Smart Education"
          description="An error occurred while loading educational products. Please try again later."
        />
        <Container py="xl">
          <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red">
            {error?.message || "Failed to load products"}
          </Alert>
        </Container>
      </>
    );
  }

  if (!data?.products?.length) {
    return (
      <>
        <SEO
          title="No Products Found - Smart Education"
          description="No products found for the requested page. Browse our collection of educational products and tools."
        />
        <Container size="lg" py="xl">
          <Card shadow="sm" padding="xl" radius="md" withBorder ta="center">
            <IconPackageOff size={64} color="gray" />
            <Title order={2} mt="md">
              No Products Found
            </Title>
            <Text c="dimmed" mt="sm">
              The page you're looking for doesn't exist or has no products.
            </Text>
            <Button mt="xl" size="lg" onClick={handleGoToFirstPage}>
              Go to First Page
            </Button>
          </Card>
        </Container>
      </>
    );
  }

  return (
    <>
      <SEO
        title={`Educational Products - Page ${page} | Smart Education`}
        description={`Browse page ${page} of our collection of ${data?.total.toLocaleString()} educational products. Find electronics, accessories, and learning tools for all your educational needs.`}
      />
      <Container size="xl" py="xl">
        <Stack gap="lg">
          <Group justify="space-between" align="center">
            <Title order={1} size="xl">
              Products ({data?.total.toLocaleString()} items)
            </Title>
            <Group gap="md">
              <SegmentedControl
                value={viewMode}
                onChange={handleViewModeChange}
                data={VIEW_MODE_OPTIONS}
                aria-label="Switch between grid and list view modes"
              />
              <Indicator
                label={cartItemCount}
                size={18}
                disabled={cartItemCount === 0}
              >
                <Button
                  variant="light"
                  leftSection={<IconShoppingCart size={18} />}
                  onClick={handleNavigateToCart}
                >
                  Cart
                </Button>
              </Indicator>
            </Group>
          </Group>

          {viewMode === "grid" ? (
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="md">
              {data?.products.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  viewMode={viewMode}
                  index={index}
                />
              ))}
            </SimpleGrid>
          ) : (
            <Stack gap="md">
              {data?.products.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  viewMode={viewMode}
                  index={index}
                />
              ))}
            </Stack>
          )}

          <Center>
            <Pagination
              total={data?.totalPages || 1}
              value={page}
              onChange={handlePageChange}
              size="lg"
              radius="md"
            />
          </Center>
        </Stack>
      </Container>
    </>
  );
};

export default Home;
