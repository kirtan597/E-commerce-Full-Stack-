import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Hero } from '../components/Hero';
import { ProductCard } from '../components/ProductCard';
import { Product } from '../types';
import { generateProducts, getFeaturedProducts, getTrendingProducts, getNewArrivals } from '../utils/productGenerator';

export const Home: React.FC = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);

  useEffect(() => {
    const products = generateProducts(60);
    setAllProducts(products);
    setFeaturedProducts(getFeaturedProducts(products, 8));
    setTrendingProducts(getTrendingProducts(products, 6));
    setNewArrivals(getNewArrivals(products, 8));
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div>
      <Hero />
      
      {/* Featured Products Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        className="py-16 bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 via-pink-400/10 to-red-400/10 animate-pulse"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-4xl font-bold rainbow-bg bg-clip-text text-transparent mb-4">🔥 Featured Products</h2>
            <p className="text-gray-700 max-w-2xl mx-auto text-lg">
              Discover our handpicked selection of trending products with exclusive discounts
            </p>
          </motion.div>

          <motion.div 
            variants={sectionVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {featuredProducts.map((product) => (
              <motion.div key={product.id} variants={itemVariants}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Trending Products Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        className="py-16 bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-cyan-400/10 to-teal-400/10 animate-pulse"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent mb-4">📈 Trending Now</h2>
            <p className="text-gray-700 max-w-2xl mx-auto text-lg">
              Limited stock items that everyone's talking about
            </p>
          </motion.div>

          <motion.div 
            variants={sectionVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {trendingProducts.map((product) => (
              <motion.div key={product.id} variants={itemVariants}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* New Arrivals Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        className="py-16 bg-gradient-to-br from-green-50 via-emerald-50 to-lime-50 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 via-emerald-400/10 to-lime-400/10 animate-pulse"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-lime-600 bg-clip-text text-transparent mb-4">✨ New Arrivals</h2>
            <p className="text-gray-700 max-w-2xl mx-auto text-lg">
              Fresh products just added to our collection
            </p>
          </motion.div>

          <motion.div 
            variants={sectionVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {newArrivals.map((product) => (
              <motion.div key={product.id} variants={itemVariants}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};