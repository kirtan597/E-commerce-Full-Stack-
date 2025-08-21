import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '../types';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

interface WishlistContextType {
  wishlistItems: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  totalWishlistItems: number;
}

const WishlistContext = createContext<WishlistContextType>({
  wishlistItems: [],
  addToWishlist: () => {},
  removeFromWishlist: () => {},
  isInWishlist: () => false,
  totalWishlistItems: 0,
});

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const savedWishlist = localStorage.getItem(`wishlist_${user.id}`);
      if (savedWishlist) {
        setWishlistItems(JSON.parse(savedWishlist));
      }
    } else {
      setWishlistItems([]);
    }
  }, [user]);

  const saveWishlist = (items: Product[]) => {
    if (user) {
      localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(items));
    }
  };

  const addToWishlist = (product: Product) => {
    if (!user) {
      toast.error('Please sign in to add to wishlist');
      return;
    }

    if (!isInWishlist(product.id)) {
      const newWishlist = [...wishlistItems, product];
      setWishlistItems(newWishlist);
      saveWishlist(newWishlist);
      toast.success('Added to wishlist');
    }
  };

  const removeFromWishlist = (productId: string) => {
    const newWishlist = wishlistItems.filter(item => item.id !== productId);
    setWishlistItems(newWishlist);
    saveWishlist(newWishlist);
    toast.success('Removed from wishlist');
  };

  const isInWishlist = (productId: string) => {
    return wishlistItems.some(item => item.id === productId);
  };

  const totalWishlistItems = wishlistItems.length;

  return (
    <WishlistContext.Provider value={{
      wishlistItems,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      totalWishlistItems,
    }}>
      {children}
    </WishlistContext.Provider>
  );
};