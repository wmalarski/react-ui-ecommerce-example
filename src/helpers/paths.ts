import type { UrlObject } from "node:url";
import { buildSearchParams } from "./search-params";

export const paths = {
  home: ({
    page,
    query,
  }: { page?: number; query?: string } = {}): UrlObject => ({
    pathname: "/",
    search: buildSearchParams({ page, query }).toString(),
  }),
  productDetails: (id: number) => `/products/${id}`,
};
