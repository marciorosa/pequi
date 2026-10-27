'use client';

import React, { useEffect, useState } from 'react';

interface AnimatedElement {
  width: number;
  height: number;
  top: number;
  left: number;
  duration: number;
  delay: number;
}

const AnimatedBackground = () => {
  const [elements, setElements] = useState<AnimatedElement[]>([]);

  useEffect(() => {
    const newElements = Array.from({ length: 12 }).map(() => ({
      width: Math.random() * 200 + 50,
      height: Math.random() * 200 + 50,
      top: Math.random() * 100,
      left: Math.random() * 100,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5
    }));
    setElements(newElements);
  }, []);

  return (
    <>
      {/* Subtle background grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg width="100%" height="100%" className="absolute">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="black" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-white opacity-60"></div>

      {/* Animated elements */}
      <div className="absolute inset-0 overflow-hidden">
        {elements.map((element, i) => (
          <div
            key={i}
            className="absolute rounded-full blur-sm animate-pulse"
            style={{
              width: `${element.width}px`,
              height: `${element.height}px`,
              top: `${element.top}%`,
              left: `${element.left}%`,
              background: 'radial-gradient(circle, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0) 70%)',
              animationDuration: `${element.duration}s`,
              animationDelay: `${element.delay}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Decorative lines */}
      <div className="absolute top-0 right-0 w-1/2 h-px bg-gradient-to-r from-transparent via-cerrado-950/5 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-px bg-gradient-to-r from-transparent via-cerrado-950/5 to-transparent"></div>
      <div className="absolute top-0 right-0 w-px h-1/2 bg-gradient-to-b from-transparent via-cerrado-950/5 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-px h-1/2 bg-gradient-to-b from-transparent via-cerrado-950/5 to-transparent"></div>
    </>
  );
};

export default AnimatedBackground; 