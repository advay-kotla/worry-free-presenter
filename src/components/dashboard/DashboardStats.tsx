import { motion } from "framer-motion";
import { Calendar, CheckCircle, Clock, TrendingUp } from "lucide-react";

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
      color: "bg-primary/10 text-primary",
      trend: "+12%",
      trendUp: true
    },
    {
      label: "Upcoming",
      value: upcomingCount,
      icon: Clock,
      color: "bg-accent/10 text-accent",
      trend: "Next: Today",
      trendUp: true
    },
    {
      label: "Completed",
      value: completedCount,
      icon: CheckCircle,
      color: "bg-green-500/10 text-green-600",
      trend: "+3 this month",
      trendUp: true
    },
    {
      label: "Wellness Score",
      value: "85%",
      icon: TrendingUp,
      color: "bg-purple-500/10 text-purple-600",
      trend: "+5% improvement",
      trendUp: true
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="relative overflow-hidden rounded-2xl bg-card border border-border p-6 shadow-soft hover:shadow-elevated transition-all duration-300"
        >
          {/* Background Gradient */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/5 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                {stat.trendUp && <TrendingUp className="w-3 h-3 text-green-500" />}
                {stat.trend}
              </span>
            </div>
            
            <h3 className="font-display text-3xl font-bold text-foreground mb-1">
              {stat.value}
            </h3>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default DashboardStats;
