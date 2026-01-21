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
  ChevronRight,
  Heart,
  Plus,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format, isPast, isToday, isFuture } from "date-fns";
import AppointmentCard from "@/components/dashboard/AppointmentCard";
import MessagesPanel from "@/components/dashboard/MessagesPanel";
import DashboardStats from "@/components/dashboard/DashboardStats";
import ThemeToggle from "@/components/ThemeToggle";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("upcoming");
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

  const filteredAppointments = (activeTab === "upcoming" ? upcomingAppointments : pastAppointments)
    .filter(apt => 
      apt.therapist?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.session_type?.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 mx-auto mb-4 border-4 border-primary/30 border-t-primary rounded-full"
          />
          <p className="text-muted-foreground animate-pulse">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", damping: 20 }}
        className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left Side - Logo & Nav */}
            <div className="flex items-center gap-6">
              <Link to="/" className="flex items-center gap-2 group">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center"
                >
                  <Heart className="w-5 h-5 text-primary-foreground" />
                </motion.div>
                <span className="font-display font-bold text-lg text-foreground hidden sm:block">
                  MindfulPath
                </span>
              </Link>
              
              <nav className="hidden md:flex items-center gap-1">
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/">
                    <Home className="w-4 h-4 mr-2" />
                    Home
                  </Link>
                </Button>
              </nav>
            </div>

            {/* Right Side - User Actions */}
            <div className="flex items-center gap-2">
              <ThemeToggle />
              
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center"
                >
                  2
                </motion.span>
              </Button>
              
              <div className="h-6 w-px bg-border mx-2 hidden sm:block" />
              
              <div className="flex items-center gap-3">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium text-foreground">
                    {user?.email?.split("@")[0]}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(), "MMM d, yyyy")}
                  </p>
                </div>
                <Avatar className="h-9 w-9 ring-2 ring-primary/20 ring-offset-2 ring-offset-background">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-primary text-primary-foreground font-semibold text-sm">
                    {user?.email?.[0]?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </div>
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleSignOut}
                className="text-muted-foreground hover:text-foreground ml-2"
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      <main className="relative container mx-auto px-4 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-2 mb-2"
              >
                <Sparkles className="w-5 h-5 text-accent" />
                <span className="text-sm font-medium text-accent">Welcome back</span>
              </motion.div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
                Hello, {user?.email?.split("@")[0]}!
              </h1>
              <p className="text-muted-foreground mt-1">
                Here's what's happening with your mental wellness journey
              </p>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Button 
                onClick={() => navigate("/#schedule")}
                className="gap-2 shadow-lg shadow-primary/20"
              >
                <Plus className="w-4 h-4" />
                Book New Session
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <DashboardStats
            totalAppointments={appointments.length}
            upcomingCount={upcomingAppointments.length}
            completedCount={pastAppointments.length}
          />
        </motion.div>

        {/* Main Content Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8"
        >
          <Tabs defaultValue="appointments" className="w-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <TabsList className="bg-secondary/50 p-1.5 rounded-2xl w-fit">
                <TabsTrigger
                  value="appointments"
                  className="data-[state=active]:bg-background data-[state=active]:shadow-md rounded-xl flex items-center gap-2 px-6 py-2.5 transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span className="hidden sm:inline">Appointments</span>
                </TabsTrigger>
                <TabsTrigger
                  value="messages"
                  className="data-[state=active]:bg-background data-[state=active]:shadow-md rounded-xl flex items-center gap-2 px-6 py-2.5 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span className="hidden sm:inline">Messages</span>
                  <Badge className="bg-accent text-accent-foreground text-[10px] px-1.5 py-0 h-5">
                    3
                  </Badge>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="appointments" className="space-y-6 mt-0">
              {/* Search and Filter Bar */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between p-4 bg-card rounded-2xl border border-border"
              >
                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by therapist or session type..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-background border-0 focus-visible:ring-1 focus-visible:ring-primary"
                  />
                </div>
                
                <div className="flex gap-2 w-full sm:w-auto">
                  <Button
                    variant={activeTab === "upcoming" ? "default" : "secondary"}
                    size="sm"
                    onClick={() => setActiveTab("upcoming")}
                    className="flex-1 sm:flex-none rounded-xl"
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    Upcoming
                    <Badge variant="outline" className="ml-2 bg-background/50 border-0">
                      {upcomingAppointments.length}
                    </Badge>
                  </Button>
                  <Button
                    variant={activeTab === "history" ? "default" : "secondary"}
                    size="sm"
                    onClick={() => setActiveTab("history")}
                    className="flex-1 sm:flex-none rounded-xl"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    History
                    <Badge variant="outline" className="ml-2 bg-background/50 border-0">
                      {pastAppointments.length}
                    </Badge>
                  </Button>
                </div>
              </motion.div>

              {/* Appointments Grid */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                >
                  {filteredAppointments.length > 0 ? (
                    filteredAppointments.map((appointment) => (
                      <motion.div key={appointment.id} variants={itemVariants}>
                        <AppointmentCard
                          appointment={appointment}
                          isPast={activeTab === "history"}
                        />
                      </motion.div>
                    ))
                  ) : (
                    <motion.div
                      variants={itemVariants}
                      className="col-span-full"
                    >
                      <div className="text-center py-16 px-8 bg-card rounded-2xl border border-dashed border-border">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", delay: 0.2 }}
                          className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-secondary flex items-center justify-center"
                        >
                          <Calendar className="w-10 h-10 text-muted-foreground" />
                        </motion.div>
                        <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                          No {activeTab === "upcoming" ? "upcoming" : "past"} appointments
                        </h3>
                        <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                          {activeTab === "upcoming"
                            ? "Ready to take the next step? Schedule your first session and start your wellness journey."
                            : "Your completed sessions will appear here for easy reference."}
                        </p>
                        {activeTab === "upcoming" && (
                          <Button 
                            onClick={() => navigate("/#schedule")}
                            className="gap-2"
                          >
                            <Plus className="w-4 h-4" />
                            Book Your First Session
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </TabsContent>

            <TabsContent value="messages" className="mt-0">
              <MessagesPanel />
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
