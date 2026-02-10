import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, Plus, Sparkles, Calendar, Clock, Tag, 
  ChevronDown, Trash2, Edit3, Save, X, Heart,
  Sun, Cloud, CloudRain, Zap, Moon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";
import { format, isToday, isYesterday } from "date-fns";
import { toast } from "sonner";

const MOOD_OPTIONS = [
  { label: "Peaceful", icon: Sun, color: "text-amber-500", bg: "bg-amber-500/10" },
  { label: "Grateful", icon: Heart, color: "text-rose-500", bg: "bg-rose-500/10" },
  { label: "Reflective", icon: Cloud, color: "text-sky-500", bg: "bg-sky-500/10" },
  { label: "Energized", icon: Zap, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { label: "Calm", icon: Moon, color: "text-indigo-500", bg: "bg-indigo-500/10" },
  { label: "Struggling", icon: CloudRain, color: "text-slate-400", bg: "bg-slate-400/10" },
];

const PROMPTS = [
  "What are you grateful for today?",
  "How did your meditation make you feel?",
  "What's one thing you'd like to let go of?",
  "Describe a moment of peace you experienced today.",
  "What intention would you like to set for tomorrow?",
  "What challenged you today, and how did you handle it?",
  "Write about someone who made your day better.",
];

interface JournalEntry {
  id: string;
  title: string | null;
  content: string;
  mood: string | null;
  tags: string[];
  is_post_meditation: boolean;
  created_at: string;
}

const JournalFeature = ({ isPostMeditation = false }: { isPostMeditation?: boolean }) => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isWriting, setIsWriting] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [saving, setSaving] = useState(false);
  const [expandedEntry, setExpandedEntry] = useState<string | null>(null);

  useEffect(() => {
    fetchEntries();
    setCurrentPrompt(PROMPTS[Math.floor(Math.random() * PROMPTS.length)]);
  }, []);

  const fetchEntries = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const { data, error } = await supabase
      .from("journal_entries")
      .select("*")
      .eq("user_id", session.user.id)
      .order("created_at", { ascending: false })
      .limit(20);

    if (!error && data) {
      setEntries(data as JournalEntry[]);
    }
  };

  const handleSave = async () => {
    if (!content.trim()) {
      toast.error("Write something before saving!");
      return;
    }

    setSaving(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      toast.error("Please sign in to save entries.");
      setSaving(false);
      return;
    }

    const { error } = await supabase.from("journal_entries").insert({
      user_id: session.user.id,
      title: title.trim() || null,
      content: content.trim(),
      mood: selectedMood,
      tags: [],
      is_post_meditation: isPostMeditation,
    });

    if (error) {
      toast.error("Failed to save entry.");
    } else {
      toast.success("Journal entry saved! ✨");
      setTitle("");
      setContent("");
      setSelectedMood(null);
      setIsWriting(false);
      fetchEntries();
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("journal_entries").delete().eq("id", id);
    if (!error) {
      setEntries(prev => prev.filter(e => e.id !== id));
      toast.success("Entry deleted.");
    }
  };

  const shufflePrompt = () => {
    let newPrompt = currentPrompt;
    while (newPrompt === currentPrompt) {
      newPrompt = PROMPTS[Math.floor(Math.random() * PROMPTS.length)];
    }
    setCurrentPrompt(newPrompt);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    if (isToday(date)) return "Today";
    if (isYesterday(date)) return "Yesterday";
    return format(date, "MMM d, yyyy");
  };

  const getMoodOption = (mood: string | null) => {
    return MOOD_OPTIONS.find(m => m.label === mood);
  };

  return (
    <div className="rounded-2xl bg-card border border-border overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Reflection Journal</h3>
              <p className="text-xs text-muted-foreground">
                {entries.length} {entries.length === 1 ? "entry" : "entries"} · Your private space
              </p>
            </div>
          </div>
          {!isWriting && (
            <Button
              size="sm"
              onClick={() => setIsWriting(true)}
              className="gap-1.5 rounded-xl shadow-md shadow-primary/20"
            >
              <Plus className="w-4 h-4" />
              New Entry
            </Button>
          )}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isWriting ? (
          <motion.div
            key="editor"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-5 space-y-4">
              {/* Prompt */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-3 p-3 rounded-xl bg-primary/5 border border-primary/10"
              >
                <Sparkles className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-foreground/80 italic">"{currentPrompt}"</p>
                  <button
                    onClick={shufflePrompt}
                    className="text-xs text-primary hover:underline mt-1"
                  >
                    Try another prompt →
                  </button>
                </div>
              </motion.div>

              {/* Title */}
              <Input
                placeholder="Entry title (optional)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-background/50 border-border/50 rounded-xl text-sm"
              />

              {/* Content */}
              <Textarea
                placeholder="Start writing your reflection..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[120px] bg-background/50 border-border/50 rounded-xl text-sm resize-none"
              />

              {/* Mood */}
              <div>
                <p className="text-xs text-muted-foreground mb-2">How are you feeling?</p>
                <div className="flex flex-wrap gap-2">
                  {MOOD_OPTIONS.map((mood) => {
                    const Icon = mood.icon;
                    const isSelected = selectedMood === mood.label;
                    return (
                      <motion.button
                        key={mood.label}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedMood(isSelected ? null : mood.label)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                          isSelected
                            ? `${mood.bg} ${mood.color} ring-2 ring-current/20`
                            : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        {mood.label}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setIsWriting(false);
                    setTitle("");
                    setContent("");
                    setSelectedMood(null);
                  }}
                  className="text-muted-foreground"
                >
                  <X className="w-4 h-4 mr-1" />
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleSave}
                  disabled={saving || !content.trim()}
                  className="gap-1.5 rounded-xl"
                >
                  <Save className="w-4 h-4" />
                  {saving ? "Saving..." : "Save Entry"}
                </Button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="entries"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {entries.length === 0 ? (
              <div className="p-8 text-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center"
                >
                  <Edit3 className="w-8 h-8 text-primary/60" />
                </motion.div>
                <h4 className="font-semibold text-foreground mb-1">Start Your Journal</h4>
                <p className="text-sm text-muted-foreground mb-4 max-w-xs mx-auto">
                  Capture your thoughts, track your moods, and reflect on your wellness journey.
                </p>
                <Button size="sm" onClick={() => setIsWriting(true)} className="gap-1.5 rounded-xl">
                  <Plus className="w-4 h-4" />
                  Write First Entry
                </Button>
              </div>
            ) : (
              <ScrollArea className="max-h-[400px]">
                <div className="p-4 space-y-2">
                  {entries.map((entry, index) => {
                    const moodOption = getMoodOption(entry.mood);
                    const isExpanded = expandedEntry === entry.id;
                    return (
                      <motion.div
                        key={entry.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="rounded-xl border border-border/50 bg-background/50 overflow-hidden hover:border-border transition-colors"
                      >
                        <button
                          onClick={() => setExpandedEntry(isExpanded ? null : entry.id)}
                          className="w-full p-3.5 text-left flex items-start gap-3"
                        >
                          {moodOption && (
                            <div className={`w-8 h-8 rounded-lg ${moodOption.bg} flex items-center justify-center shrink-0 mt-0.5`}>
                              <moodOption.icon className={`w-4 h-4 ${moodOption.color}`} />
                            </div>
                          )}
                          {!moodOption && (
                            <div className="w-8 h-8 rounded-lg bg-secondary/50 flex items-center justify-center shrink-0 mt-0.5">
                              <BookOpen className="w-4 h-4 text-muted-foreground" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium text-sm text-foreground truncate">
                                {entry.title || "Untitled Reflection"}
                              </h4>
                              {entry.is_post_meditation && (
                                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium shrink-0">
                                  Post-Meditation
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-xs text-muted-foreground">
                                {formatDate(entry.created_at)}
                              </span>
                              <span className="text-xs text-muted-foreground">·</span>
                              <span className="text-xs text-muted-foreground">
                                {format(new Date(entry.created_at), "h:mm a")}
                              </span>
                              {moodOption && (
                                <>
                                  <span className="text-xs text-muted-foreground">·</span>
                                  <span className={`text-xs ${moodOption.color}`}>{moodOption.label}</span>
                                </>
                              )}
                            </div>
                            {!isExpanded && (
                              <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                                {entry.content}
                              </p>
                            )}
                          </div>
                          <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                        </button>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="px-3.5 pb-3.5 pt-0">
                                <div className="p-3 rounded-lg bg-secondary/30 mb-3">
                                  <p className="text-sm text-foreground/80 whitespace-pre-wrap leading-relaxed">
                                    {entry.content}
                                  </p>
                                </div>
                                <div className="flex justify-end">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDelete(entry.id);
                                    }}
                                    className="text-xs text-muted-foreground hover:text-destructive h-7 px-2"
                                  >
                                    <Trash2 className="w-3 h-3 mr-1" />
                                    Delete
                                  </Button>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              </ScrollArea>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default JournalFeature;
