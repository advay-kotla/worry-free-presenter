import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Calendar, 
  MessageCircle, 
  BookOpen, 
  Users, 
  Phone, 
  Video,
  Brain,
  Heart,
  Sparkles,
  ArrowRight
} from "lucide-react";

const actions = [
  {
    id: "book",
    label: "Book Session",
    description: "Schedule a therapy appointment",
    icon: Calendar,
    color: "from-primary to-primary/80",
    route: "/#schedule",
  },
  {
    id: "emergency",
    label: "Crisis Support",
    description: "24/7 helpline access",
    icon: Phone,
    color: "from-rose-500 to-rose-600",
    route: "/#helpline",
  },
  {
    id: "community",
    label: "Community",
    description: "Join support groups",
    icon: Users,
    color: "from-accent to-accent/80",
    route: "/community",
  },
  {
    id: "resources",
    label: "Resources",
    description: "Articles & guides",
    icon: BookOpen,
    color: "from-violet-500 to-violet-600",
    route: "/blog",
  },
];

const quickStats = [
  { label: "Sessions This Month", value: "4", icon: Video, trend: "+2" },
  { label: "Mindful Minutes", value: "120", icon: Brain, trend: "+30" },
  { label: "Articles Read", value: "8", icon: BookOpen, trend: "+3" },
];

const QuickActions = () => {
  const navigate = useNavigate();

  const handleAction = (route: string) => {
    if (route.startsWith("/#")) {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(route.replace("/#", ""));
        element?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      navigate(route);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="space-y-5"
    >
      {/* Quick Actions Grid */}
      <div className="rounded-2xl bg-card border border-border p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-sm">Quick Actions</h3>
            <p className="text-xs text-muted-foreground">Get started quickly</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {actions.map((action, index) => (
            <motion.button
              key={action.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAction(action.route)}
              className="group relative overflow-hidden rounded-xl p-4 text-left transition-all"
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
              
              <div className="relative">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-3 shadow-lg`}>
                  <action.icon className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-semibold text-sm text-foreground mb-0.5">{action.label}</h4>
                <p className="text-xs text-muted-foreground line-clamp-1">{action.description}</p>
              </div>

              {/* Hover arrow */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileHover={{ opacity: 1, x: 0 }}
                className="absolute top-4 right-4"
              >
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </motion.div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="rounded-2xl bg-card border border-border p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
            <Heart className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-sm">This Month</h3>
            <p className="text-xs text-muted-foreground">Your wellness summary</p>
          </div>
        </div>

        <div className="space-y-3">
          {quickStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              className="flex items-center justify-between p-3 rounded-xl bg-secondary/50"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <stat.icon className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-foreground">{stat.value}</span>
                <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                  {stat.trend}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default QuickActions;
