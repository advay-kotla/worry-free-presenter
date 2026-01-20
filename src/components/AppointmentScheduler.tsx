import { Calendar, Clock, Video, Shield, User, Mail, Phone, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const therapists = [
  {
    id: "dr-emily-chen",
    name: "Dr. Emily Chen",
    title: "Clinical Psychologist",
    specialty: "Anxiety & Depression",
    bio: "15+ years helping clients overcome anxiety and depression using CBT and mindfulness techniques.",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "dr-michael-brooks",
    name: "Dr. Michael Brooks",
    title: "Licensed Therapist",
    specialty: "Trauma & PTSD",
    bio: "Specializes in EMDR therapy and trauma-informed care. Veteran-friendly practice.",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "dr-sarah-johnson",
    name: "Dr. Sarah Johnson",
    title: "Counseling Psychologist",
    specialty: "Relationships & Family",
    bio: "Expert in couples therapy and family dynamics. Helps rebuild connections that matter.",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "dr-robert-kim",
    name: "Dr. Robert Kim",
    title: "Psychiatrist",
    specialty: "Mood Disorders",
    bio: "Board-certified psychiatrist specializing in bipolar disorder and medication management.",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: "dr-lisa-martinez",
    name: "Dr. Lisa Martinez",
    title: "Licensed Clinical Social Worker",
    specialty: "Stress & Burnout",
    bio: "Focuses on work-life balance, caregiver support, and preventing professional burnout.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
};

const AppointmentScheduler = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedTherapist, setSelectedTherapist] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"
  ];

  const sessionTypes = [
    { id: "individual", name: "Individual Counseling", duration: "50 min", icon: Video },
    { id: "group", name: "Group Support Session", duration: "90 min", icon: Shield },
  ];

  const handleBookAppointment = async () => {
    if (!name || !email || !selectedDate || !selectedTime || !selectedType || !selectedTherapist) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields including your preferred therapist.",
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
        appointment_date: selectedDate,
        appointment_time: selectedTime,
        therapist: selectedTherapist,
      });

      if (error) throw error;

      const therapist = therapists.find(t => t.id === selectedTherapist);
      toast({
        title: "Appointment Booked! ✓",
        description: `Your session with ${therapist?.name} is scheduled for ${selectedDate} at ${selectedTime}. We'll send a confirmation to ${email}.`,
      });

      // Reset form
      setName("");
      setEmail("");
      setPhone("");
      setSelectedDate("");
      setSelectedTime("");
      setSelectedType("");
      setSelectedTherapist("");
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

  const isFormValid = name && email && selectedDate && selectedTime && selectedType && selectedTherapist;

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
        className="absolute -bottom-40 -left-40 w-80 h-80 bg-hope/10 rounded-full blur-3xl"
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
            className="inline-block px-4 py-1.5 bg-trust/20 text-trust rounded-full text-sm font-medium mb-4"
          >
            Take The First Step
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            Schedule a Counseling Session
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Connect with licensed mental health professionals from the comfort of your home. 
            All sessions are confidential and secure.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-5xl mx-auto bg-card rounded-3xl shadow-elevated p-8 border border-border"
        >
          {/* Contact Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-4 mb-8"
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
                className="w-full p-3 rounded-xl border-2 border-border bg-background text-foreground focus:border-primary focus:outline-none transition-all duration-300 focus:shadow-md"
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
                className="w-full p-3 rounded-xl border-2 border-border bg-background text-foreground focus:border-primary focus:outline-none transition-all duration-300 focus:shadow-md"
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
                className="w-full p-3 rounded-xl border-2 border-border bg-background text-foreground focus:border-primary focus:outline-none transition-all duration-300 focus:shadow-md"
              />
            </motion.div>
          </motion.div>

          {/* Therapist Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Choose Your Therapist *
            </h3>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {therapists.map((therapist) => (
                <motion.button
                  key={therapist.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedTherapist(therapist.id)}
                  className={`p-4 rounded-xl border-2 text-left transition-all duration-300 relative overflow-hidden ${
                    selectedTherapist === therapist.id
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  {selectedTherapist === therapist.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-2 right-2"
                    >
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                    </motion.div>
                  )}
                  <div className="flex items-start gap-3">
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      src={therapist.image}
                      alt={therapist.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-primary/20 flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-semibold text-foreground text-sm truncate">{therapist.name}</p>
                      <p className="text-xs text-primary font-medium">{therapist.specialty}</p>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{therapist.bio}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Session Type Selection */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Video className="w-5 h-5 text-primary" />
                Choose Session Type *
              </h3>
              <div className="space-y-3">
                {sessionTypes.map((type) => (
                  <motion.button
                    key={type.id}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedType(type.id)}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                      selectedType === type.id
                        ? "border-primary bg-primary/5 shadow-md"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <motion.div
                        animate={selectedType === type.id ? { rotate: [0, 10, -10, 0] } : {}}
                        transition={{ duration: 0.5 }}
                      >
                        <type.icon className={`w-5 h-5 transition-colors ${selectedType === type.id ? "text-primary" : "text-muted-foreground"}`} />
                      </motion.div>
                      <div>
                        <p className="font-medium text-foreground">{type.name}</p>
                        <p className="text-sm text-muted-foreground">{type.duration}</p>
                      </div>
                      {selectedType === type.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="ml-auto"
                        >
                          <CheckCircle2 className="w-5 h-5 text-primary" />
                        </motion.div>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Date Selection */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Select Date *
              </h3>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full p-4 rounded-xl border-2 border-border bg-background text-foreground focus:border-primary focus:outline-none transition-all duration-300 focus:shadow-md"
              />

              <h3 className="font-semibold text-foreground mt-6 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Select Time *
              </h3>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-3 gap-2"
              >
                {timeSlots.map((time) => (
                  <motion.button
                    key={time}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedTime(time)}
                    className={`p-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                      selectedTime === time
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-secondary text-secondary-foreground hover:bg-primary/20"
                    }`}
                  >
                    {time}
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-8 pt-6 border-t border-border"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="flex items-center gap-2 text-muted-foreground text-sm"
              >
                <Shield className="w-4 h-4 text-primary" />
                <span>Your privacy is protected. All sessions are HIPAA compliant.</span>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  variant="hero" 
                  size="lg" 
                  disabled={!isFormValid || isSubmitting}
                  onClick={handleBookAppointment}
                  className="relative overflow-hidden"
                >
                  {isSubmitting ? (
                    <motion.span
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      Booking...
                    </motion.span>
                  ) : (
                    "Book Appointment"
                  )}
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AppointmentScheduler;
