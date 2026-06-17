import { motion } from "motion/react";
import React from "react";

export default function Pagetransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 1 }}
    >
      {children}
    </motion.div>
  );
}
