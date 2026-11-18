import { motion } from "motion/react";
import { useLocation } from "../../router/Router";

// Each page fades and lifts in slightly when the route changes, so moving
// around the site feels continuous rather than a hard cut.
export default function PageTransition({ children }) {
  const location = useLocation();
  return (
    <motion.div
      key={location}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
