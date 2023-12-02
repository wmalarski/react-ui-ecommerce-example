import { Pagination, getPaginationControls } from "@/components/Pagination";
import { paths } from "@/helpers/paths";
import { PRODUCTS_DEFAULT_LIMIT } from "@/services/products";
import { Product, Products } from "@/services/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./ProductsGrid.module.css";
import { TypeAhead } from "./TypeAhead";

type ProductGridItemProps = {
  product: Product;
};

const ProductGridItem = ({ product }: ProductGridItemProps) => {
  return (
    <Link
      href={paths.productDetails(product.id)}
      className={styles.cardComponent}
    >
      <div className={styles.cardImage}>
        <Image
          src={product.thumbnail}
          alt={product.description}
          loading="eager"
          fill
        />
      </div>
      <h3>{product.title}</h3>
      <p>{product.description}</p>
    </Link>
  );
};

type ProductsGridProps = {
  data: Products;
  initialQuery: string;
  page: number;
};

export const ProductsGrid = ({
  data,
  page,
  initialQuery,
}: ProductsGridProps) => {
  const router = useRouter();

  const pagination = getPaginationControls(
    PRODUCTS_DEFAULT_LIMIT,
    page,
    data.total,
  );

  const onQueryChange = async (query: string) => {
    router.replace(paths.home(query.length > 0 ? { query } : {}));
  };

  return (
    <section className={styles.root}>
      <header>
        <h2>Shop Products</h2>
      </header>
      <div className={styles.wrapperContainer}>
        <TypeAhead initialQuery={initialQuery} onQueryChange={onQueryChange} />
      </div>
      <div className={styles.productList}>
        {data && data.products.length > 0
          ? data.products.map((data) => (
              <ProductGridItem product={data} key={data.id} />
            ))
          : null}
      </div>
      <footer>
        {pagination ? (
          <Pagination
            page={page}
            recordTotal={data.total}
            recordStart={pagination.pageStart}
            recordEnd={pagination.pageEnd}
          />
        ) : null}
      </footer>
    </section>
  );
};
