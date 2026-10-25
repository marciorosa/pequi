'use client';

import { motion } from 'framer-motion';
import type { PropsWithChildren } from 'react';

type FadeInSectionProps = PropsWithChildren<{
  className?: string;
  delay?: number;
}>;

export default function FadeInSection({ children, className, delay = 0 }: FadeInSectionProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: 'easeOut', delay }}
      viewport={{ once: false, amount: 0.18 }}
    >
      {children}
    </motion.div>
  );
}
