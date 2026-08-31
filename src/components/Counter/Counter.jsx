import { useEffect, useRef, useState } from "react";

// Splits "PKR 5Bn+" / "300+" / "1989" into a leading label, the numeric run
// to animate, and a trailing label — so "Bn+" / "+" stay put while only the
// digits count up.
function parseValue(raw) {
  const match = String(raw).match(/^(\D*)([\d,]+)(\D*)$/);
  if (!match) return { prefix: "", number: null, suffix: raw, digits: "" };
  const [, prefix, digits, suffix] = match;
  return { prefix, number: Number(digits.replace(/,/g, "")), suffix, digits };
}

const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

export default function Counter({ value, duration = 1400 }) {
  const { prefix, number, suffix, digits } = parseValue(value);
  const prefersReduced =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const ref = useRef(null);
  const [display, setDisplay] = useState(() => (number === null ? "" : prefersReduced ? digits : "0"));
  const started = useRef(false);

  useEffect(() => {
    if (number === null || prefersReduced) return undefined;

    const el = ref.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const format = (n) => (digits.includes(",") ? Math.round(n).toLocaleString("en-US") : String(Math.round(n)));

          function tick(now) {
            const progress = Math.min((now - startTime) / duration, 1);
            setDisplay(format(number * easeOutExpo(progress)));
            if (progress < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [number, digits, duration, prefersReduced]);

  return (
    <span ref={ref}>
      {prefix}
      {number === null ? suffix : display}
      {number !== null && suffix}
    </span>
  );
}
