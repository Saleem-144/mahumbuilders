import { useRef } from "react";
import { motion, useInView } from "motion/react";

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

export function RevealGroup({ children, className, stagger = 0.08, once = true, amount = "some", ...rest }) {
  // `whileInView` looks correct here but its resolved variant state does not
  // propagate down to children in the installed motion version (children —
  // RevealItem — have no animation trigger of their own and rely entirely on
  // inheriting the parent's state, which is the documented, normally-working
  // pattern for staggered reveals). `animate` propagates correctly, so the
  // same "trigger once when scrolled into view" behavior is reproduced
  // explicitly with useInView + animate instead.
  //
  // amount defaults to "some" (any part visible) rather than a fraction like
  // 0.2: RevealGroup wraps grids that grow taller than the viewport as more
  // items are added (e.g. the 6-row Projects grid), and a fractional amount
  // is measured against the *whole* group's height — 20% of a 5000px-tall
  // grid is over 1000px, more than fits in most viewports, so it could never
  // be satisfied and the reveal would never fire.
  const ref = useRef(null);
  const inView = useInView(ref, { once, amount });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
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
