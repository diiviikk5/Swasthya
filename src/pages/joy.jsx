import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Heart,
  Smile,
  Star,
  Sparkles,
  TrendingUp,
  Calendar,
  Trash2,
  Award,
  Zap,
  Sun,
  Music,
  Coffee,
  Users,
  Leaf,
} from 'lucide-react';

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

const joyCategories = [
  { icon: Sun, label: 'Morning Bliss', color: 'from-yellow-500 to-orange-500', emoji: '☀️' },
  { icon: Coffee, label: 'Small Pleasures', color: 'from-amber-500 to-yellow-500', emoji: '☕' },
  { icon: Users, label: 'Connection', color: 'from-pink-500 to-rose-500', emoji: '👥' },
  { icon: Music, label: 'Creative Flow', color: 'from-purple-500 to-pink-500', emoji: '🎵' },
  { icon: Leaf, label: 'Nature Joy', color: 'from-green-500 to-emerald-500', emoji: '🌿' },
  { icon: Heart, label: 'Self Care', color: 'from-red-500 to-pink-500', emoji: '❤️' },
  { icon: Sparkles, label: 'Moments of Awe', color: 'from-cyan-500 to-blue-500', emoji: '✨' },
  { icon: Award, label: 'Achievements', color: 'from-orange-500 to-yellow-500', emoji: '🏆' },
];

export default function Joy() {
  const [joyEntries, setJoyEntries] = useState([
    {
      id: 1,
      text: 'Morning meditation brought peace',
      category: 'Morning Bliss',
      intensity: 8,
      date: new Date().toISOString().split('T')[0],
      time: '06:30',
    },
  ]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [joyText, setJoyText] = useState('');
  const [intensity, setIntensity] = useState(7);
  const [showForm, setShowForm] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [joyEntries]);

  const addJoyEntry = () => {
    if (!joyText.trim() || !selectedCategory) return;

    const newEntry = {
      id: joyEntries.length + 1,
      text: joyText,
      category: selectedCategory,
      intensity: intensity,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setJoyEntries([...joyEntries, newEntry]);
    setJoyText('');
    setSelectedCategory(null);
    setIntensity(7);
    setShowForm(false);
  };

  const deleteEntry = (id) => {
    setJoyEntries(joyEntries.filter((entry) => entry.id !== id));
  };

  const totalJoy = joyEntries.reduce((sum, entry) => sum + entry.intensity, 0) / (joyEntries.length || 1);
  const categoryStats = joyCategories.map((cat) => ({
    ...cat,
    count: joyEntries.filter((e) => e.category === cat.label).length,
  }));

  const selectedCategoryObj = joyCategories.find((c) => c.label === selectedCategory);

  return (
    <div className="min-h-screen bg-stone-950 pt-24 pb-16">
      <DashboardBg />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            >
              <SwastikSymbol className="text-amber-400 w-8 h-8" />
            </motion.div>
            <h1 className="text-6xl font-playfair font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-500">
              अधरं मधुरम्
            </h1>
          </div>
          <p className="text-amber-100/60 font-poppins text-lg mb-2">Joy Tracker</p>
          <p className="text-amber-100/50 font-poppins max-w-2xl mx-auto">
            "Sweetness pervades all existence" - Celebrate life's small and big joys. Track moments of bliss that make your consciousness blossom.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="backdrop-blur-xl bg-gradient-to-br from-stone-900/60 via-yellow-950/30 to-stone-900/60 border border-amber-600/20 rounded-3xl p-8 text-center"
          >
            <div className="inline-block p-4 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <p className="text-amber-200/60 font-poppins text-sm mb-2">Total Joy Entries</p>
            <motion.p
              key={joyEntries.length}
              initial={{ scale: 1.5 }}
              animate={{ scale: 1 }}
              className="text-5xl font-playfair font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-400"
            >
              {joyEntries.length}
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="backdrop-blur-xl bg-gradient-to-br from-stone-900/60 via-pink-950/30 to-stone-900/60 border border-amber-600/20 rounded-3xl p-8 text-center"
          >
            <div className="inline-block p-4 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl mb-4">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <p className="text-amber-200/60 font-poppins text-sm mb-2">Average Joy Level</p>
            <motion.p
              key={Math.round(totalJoy)}
              initial={{ scale: 1.5 }}
              animate={{ scale: 1 }}
              className="text-5xl font-playfair font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-rose-400"
            >
              {Math.round(totalJoy)}/10
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="backdrop-blur-xl bg-gradient-to-br from-stone-900/60 via-green-950/30 to-stone-900/60 border border-amber-600/20 rounded-3xl p-8 text-center"
          >
            <div className="inline-block p-4 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl mb-4">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <p className="text-amber-200/60 font-poppins text-sm mb-2">Most Tracked</p>
            <motion.p
              key={categoryStats[0]?.label}
              initial={{ scale: 1.5 }}
              animate={{ scale: 1 }}
              className="text-2xl font-playfair font-bold text-green-300"
            >
              {categoryStats.sort((a, b) => b.count - a.count)[0]?.label || 'Joy'}
            </motion.p>
          </motion.div>
        </div>

        {/* Add Joy Entry */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-xl bg-gradient-to-br from-stone-900/70 via-amber-950/40 to-stone-900/70 border-2 border-amber-600/40 rounded-3xl p-8 mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-playfair font-bold text-amber-300">Log Your Joy</h2>
            <motion.button
              onClick={() => setShowForm(!showForm)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full font-bold"
            >
              <Plus className="w-6 h-6" />
            </motion.button>
          </div>

          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="space-y-6 mb-6 pb-6 border-b border-amber-600/20">
                  {/* Category Selection */}
                  <div>
                    <p className="text-amber-300 font-poppins font-semibold mb-4">What brings you joy?</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {joyCategories.map((cat, i) => (
                        <motion.button
                          key={i}
                          onClick={() => setSelectedCategory(cat.label)}
                          whileHover={{ scale: 1.05 }}
                          className={`p-4 rounded-xl font-poppins font-semibold transition-all ${
                            selectedCategory === cat.label
                              ? `bg-gradient-to-r ${cat.color} text-white shadow-lg`
                              : 'bg-stone-800/50 text-amber-200/70 hover:bg-stone-800'
                          }`}
                        >
                          <div className="text-2xl mb-2">{cat.emoji}</div>
                          <p className="text-sm">{cat.label}</p>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Joy Description */}
                  <div>
                    <p className="text-amber-300 font-poppins font-semibold mb-3">Describe your joy</p>
                    <motion.textarea
                      value={joyText}
                      onChange={(e) => setJoyText(e.target.value)}
                      placeholder="What made you smile today?"
                      whileFocus={{ scale: 1.02 }}
                      className="w-full bg-stone-800/50 border border-amber-600/20 text-amber-100 placeholder-amber-200/40 rounded-xl px-4 py-3 font-poppins focus:outline-none focus:border-amber-500/50 resize-none"
                      rows="3"
                    />
                  </div>

                  {/* Intensity Slider */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-amber-300 font-poppins font-semibold">How intense was the joy?</p>
                      <motion.div
                        key={intensity}
                        initial={{ scale: 1.5 }}
                        animate={{ scale: 1 }}
                        className="inline-block px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg font-bold"
                      >
                        {intensity}/10
                      </motion.div>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={intensity}
                      onChange={(e) => setIntensity(parseInt(e.target.value))}
                      className="w-full h-2 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <motion.button
                      onClick={addJoyEntry}
                      disabled={!joyText.trim() || !selectedCategory}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-xl disabled:opacity-50 transition-all"
                    >
                      <Smile className="w-5 h-5 inline mr-2" />
                      Add Joy Entry
                    </motion.button>
                    <motion.button
                      onClick={() => setShowForm(false)}
                      whileHover={{ scale: 1.05 }}
                      className="flex-1 py-3 bg-stone-800/50 text-amber-200 font-bold rounded-xl hover:bg-stone-800 transition-all"
                    >
                      Cancel
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Joy Entries Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl font-playfair font-bold text-amber-300 mb-6">Your Joy Journey</h2>
          <div className="space-y-4">
            <AnimatePresence>
              {[...joyEntries].reverse().map((entry, i) => {
                const catObj = joyCategories.find((c) => c.label === entry.category);
                return (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ x: 5 }}
                    className="backdrop-blur-xl bg-gradient-to-r from-stone-900/60 to-stone-900/40 border border-amber-600/20 rounded-2xl p-6 flex items-start justify-between group hover:border-amber-500/40 transition-all"
                  >
                    <div className="flex items-start gap-4 flex-1">
                      <motion.div
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className={`inline-block p-3 bg-gradient-to-br ${catObj?.color} rounded-xl flex-shrink-0 mt-1`}
                      >
                        {catObj && <catObj.icon className="w-6 h-6 text-white" />}
                      </motion.div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <p className="font-poppins font-semibold text-amber-200">{entry.category}</p>
                          <span className="text-sm text-amber-100/50 font-poppins">{entry.date}</span>
                          <span className="text-sm text-amber-100/50 font-poppins">{entry.time}</span>
                        </div>
                        <p className="text-amber-100/80 font-poppins">{entry.text}</p>
                        <div className="mt-3 flex items-center gap-2">
                          <div className="flex gap-1">
                            {[...Array(10)].map((_, i) => (
                              <motion.div
                                key={i}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: i * 0.05 }}
                                className={`w-2 h-2 rounded-full ${
                                  i < entry.intensity
                                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                                    : 'bg-stone-700'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm font-bold text-orange-400">{entry.intensity}/10</span>
                        </div>
                      </div>
                    </div>
                    <motion.button
                      onClick={() => deleteEntry(entry.id)}
                      whileHover={{ scale: 1.2 }}
                      className="p-2 text-red-400/0 group-hover:text-red-400 transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </motion.button>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {joyEntries.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Smile className="w-16 h-16 text-amber-400/30 mx-auto mb-4" />
              <p className="text-amber-100/50 font-poppins">Start logging your joys to see them here!</p>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </motion.div>
      </div>
    </div>
  );
}
