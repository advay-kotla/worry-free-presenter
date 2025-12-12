import { Brain, Heart, Cloud, Zap } from "lucide-react";

const disorders = [
  {
    title: "Anxiety Disorders",
    description: "Persistent worry, fear, or nervousness that interferes with daily activities. Includes generalized anxiety, panic disorder, and phobias.",
    icon: Zap,
    color: "bg-serenity",
    stats: "40M+ adults affected in the US",
  },
  {
    title: "Depression",
    description: "A mood disorder causing persistent feelings of sadness, hopelessness, and loss of interest in activities once enjoyed.",
    icon: Cloud,
    color: "bg-calm",
    stats: "21M+ adults affected annually",
  },
  {
    title: "PTSD",
    description: "Post-traumatic stress disorder develops after experiencing or witnessing traumatic events, causing flashbacks and severe anxiety.",
    icon: Brain,
    color: "bg-warmth",
    stats: "12M+ adults have PTSD yearly",
  },
  {
    title: "Bipolar Disorder",
    description: "Characterized by extreme mood swings including emotional highs (mania) and lows (depression) affecting energy and judgment.",
    icon: Heart,
    color: "bg-hope/50",
    stats: "7M+ adults affected in the US",
  },
];

const DisordersSection = () => {
  return (
    <section className="py-20 bg-background" id="disorders">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Understanding Mental Health
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Common Mental Health Conditions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Mental health conditions are more common than you might think. Learning about them 
            is the first step toward understanding and healing.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {disorders.map((disorder, index) => (
            <div
              key={disorder.title}
              className="group bg-card rounded-2xl p-6 shadow-soft hover:shadow-elevated transition-all duration-300 border border-border hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`w-14 h-14 rounded-2xl ${disorder.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <disorder.icon className="w-7 h-7 text-foreground" />
              </div>
              <h3 className="font-display font-semibold text-xl text-foreground mb-2">
                {disorder.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                {disorder.description}
              </p>
              <div className="pt-4 border-t border-border">
                <p className="text-xs text-primary font-medium">{disorder.stats}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Remember: Mental health conditions are treatable, and recovery is possible. 
            <span className="text-primary font-medium"> You are not alone.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default DisordersSection;
