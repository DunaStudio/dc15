"use client";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useTranslations } from "next-intl";

export default function AboutSection() {
  const t = useTranslations("about");
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const storySteps = [
    {
      id: 0,
      title: t("steps.0.title"),
      subtitle: t("steps.0.subtitle"),
      content: t("steps.0.content"),
    },
    {
      id: 1,
      title: t("steps.1.title"),
      subtitle: t("steps.1.subtitle"),
      content: t("steps.1.content"),
    },
    {
      id: 2,
      title: t("steps.2.title"),
      subtitle: t("steps.2.subtitle"),
      content: t("steps.2.content"),
    },
    {
      id: 3,
      title: t("steps.3.title"),
      subtitle: t("steps.3.subtitle"),
      content: t("steps.3.content"),
    },
    {
      id: 4,
      title: t("steps.4.title"),
      subtitle: t("steps.4.subtitle"),
      content: t("steps.4.content"),
    },
    {
      id: 5,
      title: t("steps.5.title"),
      subtitle: t("steps.5.subtitle"),
      content: t("steps.5.content"),
    },
  ];

  const animateContent = (direction: "in" | "out" = "in") => {
    if (!contentRef.current) return;
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    const elements = [
      counterRef.current,
      titleRef.current,
      subtitleRef.current,
      textRef.current,
    ];

    if (direction === "out") {
      timelineRef.current = gsap.timeline();
      timelineRef.current.to(elements, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        stagger: 0.05,
        ease: "power2.inOut",
      });
    } else {
      gsap.set(elements, { opacity: 0, y: 30 });
      timelineRef.current = gsap.timeline();
      timelineRef.current.to(elements, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      });
    }
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;

      if (sectionTop <= 0 && sectionTop > -(sectionHeight - windowHeight)) {
        const scrollWithinSection = Math.abs(sectionTop);
        const maxScrollWithinSection = sectionHeight - windowHeight;
        const progress = scrollWithinSection / maxScrollWithinSection;
        const newStep = Math.min(
          Math.floor(progress * storySteps.length),
          storySteps.length - 1
        );

        if (newStep !== activeStep) {
          setActiveStep(newStep);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeStep, storySteps.length]);

  useEffect(() => {
    animateContent("in");
  }, [activeStep]);

  useEffect(() => {
    animateContent("in");
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-[600vh] relative bg-white"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-8 w-full">
          <div className="absolute top-1/2 right-8 z-10 transform -translate-y-1/2">
            <div className="flex flex-col space-y-2">
              {storySteps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-8 rounded-full transition-all duration-500 ease-out ${
                    index <= activeStep
                      ? "bg-primary scale-110"
                      : "bg-gray-300 scale-100"
                  }`}
                />
              ))}
            </div>
          </div>
          <div ref={contentRef} className="text-center space-y-8">
            <div
              ref={counterRef}
              className="text-sm text-gray-400 font-light tracking-widest overflow-hidden"
            >
              {String(activeStep + 1).padStart(2, "0")} /{" "}
              {String(storySteps.length).padStart(2, "0")}
            </div>
            <div className="space-y-4">
              <div className="overflow-hidden">
                <h1
                  ref={titleRef}
                  className="text-[48px] md:text-[60px] lg:text-[64px] font-light text-primary leading-[1.2]"
                >
                  {storySteps[activeStep].title}
                </h1>
              </div>
              <div className="overflow-hidden">
                <h2
                  ref={subtitleRef}
                  className="text-[16px] md:text-[20px] lg:text-[24px] text-gray-600 font-light leading-[1.2]"
                >
                  {storySteps[activeStep].subtitle}
                </h2>
              </div>
            </div>
            <div className="max-w-2xl w-[80%] mx-auto space-y-6 overflow-hidden">
              <p
                ref={textRef}
                className="text-[14px] md:text-[18px] lg:text-[20px] text-primary leading-relaxed"
              >
                {storySteps[activeStep].content}
              </p>
            </div>
            {activeStep < storySteps.length - 1 && (
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
                  <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
