import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, Truck, Shield, Headphones } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100
    }
  }
};

const floatingAnimation = {
  y: [-10, 10, -10],
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut"
  }
};
export const Hero = () => {
  const features = [
    { icon: ShoppingBag, title: 'Quality Products', desc: 'Curated selection of premium items' },
    { icon: Truck, title: 'Free Shipping', desc: 'Free delivery on orders over $50' },
    { icon: Shield, title: 'Secure Payment', desc: 'Your transactions are protected' },
    { icon: Headphones, title: '24/7 Support', desc: 'Round-the-clock customer service' },
  ];

  return (
    <section className="relative rainbow-bg py-20 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={floatingAnimation}
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 2 } }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
        />
      </div>
      
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-12 items-center relative z-10"
        >
          {/* Hero Content */}
          <div className="space-y-8">
            <div>
              <motion.h1
                variants={itemVariants}
                className="text-5xl lg:text-7xl font-bold leading-tight"
              >
                <span className="text-gray-900">Shop the</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-yellow-200 to-white animate-pulse float-animation">
                  Future
                </span>
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="text-xl text-gray-600 mt-6 max-w-lg leading-relaxed"
              >
                Discover premium products with cutting-edge technology. Your personalized shopping experience awaits.
              </motion.p>
            </div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/products"
                className="group relative bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-2xl text-lg font-semibold overflow-hidden text-center hover:bg-white/30 transition-all duration-300 pulse-glow"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                />
                <span className="relative z-10">
                Shop Now
                </span>
              </Link>
              <Link
                to="/products?category=featured"
                className="group border-2 border-white/50 bg-transparent p-0.5 rounded-2xl text-center hover:shadow-lg transition-all duration-300 hover:border-white/80"
              >
                <div className="bg-transparent px-8 py-4 rounded-2xl text-lg font-semibold text-white group-hover:bg-white/10 transition-all duration-300">
                View Featured
                </div>
              </Link>
            </motion.div>
          </div>

          {/* Hero Image */}
          <motion.div variants={itemVariants} className="relative">
            <motion.div
              animate={floatingAnimation}
              className="relative z-10"
            >
            <img
              src="https://images.pexels.com/photos/3965548/pexels-photo-3965548.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Shopping Experience"
              className="rounded-3xl shadow-2xl w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-purple-600/10 to-transparent rounded-3xl"></div>
            </motion.div>
            
            {/* Floating elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-80 blur-sm"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-70 blur-sm"
            />
          </motion.div>
        </motion.div>

        {/* Features */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-20 relative z-10"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                transition: { type: "spring", stiffness: 300 }
              }}
              className="text-center p-6 rounded-2xl bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/30 card-hover"
            >
              <motion.div 
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-r from-blue-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
              >
                <feature.icon className="text-white" size={24} />
              </motion.div>
              <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};