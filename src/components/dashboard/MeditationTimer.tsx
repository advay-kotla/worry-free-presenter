import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, Volume2, VolumeX, Leaf, Wind, Waves, CloudRain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

const presets = [
  { label: "Quick Calm", minutes: 3, icon: Leaf, color: "from-emerald-500 to-teal-500" },
  { label: "Breathe", minutes: 5, icon: Wind, color: "from-sky-500 to-blue-500" },
  { label: "Deep Focus", minutes: 10, icon: Waves, color: "from-violet-500 to-purple-500" },
  { label: "Full Session", minutes: 20, icon: CloudRain, color: "from-amber-500 to-orange-500" },
];

const affirmations = [
  "You are worthy of peace.",
  "Let go of what you cannot control.",
  "Breathe in calm, breathe out tension.",
  "This moment is enough.",
  "You are growing every day.",
  "Be gentle with yourself today.",
];

const MeditationTimer = () => {
  const [selectedPreset, setSelectedPreset] = useState(1);
  const [timeLeft, setTimeLeft] = useState(presets[1].minutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [breathPhase, setBreathPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  const [affirmation, setAffirmation] = useState(affirmations[0]);
  const [sessionsCompleted, setSessions] = useState(() => {
    return parseInt(localStorage.getItem("mp-meditation-sessions") || "0");
  });
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const breathRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalTime = presets[selectedPreset].minutes * 60;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const startBreathCycle = useCallback(() => {
    if (breathRef.current) clearInterval(breathRef.current);
    let phase = 0;
    const phases: Array<"inhale" | "hold" | "exhale"> = ["inhale", "hold", "exhale"];
    const durations = [4000, 4000, 4000];
    setBreathPhase(phases[0]);

    const tick = () => {
      phase = (phase + 1) % 3;
      setBreathPhase(phases[phase]);
    };

    let elapsed = 0;
    breathRef.current = setInterval(() => {
      elapsed++;
      const currentDuration = durations[phase] / 1000;
      if (elapsed >= currentDuration) {
        elapsed = 0;
        tick();
      }
    }, 1000);
  }, []);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            setIsRunning(false);
            const next = sessionsCompleted + 1;
            setSessions(next);
            localStorage.setItem("mp-meditation-sessions", String(next));
            setAffirmation(affirmations[Math.floor(Math.random() * affirmations.length)]);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
      startBreathCycle();
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (breathRef.current) clearInterval(breathRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (breathRef.current) clearInterval(breathRef.current);
    };
  }, [isRunning, sessionsCompleted, startBreathCycle]);

  const selectPreset = (idx: number) => {
    setSelectedPreset(idx);
    setTimeLeft(presets[idx].minutes * 60);
    setIsRunning(false);
  };

  const reset = () => {
    setIsRunning(false);
    setTimeLeft(presets[selectedPreset].minutes * 60);
  };

  const breathScale = breathPhase === "inhale" ? 1.15 : breathPhase === "hold" ? 1.15 : 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl bg-card border border-border p-5 overflow-hidden relative"
    >
      {/* Ambient background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-primary blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-accent blur-3xl" />
      </div>

      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <Leaf className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-sm">Meditation</h3>
              <p className="text-xs text-muted-foreground">{sessionsCompleted} sessions completed</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </Button>
        </div>

        {/* Preset Selector */}
        <div className="grid grid-cols-4 gap-2 mb-5">
          {presets.map((p, i) => (
            <motion.button
              key={p.label}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => selectPreset(i)}
              className={`relative rounded-xl p-2.5 text-center transition-all ${
                selectedPreset === i
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
              }`}
            >
              <p.icon className="w-4 h-4 mx-auto mb-1" />
              <span className="text-[10px] font-semibold block">{p.minutes}m</span>
            </motion.button>
          ))}
        </div>

        {/* Timer Display */}
        <div className="flex flex-col items-center mb-5">
          {/* Breathing Circle */}
          <div className="relative w-36 h-36 flex items-center justify-center mb-3">
            {/* Progress ring */}
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle
                cx="72" cy="72" r="64"
                fill="none"
                className="stroke-secondary"
                strokeWidth="4"
              />
              <motion.circle
                cx="72" cy="72" r="64"
                fill="none"
                className="stroke-primary"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 64}
                animate={{ strokeDashoffset: 2 * Math.PI * 64 * (1 - progress / 100) }}
                transition={{ duration: 0.5 }}
              />
            </svg>

            {/* Breathing orb */}
            <motion.div
              animate={{ scale: isRunning ? breathScale : 1 }}
              transition={{ duration: 4, ease: "easeInOut" }}
              className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center backdrop-blur-sm"
            >
              <motion.div
                animate={{ scale: isRunning ? breathScale : 1 }}
                transition={{ duration: 4, ease: "easeInOut", delay: 0.1 }}
                className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center"
              >
                <span className="text-xl font-bold text-foreground font-display">
                  {formatTime(timeLeft)}
                </span>
              </motion.div>
            </motion.div>
          </div>

          {/* Breath guide */}
          <AnimatePresence mode="wait">
            {isRunning && (
              <motion.p
                key={breathPhase}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-sm font-medium text-primary capitalize"
              >
                {breathPhase === "hold" ? "Hold" : breathPhase === "inhale" ? "Breathe In" : "Breathe Out"}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Affirmation on complete */}
          {timeLeft === 0 && (
            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-sm text-accent font-medium mt-2 text-center italic"
            >
              ✨ {affirmation}
            </motion.p>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3">
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-xl"
            onClick={reset}
          >
            <RotateCcw className="w-4 h-4" />
          </Button>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              className="h-12 w-12 rounded-2xl shadow-lg shadow-primary/25"
              onClick={() => setIsRunning(!isRunning)}
            >
              {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </Button>
          </motion.div>

          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-xl opacity-0 pointer-events-none"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default MeditationTimer;
