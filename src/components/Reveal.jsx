import { useEffect, useRef, useState } from "react";
export default function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null),
    [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) {
      setOn(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${on ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"} ${className}`}
    >
      {children}
    </div>
  );
}
