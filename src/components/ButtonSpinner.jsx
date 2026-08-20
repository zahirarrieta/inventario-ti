import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function ButtonSpinner({ size = 16 }) {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
      className="inline-flex"
    >
      <Loader2 size={size} />
    </motion.div>
  );
}
