import { Star, Quote, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sarah M.",
    story: "After years of struggling with anxiety in silence, I finally found the courage to seek help through this platform. The resources and community support changed my life. I'm now living proof that recovery is possible.",
    condition: "Anxiety Recovery",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "James L.",
    story: "Depression made me feel like I was drowning. The helpline volunteers listened without judgment and connected me with a counselor who truly understood. Today, I'm helping others find their way too.",
    condition: "Depression Recovery",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Maria G.",
    story: "The blog posts helped me understand that what I was experiencing wasn't weakness—it was PTSD. Learning about trauma changed everything. Now I'm three years into recovery and stronger than ever.",
    condition: "PTSD Recovery",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, rotateY: -10 },
  visible: {
    opacity: 1,
    y: 0,
    rotateY: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-serenity/30 relative overflow-hidden" id="stories">
      {/* Background decorations */}
      <motion.div
        animate={{ 
          rotate: [0, 360],
        }}
        transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-hope/10 rounded-full blur-3xl opacity-50"
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
            whileHover={{ scale: 1.05 }}
            className="inline-block px-4 py-1.5 bg-hope/30 text-foreground rounded-full text-sm font-medium mb-4 cursor-default"
          >
            Stories of Hope
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            Real People, Real Recovery
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            These brave individuals share their journeys to inspire hope and show that 
            healing is possible for everyone.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.name}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-card rounded-2xl p-6 shadow-soft hover:shadow-elevated transition-all duration-300 border border-border relative overflow-hidden group"
            >
              {/* Quote decoration */}
              <motion.div
                initial={{ opacity: 0.1, rotate: -10 }}
                whileHover={{ opacity: 0.2, rotate: 0, scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className="absolute top-4 right-4"
              >
                <Quote className="w-12 h-12 text-primary" />
              </motion.div>
              
              <div className="flex items-center gap-4 mb-4 relative z-10">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-primary/20"
                />
                <div>
                  <h3 className="font-semibold text-foreground">{testimonial.name}</h3>
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="text-sm text-primary font-medium"
                  >
                    {testimonial.condition}
                  </motion.span>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-4 relative z-10">
                "{testimonial.story}"
              </p>

              <motion.div
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1 }}
                className="flex gap-1"
              >
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  >
                    <Star className="w-4 h-4 fill-hope text-hope" />
                  </motion.div>
                ))}
              </motion.div>

              {/* Hover gradient */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-gradient-to-br from-primary/5 to-hope/5 pointer-events-none"
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <motion.p
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-muted-foreground italic mb-6"
          >
            "Your story isn't over yet. There is always hope."
          </motion.p>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link to="/testimonials">
              <Button variant="outline" size="lg" className="group">
                Read More Stories
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-4 h-4 ml-2" />
                </motion.span>
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
