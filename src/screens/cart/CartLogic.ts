import { useContext, useMemo } from 'react';
import { CartContext } from './CartContext';

export function useCartLogic() {
  const { cart, removeFromCart, updateQuantity, loading } = useContext(CartContext);

  const totalAmount = useMemo(
    () => cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cart]
  );

  const handleRemove = async (id: string) => {
    await removeFromCart(id);
  };

  const handleUpdateQuantity = async (id: string, newQty: number) => {
    await updateQuantity(id, newQty);
  };

  return {
    cart,
    loading,
    error: null,
    totalAmount,
    handleRemove,
    handleUpdateQuantity,
  };
}
