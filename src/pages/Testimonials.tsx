import { Star, Quote, ArrowLeft, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const testimonials = [
  {
    name: "Sarah M.",
    story: "After years of struggling with anxiety in silence, I finally found the courage to seek help through this platform. The resources and community support changed my life. I'm now living proof that recovery is possible.",
    condition: "Anxiety Recovery",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    fullStory: "For 8 years, I suffered in silence. Every day was a battle against my own mind. Then I found MindfulPath. My therapist, Dr. Emily, helped me understand that anxiety wasn't my identity—it was something I could manage. Through weekly sessions and the coping techniques I learned, I've regained control of my life. I now volunteer to help others who are where I once was.",
  },
  {
    name: "James L.",
    story: "Depression made me feel like I was drowning. The helpline volunteers listened without judgment and connected me with a counselor who truly understood. Today, I'm helping others find their way too.",
    condition: "Depression Recovery",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    fullStory: "At my lowest point, I made a call that saved my life. The crisis helpline volunteer didn't just listen—they connected me with Dr. Michael, who became my lifeline. Two years of therapy later, I'm now a certified peer counselor. The darkness doesn't define me anymore. If you're struggling, please reach out. It gets better.",
  },
  {
    name: "Maria G.",
    story: "The blog posts helped me understand that what I was experiencing wasn't weakness—it was PTSD. Learning about trauma changed everything. Now I'm three years into recovery and stronger than ever.",
    condition: "PTSD Recovery",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    fullStory: "After a traumatic experience, I didn't know what was happening to me. The flashbacks, the nightmares, the constant fear. Reading articles on MindfulPath helped me name what I was experiencing. Working with Dr. Lisa using EMDR therapy, I've processed my trauma and reclaimed my life. Three years in, I'm not just surviving—I'm thriving.",
  },
  {
    name: "David K.",
    story: "Bipolar disorder felt like an impossible mountain to climb. With the right treatment plan and support system, I've found stability I never thought possible. My therapist gave me tools for life.",
    condition: "Bipolar Management",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    fullStory: "The highs and lows of bipolar disorder nearly destroyed my career and relationships. Dr. Robert helped me understand my cycles and develop strategies to manage them. With proper medication, therapy, and lifestyle changes, I've maintained stability for over a year. I'm proof that bipolar disorder doesn't have to control your life.",
  },
  {
    name: "Linda T.",
    story: "As a caregiver, I forgot to take care of myself until burnout hit hard. The support group sessions reminded me that I matter too. Self-care isn't selfish—it's survival.",
    condition: "Burnout Recovery",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    fullStory: "Caring for my mother with Alzheimer's, I lost myself completely. I was exhausted, depressed, and felt guilty for even thinking about my own needs. The caregiver support group at MindfulPath saved me. Dr. Jennifer taught me that I couldn't pour from an empty cup. Now I prioritize self-care, and I'm a better caregiver for it.",
  },
  {
    name: "Alex R.",
    story: "Social anxiety kept me isolated for years. Through virtual therapy sessions, I slowly rebuilt my confidence. Last month, I gave a presentation at work—something I never imagined possible.",
    condition: "Social Anxiety Recovery",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    fullStory: "For years, I avoided any situation that required interaction. Video calls, meetings, even phone calls terrified me. Virtual therapy with Dr. Sarah was perfect—I could start from my comfort zone. Using gradual exposure therapy, I faced my fears one small step at a time. That presentation? I was nervous, but I did it. And that's everything.",
  },
];

const Testimonials = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Link to="/">
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>

          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-hope/30 text-foreground rounded-full text-sm font-medium mb-4">
              Real Stories, Real Hope
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
              Testimonials
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              These brave individuals have shared their journeys to inspire hope and show that 
              healing is possible for everyone. Your story matters too.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className="bg-card rounded-2xl p-6 shadow-soft hover:shadow-elevated transition-all duration-300 border border-border relative group"
              >
                <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/20 group-hover:text-primary/40 transition-colors" />
                
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
                  />
                  <div>
                    <h3 className="font-semibold text-foreground text-lg">{testimonial.name}</h3>
                    <span className="text-sm text-primary font-medium">{testimonial.condition}</span>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-4">
                  {testimonial.fullStory}
                </p>

                <div className="flex gap-1 pt-4 border-t border-border">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-hope text-hope" />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center bg-serenity/30 rounded-3xl p-12 max-w-4xl mx-auto">
            <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">
              Your Story Matters
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Recovery looks different for everyone. If you'd like to share your journey 
              and inspire others, we'd love to hear from you.
            </p>
            <Link to="/#schedule">
              <Button variant="hero" size="lg">
                Start Your Journey Today
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Testimonials;
