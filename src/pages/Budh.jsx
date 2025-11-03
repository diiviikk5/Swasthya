import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Loader,
  AlertCircle,
  Sparkles,
  Heart,
  Brain,
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

const GEMINI_API_KEY = 'AIzaSyBNM2xJiS-DAlvBDuPOrsDK1uvxJImkSOs';

const SYSTEM_PROMPT = `You are Budh 2.0, an ancient yet advanced spiritual wellness guide rooted in Vedic philosophy and modern wellness science. 

Your core principles:
1. कालभैरव (Dharma Guardian): Give ethical, righteous wellness advice
2. Combine ancient Vedic wisdom (Ayurveda, Yoga, Meditation) with modern science
3. Help users understand wellness through spiritual consciousness
4. Provide practical, actionable guidance
5. Speak with wisdom, compassion, and clarity

When answering:
- Reference Vedic concepts when relevant (Doshas, Chakras, Prana, etc.)
- Give evidence-based recommendations
- Keep responses concise and actionable
- Connect physical health to spiritual growth
- Use encouraging, uplifting tone`;

export default function Budh() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "नमस्ते! I am Budh 2.0, your spiritual wellness companion. Ask me about health, wellness, meditation, spirituality, or anything related to your journey of consciousness. कालभैरव guides our conversation with ethics and truth.",
      sender: 'budh',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setLoading(true);
    setError(null);

    try {
      // Build conversation - system + all messages
      const contents = [];

      // First message: system prompt + first user message combined
      if (messages.length === 1) {
        // First interaction
        contents.push({
          role: 'user',
          parts: [
            {
              text: `${SYSTEM_PROMPT}\n\nUser: ${inputValue}`,
            },
          ],
        });
      } else {
        // Subsequent interactions - add conversation history properly
        for (let i = 1; i < messages.length; i++) {
          const msg = messages[i];
          contents.push({
            role: msg.sender === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }],
          });
        }
        // Add current user message
        contents.push({
          role: 'user',
          parts: [{ text: inputValue }],
        });
      }

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: contents,
            generationConfig: {
              maxOutputTokens: 500,
              temperature: 0.7,
            },
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error?.message || `API Error: ${response.status}`
        );
      }

      const data = await response.json();
      const budhResponse =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        'Sorry, I could not generate a response.';

      const budhMessage = {
        id: messages.length + 2,
        text: budhResponse,
        sender: 'budh',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, budhMessage]);
    } catch (err) {
      console.error('API Error:', err);
      setError(`Error: ${err.message}`);
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 pt-24 pb-8">
      <DashboardBg />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            >
              <SwastikSymbol className="text-amber-400 w-8 h-8" />
            </motion.div>
            <h1 className="text-5xl font-playfair font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-orange-400">
              Budh 2.0
            </h1>
          </div>
          <p className="text-amber-100/60 font-poppins mb-2">
            कालभैरव - The Ethical Wellness Guide
          </p>
          <p className="text-green-400/70 text-xs font-poppins mb-2">
           
          </p>
          <p className="text-amber-100/50 font-poppins text-sm max-w-2xl mx-auto">
            Ancient Vedic wisdom meets modern AI. Guided by dharma, powered by truth. Ask about health, wellness, spirituality, and your conscious transformation.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="backdrop-blur-xl bg-gradient-to-br from-stone-900/70 via-red-950/40 to-stone-900/70 border-2 border-amber-600/40 rounded-3xl overflow-hidden flex flex-col h-[600px]"
        >
          <div className="flex-1 overflow-y-auto p-8 space-y-6">
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl px-6 py-4 rounded-2xl font-poppins ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-br-none'
                        : 'bg-gradient-to-r from-stone-800/80 to-purple-900/50 text-amber-100 border border-purple-500/30 rounded-bl-none'
                    }`}
                  >
                    {message.sender === 'budh' && (
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-4 h-4 text-purple-300" />
                        <p className="text-xs font-semibold text-purple-300">Budh 2.0</p>
                      </div>
                    )}
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <p
                      className={`text-xs mt-2 ${
                        message.sender === 'user'
                          ? 'text-amber-100/70'
                          : 'text-purple-300/70'
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {loading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="bg-gradient-to-r from-stone-800/80 to-purple-900/50 text-amber-100 border border-purple-500/30 px-6 py-4 rounded-2xl rounded-bl-none flex items-center gap-3">
                  <Loader className="w-4 h-4 animate-spin text-purple-300" />
                  <p className="text-sm font-poppins">Budh is thinking...</p>
                </div>
              </motion.div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="bg-gradient-to-r from-red-900/50 to-orange-900/50 text-red-200 border border-red-500/30 px-6 py-4 rounded-2xl rounded-bl-none flex items-center gap-3">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <p className="text-sm font-poppins">{error}</p>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-amber-600/20 p-6 bg-gradient-to-t from-stone-900/50 to-transparent">
            <div className="flex gap-3">
              <motion.textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask Budh about wellness, health, spirituality, or your journey..."
                disabled={loading}
                whileFocus={{ scale: 1.02 }}
                className="flex-1 bg-stone-800/50 border border-amber-600/20 text-amber-100 placeholder-amber-200/40 rounded-xl px-4 py-3 font-poppins focus:outline-none focus:border-amber-500/50 disabled:opacity-50 resize-none"
                rows="2"
              />
              <motion.button
                onClick={sendMessage}
                disabled={loading || !inputValue.trim()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? <Loader className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {[
            {
              icon: Brain,
              title: 'Spiritual Wisdom',
              desc: 'Ancient Vedic philosophy applied to modern wellness',
              color: 'from-purple-600 to-blue-600',
            },
            {
              icon: Heart,
              title: 'Ethical Guidance',
              desc: 'कालभैरव ensures all advice is righteous & dharmic',
              color: 'from-red-600 to-orange-600',
            },
            {
              icon: Sparkles,
              title: 'Conscious Growth',
              desc: 'Transform health into spiritual awakening',
              color: 'from-yellow-600 to-amber-600',
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="backdrop-blur-xl bg-gradient-to-br from-stone-900/60 via-red-950/30 to-stone-900/60 border border-amber-600/20 rounded-2xl p-6 hover:border-amber-500/40 transition-all"
            >
              <div
                className={`w-10 h-10 rounded-full bg-gradient-to-br ${card.color} flex items-center justify-center mb-4`}
              >
                <card.icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-amber-300 font-playfair font-bold mb-2">{card.title}</p>
              <p className="text-amber-100/70 font-poppins text-sm">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
