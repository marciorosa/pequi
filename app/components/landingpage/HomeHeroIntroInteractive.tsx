'use client';

import { useState } from 'react';
import HeroSection from './HeroSection';
import IntroSection from './IntroSection';

export default function HomeHeroIntroInteractive() {
  const [activePreview, setActivePreview] = useState('/landingpage/intro/ai-assistant-img.png');

  return (
    <>
      <HeroSection activePreview={activePreview} onPreviewChange={setActivePreview} />
      <IntroSection imageSrc={activePreview} />
    </>
  );
}
