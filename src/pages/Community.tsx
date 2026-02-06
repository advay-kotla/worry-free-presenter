import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageSquare, Users, Heart, Shield, Sparkles, Search, 
  ThumbsUp, MessageCircle, Clock, User, Star, CheckCircle2,
  Flame, TrendingUp, BookOpen, Award, Calendar, ArrowRight, Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const forumTopics = [
  {
    id: "1",
    title: "How do you manage anxiety at work?",
    author: "AnxiousButHopeful",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    category: "Anxiety",
    replies: 47,
    likes: 89,
    views: 234,
    lastActivity: "2 hours ago",
    pinned: true,
    excerpt: "I've been struggling with anxiety during meetings. Does anyone have tips for staying calm when presenting?",
  },
  {
    id: "2",
    title: "One year sober today! 🎉",
    author: "NewBeginnings",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    category: "Recovery",
    replies: 156,
    likes: 412,
    views: 890,
    lastActivity: "45 min ago",
    pinned: true,
    excerpt: "I wanted to share my journey and thank this community for the incredible support.",
  },
  {
    id: "3",
    title: "Meditation techniques that actually work",
    author: "MindfulMama",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    category: "Mindfulness",
    replies: 34,
    likes: 67,
    views: 189,
    lastActivity: "1 hour ago",
    excerpt: "After trying dozens of apps and techniques, here's what finally clicked for me...",
  },
  {
    id: "4",
    title: "Supporting a partner with depression",
    author: "LovingPartner",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    category: "Relationships",
    replies: 28,
    likes: 45,
    views: 156,
    lastActivity: "3 hours ago",
    excerpt: "My partner was recently diagnosed and I want to be there for them. Any advice?",
  },
  {
    id: "5",
    title: "Starting therapy for the first time - what to expect?",
    author: "CuriousMind",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    category: "Therapy",
    replies: 52,
    likes: 78,
    views: 267,
    lastActivity: "30 min ago",
    excerpt: "I finally booked my first appointment. I'm nervous but excited. What should I know?",
  },
  {
    id: "6",
    title: "Daily gratitude practice - share yours!",
    author: "GratefulHeart",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    category: "Self-Care",
    replies: 89,
    likes: 134,
    views: 345,
    lastActivity: "15 min ago",
    excerpt: "Let's create a thread where we share three things we're grateful for each day!",
  },
];

const supportGroups = [
  {
    id: "1",
    name: "Anxiety Support Circle",
    description: "A safe space to discuss anxiety and share coping strategies",
    members: 1247,
    nextSession: "Tomorrow, 7:00 PM",
    facilitator: "Dr. Emily Chen",
    facilitatorImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face",
    category: "Anxiety",
    color: "bg-blue-500",
  },
  {
    id: "2",
    name: "Depression Recovery Group",
    description: "Supporting each other through the journey of healing from depression",
    members: 892,
    nextSession: "Wed, 6:30 PM",
    facilitator: "Dr. Michael Brooks",
    facilitatorImage: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face",
    category: "Depression",
    color: "bg-purple-500",
  },
  {
    id: "3",
    name: "Grief & Loss Support",
    description: "Finding strength together while processing grief and loss",
    members: 654,
    nextSession: "Thu, 5:00 PM",
    facilitator: "Dr. Sarah Johnson",
    facilitatorImage: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&h=100&fit=crop&crop=face",
    category: "Grief",
    color: "bg-indigo-500",
  },
  {
    id: "4",
    name: "Addiction Recovery Network",
    description: "Peer support for those in recovery from substance use",
    members: 1089,
    nextSession: "Daily, 8:00 AM",
    facilitator: "Dr. David Nguyen",
    facilitatorImage: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=100&h=100&fit=crop&crop=face",
    category: "Recovery",
    color: "bg-rose-500",
  },
  {
    id: "5",
    name: "Mindfulness & Meditation",
    description: "Learn and practice mindfulness techniques together",
    members: 2156,
    nextSession: "Fri, 7:30 AM",
    facilitator: "Dr. Lisa Martinez",
    facilitatorImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face",
    category: "Wellness",
    color: "bg-teal-500",
  },
  {
    id: "6",
    name: "Young Adults (18-25)",
    description: "A space for young adults navigating mental health challenges",
    members: 1567,
    nextSession: "Sat, 4:00 PM",
    facilitator: "Dr. James Wilson",
    facilitatorImage: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=100&h=100&fit=crop&crop=face",
    category: "Youth",
    color: "bg-amber-500",
  },
];

const peerSupporters = [
  {
    id: "1",
    name: "Alex Thompson",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    specialty: "Anxiety & Panic",
    experience: "5 years in recovery",
    rating: 4.9,
    reviews: 127,
    bio: "I've walked the path of anxiety recovery and now help others find their way.",
    available: true,
  },
  {
    id: "2",
    name: "Maria Garcia",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    specialty: "Depression",
    experience: "7 years supporting others",
    rating: 4.8,
    reviews: 203,
    bio: "Depression doesn't define you. I'm here to remind you of your strength.",
    available: true,
  },
  {
    id: "3",
    name: "Jordan Lee",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    specialty: "LGBTQ+ Support",
    experience: "4 years peer counseling",
    rating: 5.0,
    reviews: 89,
    bio: "Creating affirming spaces for the LGBTQ+ community to heal and thrive.",
    available: false,
  },
  {
    id: "4",
    name: "Sam Williams",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    specialty: "Addiction Recovery",
    experience: "8 years sober",
    rating: 4.9,
    reviews: 156,
    bio: "Recovery is possible. I'm living proof and here to support your journey.",
    available: true,
  },
];

const communityStats = [
  { label: "Active Members", value: "12,847", icon: Users, color: "text-primary" },
  { label: "Support Groups", value: "24", icon: Heart, color: "text-pink-500" },
  { label: "Daily Posts", value: "340+", icon: MessageSquare, color: "text-blue-500" },
  { label: "Peer Supporters", value: "156", icon: Shield, color: "text-amber-500" },
];

const forumCategories = ["All", "Anxiety", "Depression", "Recovery", "Mindfulness", "Relationships", "Therapy", "Self-Care"];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" as const } 
  },
};

const floatVariants = {
  animate: {
    y: [0, -8, 0],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" as const },
  },
};

const pulseVariants = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.7, 1, 0.7],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" as const },
  },
};

const Community = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("forums");
  const { toast } = useToast();

  const filteredTopics = forumTopics.filter(topic => {
    const matchesCategory = selectedCategory === "All" || topic.category === selectedCategory;
    const matchesSearch = topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         topic.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleJoinGroup = (groupName: string) => {
    toast({
      title: "Request Sent! 🎉",
      description: `Your request to join "${groupName}" has been sent. You'll receive an email with details shortly.`,
    });
  };

  const handleConnectPeer = (peerName: string) => {
    toast({
      title: "Connection Request Sent! 💚",
      description: `We've notified ${peerName}. They'll reach out within 24 hours.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section with enhanced animations */}
        <section className="py-16 gradient-calm relative overflow-hidden">
          {/* Animated background elements */}
          <motion.div
            animate={{ x: [0, 30, 0], y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute top-10 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ x: [0, -40, 0], y: [0, 30, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 25, repeat: Infinity }}
            className="absolute bottom-10 right-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl"
          />
          
          {/* Floating hearts */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 100 }}
              animate={{ 
                opacity: [0, 0.6, 0],
                y: [-20, -150, -250],
                x: [0, Math.sin(i) * 30, 0],
              }}
              transition={{ 
                duration: 4 + i, 
                repeat: Infinity, 
                delay: i * 0.8,
                ease: "easeOut" as const
              }}
              className="absolute"
              style={{ left: `${15 + i * 15}%`, bottom: "20%" }}
            >
              <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
            </motion.div>
          ))}
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              >
                <Badge className="mb-4 bg-primary/10 text-primary border-0 py-2 px-4">
                  <motion.span variants={pulseVariants} animate="animate">
                    <Users className="w-4 h-4 mr-2 inline" />
                  </motion.span>
                  You're Not Alone
                </Badge>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-4"
              >
                Welcome to Our{" "}
                <motion.span
                  animate={{ 
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto]"
                >
                  Community
                </motion.span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg text-muted-foreground mb-8"
              >
                Connect with thousands of people who understand. Share your journey, find support, and grow together.
              </motion.p>
              
              {/* Stats with staggered animation */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
              >
                {communityStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-card/80 backdrop-blur-sm rounded-2xl p-4 border border-border shadow-soft hover:shadow-elevated transition-all cursor-default"
                  >
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 4, repeat: Infinity, delay: index * 0.2 }}
                    >
                      <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
                    </motion.div>
                    <motion.p
                      initial={{ scale: 0.5 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                      className="text-2xl font-bold text-foreground"
                    >
                      {stat.value}
                    </motion.p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Main Content with animated tabs */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <TabsList className="grid w-full max-w-lg mx-auto grid-cols-3 h-14 p-1 bg-secondary/50 rounded-2xl">
                  {[
                    { value: "forums", icon: MessageSquare, label: "Forums" },
                    { value: "groups", icon: Users, label: "Support Groups" },
                    { value: "peers", icon: Heart, label: "Peer Support" },
                  ].map((tab) => (
                    <TabsTrigger
                      key={tab.value}
                      value={tab.value}
                      className="gap-2 rounded-xl data-[state=active]:shadow-md transition-all"
                    >
                      <motion.span
                        animate={activeTab === tab.value ? { rotate: [0, 10, -10, 0] } : {}}
                        transition={{ duration: 0.5 }}
                      >
                        <tab.icon className="w-4 h-4" />
                      </motion.span>
                      <span className="hidden sm:inline">{tab.label}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </motion.div>

              {/* Forums Tab */}
              <TabsContent value="forums" className="space-y-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key="forums"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Search & Filter */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative flex-1"
                      >
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          placeholder="Search discussions..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-12 h-12 rounded-xl"
                        />
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button className="h-12 gap-2">
                          <Sparkles className="w-4 h-4" />
                          Start Discussion
                        </Button>
                      </motion.div>
                    </div>

                    {/* Categories with animation */}
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      className="flex items-center gap-2 overflow-x-auto pb-2"
                    >
                      {forumCategories.map((category) => (
                        <motion.div key={category} variants={itemVariants}>
                          <Button
                            variant={selectedCategory === category ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedCategory(category)}
                            className="rounded-full shrink-0"
                          >
                            {category}
                          </Button>
                        </motion.div>
                      ))}
                    </motion.div>

                    {/* Topics List with staggered animation */}
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      className="space-y-4"
                    >
                      {filteredTopics.map((topic, index) => (
                        <motion.div
                          key={topic.id}
                          variants={itemVariants}
                          whileHover={{ x: 8, transition: { duration: 0.2 } }}
                          className="bg-card rounded-2xl p-5 border border-border hover:border-primary/50 hover:shadow-elevated transition-all cursor-pointer group"
                        >
                          <div className="flex gap-4">
                            <motion.div whileHover={{ scale: 1.1 }}>
                              <Avatar className="w-12 h-12 ring-2 ring-primary/20 group-hover:ring-primary/50 transition-all">
                                <AvatarImage src={topic.avatar} />
                                <AvatarFallback>{topic.author[0]}</AvatarFallback>
                              </Avatar>
                            </motion.div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    {topic.pinned && (
                                      <motion.div
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                      >
                                        <Badge variant="secondary" className="text-xs bg-orange-500/10 text-orange-500 border-orange-500/20">
                                          <Flame className="w-3 h-3 mr-1" />
                                          Trending
                                        </Badge>
                                      </motion.div>
                                    )}
                                    <Badge variant="outline" className="text-xs">
                                      {topic.category}
                                    </Badge>
                                  </div>
                                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                                    {topic.title}
                                  </h3>
                                </div>
                              </div>
                              
                              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                                {topic.excerpt}
                              </p>
                              
                              <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <User className="w-3 h-3" />
                                  {topic.author}
                                </span>
                                <motion.span
                                  whileHover={{ scale: 1.1 }}
                                  className="flex items-center gap-1"
                                >
                                  <MessageCircle className="w-3 h-3" />
                                  {topic.replies} replies
                                </motion.span>
                                <motion.span
                                  whileHover={{ scale: 1.1 }}
                                  className="flex items-center gap-1"
                                >
                                  <ThumbsUp className="w-3 h-3" />
                                  {topic.likes}
                                </motion.span>
                                <span className="flex items-center gap-1 ml-auto">
                                  <Clock className="w-3 h-3" />
                                  {topic.lastActivity}
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </TabsContent>

              {/* Support Groups Tab */}
              <TabsContent value="groups" className="space-y-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key="groups"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center mb-8"
                    >
                      <motion.div
                        variants={floatVariants}
                        animate="animate"
                        className="inline-block"
                      >
                        <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                      </motion.div>
                      <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                        Join a Support Group
                      </h2>
                      <p className="text-muted-foreground">
                        Virtual groups led by licensed professionals. Safe, confidential, and supportive.
                      </p>
                    </motion.div>

                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                      {supportGroups.map((group, index) => (
                        <motion.div
                          key={group.id}
                          variants={itemVariants}
                          whileHover={{ y: -8, transition: { duration: 0.2 } }}
                          className="bg-card rounded-2xl p-6 border border-border hover:border-primary/50 hover:shadow-elevated transition-all group"
                        >
                          <div className="flex items-start gap-3 mb-4">
                            <motion.div
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.5 }}
                              className={`w-12 h-12 rounded-xl ${group.color} flex items-center justify-center`}
                            >
                              <Users className="w-6 h-6 text-white" />
                            </motion.div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                {group.name}
                              </h3>
                              <Badge variant="outline" className="text-xs mt-1">
                                {group.category}
                              </Badge>
                            </div>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-4">
                            {group.description}
                          </p>
                          
                          <div className="flex items-center gap-3 mb-4 p-3 bg-secondary/50 rounded-xl">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={group.facilitatorImage} />
                              <AvatarFallback>{group.facilitator[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-xs text-muted-foreground">Facilitated by</p>
                              <p className="text-sm font-medium text-foreground">{group.facilitator}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between text-sm mb-4">
                            <motion.span
                              animate={{ opacity: [0.5, 1, 0.5] }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="flex items-center gap-1 text-muted-foreground"
                            >
                              <Users className="w-4 h-4" />
                              {group.members.toLocaleString()} members
                            </motion.span>
                            <span className="flex items-center gap-1 text-primary font-medium">
                              <Calendar className="w-4 h-4" />
                              {group.nextSession}
                            </span>
                          </div>
                          
                          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Button
                              onClick={() => handleJoinGroup(group.name)}
                              className="w-full gap-2"
                            >
                              <Zap className="w-4 h-4" />
                              Join Group
                            </Button>
                          </motion.div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </TabsContent>

              {/* Peer Support Tab */}
              <TabsContent value="peers" className="space-y-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key="peers"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center mb-8"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="inline-block"
                      >
                        <Heart className="w-12 h-12 text-pink-500 mx-auto mb-4" />
                      </motion.div>
                      <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                        Connect with Peer Supporters
                      </h2>
                      <p className="text-muted-foreground">
                        Trained peer supporters with lived experience who understand your journey.
                      </p>
                    </motion.div>

                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      className="grid md:grid-cols-2 gap-6"
                    >
                      {peerSupporters.map((peer, index) => (
                        <motion.div
                          key={peer.id}
                          variants={itemVariants}
                          whileHover={{ y: -8, transition: { duration: 0.2 } }}
                          className="bg-card rounded-2xl p-6 border border-border hover:border-primary/50 hover:shadow-elevated transition-all group"
                        >
                          <div className="flex gap-4">
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              className="relative"
                            >
                              <Avatar className="w-16 h-16 ring-2 ring-primary/20 group-hover:ring-primary/50 transition-all">
                                <AvatarImage src={peer.avatar} />
                                <AvatarFallback>{peer.name[0]}</AvatarFallback>
                              </Avatar>
                              {peer.available && (
                                <motion.div
                                  animate={{ scale: [1, 1.3, 1] }}
                                  transition={{ duration: 1.5, repeat: Infinity }}
                                  className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-card"
                                />
                              )}
                            </motion.div>
                            
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                    {peer.name}
                                  </h3>
                                  <p className="text-sm text-primary font-medium">{peer.specialty}</p>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Star className="w-4 h-4 fill-warning text-warning" />
                                  <span className="font-medium text-foreground">{peer.rating}</span>
                                </div>
                              </div>
                              
                              <p className="text-xs text-muted-foreground mt-1">{peer.experience}</p>
                              <p className="text-sm text-muted-foreground mt-2">{peer.bio}</p>
                              
                              <div className="flex items-center justify-between mt-4">
                                <span className="text-xs text-muted-foreground">
                                  {peer.reviews} reviews
                                </span>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                  <Button
                                    size="sm"
                                    variant={peer.available ? "default" : "outline"}
                                    disabled={!peer.available}
                                    onClick={() => handleConnectPeer(peer.name)}
                                    className="gap-1"
                                  >
                                    {peer.available ? (
                                      <>
                                        <MessageSquare className="w-3 h-3" />
                                        Connect
                                      </>
                                    ) : (
                                      "Unavailable"
                                    )}
                                  </Button>
                                </motion.div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 relative overflow-hidden">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
            className="absolute -top-20 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl"
          />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto"
            >
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
              </motion.div>
              <h2 className="text-3xl font-display font-bold text-foreground mb-4">
                Ready to Start Your Healing Journey?
              </h2>
              <p className="text-muted-foreground mb-8">
                Our community is here to support you every step of the way. Join thousands who have found hope and connection.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" className="gap-2">
                  <Heart className="w-5 h-5" />
                  Join Our Community
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Community;
