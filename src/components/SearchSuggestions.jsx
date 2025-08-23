import React from 'react';
import { motion } from 'framer-motion';
import { Search, ShoppingBag } from 'lucide-react';



export const SearchSuggestions = ({
  suggestions,
  searchQuery,
  onSuggestionClick,
  onViewAll,
  isVisible
}) => {
  if (!isVisible || !searchQuery.trim()) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 z-50 max-h-96 overflow-y-auto"
    >
      {suggestions.length > 0 ? (
        <>
          <div className="p-3 border-b border-gray-200">
            <p className="text-sm text-gray-600 font-medium">
              Found {suggestions.length} products for "{searchQuery}"
            </p>
          </div>
          
          {Array.isArray(suggestions) && suggestions.slice(0, 5).map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
              onClick={() => onSuggestionClick(product)}
              className="flex items-center p-3 cursor-pointer border-b border-gray-100 last:border-b-0"
            >
              <img
                src={product.image_url}
                alt={product.name}
                className="w-12 h-12 object-cover rounded-lg mr-3"
              />
              <div className="flex-1">
                <h4 className="font-medium text-gray-800 truncate">{product.name}</h4>
                <p className="text-sm text-gray-600">{product.category}</p>
                <p className="text-sm font-semibold text-blue-600">
                  ₹{product.price.toLocaleString('en-IN')}
                </p>
              </div>
              <ShoppingBag size={16} className="text-gray-400" />
            </motion.div>
          ))}
          
          {suggestions.length > 5 && (
            <motion.button
              whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
              onClick={onViewAll}
              className="w-full p-3 text-center text-blue-600 font-medium hover:bg-blue-50 transition-colors"
            >
              View all {suggestions.length} results
            </motion.button>
          )}
        </>
      ) : (
        <div className="p-6 text-center">
          <Search size={48} className="mx-auto text-gray-400 mb-3" />
          <h3 className="font-semibold text-gray-800 mb-2">No products found</h3>
          <p className="text-gray-600 text-sm">
            Try searching with different keywords or browse our categories
          </p>
        </div>
      )}
    </motion.div>
  );
};