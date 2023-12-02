import Pagination from "@/components/Pagination/Pagination";
import TypeAhead from "@/components/TypeAhead/TypeAhead";
import { getPaginationControls } from "@/helpers";
import { PRODUCTS_DEFAULT_LIMIT } from "@/services/products";
import { Product, Products } from "@/services/types";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./Home.module.css";

type ProductGridItemProps = {
  product: Product;
};

const ProductGridItem = ({ product }: ProductGridItemProps) => {
  return (
    <a href={`/products/${product.id}`} className={styles.CardComponent}>
      <div className={styles.cardImage}>
        <Image
          src={product.thumbnail}
          alt={product.description}
          loading="eager"
          fill
        />
      </div>

      <h5>{product.title}</h5>
      <p>{product.description}</p>
    </a>
  );
};

type HomeProps = {
  data: Products;
  query: string;
  page: number;
};

export const Home = ({ data, page, query }: HomeProps) => {
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
            data.products.map((data) => (
              <ProductGridItem product={data} key={data.id} />
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
  );
};
