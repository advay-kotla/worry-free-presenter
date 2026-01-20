import { Brain, Heart, Cloud, Zap } from "lucide-react";
import { motion } from "framer-motion";

const disorders = [
  {
    title: "Anxiety Disorders",
    description: "Persistent worry, fear, or nervousness that interferes with daily activities. Includes generalized anxiety, panic disorder, and phobias.",
    icon: Zap,
    color: "bg-serenity",
    gradient: "from-serenity to-serenity/50",
    stats: "40M+ adults affected in the US",
  },
  {
    title: "Depression",
    description: "A mood disorder causing persistent feelings of sadness, hopelessness, and loss of interest in activities once enjoyed.",
    icon: Cloud,
    color: "bg-calm",
    gradient: "from-calm to-calm/50",
    stats: "21M+ adults affected annually",
  },
  {
    title: "PTSD",
    description: "Post-traumatic stress disorder develops after experiencing or witnessing traumatic events, causing flashbacks and severe anxiety.",
    icon: Brain,
    color: "bg-warmth",
    gradient: "from-warmth to-warmth/50",
    stats: "12M+ adults have PTSD yearly",
  },
  {
    title: "Bipolar Disorder",
    description: "Characterized by extreme mood swings including emotional highs (mania) and lows (depression) affecting energy and judgment.",
    icon: Heart,
    color: "bg-hope/50",
    gradient: "from-hope/50 to-hope/30",
    stats: "7M+ adults affected in the US",
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
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

const DisordersSection = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden" id="disorders">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-hope/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4"
          >
            Understanding Mental Health
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            Common Mental Health Conditions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Mental health conditions are more common than you might think. Learning about them 
            is the first step toward understanding and healing.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {disorders.map((disorder) => (
            <motion.div
              key={disorder.title}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group bg-card rounded-2xl p-6 shadow-soft hover:shadow-elevated transition-all duration-300 border border-border relative overflow-hidden"
            >
              {/* Gradient overlay on hover */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className={`absolute inset-0 bg-gradient-to-br ${disorder.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              />

              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`w-14 h-14 rounded-2xl ${disorder.color} flex items-center justify-center mb-4 relative z-10`}
              >
                <disorder.icon className="w-7 h-7 text-foreground" />
              </motion.div>

              <h3 className="font-display font-semibold text-xl text-foreground mb-2 relative z-10">
                {disorder.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed relative z-10">
                {disorder.description}
              </p>
              <div className="pt-4 border-t border-border relative z-10">
                <motion.p
                  initial={{ opacity: 0.7 }}
                  whileHover={{ opacity: 1 }}
                  className="text-xs text-primary font-medium"
                >
                  {disorder.stats}
                </motion.p>
              </div>
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
          <p className="text-muted-foreground">
            Remember: Mental health conditions are treatable, and recovery is possible. 
            <motion.span
              initial={{ opacity: 0.8 }}
              whileHover={{ opacity: 1 }}
              className="text-primary font-medium"
            >
              {" "}You are not alone.
            </motion.span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default DisordersSection;
