import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProductsByIdAction } from "../actions/get-product-buy-id.action";
import type { Product } from "@/interfaces/product.interface";
import { createUpdateProductAction } from "../actions/create-update-product.action";

export const useProduct = (id: string) => {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["product", { id }],
    queryFn: () => getProductsByIdAction(id),
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  const mutation = useMutation({
    mutationFn: createUpdateProductAction,
    onSuccess: (product) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({
        queryKey: ["product", { id: product.id }],
      });

      queryClient.setQueryData(["products", { id: product.id }], product);
    },
  });

  //   const handelSubmit = async (productLike: Partial<Product>) => {
  //     console.log({ productLike });
  //   };

  return {
    ...query,
    mutation,
  };
};
