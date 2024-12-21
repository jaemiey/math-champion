import React from 'react';

interface FractionVisualProps {
  fraction: string;
}

export const FractionVisual = ({ fraction }: FractionVisualProps) => {
  // Convert fraction string (e.g., "1/4") to numbers
  const [numerator, denominator] = fraction.split('/').map(Number);
  
  return (
    <div className="w-24 h-24 border-2 border-game-primary rounded-lg overflow-hidden grid grid-cols-2 grid-rows-2 gap-0.5 bg-white mx-auto my-4">
      {Array.from({ length: 4 }, (_, index) => (
        <div
          key={index}
          className={`${
            index < numerator * (4 / denominator)
              ? 'bg-game-primary/60'
              : 'bg-gray-100'
          }`}
        />
      ))}
    </div>
  );
};