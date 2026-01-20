import { BookOpen, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const blogPosts = [
  {
    title: "5 Daily Habits for Better Mental Health",
    excerpt: "Small changes in your daily routine can make a big difference in how you feel. Here are five evidence-based habits.",
    category: "Self-Care",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=250&fit=crop",
  },
  {
    title: "Understanding Anxiety: Signs and Coping Strategies",
    excerpt: "Learn to recognize anxiety symptoms and discover practical techniques to manage them effectively.",
    category: "Anxiety",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=400&h=250&fit=crop",
  },
  {
    title: "The Power of Talking: Why Therapy Works",
    excerpt: "Breaking down the science behind talk therapy and why opening up can lead to profound healing.",
    category: "Therapy",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=250&fit=crop",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const BlogSection = () => {
  const { toast } = useToast();

  const handleReadMore = (title: string) => {
    toast({
      title: "Article Coming Soon",
      description: `"${title}" will be available shortly. Subscribe to get notified!`,
    });
  };

  const handleViewAll = () => {
    toast({
      title: "Blog Section",
      description: "Full blog with all articles is coming soon!",
    });
  };

  return (
    <section className="py-24 gradient-calm relative overflow-hidden" id="blog">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 right-20 w-72 h-72 bg-serenity/30 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12"
        >
          <div>
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4"
            >
              Learn & Grow
            </motion.span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
              Mental Health Blog
            </h2>
            <p className="text-muted-foreground max-w-xl text-lg">
              Expert insights, personal stories, and practical tips to support your mental health journey.
            </p>
          </div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button variant="outline" className="mt-4 md:mt-0 group" onClick={handleViewAll}>
              View All Articles
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-4 h-4 ml-2" />
              </motion.span>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-3 gap-8"
        >
          {blogPosts.map((post) => (
            <motion.article
              key={post.title}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300 border border-border cursor-pointer"
              onClick={() => handleReadMore(post.title)}
            >
              <div className="relative h-48 overflow-hidden">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="absolute top-4 left-4"
                >
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium shadow-md">
                    {post.category}
                  </span>
                </motion.div>
                {/* Overlay on hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent"
                />
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </div>
                <h3 className="font-display font-semibold text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {post.excerpt}
                </p>
                <motion.span
                  className="inline-flex items-center text-primary font-medium text-sm"
                >
                  Read More
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </motion.span>
                </motion.span>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
