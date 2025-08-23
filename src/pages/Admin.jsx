import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ProductCard } from '../components/ProductCard';
import { generateProducts } from '../utils/productGenerator';

// Admin dashboard page for managing products (mock version)
const Admin = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const generated = generateProducts(30);
      setProducts(Array.isArray(generated) ? generated : []);
      setLoading(false);
    } catch (err) {
      setError('Failed to load products.');
      setLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
          Admin Dashboard
        </h1>
        <div className="mb-8 text-center">
          <span className="inline-block px-4 py-2 rounded-full bg-purple-100 text-purple-700 font-semibold">
            Product Management
          </span>
        </div>
        {loading ? (
          <div className="text-center text-lg text-gray-500 py-12">Loading products...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-12">{error}</div>
        ) : Array.isArray(products) && products.length > 0 ? (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { staggerChildren: 0.08, duration: 0.6 }
              }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          >
            {products.map((product) => (
              <motion.div key={product.id} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                <ProductCard product={product} adminMode />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center text-gray-500 py-12">No products found.</div>
        )}
      </div>
    </div>
  );
};

export default Admin;

