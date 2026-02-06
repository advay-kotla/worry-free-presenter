import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, Star, Clock, Video, Calendar, Shield, Award, 
  Heart, BookOpen, CheckCircle2, MessageSquare, Users, Sparkles,
  GraduationCap, Briefcase, Quote, ThumbsUp, MapPin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format, addDays, isSameDay } from "date-fns";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

const therapistsData = [
  {
    id: "dr-emily-chen",
    name: "Dr. Emily Chen",
    title: "Clinical Psychologist",
    specialty: "Anxiety & Depression",
    bio: "15+ years helping clients overcome anxiety and depression using CBT and mindfulness techniques.",
    fullBio: "Dr. Emily Chen is a licensed clinical psychologist with over 15 years of experience specializing in anxiety disorders, depression, and stress management. She received her Ph.D. from Stanford University and completed her residency at Massachusetts General Hospital. Dr. Chen is known for her warm, empathetic approach and her ability to create a safe space for clients to explore their thoughts and emotions. She integrates cognitive-behavioral therapy (CBT) with mindfulness-based interventions to help clients develop practical skills for managing their mental health.",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
    color: "bg-blue-500",
    rating: 4.9,
    reviews: 247,
    experience: "15+ years",
    education: [
      { degree: "Ph.D. Clinical Psychology", school: "Stanford University", year: "2008" },
      { degree: "M.A. Psychology", school: "UCLA", year: "2005" },
      { degree: "B.S. Psychology", school: "UC Berkeley", year: "2003" },
    ],
    certifications: [
      "Licensed Clinical Psychologist (CA)",
      "Certified CBT Practitioner",
      "Mindfulness-Based Stress Reduction (MBSR) Certified",
      "Trauma-Informed Care Specialist",
    ],
    specializations: ["Anxiety Disorders", "Depression", "Stress Management", "Work-Life Balance", "Perfectionism"],
    languages: ["English", "Mandarin"],
    sessionPrice: 175,
    availability: "Mon-Fri",
  },
  {
    id: "dr-michael-brooks",
    name: "Dr. Michael Brooks",
    title: "Licensed Therapist",
    specialty: "Trauma & PTSD",
    bio: "Specializes in EMDR therapy and trauma-informed care. Veteran-friendly practice.",
    fullBio: "Dr. Michael Brooks is a licensed therapist who has dedicated his career to helping individuals heal from trauma. With specialized training in EMDR (Eye Movement Desensitization and Reprocessing) and a deep commitment to veteran mental health, he brings both expertise and compassion to his practice. Dr. Brooks served as a military counselor for 8 years before transitioning to private practice, giving him unique insight into the challenges faced by service members and their families.",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
    color: "bg-purple-500",
    rating: 4.8,
    reviews: 189,
    experience: "12+ years",
    education: [
      { degree: "Psy.D. Clinical Psychology", school: "Pepperdine University", year: "2011" },
      { degree: "M.S. Counseling", school: "Johns Hopkins University", year: "2008" },
    ],
    certifications: [
      "EMDR Certified Therapist",
      "Certified Trauma Professional",
      "Military Cultural Competency Certified",
    ],
    specializations: ["PTSD", "Trauma Recovery", "Veteran Mental Health", "First Responder Support", "Grief & Loss"],
    languages: ["English", "Spanish"],
    sessionPrice: 165,
    availability: "Mon-Thu",
  },
  {
    id: "dr-sarah-johnson",
    name: "Dr. Sarah Johnson",
    title: "Counseling Psychologist",
    specialty: "Relationships & Family",
    bio: "Expert in couples therapy and family dynamics. Helps rebuild connections that matter.",
    fullBio: "Dr. Sarah Johnson is a counseling psychologist specializing in relationships, family therapy, and interpersonal dynamics. With her Gottman Method certification and extensive experience in couples counseling, she helps partners navigate challenges and strengthen their bonds. Dr. Johnson believes that healthy relationships are the foundation of mental wellness and works collaboratively with clients to improve communication, resolve conflicts, and build lasting connections.",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop&crop=face",
    color: "bg-pink-500",
    rating: 4.9,
    reviews: 312,
    experience: "18+ years",
    education: [
      { degree: "Ph.D. Counseling Psychology", school: "Columbia University", year: "2006" },
      { degree: "M.A. Marriage & Family Therapy", school: "NYU", year: "2003" },
    ],
    certifications: [
      "Gottman Method Couples Therapist",
      "Licensed Marriage & Family Therapist",
      "Emotionally Focused Therapy (EFT) Certified",
    ],
    specializations: ["Couples Therapy", "Family Dynamics", "Premarital Counseling", "Divorce Support", "Parenting"],
    languages: ["English", "French"],
    sessionPrice: 185,
    availability: "Tue-Sat",
  },
  {
    id: "dr-robert-kim",
    name: "Dr. Robert Kim",
    title: "Psychiatrist",
    specialty: "Mood Disorders",
    bio: "Board-certified psychiatrist specializing in bipolar disorder and medication management.",
    fullBio: "Dr. Robert Kim is a board-certified psychiatrist with expertise in mood disorders, including bipolar disorder, major depression, and treatment-resistant conditions. He takes an integrative approach, combining medication management with psychotherapy to provide comprehensive care. Dr. Kim is committed to staying current with the latest research and treatment options to offer his patients the most effective, evidence-based care available.",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop&crop=face",
    color: "bg-amber-500",
    rating: 4.7,
    reviews: 156,
    experience: "14+ years",
    education: [
      { degree: "M.D.", school: "Johns Hopkins School of Medicine", year: "2007" },
      { degree: "Psychiatry Residency", school: "Yale-New Haven Hospital", year: "2011" },
    ],
    certifications: [
      "Board Certified Psychiatrist",
      "American Board of Psychiatry and Neurology",
      "Medication Management Specialist",
    ],
    specializations: ["Bipolar Disorder", "Major Depression", "Medication Management", "Treatment-Resistant Depression"],
    languages: ["English", "Korean"],
    sessionPrice: 250,
    availability: "Mon-Wed, Fri",
  },
  {
    id: "dr-lisa-martinez",
    name: "Dr. Lisa Martinez",
    title: "Licensed Clinical Social Worker",
    specialty: "Stress & Burnout",
    bio: "Focuses on work-life balance, caregiver support, and preventing professional burnout.",
    fullBio: "Dr. Lisa Martinez is a licensed clinical social worker who specializes in helping professionals navigate stress, burnout, and work-life balance challenges. With her background in both corporate wellness and clinical practice, she understands the unique pressures of modern work environments. Dr. Martinez empowers clients with practical strategies for setting boundaries, managing stress, and cultivating sustainable success without sacrificing their wellbeing.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
    color: "bg-teal-500",
    rating: 4.8,
    reviews: 203,
    experience: "10+ years",
    education: [
      { degree: "Ph.D. Social Work", school: "University of Michigan", year: "2013" },
      { degree: "MSW", school: "University of Chicago", year: "2010" },
    ],
    certifications: [
      "Licensed Clinical Social Worker",
      "Certified Workplace Wellness Specialist",
      "Mindfulness-Based Cognitive Therapy Certified",
    ],
    specializations: ["Burnout Prevention", "Work-Life Balance", "Caregiver Support", "Executive Coaching", "Stress Management"],
    languages: ["English", "Spanish", "Portuguese"],
    sessionPrice: 155,
    availability: "Mon-Fri",
  },
  {
    id: "dr-james-wilson",
    name: "Dr. James Wilson",
    title: "Child & Adolescent Specialist",
    specialty: "Youth Mental Health",
    bio: "Dedicated to helping young people navigate anxiety, ADHD, and developmental challenges.",
    fullBio: "Dr. James Wilson is a child and adolescent psychologist who has spent over a decade helping young people and their families navigate mental health challenges. His approach is warm, engaging, and developmentally appropriate, making therapy accessible and even enjoyable for kids and teens. Dr. Wilson works closely with parents and schools to create comprehensive support systems for his young clients.",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face",
    color: "bg-green-500",
    rating: 4.9,
    reviews: 178,
    experience: "11+ years",
    education: [
      { degree: "Ph.D. Child Psychology", school: "University of Pennsylvania", year: "2012" },
      { degree: "M.S. Developmental Psychology", school: "Boston University", year: "2009" },
    ],
    certifications: [
      "Licensed Child Psychologist",
      "Play Therapy Certified",
      "ADHD Clinical Specialist",
    ],
    specializations: ["Child Anxiety", "ADHD", "Autism Spectrum", "School Issues", "Teen Depression"],
    languages: ["English"],
    sessionPrice: 170,
    availability: "Mon-Thu, Sat",
  },
  {
    id: "dr-amanda-patel",
    name: "Dr. Amanda Patel",
    title: "Behavioral Therapist",
    specialty: "OCD & Phobias",
    bio: "Uses exposure therapy and CBT to help clients overcome fears and compulsive behaviors.",
    fullBio: "Dr. Amanda Patel is a behavioral therapist specializing in OCD, phobias, and anxiety-related disorders. She is an expert in Exposure and Response Prevention (ERP), the gold-standard treatment for OCD, and has helped hundreds of clients reclaim their lives from intrusive thoughts and compulsive behaviors. Dr. Patel's compassionate yet evidence-based approach helps clients face their fears and build lasting confidence.",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop&crop=face",
    color: "bg-indigo-500",
    rating: 4.8,
    reviews: 134,
    experience: "9+ years",
    education: [
      { degree: "Ph.D. Behavioral Psychology", school: "University of Wisconsin", year: "2014" },
      { degree: "M.A. Clinical Psychology", school: "Northwestern University", year: "2011" },
    ],
    certifications: [
      "Licensed Clinical Psychologist",
      "ERP Certified Specialist",
      "International OCD Foundation Member",
    ],
    specializations: ["OCD", "Specific Phobias", "Social Anxiety", "Health Anxiety", "Panic Disorder"],
    languages: ["English", "Hindi"],
    sessionPrice: 165,
    availability: "Tue-Sat",
  },
  {
    id: "dr-david-nguyen",
    name: "Dr. David Nguyen",
    title: "Addiction Counselor",
    specialty: "Substance Abuse Recovery",
    bio: "Compassionate approach to addiction recovery with 12+ years of clinical experience.",
    fullBio: "Dr. David Nguyen is an addiction counselor with over 12 years of experience helping individuals and families affected by substance use disorders. His approach combines evidence-based treatments with a deep understanding of the recovery journey. Dr. Nguyen believes in treating the whole person—addressing underlying trauma, mental health conditions, and life circumstances that contribute to addiction.",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop&crop=face",
    color: "bg-rose-500",
    rating: 4.9,
    reviews: 267,
    experience: "12+ years",
    education: [
      { degree: "Psy.D. Clinical Psychology", school: "Alliant International University", year: "2011" },
      { degree: "M.S. Addiction Studies", school: "Hazelden Betty Ford Graduate School", year: "2008" },
    ],
    certifications: [
      "Licensed Addiction Counselor",
      "Certified Alcohol and Drug Counselor (CADC)",
      "Motivational Interviewing Trainer",
    ],
    specializations: ["Alcohol Addiction", "Drug Addiction", "Dual Diagnosis", "Relapse Prevention", "Family Recovery"],
    languages: ["English", "Vietnamese"],
    sessionPrice: 160,
    availability: "Daily",
  },
  {
    id: "dr-rachel-green",
    name: "Dr. Rachel Green",
    title: "Neuropsychologist",
    specialty: "ADHD & Executive Function",
    bio: "Specializes in ADHD assessment and cognitive strategies for improved focus and productivity.",
    fullBio: "Dr. Rachel Green is a neuropsychologist specializing in ADHD and executive function challenges in adults and adolescents. She conducts comprehensive assessments and develops personalized treatment plans that may include therapy, coaching, and collaboration with psychiatrists. Dr. Green is passionate about helping clients understand their unique brain wiring and develop strategies that work with their neurodivergent strengths.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
    color: "bg-cyan-500",
    rating: 4.9,
    reviews: 189,
    experience: "8+ years",
    education: [
      { degree: "Ph.D. Neuropsychology", school: "Harvard University", year: "2015" },
      { degree: "M.S. Neuroscience", school: "MIT", year: "2012" },
    ],
    certifications: [
      "Board Certified Neuropsychologist",
      "ADHD-Certified Clinical Services Provider",
      "Executive Function Coach",
    ],
    specializations: ["ADHD", "Executive Function", "Learning Disabilities", "Cognitive Assessment", "Productivity Coaching"],
    languages: ["English", "German"],
    sessionPrice: 200,
    availability: "Mon-Fri",
  },
  {
    id: "dr-marcus-johnson",
    name: "Dr. Marcus Johnson",
    title: "Grief Counselor",
    specialty: "Loss & Bereavement",
    bio: "Helping individuals and families navigate the complex journey of grief and healing.",
    fullBio: "Dr. Marcus Johnson is a grief counselor who provides compassionate support to individuals and families navigating loss. Whether coping with the death of a loved one, divorce, job loss, or other significant life changes, Dr. Johnson creates a safe, non-judgmental space for clients to process their grief. He believes that grief is a natural response to loss and that with proper support, clients can find meaning and hope.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    color: "bg-slate-500",
    rating: 4.8,
    reviews: 145,
    experience: "16+ years",
    education: [
      { degree: "Ph.D. Counseling Psychology", school: "University of Texas", year: "2007" },
      { degree: "M.Div. Pastoral Counseling", school: "Duke Divinity School", year: "2004" },
    ],
    certifications: [
      "Certified Grief Counselor",
      "Certified Thanatologist",
      "Licensed Professional Counselor",
    ],
    specializations: ["Grief & Loss", "Bereavement", "Life Transitions", "Anticipatory Grief", "Complicated Grief"],
    languages: ["English"],
    sessionPrice: 155,
    availability: "Mon-Thu",
  },
  {
    id: "dr-sophia-chen",
    name: "Dr. Sophia Chen",
    title: "Eating Disorder Specialist",
    specialty: "Eating Disorders & Body Image",
    bio: "Evidence-based treatment for eating disorders with a compassionate, holistic approach.",
    fullBio: "Dr. Sophia Chen is an eating disorder specialist who provides compassionate, evidence-based treatment for anorexia, bulimia, binge eating disorder, and other eating-related concerns. She takes a holistic approach that addresses not just eating behaviors but also the underlying emotional, psychological, and relational factors. Dr. Chen works collaboratively with dietitians and medical providers to ensure comprehensive care.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
    color: "bg-orange-500",
    rating: 4.9,
    reviews: 198,
    experience: "13+ years",
    education: [
      { degree: "Ph.D. Clinical Psychology", school: "University of Minnesota", year: "2010" },
      { degree: "Eating Disorders Fellowship", school: "Renfrew Center", year: "2011" },
    ],
    certifications: [
      "Certified Eating Disorder Specialist (CEDS)",
      "Health at Every Size (HAES) Informed",
      "Intuitive Eating Counselor",
    ],
    specializations: ["Anorexia", "Bulimia", "Binge Eating", "Body Dysmorphia", "Orthorexia"],
    languages: ["English", "Cantonese"],
    sessionPrice: 180,
    availability: "Mon-Wed, Fri-Sat",
  },
  {
    id: "dr-william-taylor",
    name: "Dr. William Taylor",
    title: "Sleep Specialist",
    specialty: "Insomnia & Sleep Disorders",
    bio: "CBT-I certified specialist helping clients achieve restorative sleep and better mental health.",
    fullBio: "Dr. William Taylor is a sleep specialist who uses Cognitive Behavioral Therapy for Insomnia (CBT-I) to help clients overcome sleep difficulties without relying on medication. He understands the profound impact that poor sleep has on mental health and works with clients to identify and address the thoughts, behaviors, and habits that interfere with restful sleep. Dr. Taylor's approach leads to lasting improvements in sleep quality and overall wellbeing.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
    color: "bg-violet-500",
    rating: 4.7,
    reviews: 112,
    experience: "7+ years",
    education: [
      { degree: "Ph.D. Behavioral Sleep Medicine", school: "University of Arizona", year: "2016" },
      { degree: "M.S. Clinical Psychology", school: "Arizona State University", year: "2013" },
    ],
    certifications: [
      "Certified Behavioral Sleep Medicine Specialist",
      "CBT-I Certified Provider",
      "Sleep Medicine Board Certified",
    ],
    specializations: ["Insomnia", "Sleep Anxiety", "Circadian Rhythm Disorders", "Nightmare Disorder", "Sleep Hygiene"],
    languages: ["English"],
    sessionPrice: 175,
    availability: "Tue-Fri",
  },
];

const patientReviews = [
  {
    id: "1",
    author: "Anonymous Patient",
    rating: 5,
    date: "2 weeks ago",
    content: "Dr. Chen has been instrumental in my journey to overcome anxiety. Her approach is both professional and deeply compassionate. I've made more progress in 3 months with her than years of previous therapy.",
    helpful: 24,
  },
  {
    id: "2",
    author: "Verified Patient",
    rating: 5,
    date: "1 month ago",
    content: "I was hesitant about starting therapy, but the welcoming environment and genuine care made all the difference. Highly recommend to anyone struggling with anxiety or depression.",
    helpful: 18,
  },
  {
    id: "3",
    author: "Anonymous Patient",
    rating: 4,
    date: "2 months ago",
    content: "Great therapist who really listens. Sometimes appointments are hard to get, but the quality of care makes up for it. The techniques I've learned have been life-changing.",
    helpful: 12,
  },
  {
    id: "4",
    author: "Verified Patient",
    rating: 5,
    date: "3 months ago",
    content: "After trying several therapists, I finally found someone who understands me. The mindfulness techniques have helped me manage my stress significantly better.",
    helpful: 31,
  },
];

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM"
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

const TherapistProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState("");
  const [activeTab, setActiveTab] = useState<"about" | "reviews" | "schedule">("about");
  const [existingAppointments, setExistingAppointments] = useState<any[]>([]);

  const therapist = therapistsData.find(t => t.id === id);

  useEffect(() => {
    fetchExistingAppointments();
  }, [id]);

  const fetchExistingAppointments = async () => {
    if (!therapist) return;
    const { data } = await supabase
      .from("appointments")
      .select("appointment_date, appointment_time")
      .eq("therapist", therapist.id)
      .gte("appointment_date", new Date().toISOString().split('T')[0]);
    
    if (data) {
      setExistingAppointments(data);
    }
  };

  if (!therapist) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Therapist not found</h1>
          <Link to="/#schedule">
            <Button>Back to Scheduling</Button>
          </Link>
        </div>
      </div>
    );
  }

  const appointmentDates = existingAppointments.map(apt => new Date(apt.appointment_date));

  const ratingBreakdown = [
    { stars: 5, percentage: 78 },
    { stars: 4, percentage: 15 },
    { stars: 3, percentage: 5 },
    { stars: 2, percentage: 1 },
    { stars: 1, percentage: 1 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-12 gradient-calm overflow-hidden">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
            className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6"
            >
              <Link to="/#schedule" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Back to All Therapists
              </Link>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Profile Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="lg:col-span-1"
              >
                <div className="bg-card rounded-3xl p-6 shadow-elevated border border-border sticky top-24">
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="relative inline-block mb-4"
                    >
                      <img
                        src={therapist.image}
                        alt={therapist.name}
                        className="w-32 h-32 rounded-full object-cover border-4 border-primary/20 mx-auto"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className={`absolute -bottom-2 -right-2 w-10 h-10 rounded-full ${therapist.color} flex items-center justify-center`}
                      >
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      </motion.div>
                    </motion.div>

                    <h1 className="text-2xl font-display font-bold text-foreground mb-1">
                      {therapist.name}
                    </h1>
                    <p className="text-primary font-medium mb-2">{therapist.title}</p>
                    <Badge className="bg-primary/10 text-primary border-0 mb-4">
                      {therapist.specialty}
                    </Badge>

                    <div className="flex items-center justify-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "w-5 h-5",
                            i < Math.floor(therapist.rating)
                                    ? "fill-warning text-warning"
                              : "text-muted-foreground/30"
                          )}
                        />
                      ))}
                      <span className="ml-2 font-semibold text-foreground">{therapist.rating}</span>
                      <span className="text-muted-foreground">({therapist.reviews} reviews)</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm mb-6">
                      <div className="bg-secondary/50 rounded-xl p-3">
                        <Briefcase className="w-5 h-5 text-primary mx-auto mb-1" />
                        <p className="font-semibold text-foreground">{therapist.experience}</p>
                        <p className="text-muted-foreground text-xs">Experience</p>
                      </div>
                      <div className="bg-secondary/50 rounded-xl p-3">
                        <Clock className="w-5 h-5 text-primary mx-auto mb-1" />
                        <p className="font-semibold text-foreground">{therapist.availability}</p>
                        <p className="text-muted-foreground text-xs">Availability</p>
                      </div>
                    </div>

                    <div className="bg-primary/5 rounded-xl p-4 mb-6">
                      <p className="text-2xl font-bold text-foreground">${therapist.sessionPrice}</p>
                      <p className="text-muted-foreground text-sm">per 50-minute session</p>
                    </div>

                    <Link to="/#schedule">
                      <Button className="w-full gap-2" size="lg">
                        <Calendar className="w-4 h-4" />
                        Book Appointment
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>

              {/* Main Content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="lg:col-span-2"
              >
                {/* Tabs */}
                <div className="flex gap-2 mb-6 bg-secondary/30 p-1 rounded-xl">
                  {[
                    { id: "about", label: "About", icon: BookOpen },
                    { id: "reviews", label: "Reviews", icon: Star },
                    { id: "schedule", label: "Availability", icon: Calendar },
                  ].map((tab) => (
                    <motion.button
                      key={tab.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={cn(
                        "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all",
                        activeTab === tab.id
                          ? "bg-card text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <tab.icon className="w-4 h-4" />
                      {tab.label}
                    </motion.button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {/* About Tab */}
                  {activeTab === "about" && (
                    <motion.div
                      key="about"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-6"
                    >
                      {/* Bio */}
                      <div className="bg-card rounded-2xl p-6 border border-border">
                        <h2 className="text-xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
                          <Quote className="w-5 h-5 text-primary" />
                          About {therapist.name.split(" ")[1]}
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                          {therapist.fullBio}
                        </p>
                      </div>

                      {/* Education */}
                      <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="bg-card rounded-2xl p-6 border border-border"
                      >
                        <h2 className="text-xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
                          <GraduationCap className="w-5 h-5 text-primary" />
                          Education
                        </h2>
                        <div className="space-y-4">
                          {therapist.education.map((edu, index) => (
                            <motion.div
                              key={index}
                              variants={itemVariants}
                              className="flex items-start gap-4"
                            >
                              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <Award className="w-5 h-5 text-primary" />
                              </div>
                              <div>
                                <p className="font-semibold text-foreground">{edu.degree}</p>
                                <p className="text-muted-foreground text-sm">{edu.school} • {edu.year}</p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>

                      {/* Certifications */}
                      <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="bg-card rounded-2xl p-6 border border-border"
                      >
                        <h2 className="text-xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
                          <Shield className="w-5 h-5 text-primary" />
                          Certifications & Licenses
                        </h2>
                        <div className="flex flex-wrap gap-2">
                          {therapist.certifications.map((cert, index) => (
                            <motion.div
                              key={index}
                              variants={itemVariants}
                              whileHover={{ scale: 1.05 }}
                            >
                              <Badge variant="secondary" className="py-2 px-3">
                                <CheckCircle2 className="w-3 h-3 mr-1 text-primary" />
                                {cert}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>

                      {/* Specializations */}
                      <div className="bg-card rounded-2xl p-6 border border-border">
                        <h2 className="text-xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
                          <Sparkles className="w-5 h-5 text-primary" />
                          Specializations
                        </h2>
                        <div className="flex flex-wrap gap-2">
                          {therapist.specializations.map((spec, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.05 }}
                              whileHover={{ scale: 1.05 }}
                            >
                              <Badge className="bg-primary/10 text-primary border-0 py-2 px-3">
                                {spec}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Languages */}
                      <div className="bg-card rounded-2xl p-6 border border-border">
                        <h2 className="text-xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
                          <MessageSquare className="w-5 h-5 text-primary" />
                          Languages Spoken
                        </h2>
                        <div className="flex flex-wrap gap-3">
                          {therapist.languages.map((lang, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-center gap-2 bg-secondary/50 rounded-full py-2 px-4"
                            >
                              <MapPin className="w-4 h-4 text-primary" />
                              <span className="font-medium text-foreground">{lang}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Reviews Tab */}
                  {activeTab === "reviews" && (
                    <motion.div
                      key="reviews"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-6"
                    >
                      {/* Rating Summary */}
                      <div className="bg-card rounded-2xl p-6 border border-border">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="text-center">
                            <motion.p
                              initial={{ scale: 0.5, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className="text-5xl font-bold text-foreground mb-2"
                            >
                              {therapist.rating}
                            </motion.p>
                            <div className="flex items-center justify-center gap-1 mb-2">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={cn(
                                    "w-5 h-5",
                                    i < Math.floor(therapist.rating)
                                      ? "fill-amber-400 text-amber-400"
                                      : "text-muted-foreground/30"
                                  )}
                                />
                              ))}
                            </div>
                            <p className="text-muted-foreground">{therapist.reviews} reviews</p>
                          </div>
                          <div className="space-y-2">
                            {ratingBreakdown.map((item) => (
                              <div key={item.stars} className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground w-4">{item.stars}</span>
                                <Star className="w-4 h-4 fill-warning text-warning" />
                                <Progress value={item.percentage} className="flex-1 h-2" />
                                <span className="text-sm text-muted-foreground w-8">{item.percentage}%</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Reviews List */}
                      <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-4"
                      >
                      {patientReviews.map((review) => (
                          <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ y: -2 }}
                            className="bg-card rounded-2xl p-6 border border-border"
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarFallback className="bg-primary/10 text-primary">
                                    {review.author[0]}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-semibold text-foreground">{review.author}</p>
                                  <p className="text-sm text-muted-foreground">{review.date}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={cn(
                                      "w-4 h-4",
                                      i < review.rating
                                        ? "fill-warning text-warning"
                                        : "text-muted-foreground/30"
                                    )}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-muted-foreground mb-4">{review.content}</p>
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                              <ThumbsUp className="w-4 h-4" />
                              Helpful ({review.helpful})
                            </motion.button>
                          </motion.div>
                        ))}
                      </motion.div>
                    </motion.div>
                  )}

                  {/* Schedule Tab */}
                  {activeTab === "schedule" && (
                    <motion.div
                      key="schedule"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-6"
                    >
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Calendar */}
                        <div className="bg-card rounded-2xl p-6 border border-border">
                          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-primary" />
                            Select Date
                          </h3>
                          <CalendarComponent
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
                          </div>
                        </div>

                        {/* Time Slots */}
                        <div className="bg-card rounded-2xl p-6 border border-border">
                          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                            <Clock className="w-5 h-5 text-primary" />
                            Available Times
                          </h3>
                          
                          {selectedDate ? (
                            <>
                              <p className="text-sm text-muted-foreground mb-4">
                                {format(selectedDate, "EEEE, MMMM d, yyyy")}
                              </p>
                              <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="grid grid-cols-3 gap-2"
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
                              <p className="text-muted-foreground text-sm">Select a date to see available times</p>
                            </div>
                          )}

                          {selectedDate && selectedTime && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="mt-6"
                            >
                              <Link to="/#schedule">
                                <Button className="w-full gap-2" size="lg">
                                  <Video className="w-4 h-4" />
                                  Book {format(selectedDate, "MMM d")} at {selectedTime}
                                </Button>
                              </Link>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default TherapistProfile;
