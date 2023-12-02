import { getPaginationControls } from "@/components/Pagination/Pagination.utils";
import { paths } from "@/helpers/paths";
import { PRODUCTS_DEFAULT_LIMIT } from "@/services/products";
import type { Product, Products } from "@/services/types";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import styles from "./ProductsGrid.module.css";
import { TypeAhead } from "./TypeAhead";

const Pagination = dynamic(() =>
  import("@/components/Pagination/Pagination").then(
    (module) => module.Pagination,
  ),
);

type ProductGridItemProps = {
  product: Product;
};

function ProductGridItem({ product }: ProductGridItemProps) {
  return (
    <Link
      className={styles.cardComponent}
      href={paths.productDetails(product.id)}
    >
      <div className={styles.cardImage}>
        <Image
          alt={product.description}
          fill
          loading="eager"
          src={product.thumbnail}
        />
      </div>
      <h3>{product.title}</h3>
      <p>{product.description}</p>
    </Link>
  );
}

type ProductsGridProps = {
  data: Products;
  page: number;
  query: string;
};

export function ProductsGrid({ data, page, query }: ProductsGridProps) {
  const pagination = getPaginationControls({
    currentPage: page,
    pageSize: PRODUCTS_DEFAULT_LIMIT,
    totalCount: data.total,
  });

  return (
    <section className={styles.root}>
      <header>
        <h2>Shop Products</h2>
      </header>
      <div className={styles.wrapperContainer}>
        <TypeAhead defaultValue={query} />
      </div>
      <div className={styles.productList}>
        {data.products.length > 0
          ? data.products.map((data) => (
              <ProductGridItem product={data} key={data.id} />
            ))
          : null}
      </div>
      <footer>
        <Pagination
          page={page}
          total={data.total}
          start={pagination.pageStart}
          end={pagination.pageEnd}
        />
      </footer>
    </section>
  );
}
