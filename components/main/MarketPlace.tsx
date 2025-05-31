"use client";
import React, { useState, useEffect, createContext, useContext } from 'react';
import { ShoppingCart, Search, User, Heart, Menu, Star, ChevronRight, X, Plus, Minus, LogOut, Sun, Moon, ChevronLeft, Filter , Mail,ArrowRight,ArrowLeft , Trash2, InfoIcon,
  BadgePercentIcon,
  ListIcon,
  Settings2Icon} from 'lucide-react';
  import { FaStar } from "react-icons/fa";

// Theme Context
interface ThemeContextType {
  darkMode: boolean;
  toggleTheme: () => void;
}

const defaultValue: ThemeContextType = {
  darkMode: false,
  toggleTheme: () => {},
};

interface ThemeProviderProps {
  children: React.ReactNode;
}


const ThemeContext = createContext<ThemeContextType>(defaultValue);


const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = window.localStorage?.getItem('theme');
      return saved ? saved === 'dark' : false;
    } catch {
      return false;
    }
  });
  
  useEffect(() => {
    try {
      window.localStorage?.setItem('theme', darkMode ? 'dark' : 'light');
    } catch {}
  }, [darkMode]);
  
  const toggleTheme = () => setDarkMode(!darkMode);
  
  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      <div className={darkMode ? 'dark' : ''}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
  
};

// Enhanced Mock Data with multiple images per color
const mockProducts = [
  {
    id: 1,
    name: "Men Regular Fit Self Design Spread Collar Casual Shirt",
    brand: "JACKBELLA",
    price: 275,
    originalPrice: 1499,
    discount: 81,
    rating: 4.2,
    reviews: 128,
    colors: [
      { 
        name: 'Beige', 
        code: '#F5F5DC', 
        images: [
          '/assets/pic.png',
          '/assets/pic2.png',
          '/assets/pic3.png',
          '/assets/pic4.png'
        ]
      },
      { 
        name: 'Black', 
        code: '#000000', 
        images: [
         '/assets/pic5.png',
          '/assets/pic6.png',
          '/assets/pic7.png',
          '/assets/pic8.png'
        ]
      },
      { 
        name: 'Maroon', 
        code: '#800000', 
        images: [
         '/assets/pic9.png',
          '/assets/pic10.png',
          '/assets/pic11.png',
          '/assets/pic12.png'
        ]
      },
      { 
        name: 'White', 
        code: '#111111', 
        images: [
          '/assets/pic13.png',
          '/assets/pic14.png',
          '/assets/pic15.png',
          '/assets/pic16.png'
        ]
      }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    features: ['Regular Fit', 'Self Design', 'Spread Collar', 'Full Sleeves'],
    offers: [
      "Buy 2 Get 1 Free",
      "Flat ₹100 off on first purchase",
      "5% Cashback on UPI payments",
      "Extra 10% off with code: JACK10",
      "Free shipping on orders above ₹499"
    ],
    description: "A stylish and comfortable casual shirt perfect for everyday wear with premium fabric and modern design.",
    specifications: {
      'Material': '100% Cotton',
      'Pattern': 'Self Design',
      'Sleeve': 'Full Sleeve',
      'Fit': 'Regular Fit',
      'Care': 'Machine Wash'
    }
  }
];
const tabOptions = [
  { key: 'offers', label: 'Offers', icon: <BadgePercentIcon className="w-5 h-5 mr-2" /> },
  { key: 'description', label: 'Description', icon: <InfoIcon className="w-5 h-5 mr-2" /> },
  { key: 'specifications', label: 'Specifications', icon: <Settings2Icon className="w-5 h-5 mr-2" /> },
  { key: 'features', label: 'Features', icon: <ListIcon className="w-5 h-5 mr-2" /> },
  
];

const staticReviews = [
  {
    id: 1,
    user: "Alice",
    avatar: "https://i.pravatar.cc/40?img=1",
    rating: 5,
    comment: "Excellent product, very reliable!",
  },
  {
    id: 2,
    user: "Bob",
    avatar: "https://i.pravatar.cc/40?img=2",
    rating: 4,
    comment: "Good quality, fast delivery.",
  },
  {
    id: 3,
    user: "Charlie",
    avatar: "https://i.pravatar.cc/40?img=3",
    rating: 5,
    comment: "Highly recommend this to everyone!",
  },
  {
    id: 4,
    user: "Diana",
    avatar: "https://i.pravatar.cc/40?img=4",
    rating: 3,
    comment: "Decent product but packaging could be better.",
  },
  {
    id: 5,
    user: "Ethan",
    avatar: "https://i.pravatar.cc/40?img=5",
    rating: 5,
    comment: "Amazing customer support and quick refund process!",
  },
];

interface LeaveReviewProps {
  isDark: boolean;
  onSubmitReview: (reviewText: string) => void;
}

const LeaveReview = ({ isDark, onSubmitReview }: LeaveReviewProps) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");

  const cardBg = isDark ? "bg-gray-800" : "bg-white";
  const textClass = isDark ? "text-white" : "text-gray-900";
  const borderColor = isDark ? "border-indigo-400" : "border-black";
  interface Review {
    id: number;
    user: string;
    avatar: string;
    rating: number;
    comment: string;
  }
  
  interface LeaveReviewProps {
    isDark: boolean;
    onSubmitReview: (review: Review) => void;
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newReview = {
      id: Date.now(),
      user: "You",
      avatar: "https://i.pravatar.cc/40",
      rating,
      comment,
    };
    onSubmitReview(newReview);
    setRating(0);
    setComment("");
  };
  

  return (
    <form
      onSubmit={handleSubmit}
      className={`mt-4 w-full flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 p-3 rounded-xl border-2 ${cardBg} ${borderColor}`}
    >
      {/* Textarea */}
      <textarea
        placeholder="Write your review..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
        rows={1}
        className={`flex-grow text-sm resize-none p-2 rounded-md  ${borderColor} bg-transparent ${textClass} placeholder-gray-400 focus:outline-none`}
      />

      {/* Stars */}
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            className="p-0.5"
          >
            <FaStar
              size={18}
              className={`transition-colors ${
                (hover || rating) >= star ? "text-yellow-400" : "text-gray-400"
              }`}
            />
          </button>
        ))}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="text-sm px-4 w-full sm:w-[100px] py-1.5 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition whitespace-nowrap"
      >
        Submit
      </button>
    </form>
  );
};





const REVIEWS_PER_PAGE = 3;

const Reviews = () => {
  const { isDark } = useTheme();
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Load reviews from local storage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("userReviews")) || [];
    setReviews([...staticReviews, ...saved]);
  }, []);

  // Save to local storage when new reviews added
  const addReview = (newReview) => {
    const updatedUserReviews = [...(JSON.parse(localStorage.getItem("userReviews")) || []), newReview];
    localStorage.setItem("userReviews", JSON.stringify(updatedUserReviews));
    setReviews((prev) => [...prev, newReview]);
  };

  const totalPages = Math.ceil(reviews.length / REVIEWS_PER_PAGE);
  const startIndex = (currentPage - 1) * REVIEWS_PER_PAGE;
  const currentReviews = reviews.slice(startIndex, startIndex + REVIEWS_PER_PAGE);

  const bgClass = isDark ? "bg-gray-900" : "bg-gray-50";
  const textPrimaryClass = isDark ? "text-white" : "text-gray-900";
  const textSecondaryClass = isDark ? "text-gray-300" : "text-gray-700";
  const borderColor = isDark ? "border-indigo-400" : "border-black";
  const cardBg = isDark ? "bg-gray-800" : "bg-white";
  const shadowClass = isDark ? "shadow-lg shadow-black/40" : "shadow-lg";

  return (
    <section className="rounded-2xl mt-7 max-w-7xl mx-auto">
      <h2 className={`text-4xl sm:text-5xl font-black mb-6 ${textPrimaryClass}`}>Reviews</h2>

      <div className="flex flex-col gap-4">
        {currentReviews.map(({ id, user, avatar, rating, comment }) => (
          <div
            key={id}
            className={`font-bold rounded-3xl p-6 flex space-x-5 items-start hover:-translate-y-1 hover:shadow-2xl transition-transform duration-300 ${cardBg} ${shadowClass} border-2 ${borderColor}`}
          >
            <img src={avatar} alt={user} className={`w-14 h-14 rounded-full border-2 ${borderColor}`} />
            <div className="flex flex-col flex-1">
              <h3 className={`text-lg font-bold ${isDark ? "text-indigo-400" : "text-black"}`}>{user}</h3>
              <StarRating rating={rating} isDark={isDark} />
              <p className={`mt-3 text-sm leading-relaxed ${textSecondaryClass}`}>{comment}</p>
            </div>
          </div>
        ))}

        <LeaveReview isDark={isDark} onSubmitReview={addReview} />
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 space-x-3">
        {/* <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-md font-semibold transition ${
            currentPage === 1
              ? "opacity-50 cursor-not-allowed"
              : `bg-indigo-600 hover:bg-indigo-700 ${isDark ? "text-gray-200" : "text-white"}`
          }`}
        >
          Prev
        </button> */}

        {[...Array(totalPages)].map((_, idx) => {
          const pageNum = idx + 1;
          return (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              className={`px-4 py-2 rounded-md font-semibold transition ${
                currentPage === pageNum
                  ? `bg-indigo-700 ${isDark ? "text-gray-200" : "text-white"}`
                  : `hover:bg-indigo-500 ${isDark ? "text-indigo-300" : "text-indigo-700"}`
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        {/* <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-md font-semibold transition ${
            currentPage === totalPages
              ? "opacity-50 cursor-not-allowed"
              : `bg-indigo-600 hover:bg-indigo-700 ${isDark ? "text-gray-200" : "text-white"}`
          }`}
        >
          Next
        </button> */}
        
      </div>
      
    </section>
  );
};


const StarRating = ({ rating }) => {
  return (
    <div className="flex space-x-1 text-yellow-400 mt-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < rating ? "fill-current" : "text-gray-300 dark:text-gray-600"}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.973a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.39 2.46a1 1 0 00-.364 1.118l1.287 3.973c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.39 2.46c-.784.57-1.838-.197-1.54-1.118l1.286-3.973a1 1 0 00-.364-1.118L3.602 9.4c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.973z" />
        </svg>
      ))}
    </div>
  );
};

// Extended similar products for pagination
const similarProducts = [
  { id: 2, name: "Men Regular Fit Self Design Button Down Collar Casual Shirt", brand: "DIMMY", price: 336, originalPrice: 1999, discount: 83, image: '/assets/pic2.png', rating: 4.1, reviews: 89 },
  { id: 3, name: "Men Comfort Fit Self Design Spread Collar Casual Shirt", brand: "COMBRAIDED", price: 463, originalPrice: 2499, discount: 81, image: '/assets/pic6.png', rating: 4.3, reviews: 156 },
  { id: 4, name: "Men Regular Fit Striped Button Down Collar Casual Shirt", brand: "DEEMOON", price: 333, originalPrice: 1999, discount: 83, image: '/assets/pic10.png', rating: 4.0, reviews: 234 },
  { id: 5, name: "Men Slim Fit Solid Spread Collar Casual Shirt", brand: "FASHONIC", price: 299, originalPrice: 1799, discount: 83, image: '/assets/pic14.png', rating: 4.4, reviews: 67 },
  { id: 6, name: "Men Regular Fit Checkered Casual Shirt", brand: "STYLEZONE", price: 399, originalPrice: 1999, discount: 80, image: '/assets/pic2.png', rating: 4.2, reviews: 123 },
  { id: 7, name: "Men Comfort Fit Printed Casual Shirt", brand: "TRENDMAX", price: 450, originalPrice: 2299, discount: 80, image: '/assets/pic6.png', rating: 4.5, reviews: 198 },
  { id: 8, name: "Men Slim Fit Self Design Casual Shirt", brand: "URBANIC", price: 325, originalPrice: 1899, discount: 82, image: '/assets/pic10.png', rating: 4.1, reviews: 145 },
  { id: 9, name: "Men Regular Fit Floral Print Casual Shirt", brand: "BOHOMART", price: 375, originalPrice: 1999, discount: 81, image: '/assets/pic14.png', rating: 4.3, reviews: 87 }
];

// Navbar Component
const Navbar = ({ cartCount, onCartClick, onLoginClick, user, onLogout }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled 
        ? isDark 
          ? 'bg-gray-900/95 backdrop-blur-xl shadow-2xl border-b border-gray-800' 
          : 'bg-white/95 backdrop-blur-xl shadow-2xl border-b border-blue-100'
        : isDark 
          ? 'bg-gray-900/80 backdrop-blur-md' 
          : 'bg-white/80 backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-4 sm:space-x-8">
            <div className="text-2xl sm:text-4xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
              ShopStyle
            </div>
            <div className="hidden lg:flex items-center space-x-8">
              {['Home', 'Products', 'Categories', 'About'].map((item) => (
                <a key={item} href="#" className={`relative font-semibold transition-all duration-300 group ${
                  isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-blue-600'
                }`}>
                  {item}
                  <span className="absolute -bottom-2 left-0 w-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-500 rounded-full"></span>
                </a>
              ))}
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="flex-1 max-w-xs sm:max-w-2xl mx-4 sm:mx-8 hidden md:block">
            <div className="relative group">
              <input
                type="text"
                placeholder="Search for amazing products..."
                className={`w-full pl-12 sm:pl-14 pr-4 sm:pr-6 py-3 sm:py-4 border-2 rounded-xl sm:rounded-2xl focus:ring-4 transition-all duration-300 font-medium text-sm sm:text-base ${
                  isDark 
                    ? 'border-gray-700 bg-gray-800/50 text-white placeholder-gray-400 focus:ring-blue-500/30 focus:border-blue-500 hover:bg-gray-800/70'
                    : 'border-blue-200 bg-blue-50/50 text-gray-900 placeholder-gray-500 focus:ring-blue-500/30 focus:border-blue-500 hover:bg-blue-100/70'
                }`}
              />
              <Search className={`absolute left-3 sm:left-5 top-3 sm:top-4.5 h-5 w-5 sm:h-6 sm:w-6 transition-colors duration-300 ${
                isDark ? 'text-gray-400 group-focus-within:text-blue-400' : 'text-blue-400 group-focus-within:text-blue-500'
              }`} />
            </div>
          </div>
          
          {/* User Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 sm:p-3 rounded-xl transition-all duration-300 hover:scale-110 ${
                isDark 
                  ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30' 
                  : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
              }`}
            >
              {isDark ? <Sun className="h-4 w-4 sm:h-5 sm:w-5" /> : <Moon className="h-4 w-4 sm:h-5 sm:w-5" />}
            </button>

            {user ? (
              <div className="flex items-center space-x-2 sm:space-x-4">
                <div className={`flex items-center space-x-2 sm:space-x-3 px-2 sm:px-4 py-1 sm:py-2 rounded-xl transition-all duration-300 ${
                  isDark 
                    ? 'bg-gradient-to-r from-blue-900/50 to-purple-900/50 border border-blue-800/50' 
                    : 'bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200'
                }`}>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-xs sm:text-sm font-bold">
                      {user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </span>
                  </div>
                  <span className={`font-semibold text-xs sm:text-base hidden sm:block ${isDark ? 'text-white' : 'text-gray-800'}`}>
                    {user.name}
                  </span>
                </div>
                <button
                  onClick={onLogout}
                  className={`p-2 sm:p-3 rounded-xl transition-all duration-300 hover:scale-110 ${
                    isDark 
                      ? 'text-gray-400 hover:text-red-400 hover:bg-red-900/20' 
                      : 'text-gray-600 hover:text-red-500 hover:bg-red-50'
                  }`}
                  title="Logout"
                >
                  <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className={`flex items-center space-x-1 sm:space-x-2 font-semibold transition-all duration-300 px-2 sm:px-4 py-2 sm:py-3 rounded-xl hover:scale-105 text-xs sm:text-base ${
                  isDark 
                    ? 'text-gray-300 hover:text-white bg-gray-800/50 hover:bg-gray-700/50' 
                    : 'text-gray-700 hover:text-blue-600 bg-blue-100/50 hover:bg-blue-200/50'
                }`}
              >
                <User className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="hidden sm:block">Login</span>
              </button>
            )}
            
            <button className={`p-2 sm:p-3 rounded-xl transition-all duration-300 hover:scale-110 ${
              isDark 
                ? 'text-gray-400 hover:text-red-400 hover:bg-red-900/20' 
                : 'text-gray-600 hover:text-red-500 hover:bg-red-50'
            }`}>
              <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            
            <button
              onClick={onCartClick}
              className={`relative p-2 sm:p-3 rounded-xl transition-all duration-300 hover:scale-110 ${
                isDark 
                  ? 'text-gray-400 hover:text-blue-400 hover:bg-blue-900/20' 
                  : 'text-gray-600 hover:text-blue-500 hover:bg-blue-50'
              }`}
            >
              <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-5 w-5 sm:h-7 sm:w-7 flex items-center justify-center animate-bounce font-bold shadow-lg">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 sm:p-3 rounded-xl transition-all duration-300 ${
                isDark 
                  ? 'text-gray-400 hover:text-white hover:bg-gray-800/50' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-blue-100/50'
              }`}
            >
              <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className={`lg:hidden border-t mt-4 pt-4 pb-6 space-y-4 ${
            isDark ? 'border-gray-800' : 'border-blue-200'
          }`}>
            {['Home', 'Products', 'Categories', 'About'].map((item) => (
              <a key={item} href="#" className={`block font-semibold py-2 transition-colors duration-300 ${
                isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-blue-600'
              }`}>
                {item}
              </a>
            ))}
            <div className="pt-4 md:hidden">
              <input
                type="text"
                placeholder="Search products..."
                className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 ${
                  isDark 
                    ? 'border-gray-700 bg-gray-800/50 text-white placeholder-gray-400' 
                    : 'border-blue-200 bg-blue-50 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Enhanced Product Component
const Product = ({ product, onAddToCart }) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const { isDark } = useTheme();

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setCurrentImageIndex(0);
  };
  console.log(selectedColor.images);


  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      setShowValidationModal(true);
      return;
    }
    
    onAddToCart({
      ...product,
      selectedColor,
      selectedSize,
      quantity: 1
    });
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === selectedColor.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? selectedColor.images.length - 1 : prev - 1
    );
  };

  return (
    <div className={`pt-20 sm:pt-24 pb-8 sm:pb-16 transition-colors duration-300 ${
  isDark ? 'bg-gray-900' : 'bg-white'
}`}>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-20">
          {/* Product Images */}
          <div className="space-y-4 sm:space-y-6">
            {/* Main Image */}
            <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-2xl sm:rounded-3xl overflow-hidden group shadow-xl sm:shadow-2xl">
              <img
                src={selectedColor.images[currentImageIndex]}
                alt={`${product.name} - ${selectedColor.name}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 p-2 sm:p-3 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110"
              >
                <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6 text-gray-800 dark:text-white" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 p-2 sm:p-3 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110"
              >
                <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6 text-gray-800 dark:text-white" />
              </button>

              {/* Image Indicators */}
              <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {selectedColor.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                      currentImageIndex === index
                        ? 'bg-white shadow-lg scale-125'
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                  />
                ))}
              </div>
            </div>
         

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-2 sm:gap-4">
              {selectedColor.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`aspect-square bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 ${
                    currentImageIndex === index 
                      ? 'ring-2 sm:ring-4 ring-blue-500 ring-offset-1 sm:ring-offset-2 dark:ring-offset-gray-900 shadow-lg sm:shadow-xl' 
                      : 'hover:shadow-lg opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} - View ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
            <div className="hidden md:block">
  <Reviews />
</div>

          </div>
          

          {/* Product Details */}
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-3 sm:space-y-4">
              <p className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 uppercase tracking-widest font-bold">{product.brand}</p>
              <h1 className={`text-2xl sm:text-3xl xl:text-5xl font-black leading-tight ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {product.name}
              </h1>
              <p className={`text-base sm:text-lg leading-relaxed ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {product.description}
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-4 sm:space-x-6">
              <div className="flex items-center space-x-1 sm:space-x-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 sm:h-6 sm:w-6 ${
                      i < Math.floor(product.rating) 
                        ? 'text-yellow-400 fill-current' 
                        : isDark ? 'text-gray-600' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className={`text-lg sm:text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {product.rating}
              </span>
              <span className={`text-sm sm:text-base ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className={`p-4 sm:p-8 rounded-2xl sm:rounded-3xl shadow-lg ${
              isDark 
                ? 'bg-gradient-to-r from-green-900/30 to-blue-900/30 border border-green-800/30' 
                : 'bg-gradient-to-r from-green-50 to-blue-50 border border-green-200'
            }`}>
              <div className="flex items-center space-x-3 sm:space-x-6 flex-wrap">
                <span className={`text-3xl sm:text-5xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  ₹{product.price}
                </span>
                <span className={`text-lg sm:text-2xl line-through ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                  ₹{product.originalPrice}
                </span>
                <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-lg font-bold animate-pulse shadow-lg">
                  {product.discount}% OFF
                </span>
              </div>
              <p className={`mt-3 sm:mt-4 text-base sm:text-lg font-semibold ${
                isDark ? 'text-green-400' : 'text-green-600'
              }`}>
                You save ₹{product.originalPrice - product.price}!
              </p>
            </div>

            {/* Colors */}
            <div className="space-y-4 sm:space-y-6">
              <h3 className={`text-xl sm:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Choose Color
              </h3>
              <div className="flex space-x-3 sm:space-x-4">
  {product.colors.map((color, index) => (
    <button
      key={index}
      className={`relative w-12 h-12 sm:w-16 sm:h-16 rounded-full border-4 transition-all duration-300 hover:scale-110 shadow-lg ${
        selectedColor?.name === color.name 
          ? 'border-blue-500 ring-2 sm:ring-4 ring-blue-200 dark:ring-blue-800 shadow-2xl scale-110' 
          : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 hover:shadow-xl'
      }`}
      onClick={() => handleColorSelect(color)}
      title={color.name}
    >
      <img
        src={color.images[0]}
        alt={color.name}
        className="w-full h-full rounded-full object-cover"
      />
      {selectedColor?.name === color.name && (
        <div className="absolute inset-0 rounded-full bg-white/20 flex items-center justify-center">
          <div className="w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full shadow-lg"></div>
        </div>
      )}
    </button>
  ))}
</div>

              {selectedColor && (
                <p className={`font-semibold text-base sm:text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Selected: {selectedColor.name}
                </p>
              )}
            </div>

            {/* Sizes */}
            <div className="space-y-4 sm:space-y-6">
              <h3 className={`text-xl sm:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Select Size
              </h3>
              <div className="flex flex-wrap gap-2 sm:gap-4">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`px-4 sm:px-8 py-2 sm:py-4 border-2 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg transition-all duration-300 hover:scale-105 shadow-md ${
                      selectedSize === size
                        ? isDark
                          ? 'border-blue-500 bg-gradient-to-r from-blue-900/50 to-purple-900/50 text-blue-400 shadow-xl'
                          : 'border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 shadow-xl'
                        : isDark
                          ? 'border-gray-600 hover:border-gray-500 text-gray-300 hover:bg-gray-800/50'
                          : 'border-blue-300 hover:border-blue-400 text-gray-700 hover:bg-blue-50'
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 sm:space-y-4">
              <button
                onClick={handleAddToCart}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 sm:py-5 px-6 sm:px-8 rounded-xl sm:rounded-2xl font-bold text-lg sm:text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg"
              >
                Add to Cart
              </button>
              <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-4 sm:py-5 px-6 sm:px-8 rounded-xl sm:rounded-2xl font-bold text-lg sm:text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg">
                Buy Now
 </button>
            </div>

            {/* Product Info Tabs */}
            <div className={`border-t pt-8 ${isDark ? 'border-gray-800' : 'border-gray-200'} mt-10`}>
  {/* Tab Headers */}
  <div className="flex flex-nowrap items-center space-x-4 mb-6 pb-2 max-w-full overflow-x-auto no-scrollbar">
  {tabOptions.map(({ key, label, icon }) => (
    <button
      key={key}
      onClick={() => setActiveTab(key)}
      className={`flex items-center flex-shrink-0 whitespace-nowrap pb-2 px-2 sm:px-3 border-b-2 font-semibold text-sm sm:text-base capitalize transition-all duration-300 ${
        activeTab === key
          ? 'border-blue-500 text-blue-600 dark:text-blue-400'
          : isDark
            ? 'border-transparent text-gray-400 hover:text-gray-200'
            : 'border-transparent text-gray-500 hover:text-gray-700'
      }`}
      style={{ minWidth: 'max-content' }} // buttons only as wide as content
      aria-label={label}
      type="button"
    >
      <span className="w-5 h-5 mr-1 text-current flex-shrink-0">{icon}</span>
      <span className="truncate max-w-xs sm:max-w-none">{label}</span>
    </button>
  ))}
</div>




  {/* Tab Content */}
  <div className={`p-4 sm:p-6 rounded-2xl shadow-xl transition-all duration-500 ${
    isDark ? 'bg-gray-800/60' : 'bg-gray-50'
  }`}>
    {activeTab === 'description' && (
      <div className="space-y-4">
        <h4 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
  Product Description
</h4>

        <p className={`text-base sm:text-lg leading-relaxed ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {product.description} This premium quality shirt is crafted with attention to detail and designed for a modern lifestyle. Perfect for both casual and semi-formal occasions.
        </p>
      </div>
    )}

    {activeTab === 'specifications' && (
      <div className="space-y-4">
        <h4 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Specifications</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.entries(product.specifications).map(([key, value]) => (
            <div key={key} className="flex justify-between items-center border-b pb-1">
              <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{key}</span>
              <span className={`${isDark ? 'text-white' : 'text-gray-900'}`}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    )}

    {activeTab === 'features' && (
      <div className="space-y-4">
        <h4 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Product Features</h4>
        <ul className="space-y-3">
          {product.features.map((feature, index) => (
            <li key={index} className="flex items-center space-x-3">
              <div className="w-2.5 h-2.5 bg-blue-500 rounded-full shrink-0"></div>
              <span className={`text-base ${isDark ? 'text-white' : 'text-gray-900'}`}>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    )}

    {activeTab === 'offers' && product.offers?.length > 0 && (
      <div className="space-y-4">
        <h4 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Available Offers</h4>
        <ul className="space-y-3">
          {product.offers.map((offer, idx) => (
            <li key={idx} className="flex items-start space-x-3">
              <BadgePercentIcon className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
              <span className={`text-base ${isDark ? 'text-white' : 'text-gray-900'}`}>{offer}</span>
            </li>
          ))}
        </ul>
      </div>
    )}
    
  </div>
  <div className="block md:hidden">
  <Reviews />
</div>

</div>
          </div>
        </div>

        {/* Similar Products */}
        <SimilarProducts />
      </div>

      {/* Validation Modal */}
      {showValidationModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`max-w-md w-full p-8 rounded-3xl shadow-2xl ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}>
            <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Selection Required
            </h3>
            <p className={`mb-6 text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Please select both color and size before adding to cart.
            </p>
            <button
              onClick={() => setShowValidationModal(false)}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Similar Products Component with Pagination
const SimilarProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { isDark } = useTheme();

  // Responsive: show 4 per page on desktop, 1 on mobile
  const productsPerPage = typeof window !== "undefined" && window.innerWidth < 640 ? 1 : 4;
  const totalPages = Math.ceil(similarProducts.length / productsPerPage);

  const getCurrentProducts = () => {
    const startIndex = (currentPage - 1) * productsPerPage;
    return similarProducts.slice(startIndex, startIndex + productsPerPage);
  };

  return (
    <div className="mt-10">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h2 className={`text-4xl sm:text-5xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Similar Products
        </h2>
       
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {getCurrentProducts().map((product) => (
          <div
            key={product.id}
            className={`group cursor-pointer transform hover:scale-105 transition duration-500 ${
              isDark ? 'bg-gray-800/50' : 'bg-white'
            } rounded-2xl shadow-md sm:shadow-lg hover:shadow-xl p-4 sm:p-6`}
          >
            <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden mb-4 sm:mb-6 relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs sm:text-sm px-2 sm:px-3 py-0.5 sm:py-1 rounded-full font-bold">
                {product.discount}% OFF
              </div>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <p className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-semibold">
                {product.brand}
              </p>
              <h3 className={`font-bold text-sm sm:text-lg leading-tight line-clamp-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {product.name}
              </h3>
              <div className="flex items-center space-x-1 sm:space-x-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 sm:h-4 sm:w-4 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400'
                          : isDark ? 'text-gray-600' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  ({product.reviews})
                </span>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <span className={`text-lg sm:text-2xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  ₹{product.price}
                </span>
                <span className="line-through text-sm text-gray-500">₹{product.originalPrice}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center space-x-3 mt-4">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={`p-2 sm:p-3 rounded-xl transition ${
              currentPage === 1
                ? isDark ? 'text-gray-600 cursor-not-allowed' : 'text-gray-400 cursor-not-allowed'
                : isDark ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
          <span className={`text-sm sm:text-lg font-semibold ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className={`p-2 sm:p-3 rounded-xl transition ${
              currentPage === totalPages
                ? isDark ? 'text-gray-600 cursor-not-allowed' : 'text-gray-400 cursor-not-allowed'
                : isDark ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>
    </div>
    
  );
};


// Login Modal Component
const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const { isDark } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (trimmedName && trimmedEmail) {
      const userData = {
        name: trimmedName,
        email: trimmedEmail,
      };

      // ✅ Store in localStorage
      localStorage.setItem("user", JSON.stringify(userData));

      // ✅ Send to parent
      onLogin(userData);

      // Reset form
      setName('');
      setEmail('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`max-w-md w-full p-8 rounded-3xl shadow-2xl transition-all duration-300 ${
        isDark ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="text-center mb-8">
          <h2 className={`text-3xl font-black mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {isRegistering ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {isRegistering ? 'Join our shopping community' : 'Sign in to your account'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <User className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl font-medium transition-all duration-300 ${
                  isDark
                    ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20'
                    : 'border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20'
                }`}
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl font-medium transition-all duration-300 ${
                  isDark
                    ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20'
                    : 'border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20'
                }`}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            {isRegistering ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className={`font-semibold hover:underline transition-colors duration-300 ${
              isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
            }`}
          >
            {isRegistering ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </button>
        </div>

        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-300 ${
            isDark ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
          }`}
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};



// Enhanced Cart Component
const Cart = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem }) => {
  const { isDark } = useTheme();
  
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 overflow-auto">
  <div className={`w-full sm:max-w-4xl max-h-[95vh] overflow-hidden rounded-2xl shadow-2xl flex flex-col ${
    isDark ? 'bg-gray-800' : 'bg-white'
  }`}>
    {/* Header */}
    <div className={`p-4 sm:p-6 border-b flex items-center justify-between ${
      isDark ? 'border-gray-700' : 'border-gray-200'
    }`}>
      <h2 className={`text-xl sm:text-3xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>
        Shopping Cart ({cartItems.length})
      </h2>
     
      <button
        onClick={onClose}
        className={`p-2 sm:p-3 rounded-full transition hover:scale-110 ${
          isDark
            ? 'text-gray-400 hover:text-white hover:bg-gray-700'
            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
        }`}
      >
        <X className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>
    </div>

    {/* Cart Items */}
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
      {cartItems.length === 0 ? (
        <div className="text-center py-10 sm:py-16">
          <ShoppingCart className={`h-20 w-20 sm:h-24 sm:w-24 mx-auto mb-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
          <h3 className={`text-xl sm:text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Your cart is empty
          </h3>
          <p className={`text-sm sm:text-lg ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Add some amazing products to get started!
          </p>
        </div>
      ) : (
        cartItems.map((item) => (
          <div key={`${item.id}-${item.selectedColor?.name}-${item.selectedSize}`} 
          className={`flex items-center justify-between gap-4 p-4 rounded-xl transition-all duration-300 ${
            isDark ? 'bg-gray-700/50 hover:bg-gray-700/70' : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          {/* Image */}
          <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-600">
            <img
              src={item.selectedColor?.images?.[0] || '/api/placeholder/200/200'}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>
        
          {/* Product Info */}
          <div className="flex-1 flex flex-col text-sm">
            <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.name}</span>
            <span className={`text-xs font-bold mt-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{item.brand}</span>
            <div className="flex gap-3 mt-1 text-xs">
              <span className={`text-xs font-bold mt-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Color: {item.selectedColor?.name}</span>
              <span className={`text-xs font-bold mt-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Size: {item.selectedSize}</span>
            </div>
          </div>
        
          {/* Quantity + Price + Remove */}
          <div className="flex flex-col items-end gap-2">
            {/* Quantity control */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => onUpdateQuantity(item.id, item.selectedColor?.name, item.selectedSize, Math.max(1, item.quantity - 1))}
                className={`p-1 rounded-full ${
                  isDark ? 'bg-gray-600 text-white' : 'bg-gray-300 text-gray-800'
                } hover:scale-110 transition`}
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.quantity}</span>
              <button
                onClick={() => onUpdateQuantity(item.id, item.selectedColor?.name, item.selectedSize, item.quantity + 1)}
                className={`p-1 rounded-full ${
                  isDark ? 'bg-gray-600 text-white' : 'bg-gray-300 text-gray-800'
                } hover:scale-110 transition`}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
        
            {/* Price + Trash */}
            <div className="flex items-center gap-3">
              <span className={`text-sm font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>
                ₹{item.price * item.quantity}
              </span>
              <button
                onClick={() => onRemoveItem(item.id, item.selectedColor?.name, item.selectedSize)}
                className="p-2 rounded-full text-red-500 hover:bg-red-100 dark:hover:bg-red-800/30 transition"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        
        
        ))
      )}
    </div>

    {/* Footer */}
    {cartItems.length > 0 && (
      <div className={`p-4 sm:p-6 border-t space-y-4 sm:space-y-6 ${
        isDark ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <div className="space-y-3 text-sm sm:text-base">
          <div className="flex justify-between">
            <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Subtotal:</span>
            <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>₹{subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Shipping:</span>
            <span className={`font-bold ${
              shipping === 0 ? 'text-green-500' : isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {shipping === 0 ? 'FREE' : `₹${shipping}`}
            </span>
          </div>
          <div className={`flex justify-between pt-2 border-t text-lg sm:text-2xl font-black ${
            isDark ? 'border-gray-700 text-white' : 'border-gray-200 text-gray-900'
          }`}>
            <span>Total:</span>
            <span>₹{total}</span>
          </div>
        </div>

        <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 sm:py-4 rounded-xl font-bold text-lg sm:text-xl transition hover:scale-101 shadow-lg">
          Proceed to Checkout
        </button>
      </div>
    )}
  </div>
</div>

  );
};

// Main App Component
const App = () => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cartItems');
    return saved ? JSON.parse(saved) : [];
  });
  const [showCart, setShowCart] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const handleAddToCart = (product) => {
    const existingItemIndex = cartItems.findIndex(
      item => item.id === product.id && 
               item.selectedColor?.name === product.selectedColor?.name && 
               item.selectedSize === product.selectedSize
    );

    if (existingItemIndex >= 0) {
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantity += 1;
      setCartItems(updatedItems);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const handleUpdateQuantity = (id, colorName, size, newQuantity) => {
    if (newQuantity === 0) {
      handleRemoveItem(id, colorName, size);
      return;
    }
    
    setCartItems(cartItems.map(item => 
      item.id === id && 
      item.selectedColor?.name === colorName && 
      item.selectedSize === size
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const handleRemoveItem = (id, colorName, size) => {
    setCartItems(cartItems.filter(item => 
      !(item.id === id && 
        item.selectedColor?.name === colorName && 
        item.selectedSize === size)
    ));
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setCartItems([]);
    localStorage.removeItem('user');
    localStorage.removeItem('cartItems');
  };
  const Footer = () => {
    const { isDark } = useTheme();
  
    const bgClass = isDark ? "bg-gray-900" : "bg-gray-50";
    const textPrimaryClass = isDark ? "text-white" : "text-gray-900";
    const textSecondaryClass = isDark ? "text-gray-400" : "text-gray-600";
    const linkHoverClass = isDark ? "hover:text-indigo-400" : "hover:text-indigo-600";
    const borderColor = isDark ? "border-gray-700" : "border-gray-200";
  
    return (
      <footer className={`${bgClass} border-t-2 ${borderColor} py-8 px-6 pb-[130px] sm:pb-[30px]`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
  
          {/* Logo or Brand Name */}
          <div className={`text-2xl font-extrabold ${textPrimaryClass} `}>
            ShopStyle
          </div>
  
          {/* Navigation Links */}
          <nav className="flex space-x-6 text-sm font-semibold">
            <a href="#home" className={`${textSecondaryClass} ${linkHoverClass} transition`}>
              Home
            </a>
            <a href="#about" className={`${textSecondaryClass} ${linkHoverClass} transition`}>
              About
            </a>
            <a href="#services" className={`${textSecondaryClass} ${linkHoverClass} transition`}>
              Services
            </a>
            <a href="#contact" className={`${textSecondaryClass} ${linkHoverClass} transition`}>
              Contact
            </a>
          </nav>
  
          {/* Social Media Icons */}
          <div className="flex space-x-4">
            <a
              href="https://twitter.com"
              aria-label="Twitter"
              className={`${textSecondaryClass} ${linkHoverClass} transition`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* Replace with your icon */}
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" >
                <path d="M8 19c11 0 17-9 17-17v-1A12.18 12.18 0 0028 0a11.72 11.72 0 01-3.36.92A6 6 0 0027 2.33a12.05 12.05 0 01-3.83 1.45 6 6 0 00-10.22 5.46A17 17 0 012 1.16 6 6 0 005.84 8 6 6 0 012 7.33a6 6 0 004.8 5.88A6.06 6.06 0 012 13a6 6 0 005.6 4.15A12 12 0 012 21c-1.34 0-2.61-.39-3.7-1.05a17 17 0 009.3 2.72" />
              </svg>
            </a>
            <a
              href="https://facebook.com"
              aria-label="Facebook"
              className={`${textSecondaryClass} ${linkHoverClass} transition`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* Replace with your icon */}
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" >
                <path d="M22 12a10 10 0 10-11.58 9.85v-7H8v-3h2.42V9.41c0-2.4 1.44-3.73 3.64-3.73 1.05 0 2.15.18 2.15.18v2.36h-1.21c-1.19 0-1.56.74-1.56 1.5v1.8H17l-.38 3h-2.37v7A10 10 0 0022 12z" />
              </svg>
            </a>
            <a
              href="https://instagram.com"
              aria-label="Instagram"
              className={`${textSecondaryClass} ${linkHoverClass} transition`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* Replace with your icon */}
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" >
                <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm5 4a5 5 0 110 10 5 5 0 010-10zm6.5-.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
              </svg>
            </a>
          </div>
        </div>
  
        {/* Copyright */}
        <p className={`text-center mt-6 text-xs ${textSecondaryClass}`}>
          &copy; {new Date().getFullYear()} ShopStyle - By Sourjya
        </p>
      </footer>
    );
  };
  return (
    <ThemeProvider>
      
        <Navbar 
          cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
          onCartClick={() => setShowCart(true)}
          onLoginClick={() => setShowLogin(true)}
          user={user}
          onLogout={handleLogout}
        />
        
        <Product 
          product={mockProducts[0]} 
          onAddToCart={handleAddToCart}
        />
        
        <Cart
          isOpen={showCart}
          onClose={() => setShowCart(false)}
          cartItems={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
        />
        
        <LoginModal
          isOpen={showLogin}
          onClose={() => setShowLogin(false)}
          onLogin={handleLogin}
        />
      <Footer/>
    </ThemeProvider>
  );
};

export default App;