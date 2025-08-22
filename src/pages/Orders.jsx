import React from 'react';
import { motion } from 'framer-motion';
import { Package, Calendar, CreditCard, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Orders = () => {
  // Mock orders data for demo
  const orders = [];

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 via-red-400/10 to-pink-400/10 animate-pulse"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center relative z-10"
        >
          <Package size={64} className="text-gray-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold rainbow-bg bg-clip-text text-transparent mb-4">📦 No Orders Yet</h2>
          <p className="text-gray-600 mb-6">Start shopping to see your orders here</p>
          <Link
            to="/products"
            className="rainbow-bg text-white px-8 py-4 rounded-2xl hover:scale-105 transition-all duration-300 font-semibold shadow-lg pulse-glow"
          >
            Start Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 py-4 sm:py-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 via-red-400/10 to-pink-400/10 animate-pulse"></div>
      <div className="container mx-auto px-2 sm:px-4 max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl sm:text-4xl font-bold rainbow-bg bg-clip-text text-transparent mb-4 text-center">📦 Order History</h1>
          <p className="text-gray-600">Track and manage your orders</p>
        </motion.div>

        <div className="space-y-6">
          {/* Order items would be mapped here */}
        </div>
      </div>
    </div>
  );
};