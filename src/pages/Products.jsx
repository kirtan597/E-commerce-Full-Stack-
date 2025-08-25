import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter, Grid, List, ArrowLeft } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';


import { generateProducts } from '../utils/productGenerator';

const categories = ['All', 'Electronics', 'Clothing', 'Books', 'Home', 'Sports', 'Photography'];

export const Products = () => {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');

  const searchQuery = searchParams.get('search') || '';
  const products = generateProducts(80); // Always generate products directly

  // Defensive: ensure products is always an array
  const safeProducts = Array.isArray(products) ? products : [];
  const filteredAndSortedProducts = safeProducts
    .filter(product => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch = !searchQuery || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <Link to="/" className="absolute left-2 sm:left-4 back-button-rgb backdrop-blur-sm text-white p-3 sm:p-4 rounded-2xl hover:scale-110 transition-all duration-300 shadow-lg edge-glow">
              <ArrowLeft size={24} className="sm:w-6 sm:h-6" />
            </Link>
            <h1 className="text-5xl font-bold rainbow-bg bg-clip-text text-transparent">
              {searchQuery ? `Search Results for "${searchQuery}"` : '🛍️ All Products'}
            </h1>
          </div>
          <p className="text-gray-700 text-lg text-center">
            {filteredAndSortedProducts.length} amazing products found
          </p>
        </motion.div>

        {/* Filters and Controls */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8 border border-white/20"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {Array.isArray(categories) && categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'rainbow-bg text-white shadow-lg transform scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 hover:scale-105'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white/80 backdrop-blur-sm transition-all duration-300"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>

              {/* View Mode */}
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 transition-all duration-300 ${viewMode === 'grid' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 transition-all duration-300 ${viewMode === 'list' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search Results Info */}
        {searchQuery && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-blue-50 rounded-2xl border border-blue-200"
          >
            <h2 className="text-lg font-semibold text-blue-800 mb-2">
              Search Results for "{searchQuery}"
            </h2>
            <p className="text-blue-600">
              {filteredAndSortedProducts.length} {filteredAndSortedProducts.length === 1 ? 'product' : 'products'} found
            </p>
          </motion.div>
        )}

        {/* Products Grid */}
        {filteredAndSortedProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-12 max-w-md mx-auto border border-white/20">
              <div className="text-6xl mb-6">🔍</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {searchQuery ? 'No products found' : 'No products available'}
              </h2>
              <p className="text-gray-600 mb-8">
                {searchQuery 
                  ? `No products match "${searchQuery}". Try different keywords or browse categories.`
                  : 'No products match your current filters.'}
              </p>
              {searchQuery && (
                <button
                  onClick={() => {
                    window.history.replaceState({}, '', '/products');
                    window.location.reload();
                  }}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 font-semibold shadow-lg hover:scale-105"
                >
                  Browse All Products
                </button>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            layout
            className={`grid gap-6 ${
              viewMode === 'grid'
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                : 'grid-cols-1'
            }`}
          >
            {Array.isArray(filteredAndSortedProducts) && filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};