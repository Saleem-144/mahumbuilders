import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Link } from "../../router/Router";
import Arrow from "../Arrow/Arrow";

// A single photograph that opens up as it scrolls into view: it starts inset
// within the page margins and widens to the full screen, while the image
// drifts slightly for depth. One caption links to the project.
export default function ScrollReveal({ image, caption, to }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const inset = useTransform(scrollYProgress, [0, 0.45], ["9%", "0%"]);
  const clipPath = useTransform(inset, (v) => `inset(0 ${v} 0 ${v})`);
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} className="pb-4">
      <motion.div
        style={reduce ? undefined : { clipPath }}
        className="relative h-[56svh] overflow-hidden bg-[color:var(--color-stone)] sm:h-[70svh] lg:h-[86svh]"
      >
        <motion.img
          src={image.large ?? image.src}
          srcSet={image.large ? `${image.src} 960w, ${image.large} 2000w` : undefined}
          sizes="100vw"
          alt={image.alt}
          loading="lazy"
          decoding="async"
          style={reduce ? undefined : { y }}
          className="absolute inset-x-0 -top-[8%] h-[116%] w-full object-cover"
        />
      </motion.div>
      <div className="container-edit mt-4">
        <Link
          to={to}
          className="group inline-flex items-center gap-3 text-xs text-[color:var(--color-mist)] transition-colors hover:text-[color:var(--color-ink)]"
        >
          {caption}
          <Arrow className="h-2.5 w-6 transition-transform duration-500 group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
