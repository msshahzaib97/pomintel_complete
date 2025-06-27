
import React from 'react';

interface ProgressBarProps {
  percentage: number;
  colorClass?: string; // e.g., 'bg-black'
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage, colorClass = 'bg-black' }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div
        className={`${colorClass} h-2.5 rounded-full`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
