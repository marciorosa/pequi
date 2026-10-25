'use client';

import React from 'react';
import { LawyerData } from '../services/lawyerService';

interface LawyerProfileProps {
  lawyer: LawyerData;
}

const LawyerProfile: React.FC<LawyerProfileProps> = ({ lawyer }) => {
  if (!lawyer) return null;
  
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
      <h2 className="text-xl font-semibold text-white mb-2">{lawyer.name}</h2>
      <p className="text-white/70 mb-3">{lawyer.description}</p>
      
      <div className="mb-4">
        <span className="text-white/50 text-sm">Experience: </span>
        <span className="text-white/90">{lawyer.yearsExperience} years</span>
      </div>
      
      <div className="mt-4">
        <h3 className="text-white/80 font-medium mb-2">Areas of Expertise</h3>
        <div className="flex flex-wrap gap-2">
          {lawyer.expertise.map((area, index) => (
            <span 
              key={index} 
              className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-sm"
            >
              {area}
            </span>
          ))}
        </div>
      </div>
      
      <div className="mt-4">
        <h3 className="text-white/80 font-medium mb-2">Background</h3>
        <p className="text-white/70 text-sm">{lawyer.background}</p>
      </div>
    </div>
  );
};

export default LawyerProfile; 