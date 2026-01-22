import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, 
  MessageCircle, 
  Clock, 
  Home, 
  Bell, 
  Search, 
  Heart,
  Plus,
  LogOut,
  Settings,
  TrendingUp,
  Zap,
  Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format, isPast, isToday, isFuture } from "date-fns";
import AppointmentCard from "@/components/dashboard/AppointmentCard";
import MessagesPanel from "@/components/dashboard/MessagesPanel";
import ThemeToggle from "@/components/ThemeToggle";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState<"appointments" | "messages">("appointments");
  const [appointmentFilter, setAppointmentFilter] = useState<"upcoming" | "history">("upcoming");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }
      setUser(session.user);
      fetchAppointments(session.user.email);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
        fetchAppointments(session.user.email);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchAppointments = async (email: string | undefined) => {
    if (!email) return;
    
    setLoading(true);
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .eq("email", email)
      .order("appointment_date", { ascending: true });

    if (!error && data) {
      setAppointments(data);
    }
    setLoading(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const upcomingAppointments = appointments.filter(apt => {
    const aptDate = new Date(apt.appointment_date);
    return isFuture(aptDate) || isToday(aptDate);
  });

  const pastAppointments = appointments.filter(apt => {
    const aptDate = new Date(apt.appointment_date);
    return isPast(aptDate) && !isToday(aptDate);
  });

  const filteredAppointments = (appointmentFilter === "upcoming" ? upcomingAppointments : pastAppointments)
    .filter(apt => 
      apt.therapist?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.session_type?.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const wellnessScore = Math.min(95, 60 + pastAppointments.length * 5);

  if (loading) {
    return (
      <div className="h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 mx-auto mb-4 border-3 border-primary/30 border-t-primary rounded-full"
          />
          <p className="text-muted-foreground text-sm">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-background flex overflow-hidden">
      {/* Sidebar */}
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
        <nav className="flex-1 p-3 space-y-1">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">
            Menu
          </p>
          
          <button
            onClick={() => setActiveView("appointments")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeView === "appointments"
                ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            <Calendar className="w-4 h-4" />
            Appointments
            <Badge className={`ml-auto text-[10px] h-5 px-1.5 ${
              activeView === "appointments" 
                ? "bg-primary-foreground/20 text-primary-foreground" 
                : "bg-secondary text-muted-foreground"
            }`}>
              {appointments.length}
            </Badge>
          </button>
          
          <button
            onClick={() => setActiveView("messages")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeView === "messages"
                ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            Messages
            <Badge className={`ml-auto text-[10px] h-5 px-1.5 ${
              activeView === "messages" 
                ? "bg-primary-foreground/20 text-primary-foreground" 
                : "bg-accent text-accent-foreground"
            }`}>
              3
            </Badge>
          </button>

          <div className="pt-4">
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">
              Quick Links
            </p>
            
            <Link
              to="/"
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-all"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </Link>
            
            <button
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-all"
            >
              <Settings className="w-4 h-4" />
              Settings
            </button>
          </div>
        </nav>

        {/* Stats Card */}
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
            onClick={handleSignOut}
            className="h-9 w-9 text-muted-foreground hover:text-destructive"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Bar */}
        <motion.header
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="h-16 bg-card/50 backdrop-blur-sm border-b border-border flex items-center justify-between px-6 shrink-0"
        >
          <div>
            <h1 className="font-display text-xl font-bold text-foreground">
              {activeView === "appointments" ? "Your Appointments" : "Messages"}
            </h1>
            <p className="text-xs text-muted-foreground">
              {activeView === "appointments" 
                ? `${upcomingAppointments.length} upcoming · ${pastAppointments.length} completed`
                : "3 unread conversations"
              }
            </p>
          </div>

          <div className="flex items-center gap-3">
            {activeView === "appointments" && (
              <>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-56 pl-9 h-9 bg-background border-border/50 focus-visible:ring-1 focus-visible:ring-primary rounded-xl text-sm"
                  />
                </div>

                <div className="flex bg-secondary/50 p-1 rounded-xl">
                  <Button
                    variant={appointmentFilter === "upcoming" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setAppointmentFilter("upcoming")}
                    className="h-7 px-3 text-xs rounded-lg"
                  >
                    <Clock className="w-3 h-3 mr-1.5" />
                    Upcoming
                  </Button>
                  <Button
                    variant={appointmentFilter === "history" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setAppointmentFilter("history")}
                    className="h-7 px-3 text-xs rounded-lg"
                  >
                    <TrendingUp className="w-3 h-3 mr-1.5" />
                    History
                  </Button>
                </div>
              </>
            )}

            <Button 
              onClick={() => navigate("/#schedule")}
              size="sm"
              className="gap-1.5 h-9 rounded-xl shadow-md shadow-primary/20"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Book Session</span>
            </Button>
          </div>
        </motion.header>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden p-6">
          <AnimatePresence mode="wait">
            {activeView === "appointments" ? (
              <motion.div
                key="appointments"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-full"
              >
                {filteredAppointments.length > 0 ? (
                  <ScrollArea className="h-full pr-4">
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 pb-4">
                      {filteredAppointments.map((appointment, index) => (
                        <motion.div
                          key={appointment.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <AppointmentCard
                            appointment={appointment}
                            isPast={appointmentFilter === "history"}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </ScrollArea>
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center max-w-sm">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-secondary/50 flex items-center justify-center"
                      >
                        <Calendar className="w-10 h-10 text-muted-foreground" />
                      </motion.div>
                      <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                        No {appointmentFilter === "upcoming" ? "upcoming" : "past"} appointments
                      </h3>
                      <p className="text-sm text-muted-foreground mb-6">
                        {appointmentFilter === "upcoming"
                          ? "Start your wellness journey by booking your first session."
                          : "Your completed sessions will appear here."}
                      </p>
                      {appointmentFilter === "upcoming" && (
                        <Button onClick={() => navigate("/#schedule")} className="gap-2">
                          <Plus className="w-4 h-4" />
                          Book Your First Session
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="messages"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-full"
              >
                <MessagesPanel />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
