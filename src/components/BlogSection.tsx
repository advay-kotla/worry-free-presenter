import { BookOpen, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

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
    <section className="py-20 gradient-calm" id="blog">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Learn & Grow
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Mental Health Blog
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Expert insights, personal stories, and practical tips to support your mental health journey.
            </p>
          </div>
          <Button variant="outline" className="mt-4 md:mt-0" onClick={handleViewAll}>
            View All Articles
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <article
              key={post.title}
              className="group bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300 border border-border cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => handleReadMore(post.title)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                    {post.category}
                  </span>
                </div>
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
                <span className="inline-flex items-center text-primary font-medium text-sm">
                  Read More
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
