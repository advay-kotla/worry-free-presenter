import { Phone, Heart, MessageCircle, Users, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const resources = [
  {
    name: "National Suicide Prevention Lifeline",
    phone: "988",
    phoneLink: "tel:988",
    description: "Free, confidential support 24/7",
    icon: Phone,
    color: "from-primary to-trust",
  },
  {
    name: "Crisis Text Line",
    phone: "Text HOME to 741741",
    phoneLink: "sms:741741?body=HOME",
    description: "Text-based crisis support",
    icon: MessageCircle,
    color: "from-trust to-primary",
  },
  {
    name: "SAMHSA National Helpline",
    phone: "1-800-662-4357",
    phoneLink: "tel:1-800-662-4357",
    description: "Treatment referral service",
    icon: Heart,
    color: "from-accent to-hope",
  },
  {
    name: "NAMI Helpline",
    phone: "1-800-950-6264",
    phoneLink: "tel:1-800-950-6264",
    description: "Mental health support & resources",
    icon: Users,
    color: "from-hope to-primary",
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

const cardVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const HelplineSection = () => {
  return (
    <section className="py-24 bg-warmth/50 relative overflow-hidden" id="resources">
      {/* Background elements */}
      <motion.div
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute -top-20 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-2xl"
      />
      <motion.div
        animate={{ 
          rotate: [360, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-20 -left-20 w-96 h-96 bg-hope/10 rounded-full blur-2xl"
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
            className="inline-block px-4 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4 cursor-default"
          >
            Get Help Now
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            Crisis Resources & Helplines
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            If you or someone you know is in crisis, please reach out. Help is available 24/7, 
            and you don't have to face this alone.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
        >
          {resources.map((resource) => (
            <motion.a
              key={resource.name}
              href={resource.phoneLink}
              variants={cardVariants}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="bg-card rounded-2xl p-6 shadow-soft hover:shadow-elevated transition-all duration-300 border border-border group cursor-pointer block relative overflow-hidden"
            >
              {/* Gradient border effect on hover */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className={`absolute inset-0 bg-gradient-to-r ${resource.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              />

              <div className="flex items-start gap-4 relative z-10">
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${resource.color} flex items-center justify-center shadow-md`}
                >
                  <resource.icon className="w-6 h-6 text-white" />
                </motion.div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{resource.name}</h3>
                    <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <motion.p
                    whileHover={{ scale: 1.02 }}
                    className="text-primary font-bold text-lg mb-1 group-hover:underline"
                  >
                    {resource.phone}
                  </motion.p>
                  <p className="text-muted-foreground text-sm">{resource.description}</p>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <motion.a
            href="tel:911"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block bg-destructive/10 border border-destructive/20 rounded-xl px-6 py-4 hover:bg-destructive/20 transition-colors cursor-pointer"
          >
            <p className="text-destructive font-medium flex items-center gap-2 justify-center">
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                ⚠️
              </motion.span>
              If you're in immediate danger, please call <strong className="underline">911</strong> or go to your nearest emergency room.
            </p>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default HelplineSection;
