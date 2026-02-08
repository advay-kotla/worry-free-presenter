import { motion } from "framer-motion";
import { Target, TrendingUp, Award, ArrowRight, Sparkles, Calendar, Brain, Heart, Users } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

const goals = [
  {
    id: "therapy",
    title: "Complete 10 therapy sessions",
    progress: 70,
    current: 7,
    target: 10,
    icon: Brain,
    color: "primary",
    dueDate: "Mar 31",
  },
  {
    id: "meditation",
    title: "30-day meditation streak",
    progress: 47,
    current: 14,
    target: 30,
    icon: Heart,
    color: "accent",
    dueDate: "Ongoing",
  },
  {
    id: "community",
    title: "Join 3 support groups",
    progress: 33,
    current: 1,
    target: 3,
    icon: Users,
    color: "emerald",
    dueDate: "Apr 15",
  },
];

const achievements = [
  { id: "first-session", label: "First Session", icon: "🎯", unlocked: true },
  { id: "week-streak", label: "7-Day Streak", icon: "🔥", unlocked: true },
  { id: "mood-master", label: "Mood Master", icon: "🌟", unlocked: false },
  { id: "community-hero", label: "Community Hero", icon: "💜", unlocked: false },
];

const getColorClasses = (color: string) => {
  switch (color) {
    case "primary":
      return { bg: "bg-primary/10", text: "text-primary", progress: "bg-primary" };
    case "accent":
      return { bg: "bg-accent/10", text: "text-accent", progress: "bg-accent" };
    case "emerald":
      return { bg: "bg-emerald-500/10", text: "text-emerald-600 dark:text-emerald-400", progress: "bg-emerald-500" };
    default:
      return { bg: "bg-primary/10", text: "text-primary", progress: "bg-primary" };
  }
};

const WellnessGoals = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="space-y-5"
    >
      {/* Goals Section */}
      <div className="rounded-2xl bg-card border border-border p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <Target className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-sm">Wellness Goals</h3>
              <p className="text-xs text-muted-foreground">Track your progress</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="text-xs gap-1 h-8">
            View All
            <ArrowRight className="w-3 h-3" />
          </Button>
        </div>

        <div className="space-y-4">
          {goals.map((goal, index) => {
            const colors = getColorClasses(goal.color);
            return (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="flex items-start gap-3 mb-2">
                  <div className={`w-9 h-9 rounded-lg ${colors.bg} flex items-center justify-center shrink-0`}>
                    <goal.icon className={`w-4 h-4 ${colors.text}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-medium text-foreground truncate pr-2">
                        {goal.title}
                      </h4>
                      <span className={`text-xs font-semibold ${colors.text}`}>
                        {goal.progress}%
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <Progress value={goal.progress} className="h-2 flex-1" />
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{goal.current} of {goal.target} completed</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {goal.dueDate}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Achievements */}
      <div className="rounded-2xl bg-card border border-border p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center">
              <Award className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-sm">Achievements</h3>
              <p className="text-xs text-muted-foreground">{achievements.filter(a => a.unlocked).length} of {achievements.length} unlocked</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              whileHover={achievement.unlocked ? { scale: 1.05 } : {}}
              className={`relative flex flex-col items-center justify-center p-3 rounded-xl transition-all ${
                achievement.unlocked
                  ? "bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20"
                  : "bg-secondary/50 opacity-50"
              }`}
            >
              <span className={`text-2xl mb-1 ${!achievement.unlocked && "grayscale"}`}>
                {achievement.icon}
              </span>
              <span className="text-[10px] text-center text-muted-foreground line-clamp-1">
                {achievement.label}
              </span>
              {achievement.unlocked && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center"
                >
                  <Sparkles className="w-2.5 h-2.5 text-primary-foreground" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default WellnessGoals;
