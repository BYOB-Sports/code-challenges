import React, { useEffect, useRef } from 'react';

export default function CourtParallax() {
  const layer1 = useRef<HTMLDivElement>(null);
  const layer2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (layer1.current) layer1.current.style.transform = `translateY(${Math.round(y * 0.06)}px)`;
        if (layer2.current) layer2.current.style.transform = `translateY(${Math.round(y * 0.12)}px)`;
        ticking = false;
      });
      ticking = true;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="parallax-lines" aria-hidden>
      <div className="court-layer l1" ref={layer1} />
      <div className="court-layer l2" ref={layer2} />
    </div>
  );
}


