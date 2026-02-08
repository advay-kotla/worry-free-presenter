import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { 
  Heart, 
  Calendar, 
  MessageCircle, 
  Home, 
  Settings, 
  Bell, 
  LogOut,
  LayoutDashboard,
  TrendingUp,
  Activity,
  BookOpen,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ThemeToggle from "@/components/ThemeToggle";

interface DashboardSidebarProps {
  user: any;
  activeView: string;
  setActiveView: (view: string) => void;
  appointmentsCount: number;
  wellnessScore: number;
  onSignOut: () => void;
}

const navItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "appointments", label: "Appointments", icon: Calendar, badge: true },
  { id: "messages", label: "Messages", icon: MessageCircle, badgeCount: 3 },
  { id: "progress", label: "Progress", icon: TrendingUp },
];

const quickLinks = [
  { label: "Home", icon: Home, route: "/" },
  { label: "Blog", icon: BookOpen, route: "/blog" },
  { label: "Community", icon: Users, route: "/community" },
  { label: "Settings", icon: Settings, route: "#" },
];

const DashboardSidebar = ({
  user,
  activeView,
  setActiveView,
  appointmentsCount,
  wellnessScore,
  onSignOut,
}: DashboardSidebarProps) => {
  const navigate = useNavigate();

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-64 bg-card border-r border-border flex flex-col shrink-0"
    >
      {/* Logo */}
      <div className="p-4 border-b border-border">
        <Link to="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20"
          >
            <Heart className="w-5 h-5 text-primary-foreground" />
          </motion.div>
          <div>
            <span className="font-display font-bold text-foreground">MindfulPath</span>
            <p className="text-[10px] text-muted-foreground">Wellness Dashboard</p>
          </div>
        </Link>
      </div>

      {/* User Profile Section */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <Avatar className="h-11 w-11 ring-2 ring-primary/20 ring-offset-2 ring-offset-card">
            <AvatarImage src="" />
            <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
              {user?.email?.[0]?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm text-foreground truncate">
              {user?.email?.split("@")[0]}
            </p>
            <p className="text-xs text-muted-foreground">
              {format(new Date(), "MMM d, yyyy")}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">
          Menu
        </p>
        
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeView === item.id
                ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            <item.icon className="w-4 h-4" />
            {item.label}
            {item.badge && (
              <Badge className={`ml-auto text-[10px] h-5 px-1.5 ${
                activeView === item.id 
                  ? "bg-primary-foreground/20 text-primary-foreground" 
                  : "bg-secondary text-muted-foreground"
              }`}>
                {appointmentsCount}
              </Badge>
            )}
            {item.badgeCount && (
              <Badge className={`ml-auto text-[10px] h-5 px-1.5 ${
                activeView === item.id 
                  ? "bg-primary-foreground/20 text-primary-foreground" 
                  : "bg-accent text-accent-foreground"
              }`}>
                {item.badgeCount}
              </Badge>
            )}
          </button>
        ))}

        <div className="pt-4">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">
            Quick Links
          </p>
          
          {quickLinks.map((link) => (
            <Link
              key={link.label}
              to={link.route}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-all"
            >
              <link.icon className="w-4 h-4" />
              {link.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Wellness Score Card */}
      <div className="p-4 mx-3 mb-3 rounded-2xl bg-gradient-to-br from-primary/10 via-accent/5 to-transparent border border-primary/10">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <Activity className="w-4 h-4 text-primary" />
          </div>
          <span className="text-xs font-semibold text-foreground">Wellness Score</span>
        </div>
        <div className="flex items-end gap-2">
          <span className="text-3xl font-bold text-primary">{wellnessScore}</span>
          <span className="text-xs text-muted-foreground mb-1">/ 100</span>
        </div>
        <div className="mt-2 h-1.5 bg-secondary rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${wellnessScore}%` }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
          />
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-3 border-t border-border flex items-center gap-2">
        <ThemeToggle />
        <Button variant="ghost" size="icon" className="relative h-9 w-9">
          <Bell className="w-4 h-4" />
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent text-accent-foreground text-[9px] font-bold rounded-full flex items-center justify-center">
            2
          </span>
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onSignOut}
          className="h-9 w-9 text-muted-foreground hover:text-destructive"
        >
          <LogOut className="w-4 h-4" />
        </Button>
      </div>
    </motion.aside>
  );
};

export default DashboardSidebar;
