import { useEffect, useRef, useState } from "react";

/**
 * Counts up from 0 to `value` once the element scrolls into view.
 * A small, purposeful piece of motion: it fires once, driven by the
 * numbers the API actually returns, rather than as decoration.
 */
export default function Counter({ value, suffix = "", duration = 1200 }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();

          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.round(eased * value));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className="stat-figure">
      {display.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}
