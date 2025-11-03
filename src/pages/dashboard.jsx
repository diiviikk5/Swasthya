import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  AlertCircle,
  Plus,
  Trash2,
  Calendar,
  Bell,
  Settings,
  TrendingUp,
  Zap,
  Heart,
  Brain,
  Leaf,
  Eye,
  Radio,
  CheckCircle2,
  Flame,
  Droplet,
  Wind,
  Mountain,
  Sparkles,
  Moon,
  Sun,
  ChevronDown,
  BarChart3,
  HelpCircle,
  User,
  Home,
} from 'lucide-react';

// ===== SWASTIK SYMBOL =====
const SwastikSymbol = ({ size = 'w-8 h-8', className = '' }) => (
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

// ===== BACKGROUND =====
const DashboardBg = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
    <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-stone-950 to-black" />
    <motion.div
      animate={{ opacity: [0.1, 0.2, 0.1] }}
      transition={{ duration: 8, repeat: Infinity }}
      className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-amber-600/10 to-transparent rounded-full blur-3xl"
    />
    <motion.div
      animate={{ opacity: [0.1, 0.15, 0.1] }}
      transition={{ duration: 10, repeat: Infinity, delay: 1 }}
      className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-red-700/8 to-transparent rounded-full blur-3xl"
    />
  </div>
);

// ===== NEW NAVBAR =====
const DashboardNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
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
    { name: 'Symptom Logger', href: '/SymptomLogger', icon: Eye, desc: 'शिवोऽहम् - Observer mode' },
    { name: 'Dharma Chatbot', href: '/DharmaChatbot', icon: Brain, desc: 'कालभैरव - Ethical guidance' },
    { name: 'Joy Tracker', href: '/JoyTracker', icon: Leaf, desc: 'अधरं मधुरम् - Celebrate joy' },
    { name: 'Sacred Fire', href: '/SacredFire', icon: Radio, desc: 'अजं शाश्वतम् - Build streaks' },
  ];

  const trackingMenu = [
    { name: 'Daily Metrics', href: '/tracking/daily', icon: BarChart3, desc: 'Log your wellness' },
    { name: 'Progress', href: '/tracking/progress', icon: Sparkles, desc: 'See your journey' },
    { name: 'History', href: '/tracking/history', icon: Calendar, desc: 'View past records' },
  ];

  const resourcesMenu = [
    { name: 'Wellness Tips', href: '/resources/tips', icon: Leaf, desc: 'Sacred practices' },
    { name: 'About Shlokas', href: '/resources/shlokas', icon: Heart, desc: 'Ancient wisdom' },
    { name: 'FAQ', href: '/resources/faq', icon: HelpCircle, desc: 'Common questions' },
  ];

  const accountMenu = [
    { name: 'My Profile', href: '/account/profile', icon: User },
    { name: 'Settings', href: '/account/settings', icon: Settings },
    { name: 'Help & Support', href: '/account/support', icon: HelpCircle },
  ];

  const DropdownMenu = ({ items, isOpen: dropdownOpen }) => (
    <AnimatePresence>
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
                  <p className="font-poppins font-semibold text-amber-200 group-hover:text-amber-100">{item.name}</p>
                  {item.desc && <p className="text-xs text-amber-100/50">{item.desc}</p>}
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
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
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-poppins font-semibold transition-all relative ${
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
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 backdrop-blur-xl bg-gradient-to-r from-stone-950/95 via-red-950/60 to-stone-950/95 border-b border-amber-600/20 z-50 shadow-2xl"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 group">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2"
            >
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}>
                <SwastikSymbol className="text-amber-400 w-6 h-6" />
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

          {/* Tools Dropdown */}
          <div className="relative">
            <DropdownButton
              label="Tools"
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
              className="p-2 rounded-lg text-amber-100/70 hover:text-amber-300 hover:bg-amber-600/20 transition-all"
            >
              <Settings className="w-5 h-5" />
            </motion.button>

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

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden border-t border-amber-600/20"
            >
              <div className="py-6 space-y-4 px-4">
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

                <div className="border-t border-amber-600/20 pt-4">
                  <p className="text-xs uppercase tracking-widest font-poppins text-amber-500/70 mb-3 pl-4">Tools</p>
                  {toolsMenu.map((item) => (
                    <Link key={item.name} to={item.href} onClick={() => setIsOpen(false)} className="block">
                      <motion.div className="flex items-center gap-3 px-4 py-2 rounded-lg text-amber-100/70 hover:text-amber-300 hover:bg-amber-600/20 transition-all">
                        <item.icon className="w-4 h-4" />
                        <div className="text-left">
                          <p className="font-poppins text-sm">{item.name}</p>
                          <p className="text-xs text-amber-100/40">{item.desc}</p>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>

                <div className="border-t border-amber-600/20 pt-4">
                  <p className="text-xs uppercase tracking-widest font-poppins text-amber-500/70 mb-3 pl-4">Tracking</p>
                  {trackingMenu.map((item) => (
                    <Link key={item.name} to={item.href} onClick={() => setIsOpen(false)} className="block">
                      <motion.div className="flex items-center gap-3 px-4 py-2 rounded-lg text-amber-100/70 hover:text-amber-300 hover:bg-amber-600/20 transition-all">
                        <item.icon className="w-4 h-4" />
                        <div className="text-left">
                          <p className="font-poppins text-sm">{item.name}</p>
                          <p className="text-xs text-amber-100/40">{item.desc}</p>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>

                <div className="border-t border-amber-600/20 pt-4">
                  <p className="text-xs uppercase tracking-widest font-poppins text-amber-500/70 mb-3 pl-4">Resources</p>
                  {resourcesMenu.map((item) => (
                    <Link key={item.name} to={item.href} onClick={() => setIsOpen(false)} className="block">
                      <motion.div className="flex items-center gap-3 px-4 py-2 rounded-lg text-amber-100/70 hover:text-amber-300 hover:bg-amber-600/20 transition-all">
                        <item.icon className="w-4 h-4" />
                        <div className="text-left">
                          <p className="font-poppins text-sm">{item.name}</p>
                          <p className="text-xs text-amber-100/40">{item.desc}</p>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>

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
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

// ===== CONSCIOUSNESS FLOWER VISUALIZATION =====
const ConsciousnessFlower = ({ dimensions }) => {
  const petals = [
    { name: 'Physical', angle: 0, icon: Heart, color: 'from-red-500 to-orange-500' },
    { name: 'Energy', angle: 72, icon: Zap, color: 'from-orange-500 to-yellow-500' },
    { name: 'Mental', angle: 144, icon: Brain, color: 'from-yellow-500 to-amber-500' },
    { name: 'Intellect', angle: 216, icon: Eye, color: 'from-amber-500 to-green-500' },
    { name: 'Bliss', angle: 288, icon: Sparkles, color: 'from-green-500 to-cyan-500' },
  ];

  const averageScore = Math.round(
    Object.values(dimensions).reduce((a, b) => a + b) / Object.keys(dimensions).length
  );

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Flower Container */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, type: 'spring' }}
        className="relative w-96 h-96 flex items-center justify-center"
      >
        {/* Center Glow */}
        <motion.div
          animate={{ scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 blur-2xl"
          style={{ opacity: averageScore / 100 }}
        />

        {/* Center Circle */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute w-24 h-24 rounded-full border-2 border-amber-400/50 flex items-center justify-center"
        >
          <SwastikSymbol size="w-12 h-12" className="text-amber-400" />
        </motion.div>

        {/* Petals */}
        {petals.map((petal, i) => {
          const score = dimensions[petal.name.toLowerCase()] || 0;
          const petalsAngleRad = (petal.angle * Math.PI) / 180;
          const radius = 120;
          const x = radius * Math.cos(petalsAngleRad - Math.PI / 2);
          const y = radius * Math.sin(petalsAngleRad - Math.PI / 2);

          return (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              style={{
                x,
                y,
              }}
              className="absolute"
            >
              <motion.div
                animate={{
                  scale: [0.9, 1.1, 0.9],
                }}
                transition={{
                  duration: 2 + i * 0.2,
                  repeat: Infinity,
                }}
                className={`w-16 h-16 rounded-full bg-gradient-to-br ${petal.color} shadow-xl flex items-center justify-center cursor-pointer hover:scale-125 transition-transform`}
                style={{
                  opacity: score / 100,
                }}
              >
                <petal.icon className="w-8 h-8 text-white" />
              </motion.div>

              {/* Petal Label */}
              <motion.div className="absolute top-20 left-1/2 transform -translate-x-1/2 text-center whitespace-nowrap">
                <p className="text-xs font-poppins text-amber-200 font-semibold">{petal.name}</p>
                <motion.p
                  key={score}
                  initial={{ scale: 1.5 }}
                  animate={{ scale: 1 }}
                  className="text-lg font-bold text-amber-300"
                >
                  {score}%
                </motion.p>
              </motion.div>
            </motion.div>
          );
        })}

        {/* Energy Lines Between Petals */}
        <svg className="absolute w-full h-full" style={{ zIndex: -1 }}>
          {petals.map((petal, i) => {
            const nextPetal = petals[(i + 1) % petals.length];
            const angle1Rad = (petal.angle * Math.PI) / 180;
            const angle2Rad = (nextPetal.angle * Math.PI) / 180;
            const radius = 120;

            const x1 = 192 + radius * Math.cos(angle1Rad - Math.PI / 2);
            const y1 = 192 + radius * Math.sin(angle1Rad - Math.PI / 2);
            const x2 = 192 + radius * Math.cos(angle2Rad - Math.PI / 2);
            const y2 = 192 + radius * Math.sin(angle2Rad - Math.PI / 2);

            return (
              <motion.line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="url(#gradient)"
                strokeWidth="2"
                opacity={0.3}
                animate={{ opacity: [0.1, 0.5, 0.1] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
              />
            );
          })}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f97316" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Overall Score */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="backdrop-blur-xl bg-gradient-to-br from-stone-900/70 via-red-950/40 to-stone-900/70 border-2 border-amber-600/40 rounded-3xl p-12 text-center w-full max-w-sm"
      >
        <p className="text-amber-200/60 uppercase tracking-widest font-poppins text-xs mb-4">Consciousness Bloom</p>
        <motion.p
          key={averageScore}
          initial={{ scale: 1.5 }}
          animate={{ scale: 1 }}
          className="text-7xl font-playfair font-black bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-orange-400 mb-4"
        >
          {averageScore}%
        </motion.p>
        <p className="text-amber-100/70 font-poppins">
          Your consciousness is {averageScore > 75 ? 'radiant' : averageScore > 50 ? 'awakening' : 'transforming'}
        </p>
      </motion.div>
    </div>
  );
};

// ===== ENERGY LEAKAGE DETECTOR =====
const EnergyLeakageDetector = ({ symptoms, leaks, setLeaks }) => {
  const [showLeakForm, setShowLeakForm] = useState(false);
  const [newLeak, setNewLeak] = useState('');

  const commonLeaks = [
    { name: 'Overworking', severity: 'high', color: 'from-red-500 to-orange-500', icon: Flame },
    { name: 'Negative Thoughts', severity: 'high', color: 'from-red-600 to-orange-600', icon: AlertCircle },
    { name: 'Poor Sleep', severity: 'medium', color: 'from-orange-500 to-yellow-500', icon: Moon },
    { name: 'Unhealthy Food', severity: 'medium', color: 'from-yellow-500 to-amber-500', icon: Droplet },
    { name: 'Screen Time', severity: 'low', color: 'from-amber-500 to-green-500', icon: Eye },
    { name: 'Unethical Choices', severity: 'high', color: 'from-red-600 to-purple-600', icon: AlertCircle },
  ];

  const addLeak = () => {
    if (newLeak) {
      setLeaks([...leaks, { id: leaks.length + 1, name: newLeak, detected: true }]);
      setNewLeak('');
      setShowLeakForm(false);
    }
  };

  const totalEnergyLost = leaks.length * 5;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
      <h2 className="text-4xl font-playfair font-bold text-amber-300 mb-2">Energy Guardian</h2>
      <p className="text-amber-100/60 font-poppins mb-8">Detect where your prana is leaking</p>

      {/* Energy Loss Indicator */}
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3 }}
        className="backdrop-blur-xl bg-gradient-to-br from-stone-900/60 via-red-950/30 to-stone-900/60 border border-amber-600/20 rounded-2xl p-8 mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <p className="text-amber-200 font-poppins font-semibold">Energy Integrity</p>
          <motion.p
            key={totalEnergyLost}
            initial={{ scale: 1.5 }}
            animate={{ scale: 1 }}
            className="text-3xl font-bold text-red-400"
          >
            -{totalEnergyLost}%
          </motion.p>
        </div>

        <div className="h-4 bg-stone-800/50 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(totalEnergyLost, 100)}%` }}
            transition={{ delay: 0.3, duration: 1 }}
            className="h-full bg-gradient-to-r from-red-500 via-orange-500 to-red-600"
          />
        </div>

        <p className="text-sm text-amber-100/60 mt-4 font-poppins">
          {leaks.length} active leaks detected. Plug them to restore prana.
        </p>
      </motion.div>

      {/* Add Leak Form */}
      <AnimatePresence>
        {showLeakForm && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-8"
          >
            <div className="backdrop-blur-xl bg-gradient-to-br from-stone-900/60 via-red-950/30 to-stone-900/60 border border-amber-600/20 rounded-2xl p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {commonLeaks.map((leak) => (
                  <motion.button
                    key={leak.name}
                    onClick={() => {
                      setNewLeak(leak.name);
                    }}
                    whileHover={{ scale: 1.05 }}
                    className={`px-4 py-3 rounded-lg font-poppins text-sm transition-all ${
                      newLeak === leak.name
                        ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white'
                        : 'bg-stone-800/50 text-amber-200/70 hover:bg-stone-800'
                    }`}
                  >
                    {leak.name}
                  </motion.button>
                ))}
              </div>

              <motion.button
                onClick={addLeak}
                disabled={!newLeak}
                className="w-full mt-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold rounded-lg disabled:opacity-50"
              >
                Add Energy Leak
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setShowLeakForm(!showLeakForm)}
        whileHover={{ scale: 1.05 }}
        className="mb-8 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg font-bold"
      >
        <Plus className="w-5 h-5" />
        Identify Energy Leak
      </motion.button>

      {/* Leaks List */}
      <div className="space-y-4">
        {leaks.map((leak, i) => (
          <motion.div
            key={leak.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ x: 5 }}
            className="backdrop-blur-xl bg-gradient-to-br from-stone-900/60 via-red-950/30 to-stone-900/60 border border-red-600/20 rounded-2xl p-6 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center"
              >
                <Flame className="w-6 h-6 text-white" />
              </motion.div>
              <p className="text-lg font-poppins font-bold text-amber-200">{leak.name}</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.2 }}
              onClick={() => setLeaks(leaks.filter((l) => l.id !== leak.id))}
              className="p-2 text-green-400 hover:bg-green-600/20 rounded-lg transition-all"
            >
              <CheckCircle2 className="w-5 h-5" />
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* Restoration Tips */}
      {leaks.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 backdrop-blur-xl bg-gradient-to-br from-stone-900/60 via-green-950/30 to-stone-900/60 border border-green-600/20 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-playfair font-bold text-green-400 mb-4">Restore Your Prana</h3>
          <ul className="space-y-3">
            {leaks.map((leak, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-start gap-3"
              >
                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-amber-100/80 font-poppins">
                  {leak.name === 'Overworking' && 'Take breaks. Rest is sacred. Practice Dharma by honoring your limits.'}
                  {leak.name === 'Negative Thoughts' && 'Meditate 10 minutes. Observe thoughts without identification. You are the witness.'}
                  {leak.name === 'Poor Sleep' && 'Sleep 8 hours. Your consciousness repairs during rest. Consistency matters.'}
                  {leak.name === 'Unhealthy Food' && 'Eat mindfully. Nourish your temple. Food is medicine.'}
                  {leak.name === 'Screen Time' && 'Limit screens 1 hour before sleep. Connect with nature instead.'}
                  {leak.name === 'Unethical Choices' && 'Realign with Dharma. Righteous choices restore energy instantly.'}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.div>
  );
};

// ===== MAIN DASHBOARD =====
export default function Dashboard() {
  const [dimensions, setDimensions] = useState({
    physical: 75,
    energy: 68,
    mental: 70,
    intellect: 72,
    bliss: 70,
  });
  const [leaks, setLeaks] = useState([
    { id: 1, name: 'Overworking', detected: true },
    { id: 2, name: 'Negative Thoughts', detected: true },
  ]);
  const [symptoms] = useState([
    { id: 1, name: 'Headache', severity: 'moderate', date: '2025-11-03' },
    { id: 2, name: 'Fatigue', severity: 'mild', date: '2025-11-03' },
  ]);

  return (
    <div className="min-h-screen bg-stone-950">
      <DashboardBg />
      <DashboardNavbar />

      <div className="pt-24 pb-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h1 className="text-6xl md:text-7xl font-playfair font-black bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-orange-400 to-red-500 mb-4">
              Consciousness Portal
            </h1>
            <p className="text-xl text-amber-100/60 font-poppins max-w-2xl mx-auto">
              Watch your consciousness bloom. Restore your prana. Transform your wellness.
            </p>
          </motion.div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Flower Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="flex flex-col items-center"
            >
              <ConsciousnessFlower dimensions={dimensions} />
            </motion.div>

            {/* Energy Leakage Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <EnergyLeakageDetector symptoms={symptoms} leaks={leaks} setLeaks={setLeaks} />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
