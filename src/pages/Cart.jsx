import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

export const Cart = () => {
  const { items, updateQuantity, removeFromCart, totalPrice, totalDiscount, loading } = useCart();

  const finalTotal = totalPrice - totalDiscount;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-purple-50 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-400/10 via-pink-400/10 to-purple-400/10 animate-pulse"></div>
        <div className="text-center relative z-10">
          <ShoppingBag size={64} className="text-gray-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold rainbow-bg bg-clip-text text-transparent mb-4">🛒 Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some products to get started</p>
          <Link
            to="/products"
            className="rainbow-bg text-white px-8 py-4 rounded-2xl hover:scale-105 transition-all duration-300 font-semibold shadow-lg pulse-glow"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-4 sm:py-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-pink-400/10 animate-pulse"></div>
      <div className="container mx-auto px-2 sm:px-4 relative z-10">
        <h1 className="text-2xl sm:text-4xl font-bold rainbow-bg bg-clip-text text-transparent mb-4 sm:mb-8 text-center">🛒 Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-4 sm:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/20">
              {Array.isArray(items) && items.map((item) => {
                const product = item.product || item.products;
                if (!product) return null;

                const discountedPrice = product.discount_percentage 
                  ? product.price - (product.price * product.discount_percentage / 100)
                  : product.price;

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="p-3 sm:p-6 border-b border-gray-200 last:border-b-0"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0">
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-full h-full object-cover rounded-xl shadow-md border border-gray-200"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-base sm:text-lg text-gray-900 truncate">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">
                          {product.category}
                        </p>
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
                          <span className="font-semibold text-gray-900 text-lg">
                            ₹{discountedPrice.toLocaleString('en-IN')}
                          </span>
                          <div className="flex items-center space-x-2">
                            {product.discount_percentage && (
                              <>
                                <span className="text-sm text-gray-500 line-through">
                                  ₹{product.price.toLocaleString('en-IN')}
                                </span>
                                <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-medium">
                                  {product.discount_percentage}% OFF
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                        <div className="flex items-center space-x-3 bg-gray-50 rounded-lg p-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={loading}
                            className="p-2 rounded-full hover:bg-white transition-colors shadow-sm border"
                          >
                            <Minus size={14} />
                          </button>
                          
                          <span className="font-semibold min-w-[2.5rem] text-center text-lg">
                            {item.quantity}
                          </span>
                          
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={loading}
                            className="p-2 rounded-full hover:bg-white transition-colors shadow-sm border"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <div className="flex items-center justify-between w-full sm:w-auto sm:flex-col sm:items-end space-x-4 sm:space-x-0">
                          <p className="font-bold text-lg sm:text-xl text-gray-900">
                            ₹{(discountedPrice * item.quantity).toLocaleString('en-IN')}
                          </p>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            disabled={loading}
                            className="text-red-500 hover:text-red-700 transition-colors p-2 rounded-lg hover:bg-red-50"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-4 sm:p-6 sticky top-4 border border-white/20">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>
                
                {totalDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-₹{totalDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
                
                <hr className="my-4" />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button className="w-full rainbow-bg text-white py-3 rounded-xl hover:scale-105 transition-all duration-300 font-semibold shadow-lg pulse-glow">
                Proceed to Checkout
              </button>

              <Link
                to="/products"
                className="block text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-purple-600 hover:to-pink-600 transition-all duration-300 mt-4 font-semibold"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};