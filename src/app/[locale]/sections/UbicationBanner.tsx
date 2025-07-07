"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useTranslations } from "next-intl";

export default function UbicationBanner() {
  const t = useTranslations("ubication");
  const ubicationTitleRefLineOne = useRef<HTMLHeadingElement>(null);
  const ubicationTitleRefLineTwo = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.set(
      [ubicationTitleRefLineOne.current, ubicationTitleRefLineTwo.current],
      {
        y: 100,
        opacity: 0,
      }
    );

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          const tl = gsap.timeline({
            defaults: { ease: "power3.out", duration: 0.8 },
          });

          tl.to(ubicationTitleRefLineOne.current, { y: 0, opacity: 1 }).to(
            ubicationTitleRefLineTwo.current,
            { y: 0, opacity: 1 },
            "-=0.6"
          );

          setHasAnimated(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.3,
      }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section
      className="py-16 bg-white"
      style={{
        fontFamily: "Be Vietnam Pro, sans-serif",
      }}
      ref={sectionRef}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
          <div className="flex flex-col lg:flex-row justify-between w-full">
            <div className="flex flex-col lg:px-10 border-primary lg:border-r-2 ">
              <div className="overflow-hidden">
                <h2
                  ref={ubicationTitleRefLineOne}
                  className="text-primary text-title w-full text-center lg:text-left"
                >
                  {t("title1")}
                  <br />
                </h2>
              </div>
              <div className="overflow-hidden">
                <h2
                  ref={ubicationTitleRefLineTwo}
                  className="text-primary text-title w-full text-center lg:text-left"
                >
                  {t("title2")}
                </h2>
              </div>
            </div>
            <div className="flex-1 flex flex-col lg:items-end gap-6 w-full mt-10 lg:mt-0">
              <p className="text-[14px] md:text-[18px] text-primary lg:max-w-[50%] text-start lg:text-end leading-[1.2] ">
                {t("description")}
              </p>
              <button className="bg-white text-[#20699B] px-6 py-4 rounded-full transition-all duration-200 text-[12px] md:text-[14px] lg:text-[16px] transform border border-[#20699B] font-main cursor-pointer hover:bg-primary hover:text-white mt-5 lg:mt-0">
                {t("button")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
