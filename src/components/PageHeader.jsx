import { motion } from "framer-motion";

export default function PageHeader({ title, subtitle, actionLabel, actionIcon: ActionIcon, onAction }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
    >
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight flex items-center gap-2">
          {ActionIcon && <ActionIcon size={24} className="text-ctp-cyan shrink-0" />}
          {title}
        </h1>
        {subtitle && <p className="text-sm text-text-muted mt-1">{subtitle}</p>}
      </div>
      {onAction && (
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onAction}
          className="btn-ctp shrink-0"
        >
          {ActionIcon && <ActionIcon size={16} />}
          {actionLabel || "Nuevo"}
        </motion.button>
      )}
    </motion.div>
  );
}
