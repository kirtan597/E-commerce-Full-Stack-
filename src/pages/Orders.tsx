import React from 'react';
import { motion } from 'framer-motion';
import { Package, Calendar, CreditCard, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Orders: React.FC = () => {
  // Mock orders data for demo
  const orders = [];

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Package size={64} className="text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">No Orders Yet</h2>
          <p className="text-gray-600 mb-6">Start shopping to see your orders here</p>
          <Link
            to="/products"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order History</h1>
          <p className="text-gray-600">Track and manage your orders</p>
        </motion.div>

        <div className="space-y-6">
          {/* Order items would be mapped here */}
        </div>
      </div>
    </div>
  );
};