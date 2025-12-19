"use client";

import React, { useEffect, useRef, useState } from "react";

const SmartText = ({ text }: { text: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [coveredLetters, setCoveredLetters] = useState<number[]>([]);

  useEffect(() => {
    const checkCoverage = () => {
      const letters = containerRef.current?.querySelectorAll("span") || [];
      const covered: number[] = [];

      const imageRect = document
        .querySelector("#hero-image")
        ?.getBoundingClientRect();

      if (!imageRect) return;

      letters.forEach((letter, index) => {
        const rect = letter.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        if (
          x > imageRect.left &&
          x < imageRect.right &&
          y > imageRect.top &&
          y < imageRect.bottom
        ) {
          covered.push(index);
        }
      });

      setCoveredLetters(covered);
    };

    window.addEventListener("scroll", checkCoverage);
    window.addEventListener("resize", checkCoverage);
    checkCoverage();

    return () => {
      window.removeEventListener("scroll", checkCoverage);
      window.removeEventListener("resize", checkCoverage);
    };
  }, []);

  return (
    <div ref={containerRef} className="flex gap-[1px]">
      {text.split("").map((char, index) => (
        <span
          key={index}
          className={`transition-colors duration-200 ${
            coveredLetters.includes(index) ? "text-white" : "text-black"
          }`}
        >
          {char}
        </span>
      ))}
    </div>
  );
};

export default SmartText;
