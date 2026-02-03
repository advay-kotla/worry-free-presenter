import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageSquare, Users, Heart, Shield, Sparkles, Search, 
  ThumbsUp, MessageCircle, Clock, User, Star, CheckCircle2,
  Flame, TrendingUp, BookOpen, Award, Calendar, ArrowRight
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

const Community = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
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
        {/* Hero Section */}
        <section className="py-16 gradient-calm relative overflow-hidden">
          <motion.div
            animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute top-10 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
            transition={{ duration: 25, repeat: Infinity }}
            className="absolute bottom-10 right-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl"
          />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <Badge className="mb-4 bg-primary/10 text-primary border-0">
                <Users className="w-3 h-3 mr-1" />
                You're Not Alone
              </Badge>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
                Welcome to Our Community
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Connect with thousands of people who understand. Share your journey, find support, and grow together.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
                {communityStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-card/80 backdrop-blur-sm rounded-2xl p-4 border border-border"
                  >
                    <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="forums" className="space-y-8">
              <TabsList className="grid w-full max-w-lg mx-auto grid-cols-3 h-12">
                <TabsTrigger value="forums" className="gap-2">
                  <MessageSquare className="w-4 h-4" />
                  <span className="hidden sm:inline">Forums</span>
                </TabsTrigger>
                <TabsTrigger value="groups" className="gap-2">
                  <Users className="w-4 h-4" />
                  <span className="hidden sm:inline">Support Groups</span>
                </TabsTrigger>
                <TabsTrigger value="peers" className="gap-2">
                  <Heart className="w-4 h-4" />
                  <span className="hidden sm:inline">Peer Support</span>
                </TabsTrigger>
              </TabsList>

              {/* Forums Tab */}
              <TabsContent value="forums" className="space-y-6">
                {/* Search & Filter */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      placeholder="Search discussions..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-12 h-12 rounded-xl"
                    />
                  </div>
                  <Button className="h-12 gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Start Discussion
                  </Button>
                </div>

                {/* Categories */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                  {forumCategories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className="rounded-full shrink-0"
                    >
                      {category}
                    </Button>
                  ))}
                </div>

                {/* Topics List */}
                <div className="space-y-4">
                  {filteredTopics.map((topic, index) => (
                    <motion.div
                      key={topic.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ x: 4 }}
                      className="bg-card rounded-2xl p-5 border border-border hover:border-primary/50 transition-all cursor-pointer group"
                    >
                      <div className="flex gap-4">
                        <Avatar className="w-12 h-12 ring-2 ring-primary/20">
                          <AvatarImage src={topic.avatar} />
                          <AvatarFallback>{topic.author[0]}</AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                {topic.pinned && (
                                  <Badge variant="secondary" className="text-xs">
                                    <Flame className="w-3 h-3 mr-1" />
                                    Trending
                                  </Badge>
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
                            <span className="flex items-center gap-1">
                              <MessageCircle className="w-3 h-3" />
                              {topic.replies} replies
                            </span>
                            <span className="flex items-center gap-1">
                              <ThumbsUp className="w-3 h-3" />
                              {topic.likes}
                            </span>
                            <span className="flex items-center gap-1 ml-auto">
                              <Clock className="w-3 h-3" />
                              {topic.lastActivity}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              {/* Support Groups Tab */}
              <TabsContent value="groups" className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                    Join a Support Group
                  </h2>
                  <p className="text-muted-foreground">
                    Virtual groups led by licensed professionals. Safe, confidential, and supportive.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {supportGroups.map((group, index) => (
                    <motion.div
                      key={group.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -4 }}
                      className="bg-card rounded-2xl p-6 border border-border hover:border-primary/50 transition-all"
                    >
                      <div className={`w-12 h-12 ${group.color} rounded-xl flex items-center justify-center mb-4`}>
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      
                      <Badge variant="outline" className="mb-3">{group.category}</Badge>
                      
                      <h3 className="font-semibold text-lg text-foreground mb-2">{group.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{group.description}</p>
                      
                      <div className="flex items-center gap-2 mb-4">
                        <img
                          src={group.facilitatorImage}
                          alt={group.facilitator}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <p className="text-xs text-muted-foreground">Facilitated by</p>
                          <p className="text-sm font-medium text-foreground">{group.facilitator}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {group.members.toLocaleString()} members
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {group.nextSession}
                        </span>
                      </div>
                      
                      <Button 
                        className="w-full" 
                        onClick={() => handleJoinGroup(group.name)}
                      >
                        Join Group
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              {/* Peer Support Tab */}
              <TabsContent value="peers" className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                    Connect with Peer Supporters
                  </h2>
                  <p className="text-muted-foreground">
                    Get matched with trained individuals who have lived experience with mental health challenges.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {peerSupporters.map((peer, index) => (
                    <motion.div
                      key={peer.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -4 }}
                      className="bg-card rounded-2xl p-6 border border-border hover:border-primary/50 transition-all"
                    >
                      <div className="flex gap-4">
                        <div className="relative">
                          <img
                            src={peer.avatar}
                            alt={peer.name}
                            className="w-20 h-20 rounded-2xl object-cover"
                          />
                          <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-card ${peer.available ? 'bg-green-500' : 'bg-muted'}`} />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-lg text-foreground">{peer.name}</h3>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                              <span className="font-medium text-foreground">{peer.rating}</span>
                              <span className="text-sm text-muted-foreground">({peer.reviews})</span>
                            </div>
                          </div>
                          
                          <Badge variant="secondary" className="mt-1">{peer.specialty}</Badge>
                          
                          <p className="text-sm text-muted-foreground mt-2">{peer.bio}</p>
                          
                          <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                            <Award className="w-4 h-4 text-primary" />
                            {peer.experience}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex gap-2">
                        <Button 
                          className="flex-1" 
                          disabled={!peer.available}
                          onClick={() => handleConnectPeer(peer.name)}
                        >
                          {peer.available ? 'Connect Now' : 'Currently Unavailable'}
                        </Button>
                        <Button variant="outline" size="icon">
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* How It Works */}
                <div className="mt-12 bg-secondary/50 rounded-3xl p-8">
                  <h3 className="text-xl font-display font-bold text-foreground text-center mb-8">
                    How Peer Support Works
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    {[
                      { step: "1", title: "Browse Supporters", desc: "Find someone whose experience resonates with yours" },
                      { step: "2", title: "Send a Request", desc: "Reach out and share a bit about what you're going through" },
                      { step: "3", title: "Start Connecting", desc: "Meet via chat or video in a safe, supportive space" },
                    ].map((item) => (
                      <div key={item.step} className="text-center">
                        <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                          {item.step}
                        </div>
                        <h4 className="font-semibold text-foreground mb-2">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Safety Notice */}
        <section className="py-12 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-display font-bold text-foreground mb-2">
                Your Safety is Our Priority
              </h3>
              <p className="text-muted-foreground mb-4">
                Our community is moderated 24/7 by trained professionals. We maintain strict guidelines to ensure 
                everyone feels safe and respected. If you're in crisis, please reach out to our crisis helpline immediately.
              </p>
              <Button variant="outline" className="gap-2">
                View Community Guidelines
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Community;
