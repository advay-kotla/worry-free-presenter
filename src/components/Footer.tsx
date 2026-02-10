import { Heart, Mail, Phone, MapPin, ArrowUp } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-foreground text-background py-16 relative">
      {/* Back to top button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.1, y: -4 }}
        whileTap={{ scale: 0.9 }}
        onClick={scrollToTop}
        className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5 text-primary-foreground" />
      </motion.button>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-4 gap-8 mb-12"
        >
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-1"
          >
            <motion.button 
              whileHover={{ scale: 1.05 }}
              onClick={scrollToTop}
              className="flex items-center gap-2 mb-4"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center"
              >
                <Heart className="w-5 h-5 text-primary-foreground" />
              </motion.div>
              <span className="font-display font-bold text-xl">Voice4Minds</span>
            </motion.button>
            <p className="text-background/70 text-sm leading-relaxed">
              Providing mental health resources, support, and hope for everyone on their journey to wellness.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-background/70">
              {[
                { label: "Mental Health Info", id: "disorders" },
                { label: "Crisis Helplines", id: "resources" },
                { label: "Schedule Session", id: "schedule" },
                { label: "Blog Articles", id: "blog" },
              ].map((link) => (
                <li key={link.id}>
                  <motion.button
                    whileHover={{ x: 4 }}
                    onClick={() => scrollToSection(link.id)}
                    className="hover:text-background transition-colors"
                  >
                    {link.label}
                  </motion.button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Community */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="font-semibold mb-4">Community</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>
                <motion.button
                  whileHover={{ x: 4 }}
                  onClick={() => scrollToSection("community")}
                  className="hover:text-background transition-colors"
                >
                  Support Forums
                </motion.button>
              </li>
              <li>
                <motion.button
                  whileHover={{ x: 4 }}
                  onClick={() => scrollToSection("stories")}
                  className="hover:text-background transition-colors"
                >
                  Success Stories
                </motion.button>
              </li>
              <li>
                <span className="cursor-not-allowed opacity-50">Become a Volunteer</span>
              </li>
              <li>
                <span className="cursor-not-allowed opacity-50">Events</span>
              </li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-background/70">
              <li>
                <motion.a
                  whileHover={{ x: 4 }}
                  href="tel:988"
                  className="flex items-center gap-2 hover:text-background transition-colors"
                >
                  <Phone className="w-4 h-4 text-primary" />
                  <span>988 (Crisis Line)</span>
                </motion.a>
              </li>
              <li>
                <motion.a
                  whileHover={{ x: 4 }}
                  href="mailto:support@Voice4Minds.org"
                  className="flex items-center gap-2 hover:text-background transition-colors"
                >
                  <Mail className="w-4 h-4 text-primary" />
                  <span>support@Voice4Minds.org</span>
                </motion.a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                <span>Available nationwide, 24/7</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-sm text-background/60">
            © 2026 Voice4Minds. All rights reserved. | 
            <motion.span whileHover={{ color: "var(--background)" }} className="hover:text-background cursor-pointer ml-1">
              Privacy Policy
            </motion.span> | 
            <motion.span whileHover={{ color: "var(--background)" }} className="hover:text-background cursor-pointer ml-1">
              Terms of Service
            </motion.span>
          </p>
          <p className="text-sm text-background/60 flex items-center gap-1">
            Made with 
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 inline text-accent" />
            </motion.span>
            for mental health awareness
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
