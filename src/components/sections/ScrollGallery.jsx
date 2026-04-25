import { useEffect, useRef, memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { requestScrollTriggerRefresh } from "../../utils/scrollTriggerRefresh";

const imageData = [
  {
    // Top Left
    src: "img1.webp",
    className: "w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 rounded-[20px] md:rounded-[30px]",
    top: "96vh",
    left: "5%",
    speed: 400,
  },
  {
    // Top Right
    src: "img2.webp",
    className: "w-36 h-28 sm:w-44 sm:h-32 md:w-64 md:h-44 rounded-[18px] md:rounded-[25px]",
    top: "100vh",
    left: "75%",
    speed: 650,
  },
  {
    // Bottom Left
    src: "img3.webp",
    className: "w-36 h-28 sm:w-44 sm:h-32 md:w-64 md:h-[250px] rounded-[18px] md:rounded-[25px]",
    top: "180vh",
    left: "10%",
    speed: 900,
  },
  {
    // Bottom Right
    src: "img4.webp",
    className: "w-32 h-40 sm:w-36 sm:h-42 md:w-52 md:h-[300px] rounded-[20px] md:rounded-[30px]",
    top: "150vh",
    left: "72%",
    speed: 350,
  },
];

const GalleryImage = memo(({ data, index, imagesRef }) => (
  <div
    ref={(el) => (imagesRef.current[index] = el)}
    className={`absolute ${data.className} shadow-lg md:shadow-xl pointer-events-auto overflow-hidden bg-bg/10 backdrop-blur-sm will-change-transform`}
    style={{
      left: data.left,
      top: data.top,
      zIndex: 10,
    }}
  >
    <img
      src={`/images/${data.src}`}
      alt=""
      loading="lazy"
      className="w-full h-full object-cover rounded-[inherit]"
    />
  </div>
));

GalleryImage.displayName = 'GalleryImage';

export default function ScrollGallery() {
    const containerRef = useRef(null);
    const imagesRef = useRef([]);

    useEffect(() => {
        const mm = gsap.matchMedia();
        const ctx = gsap.context(() => {
            mm.add({
              isDesktop: "(min-width: 768px)",
              isMobile: "(max-width: 767px)"
            }, (context) => {
                const { isMobile } = context.conditions;

                imagesRef.current.forEach((el, i) => {
                    if (!el) return;

                    const speed = imageData[i].speed;
                    const travel = isMobile ? speed * 0.6 : speed;

                    gsap.to(el, {
                        y: -travel - 400,
                        ease: "none",
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top top",
                            end: "bottom bottom",
                            scrub: 1.5,
                            invalidateOnRefresh: true,
                        },
                    });
                });
            });
        }, containerRef);

        const cleanupRefresh = requestScrollTriggerRefresh(240);

        return () => {
            mm.revert();
            ctx.revert();
            cleanupRefresh();
        };
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative md:h-[180vh] w-full bg-transparent overflow-visible pointer-events-none"
            aria-hidden="true"
        >
            <div className="relative w-full h-full max-w-[1400px] mx-auto overflow-visible px-4">
                {imageData.map((data, i) => (
                    <GalleryImage key={i} data={data} index={i} imagesRef={imagesRef} />
                ))}
            </div>
        </section>
    );
}
