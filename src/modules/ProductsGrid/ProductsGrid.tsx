import { Pagination } from "@/components/Pagination/Pagination";
import { getPaginationControls } from "@/components/Pagination/Pagination.utils";
import { TypeAhead } from "@/components/TypeAhead/TypeAhead";
import { paths } from "@/helpers/paths";
import { PRODUCTS_DEFAULT_LIMIT } from "@/services/products";
import { Product, Products } from "@/services/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./ProductsGrid.module.css";

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
      <h2>{product.title}</h2>
      <p>{product.description}</p>
    </Link>
  );
};

type HomeProps = {
  data: Products;
  initialQuery: string;
  page: number;
};

export const ProductsGrid = ({ data, page, initialQuery }: HomeProps) => {
  const router = useRouter();

  const pagination = getPaginationControls(
    PRODUCTS_DEFAULT_LIMIT,
    page,
    data.total,
  );

  const onQueryChange = async (query: string) => {
    if (query.length > 0) {
      router.replace(paths.home({ query }));
      return;
    }
    router.replace(paths.home());
  };

  return (
    <section className={styles.root}>
      <header>
        <h1>Shop Products</h1>
      </header>
      <div className={styles.wrapperContainer}>
        <TypeAhead initialQuery={initialQuery} onQueryChange={onQueryChange} />
      </div>
      <div className={styles.productList}>
        {data &&
          data.products.length > 0 &&
          data.products.map((data) => (
            <ProductGridItem product={data} key={data.id} />
          ))}
      </div>
      <footer>
        {pagination && (
          <Pagination
            page={page}
            recordTotal={data.total}
            recordStart={pagination.pageStart}
            recordEnd={pagination.pageEnd}
          />
        )}
      </footer>
    </section>
  );
};
