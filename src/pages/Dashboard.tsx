import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MessageCircle, Clock, User, LogOut, Home, Bell, Search, Filter, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format, isPast, isToday, isFuture } from "date-fns";
import AppointmentCard from "@/components/dashboard/AppointmentCard";
import MessagesPanel from "@/components/dashboard/MessagesPanel";
import DashboardStats from "@/components/dashboard/DashboardStats";

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
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border"
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/")}
                className="hover:bg-secondary"
              >
                <Home className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="font-display text-xl font-semibold text-foreground">
                  Welcome back, {user?.email?.split("@")[0]}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(), "EEEE, MMMM d, yyyy")}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center">
                  2
                </span>
              </Button>
              <Avatar className="h-10 w-10 border-2 border-primary/20">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary text-primary-foreground font-medium">
                  {user?.email?.[0]?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      <main className="container mx-auto px-4 py-8">
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
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-8 bg-secondary/50 p-1 rounded-xl">
              <TabsTrigger
                value="appointments"
                className="data-[state=active]:bg-background data-[state=active]:shadow-soft rounded-lg flex items-center gap-2 py-3"
              >
                <Calendar className="w-4 h-4" />
                Appointments
              </TabsTrigger>
              <TabsTrigger
                value="messages"
                className="data-[state=active]:bg-background data-[state=active]:shadow-soft rounded-lg flex items-center gap-2 py-3"
              >
                <MessageCircle className="w-4 h-4" />
                Messages
                <Badge variant="secondary" className="ml-1 bg-accent text-accent-foreground text-xs">
                  3
                </Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="appointments" className="space-y-6">
              {/* Search and Filter Bar */}
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search appointments..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-background border-border focus:border-primary"
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant={activeTab === "upcoming" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveTab("upcoming")}
                    className="rounded-full"
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    Upcoming ({upcomingAppointments.length})
                  </Button>
                  <Button
                    variant={activeTab === "history" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveTab("history")}
                    className="rounded-full"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    History ({pastAppointments.length})
                  </Button>
                </div>
              </div>

              {/* Appointments Grid */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
                >
                  {filteredAppointments.length > 0 ? (
                    filteredAppointments.map((appointment, index) => (
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
                      className="col-span-full text-center py-16"
                    >
                      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
                        <Calendar className="w-10 h-10 text-muted-foreground" />
                      </div>
                      <h3 className="font-display text-xl text-foreground mb-2">
                        No {activeTab === "upcoming" ? "upcoming" : "past"} appointments
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        {activeTab === "upcoming"
                          ? "Schedule your first session to start your journey"
                          : "Your appointment history will appear here"}
                      </p>
                      {activeTab === "upcoming" && (
                        <Button onClick={() => navigate("/#schedule")}>
                          Book Appointment
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                      )}
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </TabsContent>

            <TabsContent value="messages">
              <MessagesPanel />
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
