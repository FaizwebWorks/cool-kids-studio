import gsap from "gsap";
import { useEffect, useRef } from "react";

export const SwipeCarousel = ({ services }) => {
  const containerRef = useRef(null);
  const currentIndex = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    let startX = 0;
    let deltaX = 0;

    const threshold = 50; // swipe sensitivity

    const onTouchStart = (e) => {
      startX = e.touches[0].clientX;
    };

    const onTouchMove = (e) => {
      deltaX = e.touches[0].clientX - startX;
    };

    const onTouchEnd = () => {
      if (deltaX > threshold && currentIndex.current > 0) {
        currentIndex.current -= 1;
      } else if (
        deltaX < -threshold &&
        currentIndex.current < services.length - 1
      ) {
        currentIndex.current += 1;
      }

      gsap.to(container, {
        x: -currentIndex.current * window.innerWidth,
        duration: 0.5,
        ease: "power3.out",
      });

      deltaX = 0;
    };

    container.addEventListener("touchstart", onTouchStart);
    container.addEventListener("touchmove", onTouchMove);
    container.addEventListener("touchend", onTouchEnd);

    return () => {
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onTouchEnd);
    };
  }, [services]);

  return (
    <div className="overflow-hidden">
      <div
        ref={containerRef}
        className="flex"
        style={{ width: `${services.length * 100}vw` }}
      >
        {services.map((s, i) => (
          <div key={i} className="w-screen px-6">
            <MobileCard service={s} index={i} />
          </div>
        ))}
      </div>
    </div>
  );
}