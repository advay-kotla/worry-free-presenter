import { motion } from "framer-motion";
import { Calendar, CheckCircle, Clock, TrendingUp, Sparkles } from "lucide-react";

interface DashboardStatsProps {
  totalAppointments: number;
  upcomingCount: number;
  completedCount: number;
}

const DashboardStats = ({ totalAppointments, upcomingCount, completedCount }: DashboardStatsProps) => {
  const stats = [
    {
      label: "Total Sessions",
      value: totalAppointments,
      icon: Calendar,
      gradient: "from-primary/20 to-primary/5",
      iconBg: "bg-primary/15 text-primary",
      description: "All time"
    },
    {
      label: "Upcoming",
      value: upcomingCount,
      icon: Clock,
      gradient: "from-accent/20 to-accent/5",
      iconBg: "bg-accent/15 text-accent",
      description: "Scheduled"
    },
    {
      label: "Completed",
      value: completedCount,
      icon: CheckCircle,
      gradient: "from-emerald-500/20 to-emerald-500/5",
      iconBg: "bg-emerald-500/15 text-emerald-600",
      description: "Sessions done"
    },
    {
      label: "Wellness Score",
      value: "85%",
      icon: Sparkles,
      gradient: "from-violet-500/20 to-violet-500/5",
      iconBg: "bg-violet-500/15 text-violet-600",
      description: "+5% this month"
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="group relative overflow-hidden rounded-2xl bg-card border border-border p-5 hover:shadow-lg transition-all duration-300"
        >
          {/* Gradient Background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-50 group-hover:opacity-100 transition-opacity`} />
          
          <div className="relative">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-11 h-11 rounded-xl ${stat.iconBg} flex items-center justify-center`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <TrendingUp className="w-3 h-3 text-emerald-500" />
              </div>
            </div>
            
            <div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-0.5">
                {stat.value}
              </h3>
              <p className="text-sm font-medium text-foreground/80">{stat.label}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default DashboardStats;
