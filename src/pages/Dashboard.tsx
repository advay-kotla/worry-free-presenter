import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  Search, 
  Plus,
  TrendingUp,
  LayoutDashboard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { isPast, isToday, isFuture } from "date-fns";

// Dashboard Components
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import AppointmentCard from "@/components/dashboard/AppointmentCard";
import MessagesPanel from "@/components/dashboard/MessagesPanel";
import MoodTracker from "@/components/dashboard/MoodTracker";
import DailyCheckin from "@/components/dashboard/DailyCheckin";
import WellnessGoals from "@/components/dashboard/WellnessGoals";
import QuickActions from "@/components/dashboard/QuickActions";
import ProgressView from "@/components/dashboard/ProgressView";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState<string>("overview");
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

  const getViewTitle = () => {
    switch (activeView) {
      case "overview": return "Dashboard Overview";
      case "appointments": return "Your Appointments";
      case "messages": return "Messages";
      case "progress": return "Progress & Analytics";
      default: return "Dashboard";
    }
  };

  const getViewSubtitle = () => {
    switch (activeView) {
      case "overview": return "Welcome back! Here's your wellness snapshot";
      case "appointments": return `${upcomingAppointments.length} upcoming · ${pastAppointments.length} completed`;
      case "messages": return "3 unread conversations";
      case "progress": return "Track your wellness journey";
      default: return "";
    }
  };

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
      <DashboardSidebar
        user={user}
        activeView={activeView}
        setActiveView={setActiveView}
        appointmentsCount={appointments.length}
        wellnessScore={wellnessScore}
        onSignOut={handleSignOut}
      />

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
              {getViewTitle()}
            </h1>
            <p className="text-xs text-muted-foreground">
              {getViewSubtitle()}
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
        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            {activeView === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="h-full"
              >
                <ScrollArea className="h-full">
                  <div className="p-6 space-y-6">
                    {/* Top Row - Welcome + Quick Actions */}
                    <div className="grid lg:grid-cols-3 gap-6">
                      {/* Left Column - Mood & Check-in */}
                      <div className="lg:col-span-2 space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <MoodTracker />
                          <DailyCheckin />
                        </div>
                        
                        {/* Upcoming Appointments Preview */}
                        <div className="rounded-2xl bg-card border border-border p-5">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                                <Calendar className="w-5 h-5 text-primary" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-foreground text-sm">Upcoming Sessions</h3>
                                <p className="text-xs text-muted-foreground">{upcomingAppointments.length} scheduled</p>
                              </div>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => setActiveView("appointments")}
                              className="text-xs"
                            >
                              View All
                            </Button>
                          </div>
                          
                          {upcomingAppointments.length > 0 ? (
                            <div className="grid sm:grid-cols-2 gap-4">
                              {upcomingAppointments.slice(0, 2).map((appointment) => (
                                <AppointmentCard key={appointment.id} appointment={appointment} />
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-8">
                              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-secondary/50 flex items-center justify-center">
                                <Calendar className="w-6 h-6 text-muted-foreground" />
                              </div>
                              <p className="text-sm text-muted-foreground mb-3">No upcoming appointments</p>
                              <Button size="sm" onClick={() => navigate("/#schedule")}>
                                <Plus className="w-4 h-4 mr-1.5" />
                                Book a Session
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right Column - Goals & Actions */}
                      <div className="space-y-6">
                        <QuickActions />
                      </div>
                    </div>

                    {/* Bottom Row - Wellness Goals */}
                    <div className="grid lg:grid-cols-2 gap-6">
                      <WellnessGoals />
                    </div>
                  </div>
                </ScrollArea>
              </motion.div>
            )}

            {activeView === "appointments" && (
              <motion.div
                key="appointments"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-full p-6"
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
            )}

            {activeView === "messages" && (
              <motion.div
                key="messages"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-full p-6"
              >
                <MessagesPanel />
              </motion.div>
            )}

            {activeView === "progress" && (
              <motion.div
                key="progress"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-full"
              >
                <ScrollArea className="h-full">
                  <div className="p-6">
                    <ProgressView />
                  </div>
                </ScrollArea>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
