import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, Product } from '../types';
import { mockAuth } from '../utils/mockAuth';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';
import { generateProducts } from '../utils/productGenerator';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  totalItems: number;
  totalPrice: number;
  totalDiscount: number;
  loading: boolean;
}

const CartContext = createContext<CartContextType>({
  items: [],
  addToCart: async () => {},
  removeFromCart: async () => {},
  updateQuantity: async () => {},
  clearCart: async () => {},
  totalItems: 0,
  totalPrice: 0,
  totalDiscount: 0,
  loading: false,
});

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchCartItems();
    } else {
      setItems([]);
    }
  }, [user]);

  const fetchCartItems = async () => {
    if (!user) return;

    try {
      const cartItems = await mockAuth.getCartItems(user.id);
      const allProducts = generateProducts(100);
      
      const itemsWithProducts = cartItems.map(item => ({
        id: item.id,
        user_id: item.user_id,
        product_id: item.product_id,
        quantity: item.quantity,
        product: allProducts.find(p => p.id === item.product_id),
        products: allProducts.find(p => p.id === item.product_id)
      }));
      
      setItems(itemsWithProducts as CartItem[]);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      toast.error('Failed to load cart');
    }
  };

  const addToCart = async (product: Product, quantity = 1) => {
    if (!user) {
      toast.error('Please sign in to add items to cart');
      return;
    }

    setLoading(true);
    try {
      await mockAuth.addToCart(user.id, product.id, quantity);
      await fetchCartItems();
      toast.success('Item added to cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart');
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (itemId: string) => {
    setLoading(true);
    try {
      await mockAuth.removeCartItem(itemId);
      setItems(items.filter(item => item.id !== itemId));
      toast.success('Item removed from cart');
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error('Failed to remove item');
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(itemId);
      return;
    }

    setLoading(true);
    try {
      await mockAuth.updateCartItem(itemId, quantity);
      setItems(items.map(item => item.id === itemId ? {...item, quantity} : item));
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast.error('Failed to update quantity');
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    if (!user) return;

    setLoading(true);
    try {
      await mockAuth.clearCart(user.id);
      setItems([]);
      toast.success('Cart cleared');
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error('Failed to clear cart');
    } finally {
      setLoading(false);
    }
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  
  const totalPrice = items.reduce((sum, item) => {
    const product = item.product || item.products;
    if (!product) return sum;
    return sum + (product.price * item.quantity);
  }, 0);

  const totalDiscount = items.reduce((sum, item) => {
    const product = item.product || item.products;
    if (!product || !product.discount_percentage) return sum;
    const discountAmount = (product.price * product.discount_percentage / 100) * item.quantity;
    return sum + discountAmount;
  }, 0);

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
      totalDiscount,
      loading,
    }}>
      {children}
    </CartContext.Provider>
  );
};