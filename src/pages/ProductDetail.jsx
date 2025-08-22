import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Heart, ShoppingCart, Truck, Shield, RotateCcw } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

// Mock product data - in real app, fetch from API
const mockProduct = {
  id: '1',
  name: 'Premium Wireless Headphones',
  description: 'Experience superior sound quality with our premium wireless headphones featuring advanced noise cancellation technology, comfortable over-ear design, and up to 30 hours of battery life. Perfect for music lovers, professionals, and anyone seeking the ultimate audio experience.',
  price: 24899,
  image_url: 'https://images.pexels.com/photos/3945667/pexels-photo-3945667.jpeg?auto=compress&cs=tinysrgb&w=800',
  category: 'Electronics',
  stock_quantity: 25,
  discount_percentage: 20,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  images: [
    'https://images.pexels.com/photos/3945667/pexels-photo-3945667.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=800',
  ],
  rating: 4.8,
  reviews: 124,
  features: [
    'Active Noise Cancellation',
    '30-hour Battery Life',
    'Premium Build Quality',
    'Wireless Connectivity',
    'Fast Charging Support',
    'Voice Assistant Compatible',
  ],
};

export const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart, loading } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // In a real app, you'd fetch the product by ID
  if (id !== '1') {
    return <Navigate to="/products" replace />;
  }

  const product = mockProduct;
  const discountedPrice = product.discount_percentage 
    ? product.price - (product.price * product.discount_percentage / 100)
    : product.price;

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="aspect-square rounded-xl overflow-hidden bg-gray-100"
            >
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-blue-600' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-blue-600 font-medium mb-2">{product.category}</p>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={`${
                        i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-gray-600">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-gray-900">
                  ₹{discountedPrice.toLocaleString('en-IN')}
                </span>
                {product.discount_percentage && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                      {product.discount_percentage}% OFF
                    </span>
                  </>
                )}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Key Features</h3>
              <ul className="grid grid-cols-2 gap-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center space-x-4 py-4">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-gray-100 transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-gray-100 transition-colors"
                >
                  +
                </button>
              </div>
              <span className="text-gray-600">
                {product.stock_quantity > 0 ? `${product.stock_quantity} in stock` : 'Out of stock'}
              </span>
            </div>

            <div className="flex space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                disabled={loading || product.stock_quantity === 0}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <ShoppingCart size={20} />
                <span>{loading ? 'Adding...' : 'Add to Cart'}</span>
              </motion.button>
              
              <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Heart size={20} className="text-gray-600" />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="border-t pt-6 grid grid-cols-3 gap-4">
              <div className="text-center">
                <Truck className="text-blue-600 mx-auto mb-2" size={24} />
                <p className="text-sm text-gray-600">Free Shipping</p>
              </div>
              <div className="text-center">
                <Shield className="text-blue-600 mx-auto mb-2" size={24} />
                <p className="text-sm text-gray-600">2 Year Warranty</p>
              </div>
              <div className="text-center">
                <RotateCcw className="text-blue-600 mx-auto mb-2" size={24} />
                <p className="text-sm text-gray-600">30 Day Returns</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};