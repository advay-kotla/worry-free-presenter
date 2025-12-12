import { MessageSquare, Users, Heart, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

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

const CommunitySection = () => {
  const { toast } = useToast();

  const handleJoinCommunity = () => {
    toast({
      title: "Welcome to the Community! 🌟",
      description: "Thank you for your interest! Community features are coming soon. We'll notify you when they're ready.",
    });
  };

  return (
    <section className="py-20 bg-background" id="community">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              You're Not Alone
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
              Join Our Supportive Community
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Connect with thousands of individuals who understand what you're going through. 
              Share your experiences, find support, and discover that healing happens together.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="flex items-start gap-3 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">{feature.title}</h4>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="hero" size="lg" onClick={handleJoinCommunity}>
              Join the Community
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-trust/20 rounded-3xl blur-3xl" />
            <div className="relative bg-card rounded-3xl p-8 shadow-elevated border border-border">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <div className="w-3 h-3 rounded-full bg-hope" />
                <div className="w-3 h-3 rounded-full bg-primary" />
              </div>
              
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-serenity flex items-center justify-center text-sm font-semibold">
                    AM
                  </div>
                  <div className="flex-1 bg-secondary rounded-2xl rounded-tl-sm p-4">
                    <p className="text-sm text-foreground">Just wanted to share that today marks 1 year since I started my recovery journey. Thank you all for your support! 💚</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-warmth flex items-center justify-center text-sm font-semibold">
                    SK
                  </div>
                  <div className="flex-1 bg-secondary rounded-2xl rounded-tl-sm p-4">
                    <p className="text-sm text-foreground">That's amazing! You're an inspiration. Keep going! 🌟</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-calm flex items-center justify-center text-sm font-semibold">
                    JD
                  </div>
                  <div className="flex-1 bg-secondary rounded-2xl rounded-tl-sm p-4">
                    <p className="text-sm text-foreground">Congratulations! Your story gives me hope. I'm just starting out...</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-trust border-2 border-card"
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">+2,847 members online</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
