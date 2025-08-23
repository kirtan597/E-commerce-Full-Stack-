class MockAuthService {
  constructor() {
    this.users = [];
    this.cartItems = [];
    this.currentUser = null;

    // Load from localStorage
    const savedUsers = localStorage.getItem('mockUsers');
    const savedCart = localStorage.getItem('mockCart');
    const savedCurrentUser = localStorage.getItem('mockCurrentUser');
    if (savedUsers) this.users = JSON.parse(savedUsers);
    if (savedCart) this.cartItems = JSON.parse(savedCart);
    if (savedCurrentUser) this.currentUser = JSON.parse(savedCurrentUser);
  }

  saveToStorage() {
    localStorage.setItem('mockUsers', JSON.stringify(this.users));
    localStorage.setItem('mockCart', JSON.stringify(this.cartItems));
    localStorage.setItem('mockCurrentUser', JSON.stringify(this.currentUser));
  }

  async signUp(email, password, fullName) {
    const existingUser = this.users.find(u => u.email === email);
    if (existingUser) {
      return { error: { message: 'User already exists' } };
    }

  const newUser = {
      id: Date.now().toString(),
      email,
      user_metadata: { full_name: fullName },
      created_at: new Date().toISOString()
    };

    this.users.push(newUser);
    this.currentUser = newUser;
    this.saveToStorage();
    
    return { data: { user: newUser }, error: null };
  }

  async signIn(email, password) {
    const user = this.users.find(u => u.email === email);
    if (!user) {
      return { error: { message: 'Invalid credentials' } };
    }

    this.currentUser = user;
    this.saveToStorage();
    
    return { data: { user }, error: null };
  }

  async signOut() {
    this.currentUser = null;
    localStorage.removeItem('mockCurrentUser');
    return { error: null };
  }

  getCurrentUser() {
    return this.currentUser;
  }

  // Cart methods
  async addToCart(userId, productId, quantity) {
    const existingItem = this.cartItems.find(item => 
      item.user_id === userId && item.product_id === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cartItems.push({
        id: Date.now().toString(),
        user_id: userId,
        product_id: productId,
        quantity
      });
    }
    
    this.saveToStorage();
    return { error: null };
  }

  async getCartItems(userId) {
  return Array.isArray(this.cartItems) ? this.cartItems.filter(item => item.user_id === userId) : [];
  }

  async updateCartItem(itemId, quantity) {
    const item = this.cartItems.find(i => i.id === itemId);
    if (item) {
      item.quantity = quantity;
      this.saveToStorage();
    }
    return { error: null };
  }

  async removeCartItem(itemId) {
  this.cartItems = Array.isArray(this.cartItems) ? this.cartItems.filter(item => item.id !== itemId) : [];
    this.saveToStorage();
    return { error: null };
  }

  async clearCart(userId) {
  this.cartItems = Array.isArray(this.cartItems) ? this.cartItems.filter(item => item.user_id !== userId) : [];
    this.saveToStorage();
    return { error: null };
  }
}

export const mockAuth = new MockAuthService();