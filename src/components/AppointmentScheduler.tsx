import { Calendar as CalendarIcon, Clock, Video, Shield, User, Mail, Phone, CheckCircle2, Sparkles, Users, Heart, Brain, Smile, Leaf, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar } from "@/components/ui/calendar";
import { format, isSameDay } from "date-fns";
import { cn } from "@/lib/utils";

const therapists = [
  {
    id: "dr-emily-chen",
    name: "Dr. Emily Chen",
    title: "Clinical Psychologist",
    specialty: "Anxiety & Depression",
    bio: "15+ years helping clients overcome anxiety and depression using CBT and mindfulness techniques.",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
    color: "bg-blue-500",
    icon: Brain,
    rating: 4.9,
    reviews: 247,
  },
  {
    id: "dr-michael-brooks",
    name: "Dr. Michael Brooks",
    title: "Licensed Therapist",
    specialty: "Trauma & PTSD",
    bio: "Specializes in EMDR therapy and trauma-informed care. Veteran-friendly practice.",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
    color: "bg-purple-500",
    icon: Shield,
    rating: 4.8,
    reviews: 189,
  },
  {
    id: "dr-sarah-johnson",
    name: "Dr. Sarah Johnson",
    title: "Counseling Psychologist",
    specialty: "Relationships & Family",
    bio: "Expert in couples therapy and family dynamics. Helps rebuild connections that matter.",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=150&h=150&fit=crop&crop=face",
    color: "bg-pink-500",
    icon: Heart,
    rating: 4.9,
    reviews: 312,
  },
  {
    id: "dr-robert-kim",
    name: "Dr. Robert Kim",
    title: "Psychiatrist",
    specialty: "Mood Disorders",
    bio: "Board-certified psychiatrist specializing in bipolar disorder and medication management.",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&h=150&fit=crop&crop=face",
    color: "bg-amber-500",
    icon: Sparkles,
    rating: 4.7,
    reviews: 156,
  },
  {
    id: "dr-lisa-martinez",
    name: "Dr. Lisa Martinez",
    title: "Licensed Clinical Social Worker",
    specialty: "Stress & Burnout",
    bio: "Focuses on work-life balance, caregiver support, and preventing professional burnout.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
    color: "bg-teal-500",
    icon: Leaf,
    rating: 4.8,
    reviews: 203,
  },
  {
    id: "dr-james-wilson",
    name: "Dr. James Wilson",
    title: "Child & Adolescent Specialist",
    specialty: "Youth Mental Health",
    bio: "Dedicated to helping young people navigate anxiety, ADHD, and developmental challenges.",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face",
    color: "bg-green-500",
    icon: Smile,
    rating: 4.9,
    reviews: 178,
  },
  {
    id: "dr-amanda-patel",
    name: "Dr. Amanda Patel",
    title: "Behavioral Therapist",
    specialty: "OCD & Phobias",
    bio: "Uses exposure therapy and CBT to help clients overcome fears and compulsive behaviors.",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=150&h=150&fit=crop&crop=face",
    color: "bg-indigo-500",
    icon: Brain,
    rating: 4.8,
    reviews: 134,
  },
  {
    id: "dr-david-nguyen",
    name: "Dr. David Nguyen",
    title: "Addiction Counselor",
    specialty: "Substance Abuse Recovery",
    bio: "Compassionate approach to addiction recovery with 12+ years of clinical experience.",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&h=150&fit=crop&crop=face",
    color: "bg-rose-500",
    icon: Heart,
    rating: 4.9,
    reviews: 267,
  },
  {
    id: "dr-rachel-green",
    name: "Dr. Rachel Green",
    title: "Neuropsychologist",
    specialty: "ADHD & Executive Function",
    bio: "Specializes in ADHD assessment and cognitive strategies for improved focus and productivity.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
    color: "bg-cyan-500",
    icon: Brain,
    rating: 4.9,
    reviews: 189,
  },
  {
    id: "dr-marcus-johnson",
    name: "Dr. Marcus Johnson",
    title: "Grief Counselor",
    specialty: "Loss & Bereavement",
    bio: "Helping individuals and families navigate the complex journey of grief and healing.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    color: "bg-slate-500",
    icon: Heart,
    rating: 4.8,
    reviews: 145,
  },
  {
    id: "dr-sophia-chen",
    name: "Dr. Sophia Chen",
    title: "Eating Disorder Specialist",
    specialty: "Eating Disorders & Body Image",
    bio: "Evidence-based treatment for eating disorders with a compassionate, holistic approach.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    color: "bg-orange-500",
    icon: Heart,
    rating: 4.9,
    reviews: 198,
  },
  {
    id: "dr-william-taylor",
    name: "Dr. William Taylor",
    title: "Sleep Specialist",
    specialty: "Insomnia & Sleep Disorders",
    bio: "CBT-I certified specialist helping clients achieve restorative sleep and better mental health.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
    color: "bg-violet-500",
    icon: Sparkles,
    rating: 4.7,
    reviews: 112,
  },
];

const sessionTypes = [
  { id: "individual", name: "Individual Counseling", duration: "50 min", icon: Video, description: "One-on-one private session" },
  { id: "couples", name: "Couples Therapy", duration: "75 min", icon: Users, description: "Session for partners" },
  { id: "group", name: "Group Support Session", duration: "90 min", icon: Shield, description: "Guided group therapy" },
];

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM"
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.03, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.25, ease: "easeOut" as const },
  },
};

const AppointmentScheduler = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedTherapist, setSelectedTherapist] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  const [existingAppointments, setExistingAppointments] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchExistingAppointments();
  }, []);

  const fetchExistingAppointments = async () => {
    const { data } = await supabase
      .from("appointments")
      .select("appointment_date, appointment_time")
      .gte("appointment_date", new Date().toISOString().split('T')[0]);
    
    if (data) {
      setExistingAppointments(data);
    }
  };

  const getDatesWithAppointments = () => {
    return existingAppointments.map(apt => new Date(apt.appointment_date));
  };

  const handleBookAppointment = async () => {
    if (!name || !email || !selectedDate || !selectedTime || !selectedType || !selectedTherapist) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("appointments").insert({
        name,
        email,
        phone,
        session_type: selectedType,
        appointment_date: format(selectedDate, "yyyy-MM-dd"),
        appointment_time: selectedTime,
        therapist: selectedTherapist,
      });

      if (error) throw error;

      const therapist = therapists.find(t => t.id === selectedTherapist);
      toast({
        title: "Appointment Booked! ✓",
        description: `Your session with ${therapist?.name} is scheduled for ${format(selectedDate, "MMMM d, yyyy")} at ${selectedTime}.`,
      });

      // Reset form
      setName("");
      setEmail("");
      setPhone("");
      setSelectedDate(undefined);
      setSelectedTime("");
      setSelectedType("");
      setSelectedTherapist("");
      setStep(1);
      fetchExistingAppointments();
    } catch (error) {
      console.error("Error booking appointment:", error);
      toast({
        title: "Booking Failed",
        description: "There was an error booking your appointment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceedToStep2 = selectedTherapist && selectedType;
  const canProceedToStep3 = selectedDate && selectedTime;
  const isFormValid = name && email && selectedDate && selectedTime && selectedType && selectedTherapist;

  const appointmentDates = getDatesWithAppointments();

  return (
    <section className="py-24 gradient-calm relative overflow-hidden" id="schedule">
      {/* Background decorations */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4"
          >
            <Sparkles className="w-4 h-4" />
            Take The First Step
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            Schedule a Counseling Session
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Connect with our licensed mental health professionals. All sessions are confidential and secure.
          </p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-8"
        >
          <div className="flex items-center justify-between">
            {[
              { num: 1, label: "Choose Provider" },
              { num: 2, label: "Select Date & Time" },
              { num: 3, label: "Your Details" },
            ].map((s, idx) => (
              <div key={s.num} className="flex items-center">
                <motion.button
                  onClick={() => {
                    if (s.num === 1) setStep(1);
                    else if (s.num === 2 && canProceedToStep2) setStep(2);
                    else if (s.num === 3 && canProceedToStep2 && canProceedToStep3) setStep(3);
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full transition-all",
                    step >= s.num
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground"
                  )}
                >
                  <span className="w-6 h-6 rounded-full bg-background/20 flex items-center justify-center text-sm font-bold">
                    {step > s.num ? <CheckCircle2 className="w-4 h-4" /> : s.num}
                  </span>
                  <span className="hidden sm:inline text-sm font-medium">{s.label}</span>
                </motion.button>
                {idx < 2 && (
                  <div className={cn(
                    "w-8 sm:w-16 h-0.5 mx-2",
                    step > s.num ? "bg-primary" : "bg-border"
                  )} />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-6xl mx-auto bg-card rounded-3xl shadow-elevated p-6 md:p-8 border border-border"
        >
          <AnimatePresence mode="wait">
            {/* Step 1: Therapist & Session Type */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Session Type Selection */}
                <div className="mb-8">
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Video className="w-5 h-5 text-primary" />
                    Choose Session Type
                  </h3>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {sessionTypes.map((type) => (
                      <motion.button
                        key={type.id}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedType(type.id)}
                        className={cn(
                          "p-4 rounded-xl border-2 text-left transition-all duration-300 relative",
                          selectedType === type.id
                            ? "border-primary bg-primary/5 shadow-md"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        {selectedType === type.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-3 right-3"
                          >
                            <CheckCircle2 className="w-5 h-5 text-primary" />
                          </motion.div>
                        )}
                        <type.icon className={cn(
                          "w-8 h-8 mb-3 transition-colors",
                          selectedType === type.id ? "text-primary" : "text-muted-foreground"
                        )} />
                        <p className="font-semibold text-foreground">{type.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">{type.description}</p>
                        <p className="text-xs text-primary font-medium mt-2">{type.duration}</p>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Therapist Selection */}
                <div>
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" />
                    Choose Your Therapist
                  </h3>
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
                  >
                    {therapists.map((therapist) => (
                      <motion.button
                        key={therapist.id}
                        variants={itemVariants}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedTherapist(therapist.id)}
                        className={cn(
                          "p-4 rounded-xl border-2 text-left transition-all duration-300 relative overflow-hidden group",
                          selectedTherapist === therapist.id
                            ? "border-primary bg-primary/5 shadow-md"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        {selectedTherapist === therapist.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-2 right-2 z-10"
                          >
                            <CheckCircle2 className="w-5 h-5 text-primary" />
                          </motion.div>
                        )}
                        <div className="flex flex-col items-center text-center">
                          <div className="relative mb-3">
                            <img
                              src={therapist.image}
                              alt={therapist.name}
                              className="w-16 h-16 rounded-full object-cover border-2 border-primary/20 group-hover:border-primary transition-colors"
                            />
                            <div className={cn(
                              "absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center",
                              therapist.color
                            )}>
                              <therapist.icon className="w-3 h-3 text-white" />
                            </div>
                          </div>
                          <p className="font-semibold text-foreground text-sm">{therapist.name}</p>
                          <p className="text-xs text-primary font-medium">{therapist.specialty}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            <span className="text-xs font-medium text-foreground">{therapist.rating}</span>
                            <span className="text-[10px] text-muted-foreground">({therapist.reviews})</span>
                          </div>
                          <p className="text-[11px] text-muted-foreground mt-2 line-clamp-2">{therapist.bio}</p>
                        </div>
                      </motion.button>
                    ))}
                  </motion.div>
                </div>

                <div className="mt-8 flex justify-end">
                  <Button
                    onClick={() => setStep(2)}
                    disabled={!canProceedToStep2}
                    className="gap-2"
                  >
                    Continue
                    <CheckCircle2 className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Date & Time */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Calendar */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <CalendarIcon className="w-5 h-5 text-primary" />
                      Select Date
                    </h3>
                    <div className="bg-secondary/30 rounded-2xl p-4 border border-border">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                        className="pointer-events-auto w-full"
                        modifiers={{
                          hasAppointment: appointmentDates,
                        }}
                        modifiersStyles={{
                          hasAppointment: {
                            backgroundColor: "hsl(var(--accent))",
                            color: "hsl(var(--accent-foreground))",
                            fontWeight: "bold",
                          },
                        }}
                      />
                      <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded bg-accent" />
                          <span>Has appointments</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded bg-primary" />
                          <span>Selected</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" />
                      Select Time
                    </h3>
                    
                    {selectedDate ? (
                      <>
                        <p className="text-sm text-muted-foreground mb-4">
                          Available times for <span className="font-medium text-foreground">{format(selectedDate, "EEEE, MMMM d, yyyy")}</span>
                        </p>
                        <motion.div
                          variants={containerVariants}
                          initial="hidden"
                          animate="visible"
                          className="grid grid-cols-3 sm:grid-cols-4 gap-2"
                        >
                          {timeSlots.map((time) => {
                            const isBooked = existingAppointments.some(
                              apt => isSameDay(new Date(apt.appointment_date), selectedDate) && apt.appointment_time === time
                            );
                            return (
                              <motion.button
                                key={time}
                                variants={itemVariants}
                                whileHover={!isBooked ? { scale: 1.05 } : {}}
                                whileTap={!isBooked ? { scale: 0.95 } : {}}
                                onClick={() => !isBooked && setSelectedTime(time)}
                                disabled={isBooked}
                                className={cn(
                                  "p-3 rounded-xl text-sm font-medium transition-all duration-300",
                                  isBooked
                                    ? "bg-muted text-muted-foreground cursor-not-allowed line-through"
                                    : selectedTime === time
                                    ? "bg-primary text-primary-foreground shadow-md"
                                    : "bg-secondary text-secondary-foreground hover:bg-primary/20"
                                )}
                              >
                                {time}
                              </motion.button>
                            );
                          })}
                        </motion.div>
                      </>
                    ) : (
                      <div className="h-48 flex items-center justify-center bg-secondary/30 rounded-2xl border border-dashed border-border">
                        <p className="text-muted-foreground text-sm">Please select a date first</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-8 flex justify-between">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button
                    onClick={() => setStep(3)}
                    disabled={!canProceedToStep3}
                    className="gap-2"
                  >
                    Continue
                    <CheckCircle2 className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Contact Info */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Summary */}
                <div className="mb-8 p-4 bg-primary/5 rounded-2xl border border-primary/20">
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    Appointment Summary
                  </h4>
                  <div className="grid sm:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Therapist</p>
                      <p className="font-medium text-foreground">
                        {therapists.find(t => t.id === selectedTherapist)?.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Date & Time</p>
                      <p className="font-medium text-foreground">
                        {selectedDate && format(selectedDate, "MMM d, yyyy")} at {selectedTime}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Session Type</p>
                      <p className="font-medium text-foreground">
                        {sessionTypes.find(t => t.id === selectedType)?.name}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid md:grid-cols-3 gap-4"
                >
                  <motion.div variants={itemVariants}>
                    <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                      <User className="w-4 h-4 text-primary" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="w-full p-3 rounded-xl border-2 border-border bg-background text-foreground focus:border-primary focus:outline-none transition-all duration-300"
                    />
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-primary" />
                      Email *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full p-3 rounded-xl border-2 border-border bg-background text-foreground focus:border-primary focus:outline-none transition-all duration-300"
                    />
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-primary" />
                      Phone (optional)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(555) 123-4567"
                      className="w-full p-3 rounded-xl border-2 border-border bg-background text-foreground focus:border-primary focus:outline-none transition-all duration-300"
                    />
                  </motion.div>
                </motion.div>

                <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Shield className="w-4 h-4 text-primary" />
                    <span>Your privacy is protected. All sessions are HIPAA compliant.</span>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setStep(2)}>
                      Back
                    </Button>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        disabled={!isFormValid || isSubmitting}
                        onClick={handleBookAppointment}
                        className="gap-2"
                      >
                        {isSubmitting ? (
                          <motion.span
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          >
                            Booking...
                          </motion.span>
                        ) : (
                          <>
                            <CheckCircle2 className="w-4 h-4" />
                            Confirm Booking
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default AppointmentScheduler;
