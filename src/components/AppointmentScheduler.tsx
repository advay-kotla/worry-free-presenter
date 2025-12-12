import { Calendar, Clock, Video, Shield, User, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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

  return (
    <section className="py-20 gradient-calm" id="schedule">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-trust/20 text-trust rounded-full text-sm font-medium mb-4">
            Take The First Step
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Schedule a Counseling Session
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Connect with licensed mental health professionals from the comfort of your home. 
            All sessions are confidential and secure.
          </p>
        </div>

        <div className="max-w-5xl mx-auto bg-card rounded-3xl shadow-elevated p-8 border border-border">
          {/* Contact Info */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                Full Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full p-3 rounded-xl border-2 border-border bg-background text-foreground focus:border-primary focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                Email *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full p-3 rounded-xl border-2 border-border bg-background text-foreground focus:border-primary focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                Phone (optional)
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(555) 123-4567"
                className="w-full p-3 rounded-xl border-2 border-border bg-background text-foreground focus:border-primary focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Therapist Selection */}
          <div className="mb-8">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Choose Your Therapist *
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {therapists.map((therapist) => (
                <button
                  key={therapist.id}
                  onClick={() => setSelectedTherapist(therapist.id)}
                  className={`p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                    selectedTherapist === therapist.id
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <img
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
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Session Type Selection */}
            <div>
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Video className="w-5 h-5 text-primary" />
                Choose Session Type *
              </h3>
              <div className="space-y-3">
                {sessionTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                      selectedType === type.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <type.icon className={`w-5 h-5 ${selectedType === type.id ? "text-primary" : "text-muted-foreground"}`} />
                      <div>
                        <p className="font-medium text-foreground">{type.name}</p>
                        <p className="text-sm text-muted-foreground">{type.duration}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Date Selection */}
            <div>
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Select Date *
              </h3>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full p-4 rounded-xl border-2 border-border bg-background text-foreground focus:border-primary focus:outline-none transition-colors"
              />

              <h3 className="font-semibold text-foreground mt-6 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Select Time *
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`p-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                      selectedTime === time
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-primary/20"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-border">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Shield className="w-4 h-4 text-primary" />
                <span>Your privacy is protected. All sessions are HIPAA compliant.</span>
              </div>
              <Button 
                variant="hero" 
                size="lg" 
                disabled={!name || !email || !selectedDate || !selectedTime || !selectedType || !selectedTherapist || isSubmitting}
                onClick={handleBookAppointment}
              >
                {isSubmitting ? "Booking..." : "Book Appointment"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentScheduler;
