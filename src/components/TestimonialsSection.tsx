import { Star, Quote, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

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

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-serenity/30" id="stories">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-hope/30 text-foreground rounded-full text-sm font-medium mb-4">
            Stories of Hope
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Real People, Real Recovery
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            These brave individuals share their journeys to inspire hope and show that 
            healing is possible for everyone.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="bg-card rounded-2xl p-6 shadow-soft hover:shadow-elevated transition-all duration-300 border border-border relative"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/20" />
              
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-primary/20"
                />
                <div>
                  <h3 className="font-semibold text-foreground">{testimonial.name}</h3>
                  <span className="text-sm text-primary font-medium">{testimonial.condition}</span>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-4">
                "{testimonial.story}"
              </p>

              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-hope text-hope" />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground italic mb-6">
            "Your story isn't over yet. There is always hope."
          </p>
          <Link to="/testimonials">
            <Button variant="outline" size="lg">
              Read More Stories
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
