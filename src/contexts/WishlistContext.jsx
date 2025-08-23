import React, { createContext, useContext, useEffect, useState } from 'react';

import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const WishlistContext = createContext({
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

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
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

  const saveWishlist = (items) => {
    if (user) {
      localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(items));
    }
  };

  const addToWishlist = (product) => {
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

  const removeFromWishlist = (productId) => {
  const newWishlist = Array.isArray(wishlistItems) ? wishlistItems.filter(item => item.id !== productId) : [];
    setWishlistItems(newWishlist);
    saveWishlist(newWishlist);
    toast.success('Removed from wishlist');
  };

  const isInWishlist = (productId) => {
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