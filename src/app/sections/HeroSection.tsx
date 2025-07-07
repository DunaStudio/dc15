"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const section = heroRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visibleRatio = entry.intersectionRatio;
        const calculatedOpacity = 1 - visibleRatio;
        setOpacity(calculatedOpacity);
      },
      {
        threshold: Array.from({ length: 101 }, (_, i) => i / 100),
      }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });

    tl.to(titleRef.current, { y: 0, opacity: 1 })
      .to(subtitleRef.current, { y: 0, opacity: 1 }, "-=0.8")
      .to(textRef.current, { y: 0, opacity: 1 }, "-=0.7")
      .to(
        buttonRef.current,
        { y: 0, opacity: 1, duration: 0.4, ease: "power4.out" },
        "-=0.7"
      );
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="min-h-screen w-screen flex items-center p-10 flex-col gap-2 overflow-hidden relative justify-center"
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover z-[-2] brightness-60"
      >
        <source src="/HeroVideo.webm" type="video/webm" />
      </video>

      <div
        className="fixed top-0 left-0 w-full h-full z-[-1] pointer-events-none transition-opacity duration-200"
        style={{ backgroundColor: `rgba(0,0,0,${opacity})` }}
      />

      <div className="max-w-[1200px] mx-auto flex flex-col justify-center items-center gap-4 ">
        <div>
          <div className="overflow-hidden mx-auto">
            <h1
              ref={titleRef}
              className="text-center text-white text-title w-full translate-y-full opacity-0"
            >
              Neumáticos creados para rendir,
            </h1>
          </div>

          <div className="overflow-hidden mx-auto">
            <h1
              ref={subtitleRef}
              className="text-center text-white text-title w-full translate-y-full opacity-0"
            >
              diseñados para durar
            </h1>
          </div>
        </div>

        <div className="overflow-hidden">
          <p
            ref={textRef}
            className="text-center text-subtitle text-neutral-300 mx-auto w-[90%] md:w-[75%] lg:w-[60%] font-secondary font-[400] opacity-0 leading-[1.2] translate-y-full"
          >
            Descubre nuestra gama de neumáticos y cámaras de aire de alto
            rendimiento, diseñados para ofrecer durabilidad y eficiencia en cada
            aplicación.
          </p>
        </div>

        <div className="overflow-hidden">
          <button
            ref={buttonRef}
            className="border border-neutral-500 rounded-full text-neutral-300 font-main text-[12px] md:text-[14px] lg:text-[16px] mt-4 px-6 py-4 
              hover:backdrop-blur-xl hover:border-white transition duration-300 cursor-pointer backdrop-blur-lg bg-white/10 translate-y-full opacity-0"
          >
            Conocenos
          </button>
        </div>
      </div>
    </section>
  );
}
