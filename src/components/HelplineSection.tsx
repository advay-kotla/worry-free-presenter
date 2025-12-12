import { Phone, Heart, MessageCircle, Users } from "lucide-react";

const resources = [
  {
    name: "National Suicide Prevention Lifeline",
    phone: "988",
    phoneLink: "tel:988",
    description: "Free, confidential support 24/7",
    icon: Phone,
  },
  {
    name: "Crisis Text Line",
    phone: "Text HOME to 741741",
    phoneLink: "sms:741741?body=HOME",
    description: "Text-based crisis support",
    icon: MessageCircle,
  },
  {
    name: "SAMHSA National Helpline",
    phone: "1-800-662-4357",
    phoneLink: "tel:1-800-662-4357",
    description: "Treatment referral service",
    icon: Heart,
  },
  {
    name: "NAMI Helpline",
    phone: "1-800-950-6264",
    phoneLink: "tel:1-800-950-6264",
    description: "Mental health support & resources",
    icon: Users,
  },
];

const HelplineSection = () => {
  return (
    <section className="py-20 bg-warmth/50" id="resources">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4">
            Get Help Now
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Crisis Resources & Helplines
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            If you or someone you know is in crisis, please reach out. Help is available 24/7, 
            and you don't have to face this alone.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {resources.map((resource, index) => (
            <a
              key={resource.name}
              href={resource.phoneLink}
              className="bg-card rounded-2xl p-6 shadow-soft hover:shadow-elevated transition-all duration-300 border border-border group cursor-pointer block"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <resource.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">{resource.name}</h3>
                  <p className="text-primary font-bold text-lg mb-1 group-hover:underline">{resource.phone}</p>
                  <p className="text-muted-foreground text-sm">{resource.description}</p>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a 
            href="tel:911"
            className="inline-block bg-destructive/10 border border-destructive/20 rounded-xl px-6 py-4 hover:bg-destructive/20 transition-colors cursor-pointer"
          >
            <p className="text-destructive font-medium">
              ⚠️ If you're in immediate danger, please call <strong className="underline">911</strong> or go to your nearest emergency room.
            </p>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HelplineSection;
