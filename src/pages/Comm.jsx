import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  MessageCircle,
  Users,
  Flame,
  Heart,
  Sparkles,
  Send,
  Star,
  TrendingUp,
  Award,
  Eye,
  Brain,
  Leaf,
  Search,
  Filter,
  X as CloseIcon,
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
      className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-red-600/10 to-transparent rounded-full blur-3xl"
    />
    <motion.div
      animate={{ opacity: [0.1, 0.15, 0.1] }}
      transition={{ duration: 10, repeat: Infinity, delay: 1 }}
      className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-orange-700/8 to-transparent rounded-full blur-3xl"
    />
  </div>
);

const communityTopics = [
  { id: 1, emoji: '🧘', label: 'Meditation Circle', color: 'from-purple-600 to-blue-600' },
  { id: 2, emoji: '💚', label: 'Healing & Support', color: 'from-green-600 to-emerald-600' },
  { id: 3, emoji: '📖', label: 'Vedic Wisdom', color: 'from-amber-600 to-yellow-600' },
  { id: 4, emoji: '🤝', label: 'Accountability', color: 'from-pink-600 to-rose-600' },
  { id: 5, emoji: '🌿', label: 'Nature Connection', color: 'from-green-500 to-teal-500' },
  { id: 6, emoji: '✨', label: 'Spiritual Growth', color: 'from-indigo-600 to-purple-600' },
];

const sampleMembers = [
  { id: 1, name: 'Arjun', role: 'Meditation Guide', status: 'online', followers: 342, posts: 24 },
  { id: 2, name: 'Priya', role: 'Wellness Coach', status: 'online', followers: 256, posts: 18 },
  { id: 3, name: 'Dev', role: 'Community Member', status: 'offline', followers: 89, posts: 12 },
  { id: 4, name: 'Sophia', role: 'Ayurveda Specialist', status: 'online', followers: 198, posts: 31 },
];

const samplePosts = [
  {
    id: 1,
    author: 'Arjun',
    role: 'Meditation Guide',
    topic: 'Meditation Circle',
    text: 'Join our morning meditation at 6 AM. Focus on breath awareness for 20 minutes.',
    likes: 87,
    replies: 12,
    timestamp: '2h ago',
  },
  {
    id: 2,
    author: 'Priya',
    role: 'Wellness Coach',
    topic: 'Healing & Support',
    text: 'Feeling stressed? Try this 4-7-8 breathing technique. It transforms anxiety in minutes!',
    likes: 156,
    replies: 34,
    timestamp: '4h ago',
  },
  {
    id: 3,
    author: 'Sophia',
    role: 'Ayurveda Specialist',
    topic: 'Vedic Wisdom',
    text: 'Turmeric is more than spice - it\'s ancient medicine. Adding it to warm milk heals inflammation.',
    likes: 203,
    replies: 28,
    timestamp: '6h ago',
  },
];

export default function Comm() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [posts, setPosts] = useState(samplePosts);
  const [showPostForm, setShowPostForm] = useState(false);
  const [postText, setPostText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMember, setSelectedMember] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [posts]);

  const createPost = () => {
    if (!postText.trim() || !selectedTopic) return;

    const newPost = {
      id: posts.length + 1,
      author: 'You',
      role: 'Community Member',
      topic: selectedTopic,
      text: postText,
      likes: 0,
      replies: 0,
      timestamp: 'now',
    };

    setPosts([newPost, ...posts]);
    setPostText('');
    setSelectedTopic(null);
    setShowPostForm(false);
  };

  const filteredPosts = selectedTopic
    ? posts.filter((p) => p.topic === selectedTopic)
    : posts;

  const topicObj = communityTopics.find((t) => t.label === selectedTopic);

  return (
    <div className="min-h-screen bg-stone-950 pt-24 pb-16">
      <DashboardBg />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
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
            <h1 className="text-6xl font-playfair font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-300 via-orange-400 to-amber-500">
              Sacred Fire
            </h1>
          </div>
          <p className="text-amber-100/60 font-poppins text-lg mb-2">Spiritual Community</p>
          <p className="text-amber-100/50 font-poppins max-w-2xl mx-auto">
            [translate:अजं शाश्वतम्] - "Eternal Consistency" - Connect with seekers on the same path. Share wisdom, support each other, and transform together through collective consciousness.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Topics & Members */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            {/* Topics */}
            <div>
              <h3 className="text-amber-300 font-playfair font-bold text-lg mb-4">Circles</h3>
              <div className="space-y-2">
                {communityTopics.map((topic) => (
                  <motion.button
                    key={topic.id}
                    onClick={() => setSelectedTopic(topic.label)}
                    whileHover={{ x: 5 }}
                    className={`w-full p-3 rounded-xl font-poppins font-semibold transition-all text-left flex items-center gap-2 ${
                      selectedTopic === topic.label
                        ? `bg-gradient-to-r ${topic.color} text-white`
                        : 'bg-stone-800/50 text-amber-200/70 hover:bg-stone-800'
                    }`}
                  >
                    <span>{topic.emoji}</span>
                    <span className="text-sm truncate">{topic.label}</span>
                  </motion.button>
                ))}
              </div>
              <motion.button
                onClick={() => setSelectedTopic(null)}
                whileHover={{ scale: 1.05 }}
                className="w-full mt-3 py-2 border border-amber-600/20 text-amber-200 rounded-xl font-poppins font-semibold hover:bg-stone-800 transition-all"
              >
                All Posts
              </motion.button>
            </div>

            {/* Members */}
            <div className="backdrop-blur-xl bg-gradient-to-br from-stone-900/60 to-stone-900/40 border border-amber-600/20 rounded-2xl p-6">
              <h3 className="text-amber-300 font-playfair font-bold text-lg mb-4">Guides</h3>
              <div className="space-y-3">
                {sampleMembers.map((member) => (
                  <motion.button
                    key={member.id}
                    onClick={() => setSelectedMember(member)}
                    whileHover={{ scale: 1.05 }}
                    className="w-full text-left p-3 rounded-xl bg-stone-800/50 hover:bg-stone-800 transition-all group"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          member.status === 'online' ? 'bg-green-500' : 'bg-stone-500'
                        }`}
                      />
                      <p className="text-sm font-bold text-amber-200">{member.name}</p>
                    </div>
                    <p className="text-xs text-amber-100/60 group-hover:text-amber-100/80">
                      {member.role}
                    </p>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-3 space-y-8"
          >
            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { icon: Users, label: 'Active Members', value: '2,847', color: 'from-blue-600 to-cyan-600' },
                { icon: MessageCircle, label: 'Conversations', value: '12.5K', color: 'from-purple-600 to-pink-600' },
                { icon: Flame, label: 'Daily Engagement', value: '89%', color: 'from-red-600 to-orange-600' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className="backdrop-blur-xl bg-gradient-to-br from-stone-900/60 to-stone-900/40 border border-amber-600/20 rounded-2xl p-6"
                >
                  <div
                    className={`inline-block p-3 bg-gradient-to-br ${stat.color} rounded-xl mb-3`}
                  >
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-amber-200/60 font-poppins text-sm mb-1">{stat.label}</p>
                  <p className="text-3xl font-playfair font-bold text-amber-300">{stat.value}</p>
                </motion.div>
              ))}
            </div>

            {/* Create Post */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="backdrop-blur-xl bg-gradient-to-br from-stone-900/70 via-red-950/40 to-stone-900/70 border-2 border-amber-600/40 rounded-3xl p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-playfair font-bold text-amber-300">Share Wisdom</h2>
                <motion.button
                  onClick={() => setShowPostForm(!showPostForm)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-full font-bold"
                >
                  <Plus className="w-6 h-6" />
                </motion.button>
              </div>

              <AnimatePresence>
                {showPostForm && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden pb-6 border-b border-amber-600/20 mb-6"
                  >
                    <div className="space-y-4">
                      {/* Topic Selection */}
                      <div>
                        <p className="text-amber-300 font-poppins font-semibold mb-3">
                          Choose Circle
                        </p>
                        <div className="grid grid-cols-3 gap-2">
                          {communityTopics.map((topic) => (
                            <motion.button
                              key={topic.id}
                              onClick={() => setSelectedTopic(topic.label)}
                              whileHover={{ scale: 1.05 }}
                              className={`p-3 rounded-xl font-poppins font-semibold transition-all text-sm ${
                                selectedTopic === topic.label
                                  ? `bg-gradient-to-r ${topic.color} text-white`
                                  : 'bg-stone-800/50 text-amber-200/70'
                              }`}
                            >
                              {topic.emoji}
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      {/* Post Text */}
                      <motion.textarea
                        value={postText}
                        onChange={(e) => setPostText(e.target.value)}
                        placeholder="Share your wisdom with the community..."
                        whileFocus={{ scale: 1.02 }}
                        className="w-full bg-stone-800/50 border border-amber-600/20 text-amber-100 placeholder-amber-200/40 rounded-xl px-4 py-3 font-poppins focus:outline-none focus:border-amber-500/50 resize-none"
                        rows="4"
                      />

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <motion.button
                          onClick={createPost}
                          disabled={!postText.trim() || !selectedTopic}
                          whileHover={{ scale: 1.05 }}
                          className="flex-1 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold rounded-xl disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                          <Flame className="w-5 h-5" />
                          Share
                        </motion.button>
                        <motion.button
                          onClick={() => setShowPostForm(false)}
                          className="flex-1 py-3 bg-stone-800/50 text-amber-200 font-bold rounded-xl hover:bg-stone-800"
                        >
                          Cancel
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Posts Feed */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-playfair font-bold text-amber-300">
                  {selectedTopic ? `${selectedTopic}` : 'All Circles'}
                </h2>
                {selectedTopic && (
                  <motion.button
                    onClick={() => setSelectedTopic(null)}
                    whileHover={{ scale: 1.1 }}
                    className="p-2 bg-stone-800/50 text-amber-200 rounded-lg hover:bg-stone-800"
                  >
                    <CloseIcon className="w-5 h-5" />
                  </motion.button>
                )}
              </div>

              <AnimatePresence>
                {filteredPosts.map((post, i) => {
                  const postTopic = communityTopics.find((t) => t.label === post.topic);
                  return (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ y: -5 }}
                      className="backdrop-blur-xl bg-gradient-to-br from-stone-900/60 to-stone-900/40 border border-amber-600/20 rounded-2xl p-6 hover:border-amber-500/40 transition-all"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3 flex-1">
                          <div
                            className={`w-10 h-10 rounded-full bg-gradient-to-br ${
                              postTopic?.color || 'from-stone-700 to-stone-600'
                            } flex items-center justify-center text-white font-bold`}
                          >
                            {postTopic?.emoji}
                          </div>
                          <div>
                            <p className="font-bold text-amber-200">{post.author}</p>
                            <p className="text-xs text-amber-100/50">{post.role}</p>
                          </div>
                        </div>
                        <span className="text-xs text-amber-100/50">{post.timestamp}</span>
                      </div>

                      <p className="text-amber-100 mb-4 font-poppins leading-relaxed">
                        {post.text}
                      </p>

                      <div className="flex items-center gap-4 pt-4 border-t border-amber-600/10">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          className="flex items-center gap-2 text-amber-200/60 hover:text-amber-300 transition-all group"
                        >
                          <Heart className="w-5 h-5 group-hover:fill-red-500" />
                          <span className="text-sm">{post.likes}</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          className="flex items-center gap-2 text-amber-200/60 hover:text-amber-300 transition-all"
                        >
                          <MessageCircle className="w-5 h-5" />
                          <span className="text-sm">{post.replies}</span>
                        </motion.button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            <div ref={messagesEndRef} />
          </motion.div>
        </div>
      </div>

      {/* Member Detail Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMember(null)}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm pt-20 pb-8 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-md mx-auto backdrop-blur-xl bg-gradient-to-br from-stone-900/90 to-stone-950/90 border border-amber-600/40 rounded-3xl p-8"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 mx-auto mb-4 flex items-center justify-center text-2xl">
                  👤
                </div>
                <h3 className="text-2xl font-playfair font-bold text-amber-300">
                  {selectedMember.name}
                </h3>
                <p className="text-amber-100/60 font-poppins">{selectedMember.role}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-stone-800/50 rounded-xl">
                  <p className="text-2xl font-bold text-amber-300">{selectedMember.followers}</p>
                  <p className="text-xs text-amber-100/50">Followers</p>
                </div>
                <div className="text-center p-4 bg-stone-800/50 rounded-xl">
                  <p className="text-2xl font-bold text-amber-300">{selectedMember.posts}</p>
                  <p className="text-xs text-amber-100/50">Posts</p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl mb-3"
              >
                <MessageCircle className="w-5 h-5 inline mr-2" />
                Message
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="w-full py-3 bg-stone-800/50 text-amber-200 font-bold rounded-xl hover:bg-stone-800"
              >
                <Users className="w-5 h-5 inline mr-2" />
                Follow
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
