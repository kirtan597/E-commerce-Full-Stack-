

const productTemplates = {
  Electronics: [
    { name: 'Wireless Earbuds Pro', desc: 'Premium sound quality with active noise cancellation' },
    { name: 'Smart Fitness Watch', desc: 'Track your health with advanced sensors' },
    { name: 'Gaming Mechanical Keyboard', desc: 'RGB backlit with tactile switches' },
    { name: '4K Webcam Ultra', desc: 'Crystal clear video for streaming and calls' },
    { name: 'Portable Power Bank', desc: '20000mAh fast charging for all devices' },
    { name: 'Bluetooth Speaker Max', desc: '360-degree sound with deep bass' },
    { name: 'Wireless Charging Pad', desc: 'Fast wireless charging for compatible devices' },
    { name: 'Smart Home Hub', desc: 'Control all your smart devices from one place' }
  ],
  Clothing: [
    { name: 'Premium Cotton Hoodie', desc: 'Soft and comfortable for everyday wear' },
    { name: 'Designer Denim Jacket', desc: 'Classic style with modern fit' },
    { name: 'Athletic Performance Shorts', desc: 'Moisture-wicking fabric for workouts' },
    { name: 'Luxury Silk Scarf', desc: 'Elegant accessory for any occasion' },
    { name: 'Organic Cotton T-Shirt', desc: 'Sustainable and comfortable everyday wear' },
    { name: 'Winter Wool Sweater', desc: 'Warm and stylish for cold weather' },
    { name: 'Professional Blazer', desc: 'Perfect for business and formal events' },
    { name: 'Casual Sneakers', desc: 'Comfortable and trendy footwear' }
  ],
  Home: [
    { name: 'Smart LED Light Bulbs', desc: 'Color-changing bulbs with app control' },
    { name: 'Aromatherapy Diffuser', desc: 'Create a relaxing atmosphere at home' },
    { name: 'Memory Foam Pillow', desc: 'Ergonomic support for better sleep' },
    { name: 'Ceramic Coffee Mug Set', desc: 'Beautiful handcrafted mugs for your morning coffee' },
    { name: 'Bamboo Cutting Board', desc: 'Eco-friendly and durable kitchen essential' },
    { name: 'Smart Thermostat', desc: 'Energy-efficient temperature control' },
    { name: 'Decorative Wall Art', desc: 'Modern abstract prints to enhance your space' },
    { name: 'Cozy Throw Blanket', desc: 'Soft and warm for relaxing evenings' }
  ],
  Sports: [
    { name: 'Professional Yoga Mat', desc: 'Non-slip surface for all yoga practices' },
    { name: 'Adjustable Dumbbells', desc: 'Space-saving home gym equipment' },
    { name: 'Running Shoes Elite', desc: 'Lightweight with superior cushioning' },
    { name: 'Resistance Bands Set', desc: 'Full-body workout anywhere' },
    { name: 'Smart Water Bottle', desc: 'Tracks hydration with temperature control' },
    { name: 'Fitness Tracker Band', desc: 'Monitor your daily activity and health' },
    { name: 'Protein Shaker Bottle', desc: 'Leak-proof with mixing ball' },
    { name: 'Exercise Ball', desc: 'Improve core strength and balance' }
  ],
  Books: [
    { name: 'The Art of Programming', desc: 'Master coding with practical examples' },
    { name: 'Mindfulness Meditation Guide', desc: 'Find peace in your daily life' },
    { name: 'Cooking Masterclass', desc: 'Professional techniques for home chefs' },
    { name: 'Digital Marketing Secrets', desc: 'Grow your business online' },
    { name: 'Photography Fundamentals', desc: 'Capture stunning images like a pro' },
    { name: 'Personal Finance Mastery', desc: 'Build wealth and financial freedom' },
    { name: 'Creative Writing Workshop', desc: 'Unleash your storytelling potential' },
    { name: 'Sustainable Living Guide', desc: 'Eco-friendly lifestyle choices' }
  ],
  Photography: [
    { name: 'Professional Camera Lens', desc: 'Sharp images with beautiful bokeh' },
    { name: 'Carbon Fiber Tripod', desc: 'Lightweight yet stable for any shot' },
    { name: 'LED Ring Light', desc: 'Perfect lighting for portraits and videos' },
    { name: 'Camera Backpack Pro', desc: 'Protect your gear while traveling' },
    { name: 'Wireless Remote Shutter', desc: 'Capture photos without camera shake' },
    { name: 'Lens Cleaning Kit', desc: 'Keep your lenses spotless' },
    { name: 'Memory Card Ultra', desc: 'High-speed storage for 4K video' },
    { name: 'Photo Editing Software', desc: 'Professional tools for stunning edits' }
  ]
};

const images = {
  Electronics: [
    'https://images.pexels.com/photos/3945667/pexels-photo-3945667.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/163117/phone-mobile-smartphone-android-163117.jpeg?auto=compress&cs=tinysrgb&w=400'
  ],
  Clothing: [
    'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400'
  ],
  Home: [
    'https://images.pexels.com/photos/1166644/pexels-photo-1166644.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=400'
  ],
  Sports: [
    'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1552103/pexels-photo-1552103.jpeg?auto=compress&cs=tinysrgb&w=400'
  ],
  Books: [
    'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg?auto=compress&cs=tinysrgb&w=400'
  ],
  Photography: [
    'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/274973/pexels-photo-274973.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg?auto=compress&cs=tinysrgb&w=400'
  ]
};

export const generateProducts = (count = 50) => {
  const products = [];
  const categories = Object.keys(productTemplates);
  
  for (let i = 0; i < count; i++) {
    const category = categories[i % categories.length];
    const templates = productTemplates[category];
    const template = templates[i % templates.length];
    const categoryImages = images[category];
    
    const basePrice = Math.floor(Math.random() * 50000) + 1000;
    const hasDiscount = Math.random() > 0.6;
  const discountPercentage = hasDiscount ? Math.floor(Math.random() * 30) + 5 : undefined;
    
    products.push({
      id: `generated-${i + 1}`,
      name: template.name,
      description: template.desc,
      price: basePrice,
      image_url: categoryImages[Math.floor(Math.random() * categoryImages.length)],
      category,
      stock_quantity: Math.floor(Math.random() * 100) + 1,
      discount_percentage: discountPercentage,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
  }
  
  return products;
};

export const getFeaturedProducts = (allProducts, count = 8) => {
  return allProducts
  .filter(p => p.discount_percentage && p.discount_percentage > 15)
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
};

export const getTrendingProducts = (allProducts, count = 6) => {
  return allProducts
  .filter(p => p.stock_quantity < 20)
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
};

export const getNewArrivals = (allProducts, count = 8) => {
  return allProducts
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
};