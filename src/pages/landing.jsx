import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Heart,
  Brain,
  Zap,
  Leaf,
  Eye,
  Flame,
  Droplet,
  Wind,
  ChevronDown,
  ArrowRight,
  Radio,
  Search,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  BarChart3,
} from 'lucide-react';

// ===== COMPONENT: Temple Haze Background =====
const TempleHaze = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Base temple glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-950/40 via-red-950/20 to-stone-950" />

      {/* Warm amber nebula */}
      <motion.div
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -80, 60, 0],
        }}
        transition={{ duration: 35, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-96 -left-96 w-96 h-96 bg-gradient-to-br from-amber-600/25 via-orange-600/15 to-transparent rounded-full blur-3xl"
      />

      {/* Red/burgundy glow */}
      <motion.div
        animate={{
          x: [0, -70, 80, 0],
          y: [0, 90, -70, 0],
        }}
        transition={{ duration: 40, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute -bottom-96 -right-96 w-96 h-96 bg-gradient-to-tl from-red-700/20 via-amber-800/10 to-transparent rounded-full blur-3xl"
      />

      {/* Turquoise accent (subtle) */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.15, 0.05],
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-1/3 right-1/3 w-80 h-80 bg-gradient-to-r from-cyan-700/5 via-teal-700/5 to-transparent rounded-full blur-3xl"
      />

      {/* Candlelight particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{
            duration: 3 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
          className="absolute w-1.5 h-1.5 bg-amber-400 rounded-full blur-sm"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            boxShadow: '0 0 10px rgba(251, 146, 60, 0.6)',
          }}
        />
      ))}
    </div>
  );
};

// ===== COMPONENT: Warm Particles =====
const WarmParticles = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            opacity: 0,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            opacity: [0, Math.random() * 0.5, 0],
            y: Math.random() > 0.5 ? -150 : 150,
            x: Math.sin(i) * 80,
          }}
          transition={{
            duration: 6 + Math.random() * 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: Math.random() * 4,
          }}
          className="absolute w-0.5 h-0.5 bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 rounded-full blur-sm"
        />
      ))}
    </div>
  );
};

// ===== COMPONENT: Temple Candlelight =====
const CandleLight = ({ top = '50%', left = '50%', size = 'w-96 h-96', intensity = 0.2, color = 'amber' }) => {
  const gradient =
    color === 'amber'
      ? 'from-amber-500 via-orange-500 to-transparent'
      : 'from-red-600 via-orange-500 to-transparent';

  return (
    <motion.div
      animate={{
        opacity: [intensity, intensity * 2.5, intensity],
      }}
      transition={{ duration: 3, repeat: Infinity }}
      className={`absolute ${size} rounded-full bg-gradient-to-br ${gradient} blur-3xl pointer-events-none`}
      style={{ top, left, transform: 'translate(-50%, -50%)' }}
    />
  );
};

// ===== COMPONENT: Sacred Button =====
const SacredButton = ({ text, onClick, variant = 'primary' }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={`relative overflow-hidden rounded-full font-bold text-lg transition-all duration-300 ${
        variant === 'primary'
          ? 'px-12 py-4 bg-gradient-to-r from-amber-600 via-orange-500 to-red-600 text-white shadow-2xl'
          : 'px-12 py-4 border-2 border-amber-500/50 text-amber-200 backdrop-blur-sm hover:bg-amber-900/20'
      }`}
      style={
        variant === 'primary'
          ? {
              boxShadow: isHovered
                ? '0 0 50px rgba(217, 119, 6, 0.8), 0 0 100px rgba(220, 38, 38, 0.4)'
                : '0 0 20px rgba(217, 119, 6, 0.4), 0 0 40px rgba(220, 38, 38, 0.2)',
            }
          : {}
      }
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        animate={isHovered ? { x: ['-100%', '100%'] } : { x: '-100%' }}
        transition={{ duration: 0.7 }}
      />

      <span className="relative flex items-center justify-center gap-3">
        {text}
        {variant === 'primary' && (
          <motion.div animate={isHovered ? { x: 5 } : { x: 0 }}>
            <ArrowRight className="w-5 h-5" />
          </motion.div>
        )}
      </span>
    </motion.button>
  );
};

// ===== COMPONENT: Sacred Card =====
const SacredCard = ({ title, description, icon: Icon, index, accent = 'amber' }) => {
  const [isHovered, setIsHovered] = useState(false);

  const accentColor =
    accent === 'amber'
      ? { text: 'from-amber-300 to-orange-300', bg: 'from-amber-600 to-orange-600' }
      : accent === 'red'
        ? { text: 'from-red-300 to-orange-300', bg: 'from-red-600 to-orange-500' }
        : { text: 'from-cyan-300 to-teal-300', bg: 'from-cyan-600 to-teal-600' };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      viewport={{ once: true, margin: '-100px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative rounded-3xl overflow-hidden"
      style={
        isHovered
          ? {
              boxShadow: '0 0 60px rgba(217, 119, 6, 0.5), 0 0 100px rgba(220, 38, 38, 0.3)',
            }
          : {
              boxShadow: '0 0 20px rgba(217, 119, 6, 0.2), 0 0 40px rgba(220, 38, 38, 0.1)',
            }
      }
    >
      {/* Animated border glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/30 to-red-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Content */}
      <div className="relative backdrop-blur-lg bg-gradient-to-br from-stone-900/70 via-red-950/40 to-stone-900/70 border border-amber-600/25 group-hover:border-amber-500/50 rounded-3xl p-10 h-full min-h-80 flex flex-col justify-between transition-all duration-300">
        {/* Icon */}
        <motion.div
          animate={isHovered ? { scale: 1.2, rotate: 10 } : { scale: 1, rotate: 0 }}
          className={`w-16 h-16 rounded-full bg-gradient-to-br ${accentColor.bg} flex items-center justify-center mb-6 shadow-lg`}
        >
          <Icon className="w-8 h-8 text-white" />
        </motion.div>

        {/* Text */}
        <div className="flex-grow">
          <h3 className={`text-3xl font-playfair font-bold bg-clip-text text-transparent bg-gradient-to-r ${accentColor.text} mb-4 group-hover:opacity-100`}>
            {title}
          </h3>
          <p className="text-stone-300/80 text-lg leading-relaxed">{description}</p>
        </div>

        {/* Bottom accent line */}
        <motion.div
          initial={{ width: 0 }}
          whileHover={{ width: 60 }}
          className={`h-1.5 bg-gradient-to-r ${accentColor.bg} rounded-full mt-6 origin-left`}
        />
      </div>
    </motion.div>
  );
};

// ===== COMPONENT: Shloka Shrine =====
const ShlokaShrine = ({ shloka, mantra, meaning, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, rotateY: -90 }}
      whileInView={{ opacity: 1, rotateY: 0 }}
      transition={{ duration: 1, delay: index * 0.25 }}
      viewport={{ once: true, margin: '-100px' }}
      className="group relative"
    >
      {/* Shrine glow */}
      <motion.div
        animate={{
          boxShadow: [
            '0 0 40px rgba(217, 119, 6, 0.3), 0 0 80px rgba(220, 38, 38, 0.15)',
            '0 0 100px rgba(217, 119, 6, 0.6), 0 0 160px rgba(220, 38, 38, 0.3)',
            '0 0 40px rgba(217, 119, 6, 0.3), 0 0 80px rgba(220, 38, 38, 0.15)',
          ],
        }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute -inset-4 rounded-3xl pointer-events-none"
      />

      {/* Card */}
      <div className="relative backdrop-blur-xl bg-gradient-to-br from-stone-900/65 via-red-950/35 to-stone-900/65 border-2 border-amber-600/40 group-hover:border-amber-500/70 rounded-3xl p-12 overflow-hidden transition-all duration-300 shadow-2xl">
        {/* Temple candlelight overlay */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-orange-600/20 to-transparent rounded-full blur-2xl pointer-events-none" />

        {/* Content */}
        <div className="relative z-10">
          {/* Sacred shloka */}
          <motion.h3
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.25 + 0.2 }}
            viewport={{ once: true }}
            className="text-6xl font-playfair font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-orange-300 to-red-400"
          >
            {shloka}
          </motion.h3>

          {/* Mantra */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: index * 0.25 + 0.3 }}
            viewport={{ once: true }}
            className="text-2xl text-amber-200/70 italic font-light mb-8 font-poppins"
          >
            {mantra}
          </motion.p>

          {/* Meaning */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.25 + 0.4 }}
            viewport={{ once: true }}
            className="backdrop-blur-md bg-stone-900/50 border border-amber-600/30 rounded-2xl p-6"
          >
            <p className="text-lg text-stone-200/80 leading-relaxed font-poppins">{meaning}</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// ===== MAIN COMPONENT =====
export default function Landing() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.loop = true;
      videoRef.current.play().catch(() => {
        // Auto-play might be blocked
      });
    }
  }, []);

  const handleSymptomCheck = () => {
    navigate('/dashboard#symptoms');
  };

  const handleWellnessTrack = () => {
    navigate('/dashboard#wellness');
  };

  return (
    <div ref={containerRef} className="overflow-x-hidden bg-stone-950 min-h-screen relative">
      {/* Background environment */}
      <TempleHaze />
      <WarmParticles />

      {/* ===== SLIDE 1: TEMPLE HERO ===== */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        {/* Continuous video background */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.85 }}
        >
          <source src="./teaser.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay with warm tones */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/50 via-stone-950/60 to-stone-950/80" />

        {/* Candlelight accents */}
        <CandleLight top="30%" left="50%" size="w-96 h-96" intensity={0.12} color="amber" />
        <CandleLight top="70%" left="20%" size="w-80 h-80" intensity={0.08} color="red" />

        {/* Content overlay */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="relative z-10 text-center px-6 max-w-6xl mx-auto"
        >
          {/* Sacred opening */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="mb-12"
          >
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              className="inline-block text-9xl drop-shadow-2xl"
              style={{
                textShadow: '0 0 60px rgba(217, 119, 6, 0.8), 0 0 120px rgba(220, 38, 38, 0.4)',
              }}
            >
              
            </motion.span>
          </motion.div>

          {/* Title - Glowing Text */}
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="text-8xl md:text-9xl font-playfair font-black mb-8 leading-tight"
          >
            <span
              className="block bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-orange-400 to-red-500"
              style={{
                textShadow: '0 0 40px rgba(217, 119, 6, 0.6), 0 0 80px rgba(220, 38, 38, 0.3)',
              }}
            >
              Swasthya
            </span>
            <span
              className="block bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-300"
              style={{
                textShadow: '0 0 40px rgba(217, 119, 6, 0.6), 0 0 80px rgba(220, 38, 38, 0.3)',
              }}
            >
              Arogyam
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="text-2xl md:text-3xl text-amber-100/70 font-light mb-12 font-poppins leading-relaxed"
          >
            Where Consciousness Transcends
            <br />
            <span className="text-orange-400 font-semibold">The Temple of Eternal Wellness</span>
          </motion.p>

          {/* Glowing divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1.2, delay: 1 }}
            className="h-1.5 w-56 bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 rounded-full mx-auto mb-12"
            style={{
              boxShadow: '0 0 40px rgba(217, 119, 6, 0.7), 0 0 80px rgba(220, 38, 38, 0.4)',
            }}
          />

          {/* CTA Buttons - NOW LINKED TO DASHBOARD SECTIONS */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-16"
          >
            <SacredButton text="Check Symptoms" onClick={handleSymptomCheck} variant="primary" />
            <SacredButton text="Track Wellness" onClick={handleWellnessTrack} variant="primary" />
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="mt-20 flex flex-col items-center text-amber-300/60 cursor-pointer hover:text-amber-300 transition-colors"
            style={{
              textShadow: '0 0 20px rgba(217, 119, 6, 0.4)',
            }}
          >
            <span className="text-sm font-poppins mb-3 uppercase tracking-widest">Learn About Wellness</span>
            <motion.div animate={{ y: [0, 12, 0] }}>
              <ChevronDown className="w-7 h-7" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ===== SLIDE 2: FEATURES & CONTENT ===== */}
      <section id="features" className="relative w-full min-h-screen py-32 px-6 bg-gradient-to-b from-stone-950 via-red-950/10 to-stone-950">
        <CandleLight top="25%" left="50%" size="w-96 h-96" intensity={0.1} color="amber" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto relative z-10"
        >
          {/* ===== SHLOKAS SECTION ===== */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-center mb-24"
          >
            <p className="text-amber-500 font-bold uppercase tracking-widest font-poppins mb-4">Sacred Teachings</p>
            <h2 className="text-7xl md:text-8xl font-playfair font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-orange-400 to-red-500">
              Four Eternal Truths
            </h2>
            <p className="text-2xl text-amber-100/60 max-w-3xl mx-auto font-poppins leading-relaxed">
              Wisdom from the sacred temple, guiding consciousness from illness to illumination
            </p>
          </motion.div>

          {/* Shlokas Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-32">
            <ShlokaShrine
              shloka="शिवोऽहम्"
              mantra='"I Am Pure Consciousness"'
              meaning="Beyond body and mind lies your eternal essence. You are the infinite consciousness—untouched by suffering, symptoms, or limitation. Your true wellness starts here."
              index={0}
            />
            <ShlokaShrine
              shloka="कालभैरव"
              mantra='"The Sacred Guardian"'
              meaning="Dharma—righteousness—is the protector of wellness. Truth liberates from karmic suffering. Choose ethics, choose awakening. Our guidance is evidence-based and sacred."
              index={1}
            />
            <ShlokaShrine
              shloka="अधरं मधुरम्"
              mantra='"Sweetness in All"'
              meaning="When consciousness blooms, existence becomes sweet. Wellness is not struggle but sacred celebration of life itself. Track joy across all dimensions."
              index={2}
            />
            <ShlokaShrine
              shloka="अजं शाश्वतम्"
              mantra='"The Timeless Self"'
              meaning="Build upon eternal principles beyond trends. Your transformation is a cosmic journey transcending time and space. Consistency creates miracles."
              index={3}
            />
          </div>

          {/* ===== FEATURES SECTION ===== */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-center mb-24"
          >
            <p className="text-amber-500 font-bold uppercase tracking-widest font-poppins mb-4">Mystical Powers</p>
            <h2 className="text-7xl md:text-8xl font-playfair font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-orange-400 to-red-500">
              Sacred Features
            </h2>
          </motion.div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-32">
            <SacredCard
              title="Symptom Compass"
              description="Select your symptoms without identifying with them. AI-powered insights show root causes across all five dimensions. Recognize messages, not limitations."
              icon={Eye}
              index={0}
              accent="amber"
            />
            <SacredCard
              title="Five Dimensions Tracker"
              description="Monitor physical, energy, mental, intellect, and bliss dimensions in real-time. Watch wholeness emerge as all layers balance and integrate."
              icon={BarChart3}
              index={1}
              accent="red"
            />
            <SacredCard
              title="Dharma-Based Guidance"
              description="Ancient wisdom meets modern science. Every recommendation is rooted in ethical principles and evidence. Never compromise your sacred integrity."
              icon={Brain}
              index={2}
              accent="amber"
            />
            <SacredCard
              title="Personalized Wellness Path"
              description="AI generates sacred lifestyle guidance tailored to your unique consciousness. From symptoms to serenity. Transformation quantified, spirituality honored."
              icon={Sparkles}
              index={3}
              accent="red"
            />
          </div>

          {/* ===== HOW IT WORKS ===== */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-center mb-24"
          >
            <p className="text-amber-500 font-bold uppercase tracking-widest font-poppins mb-4">Integration</p>
            <h2 className="text-7xl md:text-8xl font-playfair font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-orange-400 to-red-500">
              From Illness to Illumination
            </h2>
          </motion.div>

          {/* Journey Timeline */}
          <div className="space-y-12 max-w-4xl mx-auto mb-32">
            {[
              {
                phase: 'Awakening',
                description: 'Visit Symptom Compass. Select your symptoms without judgment. Recognize they are messages, not your essence. Begin awareness.',
                icon: Eye,
                accent: 'amber',
              },
              {
                phase: 'Understanding',
                description: 'Track Five Dimensions. Rate each layer of wellness. See which areas need attention. AI reveals root causes across all planes.',
                icon: Brain,
                accent: 'red',
              },
              {
                phase: 'Integration',
                description: 'Receive Personalized Guidance. Follow ethical, evidence-based recommendations. Balance body, energy, mind, intellect, spirit.',
                icon: Heart,
                accent: 'amber',
              },
              {
                phase: 'Transcendence',
                description: 'Monitor Progress. Watch consciousness expand. Consistency compounds. Your transformation becomes tangible. You become whole.',
                icon: Sparkles,
                accent: 'red',
              },
            ].map((phase, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`flex items-center gap-8 ${i % 2 === 1 ? 'flex-row-reverse' : ''}`}
              >
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  className={`flex-shrink-0 w-32 h-32 rounded-full ${
                    phase.accent === 'amber'
                      ? 'bg-gradient-to-br from-amber-600 to-orange-600'
                      : 'bg-gradient-to-br from-red-600 to-orange-500'
                  } shadow-2xl flex items-center justify-center`}
                  style={{
                    boxShadow: `0 0 50px rgba(217, 119, 6, 0.5), 0 0 100px rgba(220, 38, 38, 0.3)`,
                  }}
                >
                  <phase.icon className="w-16 h-16 text-white" />
                </motion.div>

                {/* Content */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex-grow backdrop-blur-lg bg-gradient-to-br from-stone-900/65 via-red-950/35 to-stone-900/65 border border-amber-600/30 hover:border-amber-500/60 rounded-3xl p-10 transition-all duration-300"
                  style={{
                    boxShadow: '0 0 30px rgba(217, 119, 6, 0.2), inset 0 0 30px rgba(217, 119, 6, 0.05)',
                  }}
                >
                  <h3 className={`text-4xl font-playfair font-bold mb-4 ${
                    phase.accent === 'amber'
                      ? 'bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-orange-300'
                      : 'bg-clip-text text-transparent bg-gradient-to-r from-red-300 to-orange-300'
                  }`}>
                    {phase.phase}
                  </h3>
                  <p className="text-lg text-stone-300/80 leading-relaxed font-poppins">{phase.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* ===== FINAL CTA ===== */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-7xl md:text-8xl font-playfair font-black mb-8 bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-orange-400 to-red-500"
            >
              Your Sacred Awakening Awaits
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-2xl text-amber-100/70 mb-12 leading-relaxed max-w-2xl mx-auto font-poppins"
            >
              From the temple of suffering emerges the sanctuary of wholeness. Your five dimensions await integration. Begin your eternal transformation now.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-8 justify-center"
            >
              <SacredButton text="Enter Wellness Sanctuary" onClick={handleSymptomCheck} variant="primary" />
              <SacredButton text="Book Sacred Consultation" variant="secondary" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="relative w-full py-16 px-6 bg-gradient-to-b from-stone-950 to-black border-t border-amber-600/10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto text-center relative z-10"
        >
          <h3 className="text-5xl font-playfair font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-orange-400 mb-2">
            Swasthya Arogyam
          </h3>
          <p className="text-lg text-amber-100/60 mb-4 font-poppins">The Temple of Eternal Wellness</p>
          
          <div className="flex justify-center gap-8 mb-6 text-amber-200/70 font-poppins text-sm">
            <button onClick={handleSymptomCheck} className="hover:text-amber-300 transition-colors">Check Symptoms</button>
            <span className="text-amber-600/30">•</span>
            <button onClick={handleWellnessTrack} className="hover:text-amber-300 transition-colors">Track Wellness</button>
            <span className="text-amber-600/30">•</span>
            <button className="hover:text-amber-300 transition-colors">Learn More</button>
          </div>

          <p className="text-sm text-amber-700/50 italic">
            🕉️ From Void Comes Light • From Suffering Comes Wisdom • From Body Comes Consciousness 🕉️
          </p>
        </motion.div>
      </footer>
    </div>
  );
}
