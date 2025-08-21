interface MockUser {
  id: string;
  email: string;
  user_metadata: {
    full_name: string;
  };
  created_at: string;
}

interface MockCartItem {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
}

class MockAuthService {
  private users: MockUser[] = [];
  private cartItems: MockCartItem[] = [];
  private currentUser: MockUser | null = null;

  constructor() {
    // Load from localStorage
    const savedUsers = localStorage.getItem('mockUsers');
    const savedCart = localStorage.getItem('mockCart');
    const savedCurrentUser = localStorage.getItem('mockCurrentUser');
    
    if (savedUsers) this.users = JSON.parse(savedUsers);
    if (savedCart) this.cartItems = JSON.parse(savedCart);
    if (savedCurrentUser) this.currentUser = JSON.parse(savedCurrentUser);
  }

  private saveToStorage() {
    localStorage.setItem('mockUsers', JSON.stringify(this.users));
    localStorage.setItem('mockCart', JSON.stringify(this.cartItems));
    localStorage.setItem('mockCurrentUser', JSON.stringify(this.currentUser));
  }

  async signUp(email: string, password: string, fullName: string) {
    const existingUser = this.users.find(u => u.email === email);
    if (existingUser) {
      return { error: { message: 'User already exists' } };
    }

    const newUser: MockUser = {
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

  async signIn(email: string, password: string) {
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
  async addToCart(userId: string, productId: string, quantity: number) {
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

  async getCartItems(userId: string) {
    return this.cartItems.filter(item => item.user_id === userId);
  }

  async updateCartItem(itemId: string, quantity: number) {
    const item = this.cartItems.find(i => i.id === itemId);
    if (item) {
      item.quantity = quantity;
      this.saveToStorage();
    }
    return { error: null };
  }

  async removeCartItem(itemId: string) {
    this.cartItems = this.cartItems.filter(item => item.id !== itemId);
    this.saveToStorage();
    return { error: null };
  }

  async clearCart(userId: string) {
    this.cartItems = this.cartItems.filter(item => item.user_id !== userId);
    this.saveToStorage();
    return { error: null };
  }
}

export const mockAuth = new MockAuthService();