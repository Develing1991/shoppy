import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { addNewProduct, getProducts as fetchProducts } from "../api/firebase";

export default function useProducts() {
  // staleTime을 주게되면 해당 시간마큼 mutation되지 않기 때문에 mutation하면서 invalidate를 해줘야 하는데
  // 해당 코드가 난잡하게 널려있으니 어떤 cache key를 invalidate할찌 헷갈리니까 훅을 만들어 한곳에서 사용하는 것 (관리가 편함)
  const queryClient = useQueryClient();
  const productsQuery = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5,
  });

  const addProduct = useMutation({
    mutationFn: ({ product, url }) => addNewProduct(product, url),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return { productsQuery, addProduct };
}
