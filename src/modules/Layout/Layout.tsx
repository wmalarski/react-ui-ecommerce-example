import { paths } from "@/helpers/paths";
import { Inter } from "next/font/google";
import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./Layout.module.css";

const inter = Inter({ subsets: ["latin"] });

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <div className={`${inter.className} ${styles.container}`}>
      <nav className={styles.nav}>
        <Link href={paths.home()}>
          <h1 className={styles.logo}>Products.com</h1>
        </Link>
      </nav>
      {children}
    </div>
  );
}
