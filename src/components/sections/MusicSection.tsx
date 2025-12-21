import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Music, Heart } from "lucide-react";

interface Track {
  id: number;
  title: string;
  artist: string;
  src: string;
}


const MusicSection = () => {
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);


  const tracks: Track[] = [
    {
      id: 1,
      title: "Blue",
      artist: "Yungkai",
      src: "/music/blue.mp3",
    },
    {
      id: 2,
      title: "Nothing",
      artist: "Bruno Major",
      src: "/music/nothing.mp3",
    },
    {
      id: 3,
      title: "Heather",
      artist: "Conan Gray",
      src: "/music/heather.mp3",
    },
    {
      id: 4,
      title: "Ikat at Ako",
      artist: "Johnoy Danao",
      src: "/music/ikaw-at-ako.mp3",
    },
    {
      id: 5,
      title: "Panaginip",
      artist: "Iluna",
      src: "/music/panaginip.mp3",
    },
  ];


  const togglePlay = (track: Track) => {
  // Stop current
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }

  // Same track = pause
  if (playingId === track.id) {
    setPlayingId(null);
    setAudio(null);
    return;
  }

  // Play new track
  const newAudio = new Audio(track.src);
  newAudio.play();
  setAudio(newAudio);
  setPlayingId(track.id);

  newAudio.onended = () => {
    setPlayingId(null);
    setAudio(null);
  };
};


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
        <Music className="text-primary" size={28} />
        <h2 className="text-2xl md:text-3xl font-bold text-gradient text-center">
          Songs that remind me of you
        </h2>
        <Heart className="text-love-pink fill-love-pink animate-pulse-heart" size={24} />
      </motion.div>

      <div className="max-w-2xl mx-auto space-y-4">
        {tracks.map((track, index) => (
          <motion.div
            key={track.id}
            className="cute-card p-4 flex items-center gap-4 cursor-pointer hover:shadow-love-lg transition-all duration-300"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ scale: 1.02, x: 5 }}
            onClick={() => togglePlay(track)}
          >
            <motion.button
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${playingId === track.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-primary/20"
                }`}
              whileTap={{ scale: 0.9 }}
            >
              {playingId === track.id ? (
                <Pause size={20} />
              ) : (
                <Play size={20} className="ml-0.5" />
              )}
            </motion.button>

            <div className="flex-1">
              <h3 className="font-semibold text-foreground">{track.title}</h3>
              <p className="text-sm text-muted-foreground">{track.artist}</p>
            </div>

            {playingId === track.id && (
              <motion.div
                className="flex gap-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-primary rounded-full"
                    animate={{ height: [8, 20, 8] }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      <motion.p
        className="text-center text-muted-foreground mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        Every song reminds me of you 💚 <br></br>
        (pero mas maganda kung ako kumanta niyan haha)
      </motion.p>
    </motion.div>
  );
};

export default MusicSection;
