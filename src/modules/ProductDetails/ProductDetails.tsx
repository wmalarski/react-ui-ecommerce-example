import { formatPrice } from "@/components/utils/format";
import type { Product } from "@/services/types";
import Image from "next/image";
import styles from "./ProductDetails.module.css";

type ProductDetailsProps = {
  product: Product;
};

export function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <section className={styles.card}>
      <div className={styles.image}>
        <Image src={product.thumbnail} alt={product.description} fill />
      </div>
      <div className={styles.detail}>
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <strong>{formatPrice(product.price)}</strong>
      </div>
    </section>
  );
}
