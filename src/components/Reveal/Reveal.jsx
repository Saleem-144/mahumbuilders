import { motion } from "motion/react";

const base = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

/**
 * Standard section-reveal used throughout the site: opacity 0→1, y 20→0,
 * triggered once as the element enters the viewport. Kept subtle and
 * consistent per the "premium through restraint" brief.
 */
export default function Reveal({
  children,
  as = "div",
  delay = 0,
  y = 20,
  className,
  once = true,
  amount = 0.2,
  ...rest
}) {
  const Comp = motion[as] ?? motion.div;
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={{ hidden: { opacity: 0, y }, show: { opacity: 1, y: 0 } }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

export function RevealGroup({ children, className, stagger = 0.08, ...rest }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{ show: { transition: { staggerChildren: stagger } } }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className, y = 16 }) {
  return (
    <motion.div
      className={className}
      variants={{ hidden: { opacity: 0, y }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }}
    >
      {children}
    </motion.div>
  );
}

export { base as revealVariants };
