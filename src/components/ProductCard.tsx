import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, loading } = useCart();

  const discountedPrice = product.discount_percentage 
    ? product.price - (product.price * product.discount_percentage / 100)
    : product.price;

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -8,
        transition: { type: "spring", stiffness: 300 }
      }}
      className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100/50 group"
    >
      <div className="relative">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        </motion.div>
        {product.discount_percentage && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg"
          >
            {product.discount_percentage}% OFF
          </motion.div>
        )}
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300"
        >
          <Heart size={16} className="text-gray-600" />
        </motion.button>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg text-gray-800 truncate flex-1">
            {product.name}
          </h3>
          <span className="text-xs text-gray-500 bg-gradient-to-r from-gray-100 to-gray-200 px-3 py-1 rounded-full font-medium">
            {product.category}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                ₹{discountedPrice.toLocaleString('en-IN')}
              </span>
              {product.discount_percentage && (
                <span className="text-sm text-gray-500 line-through">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <span className="text-xs text-gray-500">
              {product.stock_quantity > 0 ? (
                <span className="text-green-600 font-medium">{product.stock_quantity} in stock</span>
              ) : (
                <span className="text-red-500 font-medium">Out of stock</span>
              )}
            </span>
          </div>

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            disabled={loading || product.stock_quantity === 0}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center space-x-2 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed font-medium shadow-lg"
          >
            <ShoppingCart size={16} />
            <span className="hidden sm:inline">Add to Cart</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};