"use client";

import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: 127, suffix: "+", label: "Obras entregues" },
  { value: 22, suffix: "", label: "Anos de mercado" },
  { value: 98, suffix: "%", label: "Clientes satisfeitos" },
  { value: 4.8, suffix: "B", label: "Em m² construídos" },
];

function useCountUp(target: number, duration = 1800, active = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else setCount(parseFloat(start.toFixed(1)));
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, duration]);

  return count;
}

function StatItem({ value, suffix, label }: (typeof STATS)[0]) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);
  const count = useCountUp(value, 1600, active);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setActive(true);
          obs.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const display = Number.isInteger(value)
    ? Math.round(count).toString()
    : count.toFixed(1);

  return (
    <div ref={ref} className="stat-card">
      <p className="stat-value">
        {display}
        <span className="stat-suffix">{suffix}</span>
      </p>
      <p className="stat-label">{label}</p>
    </div>
  );
}

export function NumerosSection() {
  return (
    <section id="numeros" className="numeros-section">
      <div className="numeros-inner">
        {STATS.map((s) => (
          <StatItem key={s.label} {...s} />
        ))}
      </div>
    </section>
  );
}
