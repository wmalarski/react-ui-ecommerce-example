import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Pagination.module.css";

type PaginationProps = {
  page: number;
  recordTotal: number;
  recordStart: number;
  recordEnd: number;
};

export const Pagination = ({
  page,
  recordTotal,
  recordStart,
  recordEnd,
}: PaginationProps) => {
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
        {recordTotal > recordEnd ? (
          <div>
            <Link href={{ query: { ...query, page: page + 1 } }}>
              Next Page &raquo;
            </Link>
          </div>
        ) : null}
      </div>
      <div className={styles.info}>
        Showing {recordStart}-{recordEnd} of {recordTotal}
      </div>
    </div>
  );
};
