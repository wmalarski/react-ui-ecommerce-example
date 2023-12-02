import { calculateSkip } from "@/helpers/calculate-skip";
import { jsonFetcher } from "./fetcher";
import { Products } from "./types";

const DEFAULT_LIMIT = 10;
const FIRST_PAGE = 1;

type GetProductsArgs = {
  limit?: number;
  page?: number;
};

export const getProducts = async ({
  limit = DEFAULT_LIMIT,
  page = FIRST_PAGE,
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

export const getProductsWithQuery = async ({
  limit = DEFAULT_LIMIT,
  page = FIRST_PAGE,
  query,
}: GetProductsWithQueryArgs) => {
  return jsonFetcher<Products>({
    path: "/products/search",
    query: { q: query, limit, skip: calculateSkip(limit, page) },
  });
};
