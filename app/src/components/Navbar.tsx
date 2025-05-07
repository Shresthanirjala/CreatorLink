import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { 
  Wallet, 
  Search, 
  Bell, 
  User, 
  Menu, 
  X, 
  ChevronDown, 
  Sparkles,
  BarChart3,
  Layers,
  Shield,
  Users,
  Newspaper,
  HelpCircle,
  ArrowRight,
  Hash
} from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [showDropdown, setShowDropdown] = useState("");
  const [notifications, setNotifications] = useState(3);
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);
  const searchRef = useRef(null);
  const notificationRef = useRef(null);
  const location = useLocation();


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

 
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchFocused(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotificationPanel(false);
      }
      if (!event.target.closest('.dropdown-trigger')) {
        setShowDropdown("");
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);


  const notificationData = [
    {
      id: 1,
      type: "investment",
      user: "Alex Rivera",
      action: "published a new track",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      type: "price",
      message: "Emma Chen token up by 12.3%",
      time: "5 hours ago",
      read: false,
    },
    {
      id: 3,
      type: "system",
      message: "Welcome to CreatorLink! Complete your profile.",
      time: "1 day ago",
      read: false,
    }
  ];

  const navItems = [
    {
      name: "Explore",
      path: "/explore",
      dropdown: [
        { name: "Trending Creators", icon: <BarChart3 className="h-4 w-4" />, path: "/explore/trending" },
        { name: "Categories", icon: <Layers className="h-4 w-4" />, path: "/explore/categories" },
        { name: "New Launches", icon: <Sparkles className="h-4 w-4" />, path: "/explore/new" }
      ]
    },
    {
      name: "How It Works",
      path: "/how-it-works",
      dropdown: [
        { name: "For Investors", icon: <Shield className="h-4 w-4" />, path: "/how-it-works/investors" },
        { name: "For Creators", icon: <Users className="h-4 w-4" />, path: "/how-it-works/creators" }
      ]
    },
    {
      name: "Resources",
      path: "/resources",
      dropdown: [
        { name: "Blog", icon: <Newspaper className="h-4 w-4" />, path: "/blog" },
        { name: "FAQs", icon: <HelpCircle className="h-4 w-4" />, path: "/faqs" }
      ]
    }
  ];
  

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };


  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    
    setSearchFocused(false);
    setShowNotificationPanel(false);
  };

  return (
    <>
      <nav 
        className={`w-full fixed top-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? "py-2 bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20" 
            : "py-4 bg-transparent"
        }`}
      >
       
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
        
        <div className="container px-4 mx-auto flex items-center justify-between">
          <div className="flex items-center">
           
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 p-0.5 group-hover:shadow-lg group-hover:shadow-blue-500/30 transition-all duration-300 group-hover:scale-110">
                <div className="w-full h-full rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white font-bold text-lg">
                  C
                </div>
              </div>
              <span className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text group-hover:from-blue-300 group-hover:to-purple-400 transition-all duration-300">CreatorLink</span>
              
              
              <div className="hidden md:flex items-center justify-center px-1.5 py-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded text-xs font-medium text-blue-400 border border-blue-500/30">
                BETA
              </div>
            </Link>

            
            <div className="hidden lg:flex items-center ml-10 space-x-1">
              {navItems.map((item) => (
                <div key={item.name} className="relative">
                  <button 
                    className={`dropdown-trigger px-3 py-2 rounded-lg flex items-center gap-1.5 transition-all duration-300 group ${
                      isActive(item.path) 
                        ? "text-blue-400" 
                        : "text-gray-300 hover:text-white"
                    }`}
                    onClick={() => setShowDropdown(showDropdown === item.name ? "" : item.name)}
                  >
                    <span>{item.name}</span>
                    <ChevronDown 
                      className={`h-4 w-4 transition-transform duration-300 ${
                        showDropdown === item.name ? "rotate-180" : ""
                      }`}
                    />
                    
                    
                    <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full transition-all duration-300 ${
                      isActive(item.path) ? "bg-blue-400" : "bg-transparent group-hover:bg-white/50"
                    }`}></span>
                  </button>
                  
            
                  {showDropdown === item.name && (
                    <div className="absolute top-full left-0 mt-1 py-2 bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-lg shadow-black/20 min-w-[220px] animate-fade-in-up">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.path}
                          className="flex items-center gap-2 px-4 py-2.5 hover:bg-white/5 text-gray-300 hover:text-white transition-colors"
                        >
                          {subItem.icon}
                          <span>{subItem.name}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-2 md:gap-3">
      
            <div 
              ref={searchRef}
              className={`relative ${
                searchFocused 
                  ? "w-64 md:w-72" 
                  : "w-10 md:w-10"
              } transition-all duration-300 overflow-hidden`}
            >
              <div 
                className={`flex items-center rounded-full border ${
                  searchFocused 
                    ? "bg-gray-800/80 border-blue-500/50" 
                    : "bg-transparent border-transparent hover:bg-white/5"
                } transition-all duration-300`}
              >
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`rounded-full text-gray-300 ${
                    searchFocused ? "text-blue-400" : "hover:text-white"
                  }`}
                  onClick={() => setSearchFocused(!searchFocused)}
                >
                  <Search className="h-5 w-5" />
                </Button>
                <input 
                  type="text" 
                  placeholder="Search creators, tokens..." 
                  className={`bg-transparent text-white focus:outline-none h-10 ${
                    searchFocused ? "w-full pr-4" : "w-0"
                  } transition-all duration-300`}
                  onFocus={() => setSearchFocused(true)}
                />
              </div>
              
             
              {searchFocused && (
                <div className="absolute top-full left-0 right-0 mt-2 py-3 bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-lg shadow-black/20 animate-fade-in-down z-50">
                  <div className="px-3 pb-2 mb-2 border-b border-white/5">
                    <p className="text-xs text-gray-500 uppercase font-medium">Trending Searches</p>
                  </div>
                  <div className="px-1">
                    {["Music Producers", "Digital Artists", "Fitness Creators"].map((item, i) => (
                      <button 
                        key={i}
                        className="flex items-center gap-2 w-full px-3 py-2 hover:bg-white/5 text-gray-300 hover:text-white text-sm text-left rounded-lg transition-all"
                      >
                        <Hash className="h-3.5 w-3.5 text-gray-500" />
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            
            <div ref={notificationRef} className="relative">
              <Button 
                variant="ghost" 
                size="icon" 
                className={`rounded-full ${
                  showNotificationPanel 
                    ? "text-blue-400 bg-gray-800/50" 
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                } relative transition-all duration-200`}
                onClick={() => {
                  setShowNotificationPanel(!showNotificationPanel);
                  setSearchFocused(false);
                }}
              >
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <span className="absolute top-0 right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </Button>
              
            
              {showNotificationPanel && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-lg shadow-black/20 animate-fade-in-down z-50">
                  <div className="flex items-center justify-between p-3 border-b border-white/5">
                    <h3 className="font-medium text-white">Notifications</h3>
                    <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                      Mark all as read
                    </button>
                  </div>
                  
                  <div className="max-h-[320px] overflow-y-auto scrollbar-thin">
                    {notificationData.map((notification) => (
                      <div 
                        key={notification.id}
                        className={`p-3 border-b border-white/5 ${
                          notification.read ? "" : "bg-blue-500/5"
                        } hover:bg-white/5 transition-colors cursor-pointer`}
                      >
                        <div className="flex gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center 
                            ${notification.type === "investment" ? "bg-green-500/20 text-green-400" :
                              notification.type === "price" ? "bg-blue-500/20 text-blue-400" : 
                              "bg-purple-500/20 text-purple-400"}`
                          }>
                            {notification.type === "investment" ? <Users className="h-4 w-4" /> :
                             notification.type === "price" ? <BarChart3 className="h-4 w-4" /> :
                             <Bell className="h-4 w-4" />}
                          </div>
                          <div>
                            <div className="text-sm">
                              {notification.user ? (
                                <span>
                                  <span className="font-medium text-white">{notification.user}</span> {notification.action}
                                </span>
                              ) : (
                                <span className="text-white">{notification.message}</span>
                              )}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">{notification.time}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-2">
                    <Button variant="ghost" className="w-full text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 transition-all">
                      View all notifications
                    </Button>
                  </div>
                </div>
              )}
            </div>
            
          
            <Link to="/portfolio">
              <Button 
                variant="ghost" 
                size="icon" 
                className={`rounded-full border border-transparent ${
                  isActive('/portfolio') 
                    ? "bg-gray-800/50 border-white/10 text-blue-400" 
                    : "text-gray-300 hover:bg-white/5 hover:text-white hover:border-white/10"
                } transition-all duration-200`}
              >
                <User className="h-5 w-5" />
              </Button>
            </Link>
            
            
            <Button 
              className="hidden md:flex bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 hover:shadow-lg hover:shadow-blue-500/25 transition-all hover:scale-105 
              group/wallet relative overflow-hidden px-5"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover/wallet:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center z-10">
                <Wallet className="h-4 w-4 mr-2 group-hover/wallet:animate-subtle-bounce" /> 
                Connect
              </span>
            </Button>
            
          
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden rounded-full text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5 animate-in" />
              ) : (
                <Menu className="h-5 w-5 animate-in" />
              )}
            </Button>
          </div>
        </div>
      </nav>
      
      
      {mobileMenuOpen && (
        <div className="lg:hidden fixed top-[57px] inset-x-0 bottom-0 z-40 bg-black/95 backdrop-blur-lg border-t border-white/10 animate-fade-in-down-slow overflow-auto">
          <div className="container px-4 mx-auto py-6 flex flex-col h-full">
            <div className="space-y-1 mb-6">
          
              <div className="relative mb-6">
                <div className="flex items-center rounded-xl border border-white/10 bg-white/5 focus-within:border-blue-500/50 transition-all duration-300 px-3">
                  <Search className="h-5 w-5 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Search creators, tokens..." 
                    className="bg-transparent text-white focus:outline-none h-12 w-full px-3"
                  />
                </div>
              </div>
              
              
              {navItems.map((item, index) => (
                <div key={item.name} className="mb-3">
                  <button
                    className={`w-full py-3 px-4 flex items-center justify-between rounded-lg ${
                      isActive(item.path) ? "bg-white/10 text-blue-400" : "text-gray-200"
                    } hover:bg-white/5 transition-colors`}
                    onClick={() => setShowDropdown(showDropdown === item.name ? "" : item.name)}
                  >
                    <span className="font-medium">{item.name}</span>
                    <ChevronDown 
                      className={`h-5 w-5 transition-transform duration-300 ${
                        showDropdown === item.name ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  
                  {showDropdown === item.name && (
                    <div className="mt-1 pl-4 space-y-1 animate-fade-in">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.path}
                          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                        >
                          {subItem.icon}
                          <span>{subItem.name}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            
      
            <div className="mt-auto space-y-4 pt-6 border-t border-white/10">
              <Link to="/portfolio">
                <Button variant="outline" className="w-full border-white/20 text-white justify-between hover:bg-white/5">
                  <span className="flex items-center">
                    <User className="h-5 w-5 mr-2" /> Your Portfolio
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              
              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium py-6 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all border-0">
                <Wallet className="h-5 w-5 mr-2" /> Connect Wallet
              </Button>
              
              <div className="flex items-center justify-center gap-6 py-4">
                <Button variant="ghost" size="icon" className="rounded-full text-gray-400 hover:text-white">
                  <Bell className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full text-gray-400 hover:text-white">
                  <HelpCircle className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      
      {(searchFocused || showNotificationPanel) && (
        <div 
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm pointer-events-none"
          aria-hidden="true"
        />
      )}
    </>
  );
};


const extendedTailwindCSS = `
@keyframes subtle-bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}

@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fade-in-down {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fade-in-down-slow {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-subtle-bounce {
  animation: subtle-bounce 1s ease infinite;
}

.animate-fade-in-up {
  animation: fade-in-up 0.3s ease forwards;
}

.animate-fade-in-down {
  animation: fade-in-down 0.3s ease forwards;
}

.animate-fade-in-down-slow {
  animation: fade-in-down-slow 0.4s ease forwards;
}

/* Custom scrollbar for the notification panel */
.scrollbar-thin::-webkit-scrollbar {
  width: 4px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: rgba(59, 130, 246, 0.5);
}
`;

export default Navbar;