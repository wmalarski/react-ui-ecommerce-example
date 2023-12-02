import { paths } from "@/helpers/paths";
import { ProductDetails } from "@/modules/ProductDetails/ProductDetails";
import { getProduct } from "@/services/products";
import { GetServerSideProps } from "next";
import Link from "next/link";
import {
  Output,
  coerce,
  integer,
  minValue,
  number,
  object,
  safeParseAsync,
} from "valibot";

const getParamsSchema = () => {
  return object({ id: coerce(number([integer(), minValue(0)]), Number) });
};

const getProps = async ({ id }: Output<ReturnType<typeof getParamsSchema>>) => {
  const product = await getProduct({ id });
  return { product };
};

type ProductPageProps = Awaited<ReturnType<typeof getProps>>;

export const getServerSideProps: GetServerSideProps<ProductPageProps> = async (
  context,
) => {
  const query = await safeParseAsync(getParamsSchema(), context.params);

  if (!query.success) {
    return { notFound: true };
  }

  try {
    const props = await getProps(query.output);
    return { props };
  } catch {
    return { notFound: true };
  }
};

export default function ProductPage({ product }: ProductPageProps) {
  if (!product) {
    return (
      <div>Oops! It looks like we had some trouble rendering this data.</div>
    );
  }

  return (
    <main>
      <Link href={paths.home()}>
        <span>Go Back</span>
      </Link>
      <ProductDetails product={product} />;
    </main>
  );
}
