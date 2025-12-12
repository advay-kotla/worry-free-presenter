import { Heart, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2 mb-4"
            >
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-xl">MindfulPath</span>
            </button>
            <p className="text-background/70 text-sm leading-relaxed">
              Providing mental health resources, support, and hope for everyone on their journey to wellness.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>
                <button onClick={() => scrollToSection("disorders")} className="hover:text-background transition-colors">
                  Mental Health Info
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("resources")} className="hover:text-background transition-colors">
                  Crisis Helplines
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("schedule")} className="hover:text-background transition-colors">
                  Schedule Session
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("blog")} className="hover:text-background transition-colors">
                  Blog Articles
                </button>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="font-semibold mb-4">Community</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>
                <button onClick={() => scrollToSection("community")} className="hover:text-background transition-colors">
                  Support Forums
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("stories")} className="hover:text-background transition-colors">
                  Success Stories
                </button>
              </li>
              <li>
                <span className="cursor-not-allowed opacity-50">Become a Volunteer</span>
              </li>
              <li>
                <span className="cursor-not-allowed opacity-50">Events</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-background/70">
              <li>
                <a href="tel:988" className="flex items-center gap-2 hover:text-background transition-colors">
                  <Phone className="w-4 h-4 text-primary" />
                  <span>988 (Crisis Line)</span>
                </a>
              </li>
              <li>
                <a href="mailto:support@mindfulpath.org" className="flex items-center gap-2 hover:text-background transition-colors">
                  <Mail className="w-4 h-4 text-primary" />
                  <span>support@mindfulpath.org</span>
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                <span>Available nationwide, 24/7</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-background/60">
            © 2025 MindfulPath. All rights reserved. | <span className="hover:text-background cursor-pointer">Privacy Policy</span> | <span className="hover:text-background cursor-pointer">Terms of Service</span>
          </p>
          <p className="text-sm text-background/60">
            Made with <Heart className="w-4 h-4 inline text-accent" /> for mental health awareness
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
