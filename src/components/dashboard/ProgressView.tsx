import { motion } from "framer-motion";
import { TrendingUp, Calendar, Brain, Heart, Smile, Target, Award, ChevronUp, ChevronDown } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const moodHistory = [
  { date: "Feb 1", mood: 4, label: "Good" },
  { date: "Feb 2", mood: 5, label: "Great" },
  { date: "Feb 3", mood: 3, label: "Okay" },
  { date: "Feb 4", mood: 4, label: "Good" },
  { date: "Feb 5", mood: 5, label: "Great" },
  { date: "Feb 6", mood: 4, label: "Good" },
  { date: "Feb 7", mood: 5, label: "Great" },
];

const wellnessMetrics = [
  {
    label: "Anxiety Level",
    current: 35,
    previous: 55,
    icon: Brain,
    color: "primary",
    unit: "Low",
    improved: true,
  },
  {
    label: "Sleep Quality",
    current: 78,
    previous: 60,
    icon: Calendar,
    color: "accent",
    unit: "Good",
    improved: true,
  },
  {
    label: "Mood Stability",
    current: 82,
    previous: 70,
    icon: Smile,
    color: "emerald",
    unit: "High",
    improved: true,
  },
  {
    label: "Stress Level",
    current: 42,
    previous: 38,
    icon: Heart,
    color: "rose",
    unit: "Moderate",
    improved: false,
  },
];

const milestones = [
  { id: 1, title: "First Therapy Session", date: "Jan 15", completed: true },
  { id: 2, title: "7-Day Mood Tracking Streak", date: "Jan 22", completed: true },
  { id: 3, title: "Joined First Support Group", date: "Jan 28", completed: true },
  { id: 4, title: "30-Day Meditation Challenge", date: "In Progress", completed: false },
  { id: 5, title: "Complete 10 Sessions", date: "Mar 31", completed: false },
];

const getColorClasses = (color: string) => {
  switch (color) {
    case "primary": return "bg-primary/10 text-primary";
    case "accent": return "bg-accent/10 text-accent";
    case "emerald": return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
    case "rose": return "bg-rose-500/10 text-rose-600 dark:text-rose-400";
    default: return "bg-primary/10 text-primary";
  }
};

const ProgressView = () => {
  const maxMood = 5;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3"
      >
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
          <TrendingUp className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-display font-bold text-foreground">Your Progress</h2>
          <p className="text-sm text-muted-foreground">Track your wellness journey over time</p>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Mood Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl bg-card border border-border p-5"
        >
          <h3 className="font-semibold text-foreground mb-4">Mood Trend (Last 7 Days)</h3>
          
          <div className="h-40 flex items-end justify-between gap-2">
            {moodHistory.map((day, index) => (
              <motion.div
                key={day.date}
                initial={{ height: 0 }}
                animate={{ height: `${(day.mood / maxMood) * 100}%` }}
                transition={{ delay: 0.2 + index * 0.05, duration: 0.5 }}
                className="flex-1 flex flex-col items-center"
              >
                <div
                  className={`w-full rounded-t-lg ${
                    day.mood >= 4 ? "bg-primary" : day.mood >= 3 ? "bg-amber-500" : "bg-rose-500"
                  }`}
                  style={{ height: "100%" }}
                />
              </motion.div>
            ))}
          </div>
          
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            {moodHistory.map((day) => (
              <span key={day.date} className="flex-1 text-center">{day.date.split(" ")[1]}</span>
            ))}
          </div>

          <div className="mt-4 p-3 rounded-xl bg-secondary/50 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Average Mood</span>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-foreground">4.3</span>
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
                <ChevronUp className="w-3 h-3" />
                +0.5
              </span>
            </div>
          </div>
        </motion.div>

        {/* Wellness Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-2xl bg-card border border-border p-5"
        >
          <h3 className="font-semibold text-foreground mb-4">Wellness Metrics</h3>
          
          <div className="space-y-4">
            {wellnessMetrics.map((metric, index) => {
              const colorClasses = getColorClasses(metric.color);
              return (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-lg ${colorClasses} flex items-center justify-center`}>
                        <metric.icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-sm text-foreground">{metric.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-foreground">{metric.unit}</span>
                      <span className={`text-xs flex items-center gap-0.5 ${
                        metric.improved 
                          ? "text-emerald-600 dark:text-emerald-400" 
                          : "text-rose-600 dark:text-rose-400"
                      }`}>
                        {metric.improved ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                        {Math.abs(metric.current - metric.previous)}%
                      </span>
                    </div>
                  </div>
                  <Progress value={metric.current} className="h-2" />
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Milestones */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl bg-card border border-border p-5 lg:col-span-2"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center">
              <Award className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Journey Milestones</h3>
              <p className="text-xs text-muted-foreground">{milestones.filter(m => m.completed).length} of {milestones.length} completed</p>
            </div>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[15px] top-0 bottom-0 w-0.5 bg-border" />
            
            <div className="space-y-4">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + index * 0.05 }}
                  className="flex items-start gap-4 relative"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 ${
                    milestone.completed 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-secondary text-muted-foreground border-2 border-border"
                  }`}>
                    {milestone.completed ? (
                      <Target className="w-4 h-4" />
                    ) : (
                      <span className="text-xs font-semibold">{milestone.id}</span>
                    )}
                  </div>
                  <div className="flex-1 pt-1">
                    <h4 className={`text-sm font-medium ${
                      milestone.completed ? "text-foreground" : "text-muted-foreground"
                    }`}>
                      {milestone.title}
                    </h4>
                    <p className="text-xs text-muted-foreground">{milestone.date}</p>
                  </div>
                  {milestone.completed && (
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                      Completed
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProgressView;
