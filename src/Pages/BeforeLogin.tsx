import React,{useState,useRef,useEffect} from 'react';
import { Search, User, Menu, BarChart3, Package, Heart, Gift, Users,ChevronUp,ChevronDown,Send, Building, Mail, Phone,LogIn, UserPlus  } from 'lucide-react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
}

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex w-full justify-between items-center text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-medium text-gray-900">{question}</h3>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-indigo-600" />
        ) : (
          <ChevronDown className="h-5 w-5 text-indigo-600" />
        )}
      </button>
      {isOpen && (
        <div className="mt-2">
          <p className="text-gray-600">{answer}</p>
        </div>
      )}
    </div>
  );
};

function BeforeLogin() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after showing success message
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          company: '',
        });
      }, 3000);
    }, 1500);
  };  
 // Close dropdown when clicking outside
 useEffect(() => {
  function handleClickOutside(event: MouseEvent) {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  }
  
  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Brand */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center">
                  <BarChart3 className="h-8 w-8 text-indigo-600" />
                  <span className="ml-2 text-xl font-bold text-gray-900">InventoryPro</span>
                </div>
              </div>
              
              {/* Desktop Navigation */}
              <nav className="hidden md:ml-8 md:flex md:space-x-8">
                <a href="javascript:void(0)" className="text-indigo-600 font-medium border-b-2 border-indigo-600 px-1 pt-1 pb-2">Dashboard</a>
                <a href="javascript:void(0)" className="text-gray-500 hover:text-gray-900 font-medium px-1 pt-1 pb-2">Products</a>
                <a href="javascript:void(0)" className="text-gray-500 hover:text-gray-900 font-medium px-1 pt-1 pb-2">Orders</a>
                <a href="javascript:void(0)" className="text-gray-500 hover:text-gray-900 font-medium px-1 pt-1 pb-2">Reports</a>
              </nav>
            </div>
            
            {/* Search Bar - Desktop */}
            <div className="hidden md:block flex-1 max-w-md mx-8">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search inventory..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            
            {/* Right side icons */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="ml-3 relative">
                <div>
                  {/* User dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-1 bg-indigo-100 rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all hover:bg-indigo-200"
                >
                  <User className="h-8 w-8 rounded-full p-1 text-indigo-600" />
                  <ChevronDown className={`h-4 w-4 text-indigo-600 mr-1 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Dropdown menu */}
                {isDropdownOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none z-50 transform transition-all duration-200 ease-out">
                    <div className="py-1">
                      <div className="px-4 py-3">
                        <p className="text-sm text-gray-500">Welcome to</p>
                        <p className="text-sm font-medium text-gray-900 truncate">InventoryPro</p>
                      </div>
                    </div>
                    
                    <div className="py-1">
                      <a href="/login" className="group flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 transition-colors">
                        <LogIn className="mr-3 h-5 w-5 text-gray-400 group-hover:text-indigo-500" />
                        <span className="group-hover:text-indigo-600 font-medium">Log In</span>
                      </a>
                      <a href="/signup" className="group flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 transition-colors">
                        <UserPlus className="mr-3 h-5 w-5 text-gray-400 group-hover:text-indigo-500" />
                        <span className="group-hover:text-indigo-600 font-medium">Sign Up</span>
                      </a>
                    </div>
                    
                    {/* <div className="py-1">
                      <a href="#" className="group flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-red-50 transition-colors">
                        <LogOut className="mr-3 h-5 w-5 text-gray-400 group-hover:text-red-500" />
                        <span className="group-hover:text-red-600 font-medium">Sign Out</span>
                      </a>
                    </div> */}
                  </div>
                )}
              </div>
                </div>
              </div>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
            <button
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <nav className="px-2 py-4 space-y-2">
              <a href="javascript:void(0)" className="block text-indigo-600 font-medium px-3 py-2">Dashboard</a>
              <a href="javascript:void(0)" className="block text-gray-600 hover:text-gray-900 px-3 py-2">Products</a>
              <a href="javascript:void(0)" className="block text-gray-600 hover:text-gray-900 px-3 py-2">Orders</a>
              <a href="javascript:void(0)" className="block text-gray-600 hover:text-gray-900 px-3 py-2">Reports</a>
            </nav>
            <div className="flex items-center space-x-4 p-4 pt-0 ps-0 gap-2">
              <div className="ml-3 relative">
                <div className="py-1 flex gap-2">
                      <a href="javascript:void(0)" className="group flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 transition-colors" style={{"background":"rgb(238 242 255)","borderRadius":"5px"}}>
                        <LogIn className="mr-3 h-5 w-5 text-gray-400 group-hover:text-indigo-500" />
                        <span className="group-hover:text-indigo-600 font-medium">Log In</span>
                      </a>
                      <a href="javascript:void(0)" className="group flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 transition-colors" style={{"background":"rgb(238 242 255)","borderRadius":"5px"}}>
                        <UserPlus className="mr-3 h-5 w-5 text-gray-400 group-hover:text-indigo-500" />
                        <span className="group-hover:text-indigo-600 font-medium">Sign Up</span>
                      </a>
                    </div>
                </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-r text-white" style={{"background":"#4f46e5"}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                Inventory Management System
              </h1>
              <p className="text-lg md:text-xl text-indigo-100 mb-6">
                Streamline your inventory processes, reduce costs, and boost efficiency with our powerful management system.
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <button className="px-6 py-3 bg-white text-indigo-600 font-medium rounded-md shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600">
                  Get Started
                </button>
                <button className="px-6 py-3 bg-indigo-500 text-white font-medium rounded-md shadow-md hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600">
                  Watch Demo
                </button>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-64 h-64 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute inset-0 w-64 h-64 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                <div className="relative">
                  <div className="bg-white p-8 rounded-lg shadow-lg">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        <Package className="h-10 w-10 text-indigo-600 p-2 bg-indigo-100 rounded-md" />
                        <div className="ml-4">
                          <h3 className="text-lg font-medium text-gray-900">Inventory Status</h3>
                          <p className="text-sm text-gray-500">Real-time overview</p>
                        </div>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Live
                      </span>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-md">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-500">Total Products</span>
                          <span className="text-lg font-semibold text-gray-900">1,248</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-500">Low Stock Items</span>
                          <span className="text-lg font-semibold text-gray-900">28</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-500">Orders Pending</span>
                          <span className="text-lg font-semibold text-gray-900">56</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-purple-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Customer-Centric Section */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Smart AI-Driven Jewelry Inventory System</h2>
              <p className="text-gray-700 mb-6">
              Optimize jewelry inventory with AI-powered tracking, automated stock updates, smart search, and seamless management.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <p className="text-gray-700">Store all jewelry items, images, and files in one secure hub</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <p className="text-gray-700">Quickly locate products with AI-enhanced search and smart filters</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <p className="text-gray-700">Track inventory status: in stock, on memo, sold, or in repair</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <p className="text-gray-700">Generate professional jewelry tags with barcodes or QR codes</p>
                </li>
                
              </ul>
              <button className="mt-8 bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300">
                Learn More
              </button>
            </div>
            <div className="lg:w-1/2">
              <img 
                src="https://cdn.prod.website-files.com/6318a159edd1600a2aa06972/656c12acd4a1c4e89df495ad_products%20tab.webp" 
                alt="Inventory Management System" 
                className="rounded-xl shadow-lg w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Customer-Centric Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
              <img 
                src="https://cdn.prod.website-files.com/6318a159edd1600a2aa06972/656c155485ee607dd823e713_documents%20tab%20HD.webp" 
                alt="Inventory Management System" 
                className="rounded-xl shadow-lg w-full h-auto object-cover"
              />
              <br />
              <img 
                src="https://cdn.prod.website-files.com/6318a159edd1600a2aa06972/656ce0e44c3117db5e06ade3_Invoice%20Products.webp" 
                alt="Inventory Management System" 
                className="rounded-xl shadow-lg w-full h-auto object-cover"
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Effortless Automated Accounting</h2>
              <p className="text-gray-700 mb-6">
              Simplify accounting with automated invoicing, payment tracking, expense management, and real-time financial insights.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <p className="text-gray-700">Manage payments, outstanding balances, and order history effortlessly</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <p className="text-gray-700">Analyze top-selling jewelry categories and most profitable channels</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <p className="text-gray-700">Simplify dealer transactions with powerful memo management tools</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <p className="text-gray-700">Enhance your brand with elegant, customized invoices and memos</p>
                </li>
              </ul>
              <button className="mt-8 bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300">
                Learn More
              </button>
            </div>
            
          </div>
        </div>
      </section>

      {/* Customer-Centric Section */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Enhance Customer Relationships</h2>
              <p className="text-gray-700 mb-6">
              Build strong customer connections with personalized service, order history tracking, and AI-driven insights.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <p className="text-gray-700">Keep all customer, dealer, and supplier details in one place</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <p className="text-gray-700">Identify key customers and uncover new growth opportunities</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <p className="text-gray-700">Access complete order and payment history for every client</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <p className="text-gray-700">Access complete order and payment history for every client</p>
                </li>
              </ul>
              <button className="mt-8 bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300">
                Learn More
              </button>
            </div>
            <div className="lg:w-1/2">
              <img 
                src="https://cdn.prod.website-files.com/6318a159edd1600a2aa06972/656cef3a2321a8598c488f4c_Customers%20Tab.webp" 
                alt="Inventory Management System" 
                className="rounded-xl shadow-lg w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Customer-Centric Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
              <img 
                src="https://cdn.prod.website-files.com/6318a159edd1600a2aa06972/656cef11fdbce489e1ad3118_Collections%20Screen.webp" 
                alt="Inventory Management System" 
                className="rounded-xl shadow-lg w-full h-auto object-cover"
              />
              <br />
              <img 
                src="https://cdn.prod.website-files.com/6318a159edd1600a2aa06972/656cf007fdbce489e1ada789_Collections%20main%20screen.webp" 
                alt="Inventory Management System" 
                className="rounded-xl shadow-lg w-full h-auto object-cover"
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Strengthen Your Brand Identity</h2>
              <p className="text-gray-700 mb-6">
              Boost your brand with custom invoices, branded catalogs, professional packaging, and a seamless digital presence.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <p className="text-gray-700">Share stunning, branded catalogs privately with your top clients</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <p className="text-gray-700">Enable dealer portals with custom pricing for seamless B2B sales</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <p className="text-gray-700">Launch micro-sites for easy product purchases and memos</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <p className="text-gray-700">Organize inventory into collections for trade shows and customs forms</p>
                </li>
              </ul>
              <button className="mt-8 bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300">
                Learn More
              </button>
            </div>
            
          </div>
        </div>
      </section>

{/* Be Customer-Centric Section */}
<div className="bg-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why InventoryPro?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Delight your customers with personalized experiences powered by AI insights
            </p>
          </div>

          {/* Hexagon Grid Layout */}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Customer Profile Card */}
              <div className="bg-gradient-to-br rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 transform hover:-translate-y-1" style={{"background":"#d2d0ff4a"}}>
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{"background":"rgb(193 190 255 / 33%)"}}>
                    <Users className="h-6 w-6" style={{"color":"rgb(79 70 229)"}}/>
                  </div>
                  <h3 className="ml-4 text-xl font-semibold text-gray-900">Save Time</h3>
                </div>
                <p className="text-gray-600 mb-6">
                An InventoryPro saves time by automating stock tracking, reducing manual errors, and streamlining order fulfillment.
                </p>
                <div className="flex items-center" style={{"color":"rgb(79 70 229)"}}>
                  <span className="text-sm font-medium">Learn more</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              </div>

              {/* Anniversary Reminders Card */}
              <div className="bg-gradient-to-br rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 transform hover:-translate-y-1" style={{"background":"#d2d0ff4a"}}>
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{"background":"rgb(193 190 255 / 33%)"}}>
                    <Gift className="h-6 w-6" style={{"color":"rgb(79 70 229)"}}/>
                  </div>
                  <h3 className="ml-4 text-xl font-semibold text-gray-900">Take Control</h3>
                </div>
                <p className="text-gray-600 mb-6">
                An InventoryPro empowers you to take control by tracking stock, reducing waste, and improving decision-making.
                </p>
                <div className="flex items-center" style={{"color":"rgb(79 70 229)"}}>
                  <span className="text-sm font-medium">Learn more</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              </div>

              {/* Personalized Recommendations Card */}
              <div className="bg-gradient-to-br rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 transform hover:-translate-y-1" style={{"background":"#d2d0ff4a"}}>
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{"background":"rgb(193 190 255 / 33%)"}}>
                    <Heart className="h-6 w-6" style={{"color":"rgb(79 70 229)"}}/>
                  </div>
                  <h3 className="ml-4 text-xl font-semibold text-gray-900">Boost Sales</h3>
                </div>
                <p className="text-gray-600 mb-6">
                An InventoryPro boosts sales by preventing stockouts, optimizing restocking, and ensuring products are always available.
                </p>
                <div className="flex items-center" style={{"color":"rgb(79 70 229)"}}>
                  <span className="text-sm font-medium">Learn more</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

        {/* contact form */}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 from-indigo-50 to-blue-100 flex items-center justify-center">
      <div className="w-full">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-8">
            <h1 className="text-3xl font-bold text-white">Get in Touch</h1>
            <p className="text-blue-100 mt-2 text-lg">We'd love to hear from you!</p>
          </div>
          
          {isSubmitted ? (
            <div className="p-12 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800">Thank You!</h3>
              <p className="text-gray-600 mt-3 text-lg">Your message has been received. We'll get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-8 space-y-6 max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-1">
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="pl-10 w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      placeholder="John"
                    />
                  </div>
                </div>
                
                <div className="col-span-1">
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="pl-10 w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      placeholder="Doe"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="pl-10 w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    placeholder="john.doe@example.com"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-1">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="pl-10 w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>
                
                <div className="col-span-1">
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Building size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      required
                      className="pl-10 w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      placeholder="Acme Inc."
                    />
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit <Send size={18} className="ml-2" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full">
            <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
            <div className="space-y-1">
              <FAQItem 
                question="How quickly can I get started with InventoryPro?" 
                answer="You can be up and running with InventoryPro in as little as 24 hours. Our onboarding specialists will guide you through the setup process, import your existing inventory data, and provide training for your team."
              />
              <FAQItem 
                question="Can InventoryPro integrate with my existing e-commerce platform?" 
                answer="Yes! InventoryPro seamlessly integrates with all major e-commerce platforms including Shopify, WooCommerce, Magento, and Amazon. Our API also allows for custom integrations with proprietary systems."
              />
              <FAQItem 
                question="How does InventoryPro handle multi-location inventory?" 
                answer="InventoryPro provides robust multi-location inventory management. You can track stock levels across warehouses, retail locations, and fulfillment centers in real-time, transfer inventory between locations, and set location-specific reorder points."
              />
              <FAQItem 
                question="Is InventoryPro suitable for small businesses?" 
                answer="Absolutely! We offer plans tailored to businesses of all sizes. Our small business tier provides all the essential inventory management features at an affordable price point, with the ability to scale as your business grows."
              />
              <FAQItem 
                question="What kind of support does InventoryPro provide?" 
                answer="We offer 24/7 customer support via chat, email, and phone. All plans include access to our comprehensive knowledge base, video tutorials, and regular webinars. Enterprise plans also include a dedicated account manager."
              />
            </div>
          </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">InventoryPro</h3>
              <p className="text-gray-400">Modern inventory management for growing businesses.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="javascript:void(0)" className="text-gray-400 hover:text-white transition">Features</a></li>
                <li><a href="javascript:void(0)" className="text-gray-400 hover:text-white transition">Pricing</a></li>
                <li><a href="javascript:void(0)" className="text-gray-400 hover:text-white transition">Integrations</a></li>
                <li><a href="javascript:void(0)" className="text-gray-400 hover:text-white transition">Enterprise</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="javascript:void(0)" className="text-gray-400 hover:text-white transition">Documentation</a></li>
                <li><a href="javascript:void(0)" className="text-gray-400 hover:text-white transition">Blog</a></li>
                <li><a href="javascript:void(0)" className="text-gray-400 hover:text-white transition">Guides</a></li>
                <li><a href="javascript:void(0)" className="text-gray-400 hover:text-white transition">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="javascript:void(0)" className="text-gray-400 hover:text-white transition">About</a></li>
                <li><a href="javascript:void(0)" className="text-gray-400 hover:text-white transition">Careers</a></li>
                <li><a href="javascript:void(0)" className="text-gray-400 hover:text-white transition">Contact</a></li>
                <li><a href="javascript:void(0)" className="text-gray-400 hover:text-white transition">Legal</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2025 InventoryPro. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="javascript:void(0)" className="text-gray-400 hover:text-white transition">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a href="javascript:void(0)" className="text-gray-400 hover:text-white transition">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd"></path>
                </svg>
              </a>
              <a href="javascript:void(0)" className="text-gray-400 hover:text-white transition">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default BeforeLogin;