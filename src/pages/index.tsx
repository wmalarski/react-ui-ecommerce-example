import { Home } from "@/modules/Home/Home";
import { getProducts, getProductsWithQuery } from "@/services/products";
import { GetServerSideProps } from "next";
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
    page: optional(coerce(number(), Number), 1),
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

  return { props: await getProps(query.output) };
};

export default function Page({ data, page, query }: PageProps) {
  return <Home data={data} page={page} query={query} />;
}
