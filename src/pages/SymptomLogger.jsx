import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Trash2,
  AlertCircle,
  Eye,
  CheckCircle2,
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
  </div>
);

export default function SymptomLogger() {
  const [symptoms, setSymptoms] = useState([
    { id: 1, name: 'Headache', severity: 'moderate', date: '2025-11-03', time: '10:30 AM' },
    { id: 2, name: 'Fatigue', severity: 'mild', date: '2025-11-03', time: '02:15 PM' },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [newSymptom, setNewSymptom] = useState({ name: '', severity: 'mild' });

  const commonSymptoms = ['Headache', 'Fatigue', 'Anxiety', 'Insomnia', 'Muscle Pain', 'Digestion', 'Stress', 'Fever'];
  const severityColors = {
    mild: 'from-yellow-500 to-amber-600',
    moderate: 'from-orange-500 to-red-600',
    severe: 'from-red-600 to-purple-600',
  };

  const addSymptom = () => {
    if (newSymptom.name) {
      const now = new Date();
      setSymptoms([
        {
          id: symptoms.length + 1,
          name: newSymptom.name,
          severity: newSymptom.severity,
          date: now.toISOString().split('T')[0],
          time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
        ...symptoms,
      ]);
      setNewSymptom({ name: '', severity: 'mild' });
      setShowForm(false);
    }
  };

  const deleteSymptom = (id) => {
    setSymptoms(symptoms.filter((s) => s.id !== id));
  };

  return (
    <div className="min-h-screen bg-stone-950 pt-24 pb-16 px-6">
      <DashboardBg />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <Eye className="w-10 h-10 text-amber-400" />
            <h1 className="text-5xl font-playfair font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-orange-400">
              Symptom Observer
            </h1>
          </div>
          <p className="text-amber-100/60 font-poppins text-lg max-w-2xl">
            शिवोऽहम् - "I Am Consciousness" | Log your symptoms without identification. You observe the symptom, but you are not the symptom.
          </p>
        </motion.div>

        {/* Shloka Info Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="backdrop-blur-xl bg-gradient-to-br from-stone-900/60 via-purple-950/30 to-stone-900/60 border border-amber-600/20 rounded-2xl p-8 mb-12"
        >
          <div className="flex items-start gap-4">
            <Eye className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
            <div>
              <p className="text-amber-300 font-playfair font-bold mb-2 text-lg">The Observer Principle</p>
              <p className="text-amber-100/70 font-poppins leading-relaxed">
                You are the eternal witness to your body's experiences. A headache arises, you observe it. Fatigue comes, you witness it. But these are temporary clouds passing through the sky of your consciousness. You remain untouched, unchanged, eternal.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Add Symptom Form */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: showForm ? 'auto' : 0, opacity: showForm ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden mb-8"
        >
          <div className="backdrop-blur-xl bg-gradient-to-br from-stone-900/60 via-red-950/30 to-stone-900/60 border border-amber-600/20 rounded-2xl p-8">
            <p className="text-amber-200 font-poppins font-semibold mb-4">Select Your Symptom</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {commonSymptoms.map((symptom) => (
                <motion.button
                  key={symptom}
                  onClick={() => setNewSymptom({ ...newSymptom, name: symptom })}
                  whileHover={{ scale: 1.05 }}
                  className={`px-4 py-3 rounded-lg font-poppins text-sm transition-all ${
                    newSymptom.name === symptom
                      ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white'
                      : 'bg-stone-800/50 text-amber-200/70 hover:bg-stone-800'
                  }`}
                >
                  {symptom}
                </motion.button>
              ))}
            </div>

            <p className="text-amber-200 font-poppins font-semibold mb-4">Severity Level</p>
            <div className="flex gap-3 mb-8">
              {['mild', 'moderate', 'severe'].map((sev) => (
                <motion.button
                  key={sev}
                  onClick={() => setNewSymptom({ ...newSymptom, severity: sev })}
                  whileHover={{ scale: 1.05 }}
                  className={`px-6 py-2 rounded-lg font-poppins capitalize transition-all ${
                    newSymptom.severity === sev
                      ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white'
                      : 'bg-stone-800/50 text-amber-200/70'
                  }`}
                >
                  {sev}
                </motion.button>
              ))}
            </div>

            <motion.button
              onClick={addSymptom}
              disabled={!newSymptom.name}
              whileHover={{ scale: 1.05 }}
              className="w-full py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold rounded-lg disabled:opacity-50"
            >
              Log & Observe
            </motion.button>
          </div>
        </motion.div>

        {/* Add Button */}
        <motion.button
          onClick={() => setShowForm(!showForm)}
          whileHover={{ scale: 1.05 }}
          className="mb-12 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg font-bold hover:shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Log New Symptom
        </motion.button>

        {/* Symptoms List */}
        <div className="space-y-4">
          {symptoms.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-amber-100/60 font-poppins">No symptoms logged. You are at peace.</p>
            </motion.div>
          ) : (
            symptoms.map((symptom, i) => (
              <motion.div
                key={symptom.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 5 }}
                className="backdrop-blur-xl bg-gradient-to-br from-stone-900/60 via-red-950/30 to-stone-900/60 border border-amber-600/20 rounded-2xl p-6 flex items-center justify-between hover:border-amber-500/40 transition-all"
              >
                <div className="flex items-center gap-4 flex-1">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className={`w-12 h-12 rounded-full bg-gradient-to-br ${severityColors[symptom.severity]} flex items-center justify-center flex-shrink-0`}
                  >
                    <AlertCircle className="w-6 h-6 text-white" />
                  </motion.div>
                  <div className="flex-1">
                    <p className="text-lg font-poppins font-bold text-amber-200">{symptom.name}</p>
                    <p className="text-sm text-amber-100/60">
                      {symptom.date} at {symptom.time} • <span className="capitalize text-amber-300">{symptom.severity}</span>
                    </p>
                    <p className="text-xs text-purple-300/70 mt-2 italic">
                      "You observe this {symptom.name.toLowerCase()}, but you are not this symptom. It is temporary. You are eternal."
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => deleteSymptom(symptom.id)}
                  className="p-2 text-green-400 hover:bg-green-600/20 rounded-lg transition-all flex-shrink-0"
                >
                  <CheckCircle2 className="w-5 h-5" />
                </motion.button>
              </motion.div>
            ))
          )}
        </div>

        {/* Wisdom Footer */}
        {symptoms.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 backdrop-blur-xl bg-gradient-to-br from-stone-900/60 via-purple-950/30 to-stone-900/60 border border-purple-500/20 rounded-2xl p-8"
          >
            <p className="text-amber-100/80 font-poppins">
              <span className="text-purple-300 font-semibold">Remember: </span>
              These symptoms are like clouds passing through the sky. Your consciousness is the sky - unchanging, eternal, untouched. By observing without identifying, you create space between yourself and the symptom. In this space, healing begins.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
