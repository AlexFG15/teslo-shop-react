import { tesloApi } from "@/api/teslo-Api";
import type { ProductsResponse } from "@/interfaces/products.response";

export const getProductsByGender = async (idSlug: string) => {
  const { data } = await tesloApi.get<ProductsResponse>(`/products/${idSlug}`);
  const productaWithImageUrl = data.products.map((product) => ({
    ...product,
    images: product.images.map(
      (image) => `${import.meta.env.VITE_API_URL}/files/product/${image}`,
    ),
  }));
  return {
    ...data,
    products: productaWithImageUrl,
  };
};
