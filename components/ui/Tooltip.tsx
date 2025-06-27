import React, { useState, useRef, useEffect, ReactNode, MouseEvent } from 'react';
import { InfoIcon } from '../IconComponents';

interface TooltipProps {
  content: string;
  children?: ReactNode;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children, className }: TooltipProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const handleToggle = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const trigger = children || <InfoIcon className={`w-4 h-4 text-gray-500 align-middle ${className || ''}`} />;

  return (
    <div className="relative inline-block align-middle" ref={tooltipRef}>
      <button
        type="button"
        onClick={handleToggle}
        className="flex items-center justify-center align-middle"
        aria-expanded={isOpen}
        aria-label="Toggle tooltip"
        style={{ verticalAlign: 'middle' }}
      >
        {trigger}
      </button>
      {isOpen && (
        <div
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max max-w-xs px-3 py-2 bg-gray-800 text-white text-xs rounded-md shadow-lg z-20"
          role="tooltip"
        >
          {content}
          {/* Arrow */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-gray-800"></div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
