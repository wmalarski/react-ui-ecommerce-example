import Pagination from "@/components/Pagination/Pagination";
import TypeAhead from "@/components/Typeahead/Typeahead";
import { getPaginationControls } from "@/helpers";
import {
  PRODUCTS_DEFAULT_LIMIT,
  getProducts,
  getProductsWithQuery,
} from "@/services/products";
import styles from "@/styles/Home.module.css";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
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
  const router = useRouter();

  const pagination = getPaginationControls(
    PRODUCTS_DEFAULT_LIMIT,
    page,
    data.total,
  );

  const onQueryChange = async (value: string) => {
    router.replace({ query: { query: value } });
  };

  return (
    <>
      <main>
        <section style={{ display: "flex", flexFlow: "column wrap" }}>
          <div>
            <h1>Shop Products</h1>
          </div>
          <div className={styles.wrapper_Container}>
            <TypeAhead initialQuery={query} onQueryChange={onQueryChange} />
          </div>
          <div style={{ margin: "5rem 0" }} className={styles.productList}>
            {data &&
              data.products.length > 0 &&
              data.products.map((data: any) => (
                <a
                  href={`/products/${data.id}`}
                  className={styles.CardComponent}
                  key={data.id}
                >
                  <div className={styles.cardImage}>
                    <Image
                      src={data.thumbnail}
                      alt={data.description}
                      loading="eager"
                      fill
                    />
                  </div>

                  <h5>{data.title}</h5>
                  <p>{data.description}</p>
                </a>
              ))}
          </div>
          {pagination && (
            <Pagination
              page={page}
              recordTotal={data.total}
              recordStart={pagination.pageStart}
              recordEnd={pagination.pageEnd}
            />
          )}
        </section>
      </main>
    </>
  );
}
