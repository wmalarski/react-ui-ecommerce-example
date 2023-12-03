import { calculateSkip } from "@/services/calculate-skip";
import { jsonFetcher } from "./fetcher";
import type { Product, Products } from "./types";

export const PRODUCTS_DEFAULT_LIMIT = 10;
export const PRODUCTS_FIRST_PAGE = 1;

type GetProductsArgs = {
  limit?: number;
  page?: number;
};

export const getProducts = ({
  limit = PRODUCTS_DEFAULT_LIMIT,
  page = PRODUCTS_FIRST_PAGE,
}: GetProductsArgs) => {
  return jsonFetcher<Products>({
    path: "/products",
    query: { limit, skip: calculateSkip(limit, page) },
  });
};

type GetProductsWithQueryArgs = {
  limit?: number;
  page?: number;
  query: string;
};

export const getProductsWithQuery = ({
  limit = PRODUCTS_DEFAULT_LIMIT,
  page = PRODUCTS_FIRST_PAGE,
  query,
}: GetProductsWithQueryArgs) => {
  return jsonFetcher<Products>({
    path: "/products/search",
    query: { q: query, limit, skip: calculateSkip(limit, page) },
  });
};

type GetProduct = {
  id: number;
};

export const getProduct = ({ id }: GetProduct) => {
  return jsonFetcher<Product>({
    path: `/products/${id}`,
  });
};
