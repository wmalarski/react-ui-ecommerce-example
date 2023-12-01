import { calculateSkip } from "@/helpers";
import { Products } from "./types";

const BASE_URL = "https://dummyjson.com/products";

type GetProductsArgs = {
  page: number;
};

export const getProducts = async ({ page }: GetProductsArgs) => {
  const search = new URLSearchParams({
    limit: "10",
    skip: String(calculateSkip(10, page)),
  });

  const response = await fetch(`${BASE_URL}?${search}`);

  const result = await response.json();

  return result as Products;
};

type GetProductsWithQueryArgs = {
  query: string;
};

export const getProductsWithQuery = async ({
  query,
}: GetProductsWithQueryArgs) => {
  const search = new URLSearchParams({
    limit: "10",
    q: query,
  });

  const response = await fetch(`${BASE_URL}/search?${search}`);

  const result = await response.json();

  return result as Products;
};
