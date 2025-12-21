import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import FloatingHearts from "@/components/FloatingHearts";
import CuteCat from "@/components/CuteCat";
import Footer from "@/components/Footer";
import ZoneSection from "@/components/sections/ZoneSection";
import MusicSection from "@/components/sections/MusicSection";
import GallerySection from "@/components/sections/GallerySection";
import NotesSection from "@/components/sections/NotesSection";
import { Heart, Sparkles, Music, Image, StickyNote } from "lucide-react";
import { Gamepad2 } from "lucide-react";
import GamesSection from "@/components/sections/GamesSection";


type Section = "zone" | "music" | "gallery" | "notes" | "games";


const Dashboard = () => {
  const [activeSection, setActiveSection] = useState<Section>("zone");

  const sections = [
    { id: "zone" as Section, label: "Zone", icon: Sparkles },
    { id: "music" as Section, label: "Music", icon: Music },
    { id: "gallery" as Section, label: "Gallery", icon: Image },
    { id: "notes" as Section, label: "Notes", icon: StickyNote },
    { id: "games" as Section, label: "Games", icon: Gamepad2 },

  ];

  const renderSection = () => {
    switch (activeSection) {
      case "zone":
        return <ZoneSection />;
      case "music":
        return <MusicSection />;
      case "gallery":
        return <GallerySection />;
      case "notes":
        return <NotesSection />;
      case "games":
        return <GamesSection />;

      default:
        return <ZoneSection />;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <FloatingHearts />

      {/* Decorative cats */}
      <div className="fixed bottom-4 left-4 z-10 hidden md:block">
        <CuteCat size="md" />
      </div>
      <div className="fixed bottom-4 right-4 z-10 hidden md:block">
        <CuteCat size="sm" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.header
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="flex items-center justify-center gap-3 mb-2"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Heart className="text-love-pink fill-love-pink animate-heart-beat" size={28} />
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient">
              For my baba 💚
            </h1>
            <Heart className="text-love-pink fill-love-pink animate-heart-beat" size={28} />
          </motion.div>
          <motion.p
            className="text-lg text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            A special place just for you
          </motion.p>
        </motion.header>

        {/* Navigation Buttons */}
        <motion.nav
          className="flex flex-wrap justify-center gap-3 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.button
                key={section.id}
                className={`section-button flex items-center gap-2 ${activeSection === section.id ? "active" : ""
                  }`}
                onClick={() => setActiveSection(section.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index + 0.3 }}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={18} />
                <span>{section.label}</span>
              </motion.button>
            );
          })}
        </motion.nav>

        {/* Main Content */}
        <motion.main
          key={activeSection}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderSection()}
        </motion.main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
