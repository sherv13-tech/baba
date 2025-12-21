import { motion } from "framer-motion";
import { StickyNote, Heart } from "lucide-react";

const NotesSection = () => {
  const notes = [
    "You make every day brighter just by talking you 🌟",
    "I fall in love with you more every single day 💚",
    "Your smile is my favorite thing in the world 😊",
    "Chill lang palagi baby, tingin ka lang dito ❤️",
    "I'm so lucky to have you in my life 🍀",
    "1st day ng period mo, dapat mag iingat palagi ✨",
    "Goal natin ay 50kg, kaya kumain mabuti 💎",
    "Our future is me, you and our babies 🌅",
  ];

  const noteColors = [
    "bg-primary/20 border-primary/30",
    "bg-secondary/60 border-secondary/80",
    "bg-accent/40 border-accent/60",
    "bg-love-pink-soft border-love-pink/30",
  ];

  return (
    <motion.div
      className="py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex items-center justify-center gap-2 mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <StickyNote className="text-primary" size={28} />
        <h2 className="text-2xl md:text-3xl font-bold text-gradient text-center">
          Random Little Notes
        </h2>
        <Heart className="text-love-pink fill-love-pink animate-pulse-heart" size={24} />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-6xl mx-auto">
        {notes.map((note, index) => (
          <motion.div
            key={index}
            className={`p-5 rounded-2xl border-2 ${
              noteColors[index % noteColors.length]
            } shadow-soft transition-all duration-300`}
            initial={{ opacity: 0, y: 20, rotate: -5 }}
            animate={{
              opacity: 1,
              y: 0,
              rotate: index % 2 === 0 ? 1 : -1,
            }}
            transition={{ delay: 0.1 * index }}
            whileHover={{
              scale: 1.05,
              rotate: 0,
              boxShadow: "0 8px 30px -8px hsl(var(--primary) / 0.3)",
            }}
          >
            <p className="text-foreground font-medium leading-relaxed">
              {note}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.p
        className="text-center text-muted-foreground mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        Little reminders of how much I love you 💚
      </motion.p>
    </motion.div>
  );
};

export default NotesSection;
