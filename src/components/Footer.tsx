import { Heart, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-xl">MindfulPath</span>
            </a>
            <p className="text-background/70 text-sm leading-relaxed">
              Providing mental health resources, support, and hope for everyone on their journey to wellness.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><a href="#disorders" className="hover:text-background transition-colors">Mental Health Info</a></li>
              <li><a href="#resources" className="hover:text-background transition-colors">Crisis Helplines</a></li>
              <li><a href="#schedule" className="hover:text-background transition-colors">Schedule Session</a></li>
              <li><a href="#blog" className="hover:text-background transition-colors">Blog Articles</a></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="font-semibold mb-4">Community</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><a href="#community" className="hover:text-background transition-colors">Support Forums</a></li>
              <li><a href="#stories" className="hover:text-background transition-colors">Success Stories</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Become a Volunteer</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Events</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-background/70">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <span>988 (Crisis Line)</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <span>support@mindfulpath.org</span>
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
            © 2025 MindfulPath. All rights reserved. | <a href="#" className="hover:text-background">Privacy Policy</a> | <a href="#" className="hover:text-background">Terms of Service</a>
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
