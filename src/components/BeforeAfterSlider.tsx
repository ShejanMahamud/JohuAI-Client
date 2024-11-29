"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  altTextBefore?: string;
  altTextAfter?: string;
}

const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  altTextBefore = "Before Image",
  altTextAfter = "After Image",
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: React.MouseEvent | React.TouchEvent) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const clientX =
      "touches" in event ? event.touches[0].clientX : event.clientX;
    const newPosition = ((clientX - rect.left) / rect.width) * 100;

    setSliderPosition(Math.max(0, Math.min(100, newPosition)));
  };

  return (
    <div
      className="relative w-full max-w-2xl h-80 overflow-hidden cursor-pointer"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleMouseMove}
    >
      {/* Before Image */}
      <div
        className="absolute inset-0 z-10 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <Image
          width={500}
          height={500}
          src={beforeImage}
          alt={altTextBefore}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* After Image */}
      <Image
        width={500}
        height={500}
        src={afterImage}
        alt={altTextAfter}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Slider Line */}
      <div
        className="absolute top-0 bottom-0 z-20 w-1 bg-white left-0 border border-gray-700"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white border-2 border-gray-700 rounded-full"></div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
