import { motion } from "framer-motion";
import cuteCat from "@/assets/cute-cat.png";

interface CuteCatProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const CuteCat = ({ className = "", size = "md" }: CuteCatProps) => {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} ${className}`}
      animate={{ y: [0, -8, 0] }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <img
        src={cuteCat}
        alt="Cute cat"
        className="w-full h-full object-contain drop-shadow-lg"
      />
    </motion.div>
  );
};

export default CuteCat;
