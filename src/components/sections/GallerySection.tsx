import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, Image as ImageIcon } from "lucide-react";
import cuteCouple from "@/assets/cute-couple.png";
import cuteCat from "@/assets/cute-cat.png";
import loveGif from "@/assets/cat1.gif";
import d1 from "@/assets/d1.jpg";
import d2 from "@/assets/d2.jpg";
import d3 from "@/assets/d3.jpg";
import d4 from "@/assets/d4.jpg";
import d5 from "@/assets/d5.jpg";
import d6 from "@/assets/d6.jpg";
import d7 from "@/assets/d7.jpg";
import d8 from "@/assets/d8.jpg";
import d9 from "@/assets/d9.jpg";
import d10 from "@/assets/d10.jpg";

function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Using our generated images as placeholders
  const images = [
    d1,
    d2,
    d3,
    d4,
    d6,
    d7,
    d8,
    d9,
    d10,
    d5,
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
        <ImageIcon className="text-primary" size={28} />
        <h2 className="text-2xl md:text-3xl font-bold text-gradient text-center">
          Our Precious Cutest Pic hehe
        </h2>
        <Heart className="text-love-pink fill-love-pink animate-pulse-heart" size={24} />
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-w-6xl mx-auto">
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="aspect-square cursor-pointer overflow-hidden rounded-2xl cute-card p-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.05 * index }}
            whileHover={{ scale: 1.05, rotate: Math.random() > 0.5 ? 2 : -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedImage(image)}
          >
            <img
              src={image}
              alt={`Memory ${index + 1}`}
              className="w-full h-full object-cover rounded-xl" />
          </motion.div>
        ))}
      </div>

      <motion.p
        className="text-center text-muted-foreground mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        Next time picture na natin together 💚
      </motion.p>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-foreground/40 backdrop-blur-md"
              onClick={() => setSelectedImage(null)} />
            <motion.div
              className="relative z-10 max-w-3xl w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-card hover:text-primary transition-colors"
              >
                <X size={32} />
              </button>
              <img
                src={selectedImage}
                alt="Full size"
                className="w-full h-auto rounded-3xl shadow-love-lg" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default GallerySection;
