import { MessageSquare, Users, Heart, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const features = [
  {
    icon: MessageSquare,
    title: "Discussion Forums",
    description: "Connect with others who understand what you're going through in our moderated, supportive forums.",
  },
  {
    icon: Users,
    title: "Support Groups",
    description: "Join virtual support groups led by mental health professionals for various conditions.",
  },
  {
    icon: Heart,
    title: "Peer Support",
    description: "Get matched with trained peer supporters who have lived experience with mental health.",
  },
  {
    icon: Shield,
    title: "Safe Space",
    description: "A judgment-free community with 24/7 moderation to ensure everyone feels welcome.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

const CommunitySection = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden" id="community">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-50">
        <motion.div
          animate={{ 
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            x: [0, -40, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-10 w-80 h-80 bg-hope/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4"
            >
              You're Not Alone
            </motion.span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
              Join Our Supportive Community
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed text-lg">
              Connect with thousands of individuals who understand what you're going through. 
              Share your experiences, find support, and discover that healing happens together.
            </p>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid sm:grid-cols-2 gap-4 mb-8"
            >
              {features.map((feature) => (
                <motion.div
                  key={feature.title}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, x: 4 }}
                  className="flex items-start gap-3 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-all duration-300 cursor-default"
                >
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                    className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"
                  >
                    <feature.icon className="w-5 h-5 text-primary" />
                  </motion.div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">{feature.title}</h4>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button 
                variant="hero" 
                size="lg" 
                className="group" 
                asChild
              >
                <Link 
                  to="/community"
                  onClick={() => window.scrollTo({ top: 0 })}
                >
                  Join the Community
                  <motion.span
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="ml-2"
                  >
                    <Sparkles className="w-4 h-4" />
                  </motion.span>
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-br from-primary/20 to-trust/20 rounded-3xl blur-3xl"
            />
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="relative bg-card rounded-3xl p-8 shadow-elevated border border-border"
            >
              <div className="flex items-center gap-2 mb-6">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-3 h-3 rounded-full bg-destructive"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                  className="w-3 h-3 rounded-full bg-hope"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                  className="w-3 h-3 rounded-full bg-primary"
                />
              </div>
              
              <div className="space-y-4">
                {[
                  { initials: "AM", color: "bg-serenity", message: "Just wanted to share that today marks 1 year since I started my recovery journey. Thank you all for your support! 💚", delay: 0 },
                  { initials: "SK", color: "bg-warmth", message: "That's amazing! You're an inspiration. Keep going! 🌟", delay: 0.1 },
                  { initials: "JD", color: "bg-calm", message: "Congratulations! Your story gives me hope. I'm just starting out...", delay: 0.2 },
                ].map((chat, index) => (
                  <motion.div
                    key={chat.initials}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + chat.delay }}
                    className="flex gap-3"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className={`w-10 h-10 rounded-full ${chat.color} flex items-center justify-center text-sm font-semibold`}
                    >
                      {chat.initials}
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="flex-1 bg-secondary rounded-2xl rounded-tl-sm p-4"
                    >
                      <p className="text-sm text-foreground">{chat.message}</p>
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                className="mt-6 flex items-center gap-2"
              >
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      whileHover={{ scale: 1.2, zIndex: 10 }}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-trust border-2 border-card"
                    />
                  ))}
                </div>
                <motion.span
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-sm text-muted-foreground"
                >
                  +2,847 members online
                </motion.span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
