import { ProductsGrid } from "@/modules/ProductsGrid/ProductsGrid";
import {
  PRODUCTS_FIRST_PAGE,
  getProducts,
  getProductsWithQuery,
} from "@/services/products";
import type { GetServerSideProps } from "next";
import {
  Output,
  coerce,
  number,
  object,
  optional,
  safeParseAsync,
  string,
} from "valibot";

const getQuerySchema = () => {
  return object({
    page: optional(coerce(number(), Number), PRODUCTS_FIRST_PAGE),
    query: optional(string(), ""),
  });
};

const getProps = async ({
  page,
  query,
}: Output<ReturnType<typeof getQuerySchema>>) => {
  if (query.length > 0) {
    const data = await getProductsWithQuery({ page, query });
    return { data, page, query };
  }

  const data = await getProducts({ page });
  return { data, page, query };
};

type PageProps = Awaited<ReturnType<typeof getProps>>;

export const getServerSideProps: GetServerSideProps<PageProps> = async (
  context,
) => {
  const query = await safeParseAsync(getQuerySchema(), context.query);

  if (!query.success) {
    return { notFound: true };
  }

  try {
    const props = await getProps(query.output);
    return { props };
  } catch {
    return { notFound: true };
  }
};

export default function Page({ data, page, query }: PageProps) {
  return (
    <main>
      <ProductsGrid data={data} page={page} query={query} />
    </main>
  );
}
