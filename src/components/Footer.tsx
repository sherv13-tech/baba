import { Heart } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      className="py-6 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <a
        href="https://www.facebook.com/shervin.lota123"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300 group"
      >
        <span>Made with all my love</span>
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <Heart className="w-4 h-4 text-love-pink fill-love-pink group-hover:animate-heart-beat" />
        </motion.div>
      </a>
    </motion.footer>
  );
};

export default Footer;
