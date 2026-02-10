import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, RefreshCw, Heart, Share2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const quotes = [
  { text: "The only way out is through.", author: "Robert Frost" },
  { text: "You don't have to control your thoughts. You just have to stop letting them control you.", author: "Dan Millman" },
  { text: "Happiness can be found even in the darkest of times, if one only remembers to turn on the light.", author: "Albus Dumbledore" },
  { text: "Almost everything will work again if you unplug it for a few minutes, including you.", author: "Anne Lamott" },
  { text: "You are not your illness. You have a name, a history, a personality. Staying yourself is part of the battle.", author: "Julian Seifter" },
  { text: "Self-care is not self-indulgence, it is self-preservation.", author: "Audre Lorde" },
  { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", author: "Nelson Mandela" },
  { text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.", author: "Ralph Waldo Emerson" },
  { text: "Be patient with yourself. Nothing in nature blooms all year.", author: "Karen Salmansohn" },
  { text: "You are allowed to be both a masterpiece and a work in progress simultaneously.", author: "Sophia Bush" },
  { text: "Mental health is not a destination, but a process.", author: "Noam Shpancer" },
  { text: "Healing takes courage, and we all have courage, even if we have to dig a little to find it.", author: "Tori Amos" },
];

const MotivationalQuotes = () => {
  const [currentIndex, setCurrentIndex] = useState(() => Math.floor(Math.random() * quotes.length));
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const [showSparkle, setShowSparkle] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % quotes.length);
    }, 30000); // rotate every 30s
    return () => clearInterval(interval);
  }, []);

  const nextQuote = () => {
    setCurrentIndex((prev) => (prev + 1) % quotes.length);
  };

  const toggleLike = () => {
    setLiked((prev) => {
      const next = new Set(prev);
      if (next.has(currentIndex)) {
        next.delete(currentIndex);
      } else {
        next.add(currentIndex);
        setShowSparkle(true);
        setTimeout(() => setShowSparkle(false), 1000);
      }
      return next;
    });
  };

  const quote = quotes[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="rounded-2xl bg-gradient-to-br from-primary/5 via-card to-accent/5 border border-border p-5 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-3 right-3 opacity-[0.07]">
        <Quote className="w-20 h-20 text-primary" />
      </div>

      <div className="relative">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-sm">Daily Inspiration</h3>
            <p className="text-xs text-muted-foreground">Quote {currentIndex + 1} of {quotes.length}</p>
          </div>
        </div>

        {/* Quote Display */}
        <div className="min-h-[100px] flex flex-col justify-center mb-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-base font-medium text-foreground leading-relaxed mb-3 italic">
                "{quote.text}"
              </p>
              <p className="text-sm text-muted-foreground font-medium">
                — {quote.author}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Sparkle animation on like */}
        <AnimatePresence>
          {showSparkle && (
            <motion.div
              initial={{ opacity: 1, scale: 0.5 }}
              animate={{ opacity: 0, scale: 2, y: -30 }}
              exit={{ opacity: 0 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 pointer-events-none"
            >
              <Sparkles className="w-6 h-6 text-accent" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-border/50">
          {/* Progress dots */}
          <div className="flex gap-1">
            {quotes.slice(0, 5).map((_, i) => (
              <motion.div
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  i === currentIndex % 5 ? "bg-primary" : "bg-secondary"
                }`}
                animate={i === currentIndex % 5 ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 0.4 }}
              />
            ))}
          </div>

          <div className="flex items-center gap-1">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={toggleLike}
              >
                <Heart
                  className={`w-4 h-4 transition-colors ${
                    liked.has(currentIndex)
                      ? "fill-rose-500 text-rose-500"
                      : "text-muted-foreground"
                  }`}
                />
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={nextQuote}
              >
                <RefreshCw className="w-4 h-4 text-muted-foreground" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MotivationalQuotes;
