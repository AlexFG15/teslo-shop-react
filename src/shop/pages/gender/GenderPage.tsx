import { CustomPagination } from "@/components/ui/custom/CustomPagination";

import { CustomJumbotron } from "@/shop/components/CustomJumbotron";
import { ProductGrid } from "@/shop/components/ProductGrid";
import { useProducts } from "@/shop/hooks/useProduct";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

export const GenderPage = () => {
  const { gender } = useParams();

  const { data } = useProducts();
  const genderLabel =
    gender === "men" ? "Hombre" : gender === "women" ? "Mujeres" : "Niños";
  return (
    <>
      <CustomJumbotron title={`Productos para ${genderLabel}`} />
      <ProductGrid products={data?.products || []} />

      <CustomPagination totalPages={data?.pages || 1} />
    </>
  );
};
