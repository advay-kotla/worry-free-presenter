import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Circle, Sparkles, Trophy, Flame, Droplets, Moon, Dumbbell, Brain, BookOpen } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const dailyTasks = [
  { id: "water", label: "Drink 8 glasses of water", icon: Droplets, xp: 5 },
  { id: "sleep", label: "Got 7+ hours of sleep", icon: Moon, xp: 10 },
  { id: "exercise", label: "30 min of exercise", icon: Dumbbell, xp: 15 },
  { id: "meditation", label: "5 min meditation", icon: Brain, xp: 10 },
  { id: "journal", label: "Write in journal", icon: BookOpen, xp: 10 },
];

const DailyCheckin = () => {
  const [completedTasks, setCompletedTasks] = useState<string[]>(["water", "sleep"]);
  const [animatingTask, setAnimatingTask] = useState<string | null>(null);
  const [showXPGain, setShowXPGain] = useState<{ id: string; xp: number } | null>(null);

  const toggleTask = (taskId: string) => {
    if (completedTasks.includes(taskId)) {
      setCompletedTasks(completedTasks.filter(id => id !== taskId));
    } else {
      setCompletedTasks([...completedTasks, taskId]);
      setAnimatingTask(taskId);
      const task = dailyTasks.find(t => t.id === taskId);
      if (task) {
        setShowXPGain({ id: taskId, xp: task.xp });
        setTimeout(() => setShowXPGain(null), 1500);
      }
      setTimeout(() => setAnimatingTask(null), 600);
    }
  };

  const progress = (completedTasks.length / dailyTasks.length) * 100;
  const totalXP = dailyTasks
    .filter(t => completedTasks.includes(t.id))
    .reduce((sum, t) => sum + t.xp, 0);

  const streakDays = 7;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="relative overflow-hidden rounded-2xl bg-card border border-border p-5"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center">
            <Trophy className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-sm">Daily Check-in</h3>
            <p className="text-xs text-muted-foreground">{completedTasks.length}/{dailyTasks.length} completed</p>
          </div>
        </div>
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex items-center gap-1.5 bg-gradient-to-r from-accent/10 to-primary/10 px-3 py-1.5 rounded-full"
        >
          <Flame className="w-4 h-4 text-accent" />
          <span className="text-xs font-bold text-foreground">{streakDays} day streak</span>
        </motion.div>
      </div>

      {/* Progress Bar */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">Daily progress</span>
          <span className="text-xs font-medium text-primary">{totalXP} XP earned</span>
        </div>
        <div className="relative">
          <Progress value={progress} className="h-2.5" />
          {progress === 100 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -right-1 -top-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center"
            >
              <Sparkles className="w-3 h-3 text-accent-foreground" />
            </motion.div>
          )}
        </div>
      </div>

      {/* Tasks */}
      <div className="space-y-2">
        {dailyTasks.map((task, index) => {
          const isCompleted = completedTasks.includes(task.id);
          const isAnimating = animatingTask === task.id;
          
          return (
            <motion.button
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => toggleTask(task.id)}
              className={`relative w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                isCompleted
                  ? "bg-primary/10 border border-primary/20"
                  : "bg-secondary/50 hover:bg-secondary border border-transparent"
              }`}
            >
              <motion.div
                animate={isAnimating ? { scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] } : {}}
                className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  isCompleted ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {isCompleted ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <task.icon className="w-4 h-4" />
                )}
              </motion.div>
              
              <span className={`flex-1 text-sm text-left ${
                isCompleted ? "text-foreground line-through opacity-70" : "text-foreground"
              }`}>
                {task.label}
              </span>
              
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                isCompleted
                  ? "bg-primary/20 text-primary"
                  : "bg-muted text-muted-foreground"
              }`}>
                +{task.xp} XP
              </span>

              {/* XP Gain Animation */}
              <AnimatePresence>
                {showXPGain?.id === task.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 0, scale: 0.5 }}
                    animate={{ opacity: 1, y: -30, scale: 1 }}
                    exit={{ opacity: 0, y: -50 }}
                    className="absolute right-3 top-0 flex items-center gap-1 text-primary font-bold text-sm"
                  >
                    <Sparkles className="w-4 h-4" />
                    +{showXPGain.xp} XP
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>

      {/* Completion Bonus */}
      {progress === 100 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-4 p-3 rounded-xl bg-gradient-to-r from-accent/20 to-primary/20 border border-accent/30 text-center"
        >
          <div className="flex items-center justify-center gap-2">
            <Trophy className="w-5 h-5 text-accent" />
            <span className="font-semibold text-foreground">All tasks completed!</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">+25 bonus XP for completing all tasks</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default DailyCheckin;
