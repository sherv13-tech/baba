import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Lock, Eye, EyeOff } from "lucide-react";
import FloatingHearts from "@/components/FloatingHearts";
import CuteCat from "@/components/CuteCat";
import WelcomeModal from "@/components/WelcomeModal";
import cuteCat from "@/assets/cute-cat.png";

const CORRECT_PASSWORD = "november102025";

const Login = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [showWelcome, setShowWelcome] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    // Check if already logged in
    const isLoggedIn = localStorage.getItem("lovesite_loggedin");
    if (isLoggedIn === "false") {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsVerifying(true);

    // Simulate verification delay for effect
    setTimeout(() => {
      if (password === CORRECT_PASSWORD) {
        localStorage.setItem("lovesite_loggedin", "true");
        localStorage.setItem("lovesite_password", password);
        setShowWelcome(true);
      } else {
        setError("Hala ka, di mo ako love 😢");
        setIsVerifying(false);
      }
    }, 800);
  };

  const handleWelcomeClose = () => {
    setShowWelcome(false);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden p-4">
      <FloatingHearts />

      {/* Decorative elements */}
      <div className="fixed top-10 left-10 hidden md:block">
        <CuteCat size="lg" />
      </div>
      <div className="fixed bottom-10 right-10 hidden md:block">
        <CuteCat size="md" />
      </div>

      {/* Login Card */}
      <motion.div
        className="cute-card p-8 md:p-10 w-full max-w-md relative z-10"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Floating hearts on card */}
        <motion.div
          className="absolute -top-4 -right-4"
          animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Heart className="w-8 h-8 text-love-pink fill-love-pink" />
        </motion.div>
        <motion.div
          className="absolute -top-2 left-8"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        >
          <Heart className="w-5 h-5 text-primary fill-primary" />
        </motion.div>

        {/* Cat illustration */}
        <motion.div
          className="flex justify-center mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", damping: 10 }}
        >
          <motion.img
            src={cuteCat}
            alt="Cute cat"
            className="w-28 h-28 md:w-36 md:h-36 object-contain drop-shadow-xl"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-2xl md:text-3xl font-bold text-center text-gradient mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Welcome, my love! 💚
        </motion.h1>
        <motion.p
          className="text-center text-muted-foreground mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Enter the magic word:)
        </motion.p>

        {/* Login Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="relative mb-4">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder="Enter me in you...(charot)"
              className="w-full pl-12 pr-12 py-4 rounded-xl bg-muted/50 border-2 border-border focus:border-primary focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground"
              disabled={isVerifying}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.p
                className="text-center text-destructive mb-4 font-medium"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="love-button w-full flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isVerifying || !password}
          >
            {isVerifying ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Heart className="w-5 h-5" />
                </motion.div>
                <span>Verifying...</span>
              </>
            ) : (
              <>
                <Heart className="w-5 h-5" />
                <span>Verify My Love</span>
              </>
            )}
          </motion.button>
        </motion.form>

        {/* Hint */}
        <motion.p
          className="text-center text-sm text-muted-foreground mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Hint: A special date we'll never forget 💕
        </motion.p>
      </motion.div>

      {/* Welcome Modal */}
      <WelcomeModal isOpen={showWelcome} onClose={handleWelcomeClose} />
    </div>
  );
};

export default Login;
