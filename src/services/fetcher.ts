import { buildSearchParams } from "@/helpers/search-params";

const BASE_URL = "https://dummyjson.com";

type FetcherArgs = {
  init?: RequestInit;
  path: string;
  query?: Record<string, unknown>;
};

export const fetcher = async ({ init, path, query }: FetcherArgs) => {
  const search = buildSearchParams(query);
  const url = `${BASE_URL}${path}?${search}`;

  const response = await fetch(url, init);

  if (response.status >= 400) {
    throw { message: response.statusText, status: response.status };
  }

  return response;
};

export const jsonFetcher = async <T>(args: FetcherArgs): Promise<T> => {
  const response = await fetcher(args);

  return response.json();
};
