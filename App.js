import React, { createContext, useContext, useReducer } from 'react';
import { ShoppingCart, Leaf, Plus, Minus, Trash2, ArrowLeft } from 'lucide-react';

// Redux-like reducer for cart management
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }]
      };
    
    case 'INCREASE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      };
    
    case 'DECREASE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ).filter(item => item.quantity > 0)
      };
    
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    
    default:
      return state;
  }
};

// Context for cart state
const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, { items: [] });
  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

// Plant data
const plants = [
  // Indoor Plants Category
  {
    id: 1,
    name: 'Monstera Deliciosa',
    price: 39.99,
    category: 'Indoor Plants',
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400&h=400&fit=crop'
  },
  {
    id: 2,
    name: 'Snake Plant',
    price: 24.99,
    category: 'Indoor Plants',
    image: 'https://images.unsplash.com/photo-1593482892290-f54927ae1bb8?w=400&h=400&fit=crop'
  },
  // Succulents Category
  {
    id: 3,
    name: 'Aloe Vera',
    price: 19.99,
    category: 'Succulents',
    image: 'https://images.unsplash.com/photo-1509587584298-0f3b3a3a1797?w=400&h=400&fit=crop'
  },
  {
    id: 4,
    name: 'Jade Plant',
    price: 29.99,
    category: 'Succulents',
    image: 'https://images.unsplash.com/photo-1459156212016-c812468e2115?w=400&h=400&fit=crop'
  },
  // Flowering Plants Category
  {
    id: 5,
    name: 'Peace Lily',
    price: 34.99,
    category: 'Flowering Plants',
    image: 'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=400&h=400&fit=crop'
  },
  {
    id: 6,
    name: 'Orchid',
    price: 44.99,
    category: 'Flowering Plants',
    image: 'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?w=400&h=400&fit=crop'
  }
];

// Header Component
const Header = ({ currentPage, onNavigate }) => {
  const { cart } = useCart();
  const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-green-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('landing')}>
            <Leaf className="w-8 h-8" />
            <h1 className="text-2xl font-bold">Paradise Nursery</h1>
          </div>
          
          {currentPage !== 'landing' && (
            <nav className="flex items-center gap-6">
              <button
                onClick={() => onNavigate('products')}
                className="hover:text-green-200 transition-colors font-medium"
              >
                Products
              </button>
              <button
                onClick={() => onNavigate('cart')}
                className="relative hover:text-green-200 transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                    {totalItems}
                  </span>
                )}
              </button>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

// Landing Page
const LandingPage = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-cover bg-center relative" style={{
      backgroundImage: 'url(https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=1920&h=1080&fit=crop)',
    }}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white px-4">
        <div className="text-center max-w-3xl">
          <h1 className="text-6xl font-bold mb-6 flex items-center justify-center gap-3">
            <Leaf className="w-16 h-16" />
            Paradise Nursery
          </h1>
          <p className="text-xl mb-8 leading-relaxed">
            Welcome to Paradise Nursery, where green dreams come true! We are passionate about bringing nature closer to you. Our extensive collection of houseplants, succulents, and flowering beauties are carefully curated to transform your space into a lush paradise. Whether you're a seasoned plant parent or just starting your green journey, we have the perfect plant companion waiting for you. Let's grow together!
          </p>
          <button
            onClick={() => onNavigate('products')}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all transform hover:scale-105 shadow-lg"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

// Product Card
const ProductCard = ({ plant }) => {
  const { cart, dispatch } = useCart();
  const isInCart = cart.items.some(item => item.id === plant.id);

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: plant });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <img src={plant.image} alt={plant.name} className="w-full h-64 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{plant.name}</h3>
        <p className="text-green-600 font-bold text-lg mb-4">${plant.price.toFixed(2)}</p>
        <button
          onClick={handleAddToCart}
          disabled={isInCart}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-all ${
            isInCart
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          {isInCart ? 'Added to Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

// Product Listing Page
const ProductListingPage = () => {
  const categories = ['Indoor Plants', 'Succulents', 'Flowering Plants'];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Our Collection</h2>
        
        {categories.map(category => (
          <div key={category} className="mb-12">
            <h3 className="text-2xl font-bold text-green-800 mb-6">{category}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {plants
                .filter(plant => plant.category === category)
                .map(plant => (
                  <ProductCard key={plant.id} plant={plant} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Shopping Cart Page
const ShoppingCartPage = ({ onNavigate }) => {
  const { cart, dispatch } = useCart();
  
  const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalCost = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">Shopping Cart</h2>
        
        {cart.items.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart className="w-24 h-24 mx-auto text-gray-300 mb-4" />
            <p className="text-xl text-gray-500 mb-6">Your cart is empty</p>
            <button
              onClick={() => onNavigate('products')}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-all"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex justify-between text-lg font-semibold mb-2">
                <span>Total Items:</span>
                <span className="text-green-600">{totalItems}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold">
                <span>Total Cost:</span>
                <span className="text-green-600">${totalCost.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              {cart.items.map(item => (
                <div key={item.id} className="bg-white rounded-lg shadow-md p-4 flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
                    <p className="text-green-600 font-semibold">${item.price.toFixed(2)} each</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => dispatch({ type: 'DECREASE_QUANTITY', payload: item.id })}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-all"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    
                    <span className="text-xl font-bold w-12 text-center">{item.quantity}</span>
                    
                    <button
                      onClick={() => dispatch({ type: 'INCREASE_QUANTITY', payload: item.id })}
                      className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition-all"
                    >
                      <Plus className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })}
                      className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-lg transition-all ml-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => onNavigate('products')}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Continue Shopping
              </button>
              
              <button
                onClick={() => alert('Coming Soon')}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-all"
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Main App Component
export default function App() {
  const [currentPage, setCurrentPage] = React.useState('landing');

  return (
    <CartProvider>
      <div className="min-h-screen">
        {currentPage !== 'landing' && (
          <Header currentPage={currentPage} onNavigate={setCurrentPage} />
        )}
        
        {currentPage === 'landing' && <LandingPage onNavigate={setCurrentPage} />}
        {currentPage === 'products' && <ProductListingPage />}
        {currentPage === 'cart' && <ShoppingCartPage onNavigate={setCurrentPage} />}
      </div>
    </CartProvider>
  );
}
