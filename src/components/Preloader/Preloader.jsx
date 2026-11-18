import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MARK, WORDMARK } from "../Logo/logoPaths";
import { INTRO_ACTIVE } from "../../lib/intro";

const EASE = [0.76, 0, 0.24, 1];

// First-visit brand intro: the house-and-M mark resolves out of the dark,
// the wordmark settles beneath it, then the panel lifts away to the page.
// Plays once per session (see lib/intro.js) and lasts about 1.5s.
export default function Preloader() {
  const [show, setShow] = useState(INTRO_ACTIVE);

  useEffect(() => {
    if (!show) return undefined;
    const t = setTimeout(() => setShow(false), 1150);
    return () => clearTimeout(t);
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          aria-hidden="true"
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[color:var(--color-umber)] text-[color:var(--color-stone)]"
          initial={{ y: 0 }}
          exit={{ y: "-100%", transition: { duration: 0.8, ease: EASE } }}
        >
          <motion.div
            className="flex flex-col items-center"
            exit={{ opacity: 0, y: -24, transition: { duration: 0.45, ease: EASE } }}
          >
            <motion.svg
              viewBox={`0 0 ${MARK.w} ${MARK.h}`}
              className="h-20 w-auto sm:h-24"
              fill="currentColor"
              initial={{ clipPath: "inset(100% 0 0 0)", opacity: 0.4 }}
              animate={{ clipPath: "inset(0% 0 0 0)", opacity: 1 }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              {MARK.paths.map((d) => (
                <path key={d.slice(0, 24)} d={d} />
              ))}
            </motion.svg>
            <motion.svg
              viewBox={`0 0 ${WORDMARK.w} ${WORDMARK.h}`}
              className="mt-5 h-[0.6875rem] w-auto"
              fill="currentColor"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45, ease: EASE }}
            >
              {WORDMARK.paths.map((d) => (
                <path key={d.slice(0, 24)} d={d} />
              ))}
            </motion.svg>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
