import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addOrUpdateToCart, getCart, removeFromCart } from "../api/firebase";
import { useAuthContext } from "../context/AuthContext";
export default function useCart() {
  const queryClient = useQueryClient();
  const { uid } = useAuthContext();
  const cartQuery = useQuery({
    queryKey: ["carts", uid || ""],
    queryFn: () => getCart(uid),
    enabled: !!uid,
  });

  const mttAddorUpdateToCart = useMutation({
    mutationFn: (product) => addOrUpdateToCart(uid, product),
    onSuccess: () => {
      // Will be called 3 times
      queryClient.invalidateQueries({ queryKey: ["carts", uid] });
    },
  });

  const mttRemoveFromCart = useMutation({
    mutationFn: (id) => removeFromCart(uid, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carts", uid] });
    },
  });

  return {
    cartQuery,
    mttAddorUpdateToCart,
    mttRemoveFromCart,
  };
}
