import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../utils/helpers/productService";

export const useProducts = (page: number = 1, limit: number = 50) => {
  return useQuery({
    queryKey: ["products", page, limit],
    queryFn: () => getProducts(page, limit),
    placeholderData: previousData => previousData,
  });
};
