import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X, Github, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { SearchSuggestions } from './SearchSuggestions';
import { generateProducts } from '../utils/productGenerator';
import { Product } from '../types';
import { mockAuth } from '../utils/mockAuth';
import toast from 'react-hot-toast';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { user, isAdmin } = useAuth();
  const { totalItems } = useCart();
  const { totalWishlistItems } = useWishlist();
  const navigate = useNavigate();
  const allProducts = generateProducts(100);

  const handleSignOut = async () => {
    const { error } = await mockAuth.signOut();
    if (error) {
      toast.error('Failed to sign out');
    } else {
      toast.success('Signed out successfully');
      window.location.reload();
      navigate('/');
    }
  };

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const filtered = allProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSearchSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (product: Product) => {
    navigate(`/product/${product.id}`);
    setSearchQuery('');
    setShowSuggestions(false);
  };

  const handleViewAllResults = () => {
    navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    setSearchQuery('');
    setShowSuggestions(false);
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="bg-gradient-to-r from-purple-600/90 via-blue-600/90 to-teal-600/90 backdrop-blur-xl shadow-2xl sticky top-0 z-50 border-b border-white/20"
    >
      <div className="absolute inset-0 rainbow-bg opacity-80"></div>
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="container mx-auto px-4 py-4 relative z-10">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30 shadow-lg"
            >
              <Sparkles className="text-white color-shift" size={20} />
            </motion.div>
            <span className="text-3xl font-black text-white drop-shadow-2xl group-hover:scale-105 transition-all duration-300" style={{ fontFamily: 'Orbitron, monospace', letterSpacing: '2px', textShadow: '0 0 20px rgba(255, 255, 0, 0.8), 0 0 40px rgba(255, 255, 0, 0.4)' }}>
              🛍️ KPcart
            </span>
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery.trim().length > 1 && setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                placeholder="Search products..."
                className="w-full px-4 py-3 border border-white/30 rounded-l-2xl focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 bg-white/20 backdrop-blur-md text-white placeholder-white/70 shadow-lg"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="absolute right-0 top-0 h-full px-4 bg-white/30 backdrop-blur-sm text-white rounded-r-2xl hover:bg-white/40 transition-all duration-300 border border-white/30 shadow-lg"
              >
                <Search size={20} />
              </motion.button>
              
              {showSuggestions && searchQuery.trim() && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl z-50 max-h-96 overflow-y-auto border border-white/20">
                  {searchSuggestions.length > 0 ? (
                    <>
                      <div className="p-3 border-b border-gray-200 bg-green-50">
                        <span className="text-green-700 font-medium">✅ {searchSuggestions.length} products available</span>
                      </div>
                      {searchSuggestions.slice(0, 6).map((product) => (
                        <div
                          key={product.id}
                          onClick={() => handleSuggestionClick(product)}
                          className="flex items-center p-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                        >
                          <img src={product.image_url} alt={product.name} className="w-12 h-12 object-cover rounded-lg mr-3 shadow-sm" />
                          <div className="flex-1">
                            <div className="font-semibold text-gray-800 truncate">{product.name}</div>
                            <div className="text-sm text-gray-500">{product.category}</div>
                            <div className="text-sm font-bold text-blue-600">₹{product.price.toLocaleString('en-IN')}</div>
                          </div>
                          <div className="text-green-500 text-xs bg-green-100 px-2 py-1 rounded-full">Available</div>
                        </div>
                      ))}
                      {searchSuggestions.length > 6 && (
                        <div onClick={handleViewAllResults} className="p-3 text-center text-blue-600 cursor-pointer hover:bg-blue-50 font-medium border-t">
                          View all {searchSuggestions.length} products →
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="p-6 text-center bg-red-50">
                      <div className="text-red-500 text-2xl mb-2">❌</div>
                      <div className="text-red-700 font-medium">No products found</div>
                      <div className="text-red-600 text-sm mt-1">Try different keywords</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </form>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <motion.div whileHover={{ y: -3, scale: 1.05 }}>
              <Link to="/products" className="text-white/90 hover:text-white transition-all duration-300 font-semibold px-4 py-2 rounded-xl hover:bg-white/20 backdrop-blur-sm">
              🛒 Products
              </Link>
            </motion.div>
            
            <motion.div whileHover={{ y: -3, scale: 1.05 }}>
              <Link to="/wishlist" className="relative text-white/90 hover:text-white transition-all duration-300 font-semibold px-4 py-2 rounded-xl hover:bg-white/20 backdrop-blur-sm">
              ❤️ Wishlist
              {totalWishlistItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-lg font-bold"
                >
                  {totalWishlistItems}
                </motion.span>
              )}
              </Link>
            </motion.div>
            
            <motion.a
              whileHover={{ y: -3, scale: 1.05 }}
              href="https://github.com/kirtan597" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/90 hover:text-white transition-all duration-300 flex items-center gap-2 font-semibold px-4 py-2 rounded-xl hover:bg-white/20 backdrop-blur-sm"
            >
              <Github size={20} className="color-shift" />
              <span>GitHub</span>
            </motion.a>

            {user ? (
              <>
                <motion.div whileHover={{ y: -3, scale: 1.1 }}>
                  <Link to="/cart" className="relative text-white/90 hover:text-white transition-all duration-300 p-2 rounded-xl hover:bg-white/20 backdrop-blur-sm">
                  <ShoppingCart size={24} className="color-shift" />
                  {totalItems > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 rainbow-bg text-white text-xs rounded-full h-6 w-6 flex items-center justify-center shadow-lg font-bold pulse-glow"
                    >
                      {totalItems}
                    </motion.span>
                  )}
                  </Link>
                </motion.div>
                
                {isAdmin && (
                  <motion.div whileHover={{ y: -3, scale: 1.05 }}>
                    <Link to="/admin" className="text-white/90 hover:text-white transition-all duration-300 font-semibold px-4 py-2 rounded-xl hover:bg-white/20 backdrop-blur-sm">
                    ⚙️ Admin
                    </Link>
                  </motion.div>
                )}
                
                <div className="relative group">
                  <motion.button 
                    whileHover={{ y: -3, scale: 1.1 }}
                    className="flex items-center text-white/90 hover:text-white transition-all duration-300 p-2 rounded-xl hover:bg-white/20 backdrop-blur-sm"
                  >
                    <User size={24} className="color-shift" />
                  </motion.button>
                  <div className="absolute right-0 mt-2 w-48 bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-white/20">
                    <Link to="/profile" className="block px-4 py-3 text-white/90 hover:bg-white/20 hover:text-white transition-all duration-300 rounded-xl m-1">
                      👤 Profile
                    </Link>
                    <Link to="/orders" className="block px-4 py-3 text-white/90 hover:bg-white/20 hover:text-white transition-all duration-300 rounded-xl m-1">
                      📦 Orders
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-3 text-white/90 hover:bg-white/20 hover:text-white transition-all duration-300 rounded-xl m-1"
                    >
                      🚪 Sign Out
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex space-x-4">
                <motion.div whileHover={{ y: -3, scale: 1.05 }}>
                  <Link to="/login" className="text-white/90 hover:text-white transition-all duration-300 font-semibold px-4 py-2 rounded-xl hover:bg-white/20 backdrop-blur-sm">
                  🔑 Sign In
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                  to="/register"
                  className="bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white px-6 py-2 rounded-xl hover:bg-white/30 hover:border-white/50 transition-all duration-300 font-semibold shadow-lg pulse-glow"
                  >
                  ✨ Sign Up
                  </Link>
                </motion.div>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2 rounded-xl hover:bg-white/20 backdrop-blur-sm transition-all duration-300"
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
              className="md:hidden mt-4 pb-4 border-t border-white/20 pt-4 bg-white/10 backdrop-blur-xl rounded-2xl mx-2"
            >
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => searchQuery.trim().length > 1 && setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  placeholder="Search products..."
                  className="w-full px-4 py-3 border border-white/30 rounded-l-2xl focus:outline-none focus:ring-2 focus:ring-white/50 bg-white/20 backdrop-blur-md text-white placeholder-white/70"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 h-full px-4 bg-white/30 backdrop-blur-sm text-white rounded-r-2xl hover:bg-white/40 transition-all duration-300"
                >
                  <Search size={20} />
                </button>
                
                {showSuggestions && searchQuery.trim() && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl z-50 max-h-96 overflow-y-auto border border-white/20">
                    {searchSuggestions.length > 0 ? (
                      <>
                        <div className="p-3 border-b border-gray-200 bg-green-50">
                          <span className="text-green-700 font-medium">✅ {searchSuggestions.length} products available</span>
                        </div>
                        {searchSuggestions.slice(0, 6).map((product) => (
                          <div
                            key={product.id}
                            onClick={() => handleSuggestionClick(product)}
                            className="flex items-center p-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                          >
                            <img src={product.image_url} alt={product.name} className="w-12 h-12 object-cover rounded-lg mr-3 shadow-sm" />
                            <div className="flex-1">
                              <div className="font-semibold text-gray-800 truncate">{product.name}</div>
                              <div className="text-sm text-gray-500">{product.category}</div>
                              <div className="text-sm font-bold text-blue-600">₹{product.price.toLocaleString('en-IN')}</div>
                            </div>
                            <div className="text-green-500 text-xs bg-green-100 px-2 py-1 rounded-full">Available</div>
                          </div>
                        ))}
                        {searchSuggestions.length > 6 && (
                          <div onClick={handleViewAllResults} className="p-3 text-center text-blue-600 cursor-pointer hover:bg-blue-50 font-medium border-t">
                            View all {searchSuggestions.length} products →
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="p-6 text-center bg-red-50">
                        <div className="text-red-500 text-2xl mb-2">❌</div>
                        <div className="text-red-700 font-medium">No products found</div>
                        <div className="text-red-600 text-sm mt-1">Try different keywords</div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </form>

            {/* Mobile Navigation */}
            <nav className="flex flex-col space-y-4">
              <Link to="/products" className="text-white/90 hover:text-white transition-all duration-300 py-2 px-4 rounded-xl hover:bg-white/20 block">
                🛒 Products
              </Link>
              
              <Link to="/wishlist" className="text-white/90 hover:text-white transition-all duration-300 py-2 px-4 rounded-xl hover:bg-white/20 block">
                ❤️ Wishlist {totalWishlistItems > 0 && `(${totalWishlistItems})`}
              </Link>
              
              <a 
                href="https://github.com/yourusername/shophub-ecommerce" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/90 hover:text-white transition-all duration-300 flex items-center gap-2 py-2 px-4 rounded-xl hover:bg-white/20"
              >
                <Github size={20} />
                <span>GitHub</span>
              </a>

              {user ? (
                <>
                  <Link to="/cart" className="text-white/90 hover:text-white transition-all duration-300 flex items-center py-2 px-4 rounded-xl hover:bg-white/20">
                    <ShoppingCart size={20} className="mr-2" />
                    🛒 Cart {totalItems > 0 && `(${totalItems})`}
                  </Link>
                  
                  {isAdmin && (
                    <Link to="/admin" className="text-white/90 hover:text-white transition-all duration-300 py-2 px-4 rounded-xl hover:bg-white/20 block">
                      ⚙️ Admin Dashboard
                    </Link>
                  )}
                  
                  <Link to="/profile" className="text-white/90 hover:text-white transition-all duration-300 py-2 px-4 rounded-xl hover:bg-white/20 block">
                    👤 Profile
                  </Link>
                  <Link to="/orders" className="text-white/90 hover:text-white transition-all duration-300 py-2 px-4 rounded-xl hover:bg-white/20 block">
                    📦 Orders
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="text-left text-white/90 hover:text-white transition-all duration-300 py-2 px-4 rounded-xl hover:bg-white/20 w-full"
                  >
                    🚪 Sign Out
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-4">
                  <Link to="/login" className="text-white/90 hover:text-white transition-all duration-300 py-2 px-4 rounded-xl hover:bg-white/20 block">
                    🔑 Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-4 py-2 rounded-xl hover:bg-white/30 text-center transition-all duration-300 block mt-2"
                  >
                    ✨ Sign Up
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