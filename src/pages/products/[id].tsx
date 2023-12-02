import { ProductDetails } from "@/modules/ProductDetails/ProductDetails";
import { getProduct } from "@/services/products";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { Output, object, safeParseAsync, string } from "valibot";

const getParamsSchema = () => {
  return object({ id: string() });
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
  const router = useRouter();

  if (!product) {
    return (
      <div>Oops! It looks like we had some trouble rendering this data.</div>
    );
  }

  const onBackClick = () => {
    router.back();
  };

  return (
    <div>
      <a onClick={onBackClick}>
        <span>Go Back</span>
      </a>
      <ProductDetails product={product} />;
    </div>
  );
}
