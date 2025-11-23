import { faker } from "@faker-js/faker";
import type { Product, PaginatedProducts } from "../../types/product.types";

const TOTAL_PRODUCTS = 10000;

const generateProductByIndex = (index: number): Product => {
  faker.seed(index + 1000);

  return {
    id: `product-${index + 1}`,
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: parseFloat(faker.commerce.price({ min: 10, max: 1000 })),
    image: faker.image.urlPicsumPhotos({
      width: 2000,
      height: 2000,
      grayscale: true,
    }),
    category: faker.commerce.department(),
    rating: parseFloat(faker.number.float({ min: 1, max: 5 }).toFixed(1)),
    stock: faker.number.int({ min: 0, max: 5 }),
    brand: faker.company.name(),
  };
};

export const getProducts = async (
  page: number = 1,
  limit: number = 50
): Promise<PaginatedProducts> => {
  const startIndex = (page - 1) * limit;
  const endIndex = Math.min(startIndex + limit, TOTAL_PRODUCTS);

  const products: Product[] = [];
  for (let i = startIndex; i < endIndex; i++) {
    products.push(generateProductByIndex(i));
  }

  return {
    products,
    total: TOTAL_PRODUCTS,
    page,
    limit,
    totalPages: Math.ceil(TOTAL_PRODUCTS / limit),
  };
};

export const getProductById = async (id: string): Promise<Product | null> => {
  const match = id.match(/product-(\d+)/);
  if (!match) return null;

  const index = parseInt(match[1], 10) - 1;
  if (index < 0 || index >= TOTAL_PRODUCTS) return null;

  return generateProductByIndex(index);
};
