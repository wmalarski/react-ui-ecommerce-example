import { formatPrice } from "@/helpers/format";
import { Product } from "@/services/types";
import Image from "next/image";
import styles from "./ProductDetails.module.css";

type ProductDetailsProps = {
  product: Product;
};

export const ProductDetails = ({ product }: ProductDetailsProps) => {
  return (
    <section className={styles.card}>
      <div className={styles.image}>
        <Image src={product.thumbnail} alt={product.description} fill />
      </div>
      <div className={styles.detail}>
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <strong>{formatPrice(product.price)}</strong>
      </div>
    </section>
  );
};
