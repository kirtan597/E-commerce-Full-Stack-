import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';
import { ProductCard } from '../components/ProductCard';

export const Wishlist = () => {
  const { wishlistItems, totalWishlistItems } = useWishlist();
  const { addToCart } = useCart();

  if (totalWishlistItems === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-red-50 to-rose-50 py-8">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-center mb-4">
              <Link to="/" className="absolute left-2 sm:left-4 bg-gradient-to-r from-pink-500 to-red-500 backdrop-blur-sm text-white p-3 sm:p-4 rounded-2xl hover:scale-110 transition-all duration-300 shadow-lg hover:from-pink-600 hover:to-red-600 edge-glow">
                <ArrowLeft size={24} className="sm:w-6 sm:h-6" />
              </Link>
              <h1 className="text-5xl font-bold rainbow-bg bg-clip-text text-transparent">
                ❤️ My Wishlist
              </h1>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center py-16"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-12 max-w-md mx-auto border border-white/20">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-8xl mb-6"
              >
                💔
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Your wishlist is empty
              </h2>
              <p className="text-gray-600 mb-8">
                Start adding products you love to your wishlist!
              </p>
              <Link
                to="/products"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-red-500 text-white px-8 py-3 rounded-xl hover:from-pink-600 hover:to-red-600 transition-all duration-300 font-semibold shadow-lg hover:scale-105"
              >
                <ShoppingCart size={20} />
                <span>Browse Products</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-red-50 to-rose-50 py-8">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <Link to="/" className="absolute left-2 sm:left-4 bg-gradient-to-r from-pink-500 to-red-500 backdrop-blur-sm text-white p-3 sm:p-4 rounded-2xl hover:scale-110 transition-all duration-300 shadow-lg hover:from-pink-600 hover:to-red-600 edge-glow">
              <ArrowLeft size={24} className="sm:w-6 sm:h-6" />
            </Link>
            <h1 className="text-5xl font-bold rainbow-bg bg-clip-text text-transparent">
              ❤️ My Wishlist
            </h1>
          </div>
          <p className="text-gray-700 text-lg text-center">
            {totalWishlistItems} {totalWishlistItems === 1 ? 'item' : 'items'} in your wishlist
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {wishlistItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};