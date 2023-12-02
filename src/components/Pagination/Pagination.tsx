import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Pagination.module.css";

type PaginationProps = {
  end: number;
  page: number;
  start: number;
  total: number;
};

export function Pagination({ page, total, start, end }: PaginationProps) {
  const { query } = useRouter();

  return (
    <div className={styles.pagination}>
      <div className={styles.nav}>
        {page > 1 ? (
          <div className={styles.prev}>
            <Link href={{ query: { ...query, page: page - 1 } }}>
              &laquo; Previous Page
            </Link>
          </div>
        ) : null}
        {total > end ? (
          <div>
            <Link href={{ query: { ...query, page: page + 1 } }}>
              Next Page &raquo;
            </Link>
          </div>
        ) : null}
      </div>
      <div className={styles.info}>
        Showing {start}-{end} of {total}
      </div>
    </div>
  );
}
