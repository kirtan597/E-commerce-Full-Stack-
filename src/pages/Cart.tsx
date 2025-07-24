import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

export const Cart: React.FC = () => {
  const { items, updateQuantity, removeFromCart, totalPrice, totalDiscount, loading } = useCart();

  const finalTotal = totalPrice - totalDiscount;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag size={64} className="text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some products to get started</p>
          <Link
            to="/products"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {items.map((item) => {
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
                    className="p-6 border-b border-gray-200 last:border-b-0"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-900">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {product.category}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="font-semibold text-gray-900">
                            ₹{discountedPrice.toLocaleString('en-IN')}
                          </span>
                          {product.discount_percentage && (
                            <>
                              <span className="text-sm text-gray-500 line-through">
                                ₹{product.price.toLocaleString('en-IN')}
                              </span>
                              <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                                {product.discount_percentage}% OFF
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={loading}
                          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        
                        <span className="font-semibold min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={loading}
                          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="font-semibold text-lg">
                          ₹{(discountedPrice * item.quantity).toLocaleString('en-IN')}
                        </p>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          disabled={loading}
                          className="text-red-500 hover:text-red-700 transition-colors mt-2"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
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

              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                Proceed to Checkout
              </button>

              <Link
                to="/products"
                className="block text-center text-blue-600 hover:text-blue-700 transition-colors mt-4"
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