import { paths } from "@/helpers/paths";
import { Inter } from "next/font/google";
import Link from "next/link";
import { ReactNode } from "react";
import styles from "./Layout.module.css";

const inter = Inter({ subsets: ["latin"] });

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={`${inter.className} container`}>
      <nav className={styles.nav}>
        <Link href={paths.home()}>
          <span className={styles.logo}>Products.com</span>
        </Link>
      </nav>
      {children}
    </div>
  );
};
