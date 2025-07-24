import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X, Github, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { signOut } from '../lib/supabase';
import toast from 'react-hot-toast';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, isAdmin } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast.error('Failed to sign out');
    } else {
      toast.success('Signed out successfully');
      navigate('/');
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-100"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
              className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center"
            >
              <Sparkles className="text-white" size={16} />
            </motion.div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300">
              ShopHub
            </span>
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full px-4 py-2 border border-gray-200 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50/50 backdrop-blur-sm"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="absolute right-0 top-0 h-full px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-r-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
              >
                <Search size={20} />
              </motion.button>
            </div>
          </form>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <motion.div whileHover={{ y: -2 }}>
              <Link to="/products" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Products
              </Link>
            </motion.div>
            
            <motion.a
              whileHover={{ y: -2 }}
              href="https://github.com/kirtan597" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-blue-600 transition-colors flex items-center gap-2 font-medium"
            >
              <Github size={20} />
              <span>GitHub</span>
            </motion.a>

            {user ? (
              <>
                <motion.div whileHover={{ y: -2 }}>
                  <Link to="/cart" className="relative text-gray-700 hover:text-blue-600 transition-colors">
                  <ShoppingCart size={24} />
                  {totalItems > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-lg"
                    >
                      {totalItems}
                    </motion.span>
                  )}
                  </Link>
                </motion.div>
                
                {isAdmin && (
                  <motion.div whileHover={{ y: -2 }}>
                    <Link to="/admin" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                    Admin
                    </Link>
                  </motion.div>
                )}
                
                <div className="relative group">
                  <motion.button 
                    whileHover={{ y: -2 }}
                    className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <User size={24} />
                  </motion.button>
                  <div className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-md rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-100">
                    <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Profile
                    </Link>
                    <Link to="/orders" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Orders
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex space-x-4">
                <motion.div whileHover={{ y: -2 }}>
                  <Link to="/login" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                  Sign In
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                  to="/register"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium shadow-lg"
                  >
                  Sign Up
                  </Link>
                </motion.div>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 pb-4 border-t pt-4"
            >
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full px-4 py-2 border border-gray-200 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50/50"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 h-full px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-r-xl hover:from-blue-700 hover:to-purple-700"
                >
                  <Search size={20} />
                </button>
              </div>
            </form>

            {/* Mobile Navigation */}
            <nav className="flex flex-col space-y-4">
              <Link to="/products" className="text-gray-700 hover:text-blue-600">
                Products
              </Link>
              
              <a 
                href="https://github.com/yourusername/shophub-ecommerce" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-blue-600 flex items-center gap-2"
              >
                <Github size={20} />
                <span>GitHub</span>
              </a>

              {user ? (
                <>
                  <Link to="/cart" className="text-gray-700 hover:text-blue-600 flex items-center">
                    <ShoppingCart size={20} className="mr-2" />
                    Cart {totalItems > 0 && `(${totalItems})`}
                  </Link>
                  
                  {isAdmin && (
                    <Link to="/admin" className="text-gray-700 hover:text-blue-600">
                      Admin Dashboard
                    </Link>
                  )}
                  
                  <Link to="/profile" className="text-gray-700 hover:text-blue-600">
                    Profile
                  </Link>
                  <Link to="/orders" className="text-gray-700 hover:text-blue-600">
                    Orders
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="text-left text-gray-700 hover:text-blue-600"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-4">
                  <Link to="/login" className="text-gray-700 hover:text-blue-600">
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl hover:from-blue-700 hover:to-purple-700 text-center"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};