import { ProductDetails } from "@/modules/ProductDetails";
import { getProduct } from "@/services/products";
import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
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

const BackButton = () => {
  const router = useRouter();

  const onBackClick = () => {
    router.back();
  };

  return (
    <button onClick={onBackClick}>
      <span>Go Back</span>
    </button>
  );
};

export default function ProductPage({ product }: ProductPageProps) {
  if (!product) {
    return (
      <main>
        <div>Oops! It looks like we had some trouble rendering this data.</div>
      </main>
    );
  }

  return (
    <main>
      <BackButton />
      <ProductDetails product={product} />
    </main>
  );
}
