import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-full blur-3xl"
        />
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {/* Company Info */}
          <div>
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4"
            >
              ShopHub
            </motion.h3>
            <p className="text-gray-400 mb-4">
              Your premium destination for cutting-edge products with personalized shopping experiences and exceptional service.
            </p>
            <div className="flex space-x-4">
              <motion.a 
                whileHover={{ scale: 1.2, y: -2 }}
                href="#" 
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Facebook size={20} />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.2, y: -2 }}
                href="#" 
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Twitter size={20} />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.2, y: -2 }}
                href="#" 
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Instagram size={20} />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.h4 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg font-semibold mb-4"
            >
              Quick Links
            </motion.h4>
            <ul className="space-y-2">
              <li>
                <motion.div whileHover={{ x: 5 }}>
                  <Link to="/products" className="text-gray-400 hover:text-white transition-colors">
                  Products
                  </Link>
                </motion.div>
              </li>
              <li>
                <motion.div whileHover={{ x: 5 }}>
                  <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                  </Link>
                </motion.div>
              </li>
              <li>
                <motion.div whileHover={{ x: 5 }}>
                  <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                  </Link>
                </motion.div>
              </li>
              <li>
                <motion.div whileHover={{ x: 5 }}>
                  <Link to="/blog" className="text-gray-400 hover:text-white transition-colors">
                  Blog
                  </Link>
                </motion.div>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <motion.h4 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg font-semibold mb-4"
            >
              Customer Service
            </motion.h4>
            <ul className="space-y-2">
              <li>
                <motion.div whileHover={{ x: 5 }}>
                  <Link to="/help" className="text-gray-400 hover:text-white transition-colors">
                  Help Center
                  </Link>
                </motion.div>
              </li>
              <li>
                <motion.div whileHover={{ x: 5 }}>
                  <Link to="/returns" className="text-gray-400 hover:text-white transition-colors">
                  Returns
                  </Link>
                </motion.div>
              </li>
              <li>
                <motion.div whileHover={{ x: 5 }}>
                  <Link to="/shipping" className="text-gray-400 hover:text-white transition-colors">
                  Shipping Info
                  </Link>
                </motion.div>
              </li>
              <li>
                <motion.div whileHover={{ x: 5 }}>
                  <Link to="/track" className="text-gray-400 hover:text-white transition-colors">
                  Track Order
                  </Link>
                </motion.div>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <motion.h4 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg font-semibold mb-4"
            >
              Contact Info
            </motion.h4>
            <div className="space-y-2">
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-center text-gray-400"
              >
                <Mail size={16} className="mr-2" />
                <span>hello@shophub.com</span>
              </motion.div>
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-center text-gray-400"
              >
                <Phone size={16} className="mr-2" />
                <span>+1 (555) 123-4567</span>
              </motion.div>
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-center text-gray-400"
              >
                <MapPin size={16} className="mr-2" />
                <span>123 Innovation Drive, Tech City, CA 94000</span>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center relative z-10">
          <p className="text-gray-400">
            © 2025 ShopHub. Crafted with passion for premium shopping experiences. |{' '}
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>{' '}
            |{' '}
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};