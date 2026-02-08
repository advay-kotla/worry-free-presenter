import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smile, Meh, Frown, Heart, Zap, Cloud, Sun, Moon, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const moods = [
  { id: "great", icon: Sun, label: "Great", color: "bg-emerald-500", emoji: "😊" },
  { id: "good", icon: Smile, label: "Good", color: "bg-primary", emoji: "🙂" },
  { id: "okay", icon: Meh, label: "Okay", color: "bg-amber-500", emoji: "😐" },
  { id: "low", icon: Cloud, label: "Low", color: "bg-blue-400", emoji: "😔" },
  { id: "struggling", icon: Frown, label: "Struggling", color: "bg-rose-500", emoji: "😢" },
];

interface MoodTrackerProps {
  onMoodSelect?: (mood: string) => void;
}

const MoodTracker = ({ onMoodSelect }: MoodTrackerProps) => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleMoodSelect = (moodId: string) => {
    setSelectedMood(moodId);
    setShowConfirmation(true);
    onMoodSelect?.(moodId);
    
    setTimeout(() => setShowConfirmation(false), 2000);
  };

  const weekMoods = [
    { day: "Mon", mood: "good" },
    { day: "Tue", mood: "great" },
    { day: "Wed", mood: "okay" },
    { day: "Thu", mood: "good" },
    { day: "Fri", mood: "great" },
    { day: "Sat", mood: null },
    { day: "Sun", mood: null },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl bg-card border border-border p-5"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-sm">How are you feeling?</h3>
              <p className="text-xs text-muted-foreground">Track your daily mood</p>
            </div>
          </div>
          {selectedMood && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-1 text-xs text-primary font-medium bg-primary/10 px-2.5 py-1 rounded-full"
            >
              <Sparkles className="w-3 h-3" />
              +10 XP
            </motion.div>
          )}
        </div>

        {/* Mood Selection */}
        <div className="grid grid-cols-5 gap-2 mb-5">
          {moods.map((mood, index) => {
            const isSelected = selectedMood === mood.id;
            return (
              <motion.button
                key={mood.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleMoodSelect(mood.id)}
                className={`relative flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all ${
                  isSelected
                    ? `${mood.color} text-white shadow-lg`
                    : "bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="text-xl">{mood.emoji}</span>
                <span className="text-[10px] font-medium">{mood.label}</span>
                {isSelected && (
                  <motion.div
                    layoutId="selectedMood"
                    className="absolute inset-0 rounded-xl ring-2 ring-offset-2 ring-offset-card ring-primary/50"
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Weekly Overview */}
        <div className="pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground mb-3">This week</p>
          <div className="flex justify-between">
            {weekMoods.map((day, index) => {
              const moodData = moods.find(m => m.id === day.mood);
              const isToday = index === 5;
              return (
                <motion.div
                  key={day.day}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="flex flex-col items-center gap-1.5"
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs ${
                      moodData
                        ? `${moodData.color} text-white`
                        : isToday
                        ? "border-2 border-dashed border-primary/50 bg-primary/5"
                        : "bg-secondary/50"
                    }`}
                  >
                    {moodData ? moodData.emoji : isToday ? "?" : "–"}
                  </div>
                  <span className={`text-[10px] ${isToday ? "font-semibold text-primary" : "text-muted-foreground"}`}>
                    {day.day}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Confirmation Toast */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="absolute inset-0 flex items-center justify-center bg-card/95 backdrop-blur-sm rounded-2xl"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="text-4xl mb-2"
              >
                {moods.find(m => m.id === selectedMood)?.emoji}
              </motion.div>
              <p className="font-semibold text-foreground">Mood logged!</p>
              <p className="text-xs text-muted-foreground">Keep tracking daily</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MoodTracker;
