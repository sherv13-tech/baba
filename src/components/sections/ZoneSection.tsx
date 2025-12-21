import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X } from "lucide-react";
import loveGif from "@/assets/cat1.gif";

const ZoneSection = () => {
  const [showMessage, setShowMessage] = useState(false);

  const christmasMessage = `Merry Christmas, my love 💚
Hi Vee 🥹💚

Hulaan mo kung anong ginagawa mo sa araw na ginagawa ko’to? You are busy baby. Ginagawa mo yung mga natitira mong school works, and hindi mo mahanap QR pass mo sa library niyo huhu. Ikaw talaga, sabi mo di mo makita pero bigla kang nag charot???? Nasa bio profile niyo lang? Kurutin kita eh AHAHAHA. Pero siyempre mababasa mo to sa pasko kasi sa pasko ko to ibibigay.

Merry merry Christmas, my love. I’m so grateful (ayan na, kinorek ko na 😆) na ikaw yung kasama ko ngayong pasko at sa mga darating pang Christmas pa. I hope happy ka ngayong Christmas and happy kayo ni mama. Gusto ko siyang makilala soon, I hope matanggap niya ako.

Merry Christmas baby. Magkita na tayo pleaseee 🥹 Sana matuloy mga plans natin and mga pangarap mo sa buhay — syempre sama ako haha. Hindi man to yung best gift, for now eto muna yung magagawa ko. Sana magustuhan mo pa rin.

Merry Christmas ulit, love na love kita. Pasabi kay mama:
"aalagaan ko anak niyo tita – Vin" hehe 🎄✨

I love you so much. Always. 💚`;


  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-[60vh] py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Floating hearts around the GIF */}
      <div className="relative">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              top: `${20 + Math.sin(i * 60 * (Math.PI / 180)) * 50}%`,
              left: `${50 + Math.cos(i * 60 * (Math.PI / 180)) * 60}%`,
            }}
            animate={{
              y: [0, -10, 0],
              scale: [1, 1.1, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 2 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          >
            <Heart
              className="text-love-pink fill-love-pink-soft"
              size={16 + i * 2}
            />
          </motion.div>
        ))}

        {/* Main GIF/Image */}
        <motion.div
          className="cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowMessage(true)}
        >
          <motion.img
            src={loveGif}
            alt="Love animation"
            className="w-64 h-64 md:w-80 md:h-80 object-contain rounded-3xl shadow-love-lg"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>

      <motion.p
        className="text-muted-foreground mt-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Click the image for a special message! 💚
      </motion.p>

      {/* Message Modal */}
      <AnimatePresence>
  {showMessage && (
    <motion.div
      className="fixed inset-0 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* BLUR OVERLAY (FULL SCREEN, NO SCROLL) */}
      <div
        className="fixed inset-0 bg-foreground/20 backdrop-blur-sm"
        onClick={() => setShowMessage(false)}
      />

      {/* SCROLLABLE CONTAINER */}
      <div className="relative z-10 flex justify-center px-4 py-16 overflow-y-auto h-full">
        <motion.div
          className="cute-card p-6 md:p-8 max-w-lg w-full"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
        >
          {/* CLOSE BUTTON */}
          <button
            onClick={() => setShowMessage(false)}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
          >
            <X size={24} />
          </button>

          <h3 className="text-2xl font-bold text-gradient mb-4 text-center">
            A Special Message 💚
          </h3>

          {/* MESSAGE */}
          <div className="max-h-[60vh] overflow-y-auto pr-2">
            <p className="whitespace-pre-line leading-relaxed text-foreground">
              {christmasMessage}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )}
</AnimatePresence>

    </motion.div>
  );
};

export default ZoneSection;
