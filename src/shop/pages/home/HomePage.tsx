import { CustomPagination } from "@/components/ui/custom/CustomPagination";
import { CustomJumbotron } from "@/shop/components/CustomJumbotron";
import ProductCard from "@/shop/components/ProductCard";
import { ProductGrid } from "@/shop/components/ProductGrid";
import { useProducts } from "@/shop/hooks/useProduct";

export const HomePage = () => {
  const { data } = useProducts();
  console.log(data);
  return (
    <>
      <CustomJumbotron title="Todos los productos" />
      <ProductGrid products={data?.products || []} />

      <CustomPagination totalPages={data?.pages || 0} />
    </>
  );
};
