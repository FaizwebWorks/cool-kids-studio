import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const imageData = [
  {
    // Top Left
    src: "img1.webp",
    className: "w-40 h-40 md:w-56 md:h-56 rounded-[30px]",
    top: "96vh",
    left: "5%",
    speed: 400,
  },
  {
    // Top Right
    src: "img4.webp",
    className: "w-44 h-32 md:w-64 md:h-44 rounded-[25px]",
    top: "100vh",
    left: "75%",
    speed: 650,
  },
  {
    // Bottom Left
    src: "img3.webp",
    className: "w-44 h-32 md:w-64 md:h-[250px] rounded-[25px]",
    top: "180vh",
    left: "10%",
    speed: 900,
  },
  {
    // Bottom Right
    src: "img6.webp",
    className: "w-36 h-42 md:w-52 md:h-[300px] rounded-[30px]",
    top: "150vh",
    left: "72%",
    speed: 350,
  },
];

export default function ScrollGallery() {
    const containerRef = useRef(null);
    const imagesRef = useRef([]);

    useEffect(() => {
        imagesRef.current.forEach((el, i) => {
            if (!el) return;

            const speed = imageData[i].speed;

            gsap.to(el, {
                y: -speed - 400,
                ease: "power1.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1.5,
                },
            });
        });
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative h-[200vh] w-full bg-transparent overflow-visible pointer-events-none"
        >
            <div className="relative w-full h-full max-w-[1400px] mx-auto overflow-visible">
                {imageData.map((data, i) => (
                    <div
                        key={i}
                        ref={(el) => (imagesRef.current[i] = el)}
                        className={`absolute ${data.className} shadow-xl pointer-events-auto overflow-hidden bg-bg/10 backdrop-blur-sm`}
                        style={{
                            left: data.left,
                            top: data.top,
                            zIndex: 10,
                        }}
                    >
                        <img
                            src={`/images/${data.src}`}
                            alt=""
                            className="w-full h-full object-cover rounded-[inherit]"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
