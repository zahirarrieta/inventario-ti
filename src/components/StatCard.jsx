import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.06,
      duration: 0.45,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

export default function StatCard({ icon: Icon, value, label, description, color = "#0FDBF2", trend, trendDir = "up", index = 0 }) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      custom={index}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="card-premium stat-card cursor-default"
    >
      <div className="stat-card-accent" style={{ background: color }} />

      <div className="flex items-start justify-between gap-3 mb-3">
        <motion.div
          whileHover={{ rotate: -8, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: `${color}22`, border: `1px solid ${color}20` }}
        >
          <Icon size={20} style={{ color }} />
        </motion.div>
        {trend && (
          <div className={`flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-lg ${
            trendDir === "up" ? "text-success bg-success/10" : "text-danger bg-danger/10"
          }`}>
            {trendDir === "up" ? "↑" : "↓"} {trend}
          </div>
        )}
      </div>

      <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-text-muted mb-1">{label}</div>
      <div className="text-2xl sm:text-[30px] font-extrabold text-text-primary leading-none mb-1 tracking-tight">
        {value}
      </div>
      {description && <div className="text-[11px] text-text-muted leading-snug hidden sm:block">{description}</div>}
    </motion.div>
  );
}
