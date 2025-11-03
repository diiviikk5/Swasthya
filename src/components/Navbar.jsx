import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  Home,
  Eye,
  Brain,
  Bell,
  ChevronDown,
  Zap,
  Sparkles,
  User,
  Moon,
  Sun,
  Flame,
  Settings,
  HelpCircle,
} from 'lucide-react';

const SwastikSymbol = ({ size = 'w-6 h-6', className = '' }) => (
  <svg
    viewBox="0 0 100 100"
    className={`${size} ${className}`}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M50 20 L50 80 M20 50 L80 50" strokeLinecap="round" />
    <path d="M50 20 L65 35 M50 80 L65 65 M20 50 L35 35 M80 50 L65 35" strokeLinecap="round" />
  </svg>
);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isDark, setIsDark] = useState(true);
  const location = useLocation();
  const navRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setIsOpen(false);
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const mainNav = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
  ];

  const toolsMenu = [
    { name: 'Symptom Logger', href: '/SymptomLogger', icon: Eye, desc: 'शिवोऽहम् - Observer consciousness' },
    { name: 'Dharma Chatbot', href: '/DharmaChatbot', icon: Brain, desc: 'कालभैरव - Ethical guidance' },
    { name: 'Joy Tracker', href: '/JoyTracker', icon: Sparkles, desc: 'अधरं मधुरम् - Celebrate joy' },
    { name: 'Sacred Fire', href: '/Community', icon: Flame, desc: 'अजं शाश्वतम् - Community' },
  ];

  const accountMenu = [
    { name: 'My Profile', href: '/account/profile', icon: User },
    { name: 'Settings', href: '/account/settings', icon: Settings },
    { name: 'Help & Support', href: '/account/support', icon: HelpCircle },
  ];

  const DropdownMenu = ({ items, isOpen: dropdownOpen }) => (
    <>
      {dropdownOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full left-0 mt-2 w-56 backdrop-blur-xl bg-gradient-to-b from-stone-900/95 via-red-950/50 to-stone-900/95 border border-amber-600/30 rounded-2xl shadow-2xl py-2 z-50"
        >
          {items.map((item, i) => (
            <Link key={i} to={item.href} onClick={() => setOpenDropdown(null)}>
              <motion.div
                whileHover={{ x: 5, backgroundColor: 'rgba(217, 119, 6, 0.1)' }}
                className="px-4 py-3 flex items-start gap-3 border-l-2 border-transparent hover:border-amber-500 transition-all cursor-pointer group"
              >
                <item.icon className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-poppins font-semibold text-amber-200 group-hover:text-amber-100">
                    {item.name}
                  </p>
                  {item.desc && <p className="text-xs text-amber-100/50">{item.desc}</p>}
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      )}
    </>
  );

  const NavButton = ({ href, label, icon: Icon }) => {
    const isActive = location.pathname === href;
    return (
      <Link to={href}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-poppins font-semibold transition-all ${
            isActive
              ? 'text-amber-300 bg-gradient-to-r from-amber-600/30 to-orange-600/20 border border-amber-500/50'
              : 'text-amber-100/70 hover:text-amber-300 hover:bg-amber-600/20'
          }`}
        >
          <Icon className="w-4 h-4" />
          {label}
        </motion.button>
      </Link>
    );
  };

  const DropdownButton = ({ label, icon: Icon, isOpen: dropdownOpen, onClick }) => (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-poppins font-semibold transition-all ${
        dropdownOpen
          ? 'text-amber-300 bg-gradient-to-r from-amber-600/30 to-orange-600/20 border border-amber-500/50'
          : 'text-amber-100/70 hover:text-amber-300 hover:bg-amber-600/20'
      }`}
    >
      <Icon className="w-4 h-4" />
      {label}
      <motion.div animate={{ rotate: dropdownOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
        <ChevronDown className="w-4 h-4" />
      </motion.div>
    </motion.button>
  );

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 backdrop-blur-xl bg-gradient-to-r from-stone-950/95 via-red-950/60 to-stone-950/95 border-b border-amber-600/20 z-50 shadow-2xl">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2"
            >
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}>
                <SwastikSymbol className="text-amber-400" />
              </motion.div>
              <div className="flex flex-col leading-tight">
                <span className="text-lg font-playfair font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-orange-400">
                  Swasthya
                </span>
                <span className="text-xs font-poppins text-amber-200/60">Arogyam</span>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2 ml-12">
            {mainNav.map((item) => (
              <NavButton key={item.name} href={item.href} label={item.name} icon={item.icon} />
            ))}

            {/* Sacred Tools Dropdown */}
            <div className="relative">
              <DropdownButton
                label="Sacred Tools"
                icon={Zap}
                isOpen={openDropdown === 'tools'}
                onClick={() => setOpenDropdown(openDropdown === 'tools' ? null : 'tools')}
              />
              <DropdownMenu items={toolsMenu} isOpen={openDropdown === 'tools'} />
            </div>
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-2 ml-auto">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg text-amber-100/70 hover:text-amber-300 hover:bg-amber-600/20 transition-all relative"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-lg text-amber-100/70 hover:text-amber-300 hover:bg-amber-600/20 transition-all"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>

            {/* Account */}
            <div className="relative">
              <motion.button
                onClick={() => setOpenDropdown(openDropdown === 'account' ? null : 'account')}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg text-amber-100/70 hover:text-amber-300 hover:bg-amber-600/20 transition-all"
              >
                <User className="w-5 h-5" />
              </motion.button>
              <DropdownMenu items={accountMenu} isOpen={openDropdown === 'account'} />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.95 }}
            className="lg:hidden p-2 rounded-lg text-amber-300 hover:bg-amber-600/20 transition-all"
          >
            <motion.div animate={{ rotate: isOpen ? 90 : 0 }}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.div>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden border-t border-amber-600/20 py-6 space-y-4 px-4"
          >
            {/* Navigation */}
            <div>
              <p className="text-xs uppercase tracking-widest font-poppins text-amber-500/70 mb-3 pl-4">Navigation</p>
              {mainNav.map((item) => (
                <Link key={item.name} to={item.href} onClick={() => setIsOpen(false)} className="block">
                  <motion.div className="flex items-center gap-3 px-4 py-2 rounded-lg text-amber-100/70 hover:text-amber-300 hover:bg-amber-600/20 transition-all">
                    <item.icon className="w-4 h-4" />
                    {item.name}
                  </motion.div>
                </Link>
              ))}
            </div>

            {/* Sacred Tools */}
            <div className="border-t border-amber-600/20 pt-4">
              <p className="text-xs uppercase tracking-widest font-poppins text-amber-500/70 mb-3 pl-4">Sacred Tools</p>
              {toolsMenu.map((item) => (
                <Link key={item.name} to={item.href} onClick={() => setIsOpen(false)} className="block">
                  <motion.div className="flex items-center gap-3 px-4 py-2 rounded-lg text-amber-100/70 hover:text-amber-300 hover:bg-amber-600/20 transition-all">
                    <item.icon className="w-4 h-4" />
                    <div className="text-left">
                      <p className="font-poppins font-semibold">{item.name}</p>
                      <p className="text-xs text-amber-100/40">{item.desc}</p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>

            {/* Account */}
            <div className="border-t border-amber-600/20 pt-4">
              <p className="text-xs uppercase tracking-widest font-poppins text-amber-500/70 mb-3 pl-4">Account</p>
              {accountMenu.map((item) => (
                <Link key={item.name} to={item.href} onClick={() => setIsOpen(false)} className="block">
                  <motion.div className="flex items-center gap-3 px-4 py-2 rounded-lg text-amber-100/70 hover:text-amber-300 hover:bg-amber-600/20 transition-all">
                    <item.icon className="w-4 h-4" />
                    {item.name}
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}
