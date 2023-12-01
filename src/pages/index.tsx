import styles from "@/styles/Home.module.css";
import Image from "next/image";
import Pagination from "@/components/Pagination/Pagination";
import { getPaginationControls } from "@/helpers";
import React, { useCallback, useState } from "react";
import { useRouter } from "next/router";
import Typeahead from "@/components/Typeahead/Typeahead";
import { getProducts, getProductsWithQuery } from "@/services/api/products";
import { Product } from "@/types";
import { Products } from "@/services/api/types";
import { getServerSideProps } from "./products/[id]";

type HomeProps = {};

export default function Page(props: HomeProps) {
  const router = useRouter();

  const [productData, setProductData] = useState<Product[]>([]);

  const [pagination, setPagination] = useState<{
    pageStart: number;
    pageEnd: number;
  }>(undefined);

  console.log("router.query", router.query);

  const [query, setQuery] = useState("");
  const [page, setPage] = useState<number>(1);

  const [total, setTotal] = useState<number>(0);

  const updateData = useCallback(
    (data: Products) => {
      console.log({ data });
      const paginationControls = getPaginationControls(10, page, data.total);
      setTotal(data.total);
      setPagination(paginationControls);
      setProductData(data.products);
    },
    [page]
  );

  React.useEffect(() => {
    let path;
    let page: number;

    if (typeof window !== "undefined") {
      path = new URLSearchParams(window?.location.search);
      page = +(path.get("page") ?? 1);
    } else {
      page = 1;
    }

    setPage(page);

    if (query) {
      getProductsWithQuery({ query }).then(updateData);
      return;
    }
    getProducts({ page }).then(updateData);
  }, [router.asPath, query, updateData]);

  React.useEffect(() => {}, [page, updateData]);

  const onQueryChange = async (value: string) => {
    setQuery(value);

    router.replace({ query: { query: value, page } }, undefined, {
      shallow: true,
    });
  };

  return (
    <>
      <main>
        <section style={{ display: "flex", flexFlow: "column wrap" }}>
          <div>
            <h1>Shop Products</h1>
          </div>
          <div className={styles.wrapper_Container}>
            <Typeahead initialQuery={query} onQueryChange={onQueryChange} />
          </div>
          <div style={{ margin: "5rem 0" }} className={styles.productList}>
            {productData &&
              productData.length > 0 &&
              productData.map((data: any) => (
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
              recordTotal={total}
              recordStart={pagination.pageStart}
              recordEnd={pagination.pageEnd}
            />
          )}
        </section>
      </main>
    </>
  );
}

export cosnst getServerSideProps