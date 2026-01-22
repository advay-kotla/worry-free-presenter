import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Clock, ArrowRight, ArrowLeft, Search, Tag, User, Calendar, Heart, Share2, Bookmark, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const blogPosts = [
  {
    id: "1",
    title: "5 Daily Habits for Better Mental Health",
    excerpt: "Small changes in your daily routine can make a big difference in how you feel. Here are five evidence-based habits that can transform your mental wellbeing.",
    content: `
      <p>Mental health isn't just about avoiding illness—it's about thriving. Here are five science-backed habits that can help you feel better every day.</p>
      
      <h2>1. Start Your Day with Intention</h2>
      <p>Before checking your phone, take 5 minutes to set an intention for the day. This simple practice activates your prefrontal cortex and helps you approach challenges with greater clarity.</p>
      
      <h2>2. Move Your Body</h2>
      <p>Exercise releases endorphins and reduces cortisol. Even a 20-minute walk can significantly improve your mood and reduce anxiety symptoms.</p>
      
      <h2>3. Practice Gratitude</h2>
      <p>Write down three things you're grateful for each day. Research shows this rewires your brain to notice positive experiences more readily.</p>
      
      <h2>4. Connect with Others</h2>
      <p>Social connection is a fundamental human need. Schedule regular check-ins with friends and family, even if it's just a quick text.</p>
      
      <h2>5. Prioritize Sleep</h2>
      <p>Quality sleep is essential for emotional regulation. Aim for 7-9 hours and maintain a consistent sleep schedule.</p>
    `,
    category: "Self-Care",
    author: "Dr. Emily Chen",
    authorImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face",
    date: "Jan 15, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=500&fit=crop",
    featured: true,
  },
  {
    id: "2",
    title: "Understanding Anxiety: Signs and Coping Strategies",
    excerpt: "Learn to recognize anxiety symptoms and discover practical techniques to manage them effectively in your daily life.",
    content: `
      <p>Anxiety is one of the most common mental health concerns, affecting millions of people worldwide. Understanding it is the first step toward managing it.</p>
      
      <h2>Recognizing the Signs</h2>
      <p>Anxiety can manifest physically (racing heart, sweating, muscle tension) and mentally (racing thoughts, worry, difficulty concentrating). Pay attention to these signals.</p>
      
      <h2>Grounding Techniques</h2>
      <p>When anxiety strikes, try the 5-4-3-2-1 technique: identify 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste.</p>
      
      <h2>Breathing Exercises</h2>
      <p>Box breathing (4 seconds in, hold 4, out 4, hold 4) activates your parasympathetic nervous system and helps calm the body's stress response.</p>
      
      <h2>When to Seek Help</h2>
      <p>If anxiety is interfering with your daily life, relationships, or work, it's time to reach out to a mental health professional.</p>
    `,
    category: "Anxiety",
    author: "Dr. Michael Brooks",
    authorImage: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face",
    date: "Jan 12, 2026",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&h=500&fit=crop",
    featured: false,
  },
  {
    id: "3",
    title: "The Power of Talking: Why Therapy Works",
    excerpt: "Breaking down the science behind talk therapy and why opening up can lead to profound healing and personal growth.",
    content: `
      <p>For centuries, humans have understood the healing power of conversation. Modern neuroscience is now revealing exactly why therapy is so effective.</p>
      
      <h2>Rewiring the Brain</h2>
      <p>Talk therapy literally changes your brain structure. Through neuroplasticity, new neural pathways form as you process experiences and develop healthier thought patterns.</p>
      
      <h2>The Therapeutic Relationship</h2>
      <p>The connection between therapist and client is one of the strongest predictors of successful outcomes. Feeling heard and understood is itself healing.</p>
      
      <h2>Processing Emotions</h2>
      <p>Verbalizing emotions helps regulate them. When you put feelings into words, activity in the amygdala (your brain's alarm system) decreases.</p>
    `,
    category: "Therapy",
    author: "Dr. Sarah Johnson",
    authorImage: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&h=100&fit=crop&crop=face",
    date: "Jan 10, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=500&fit=crop",
    featured: false,
  },
  {
    id: "4",
    title: "Mindfulness Meditation: A Beginner's Guide",
    excerpt: "Discover how just 10 minutes of daily meditation can reduce stress, improve focus, and enhance overall wellbeing.",
    category: "Mindfulness",
    author: "Dr. Lisa Martinez",
    authorImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face",
    date: "Jan 8, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=800&h=500&fit=crop",
    content: `<p>Mindfulness meditation is a practice that trains your attention and awareness...</p>`,
    featured: false,
  },
  {
    id: "5",
    title: "Breaking the Stigma: Men and Mental Health",
    excerpt: "Exploring why men often struggle to seek help and how we can create a more supportive environment for everyone.",
    category: "Awareness",
    author: "Dr. Robert Kim",
    authorImage: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=100&h=100&fit=crop&crop=face",
    date: "Jan 5, 2026",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=500&fit=crop",
    content: `<p>Men are significantly less likely to seek mental health support than women...</p>`,
    featured: false,
  },
  {
    id: "6",
    title: "Sleep and Mental Health: The Hidden Connection",
    excerpt: "Why quality sleep is essential for emotional regulation and how to improve your sleep hygiene.",
    category: "Wellness",
    author: "Dr. Amanda Patel",
    authorImage: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=100&h=100&fit=crop&crop=face",
    date: "Jan 3, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&h=500&fit=crop",
    content: `<p>Sleep and mental health are intimately connected...</p>`,
    featured: false,
  },
];

const categories = ["All", "Self-Care", "Anxiety", "Therapy", "Mindfulness", "Awareness", "Wellness"];

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<typeof blogPosts[0] | null>(null);

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts.find(post => post.featured);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 gradient-calm relative overflow-hidden">
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute top-10 right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
          />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <Badge className="mb-4 bg-primary/10 text-primary border-0">
                <BookOpen className="w-3 h-3 mr-1" />
                Mental Health Blog
              </Badge>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
                Insights for Your Wellness Journey
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Expert articles, personal stories, and practical tips to support your mental health.
              </p>
              
              {/* Search */}
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 rounded-full border-border/50 bg-background/80 backdrop-blur-sm"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-6 border-b border-border sticky top-16 bg-background/95 backdrop-blur-sm z-30">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((category) => (
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
          </div>
        </section>

        {/* Featured Post */}
        {selectedCategory === "All" && !searchQuery && featuredPost && (
          <section className="py-12">
            <div className="container mx-auto px-4">
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4 }}
                onClick={() => setSelectedArticle(featuredPost)}
                className="relative rounded-3xl overflow-hidden cursor-pointer group"
              >
                <div className="aspect-[21/9] relative">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  
                  <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                    <Badge className="w-fit mb-4 bg-primary text-primary-foreground">
                      Featured
                    </Badge>
                    <h2 className="text-2xl md:text-4xl font-display font-bold text-white mb-4 max-w-2xl">
                      {featuredPost.title}
                    </h2>
                    <p className="text-white/80 max-w-xl mb-4 hidden md:block">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-white/70 text-sm">
                      <div className="flex items-center gap-2">
                        <img src={featuredPost.authorImage} alt="" className="w-8 h-8 rounded-full" />
                        <span>{featuredPost.author}</span>
                      </div>
                      <span>•</span>
                      <span>{featuredPost.readTime}</span>
                    </div>
                  </div>
                </div>
              </motion.article>
            </div>
          </section>
        )}

        {/* Blog Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.filter(p => !p.featured || selectedCategory !== "All" || searchQuery).map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  onClick={() => setSelectedArticle(post)}
                  className="bg-card rounded-2xl overflow-hidden border border-border group cursor-pointer"
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <Badge className="absolute top-4 left-4 bg-background/90 text-foreground backdrop-blur-sm">
                      {post.category}
                    </Badge>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </div>
                    </div>
                    
                    <h3 className="font-display font-semibold text-xl text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img src={post.authorImage} alt="" className="w-8 h-8 rounded-full" />
                        <span className="text-sm font-medium text-foreground">{post.author}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="text-primary">
                        Read <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-16">
                <BookOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No articles found</h3>
                <p className="text-muted-foreground">Try adjusting your search or category filter.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Article Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 overflow-y-auto"
          >
            <div className="min-h-screen py-8 px-4">
              <div className="max-w-3xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-8">
                    <Button variant="ghost" onClick={() => setSelectedArticle(null)} className="gap-2">
                      <ArrowLeft className="w-4 h-4" />
                      Back to Blog
                    </Button>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Bookmark className="w-5 h-5" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Share2 className="w-5 h-5" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => setSelectedArticle(null)}>
                        <X className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>

                  {/* Article Content */}
                  <article className="bg-card rounded-3xl overflow-hidden border border-border">
                    <div className="aspect-video">
                      <img
                        src={selectedArticle.image}
                        alt={selectedArticle.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="p-8 md:p-12">
                      <Badge className="mb-4">{selectedArticle.category}</Badge>
                      
                      <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                        {selectedArticle.title}
                      </h1>
                      
                      <div className="flex items-center gap-4 mb-8 pb-8 border-b border-border">
                        <img src={selectedArticle.authorImage} alt="" className="w-12 h-12 rounded-full" />
                        <div>
                          <p className="font-medium text-foreground">{selectedArticle.author}</p>
                          <p className="text-sm text-muted-foreground">
                            {selectedArticle.date} • {selectedArticle.readTime}
                          </p>
                        </div>
                      </div>
                      
                      <div 
                        className="prose prose-lg dark:prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
                      />
                      
                      <div className="mt-8 pt-8 border-t border-border">
                        <div className="flex items-center justify-between">
                          <Button variant="ghost" className="gap-2 text-muted-foreground">
                            <Heart className="w-5 h-5" />
                            Like this article
                          </Button>
                          <Link to="/#schedule">
                            <Button className="gap-2">
                              Book a Session
                              <ArrowRight className="w-4 h-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Blog;
