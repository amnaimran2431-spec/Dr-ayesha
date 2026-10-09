import React from 'react';

interface ClinicLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  monochrome?: boolean;
}

export const ClinicLogo: React.FC<ClinicLogoProps> = ({
  className = '',
  size = 'md',
  monochrome = false,
}) => {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  return (
    <div className={`relative flex items-center justify-center shrink-0 ${sizeMap[size]} ${className}`}>
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-xs"
        aria-hidden="true"
      >
        {/* Soft rounded hexagonal emblem background */}
        <rect
          x="3"
          y="3"
          width="42"
          height="42"
          rx="12"
          className={monochrome ? 'fill-slate-800' : 'fill-teal-900'}
        />
        
        {/* Subtle inner highlight */}
        <rect
          x="3.75"
          y="3.75"
          width="40.5"
          height="40.5"
          rx="11.25"
          stroke={monochrome ? 'rgba(255,255,255,0.1)' : 'rgba(45,212,191,0.25)'}
          strokeWidth="1.5"
        />

        {/* Modern medical cross stylized with soft nodes */}
        {/* Vertical beam */}
        <rect
          x="21"
          y="11"
          width="6"
          height="26"
          rx="3"
          className={monochrome ? 'fill-slate-200' : 'fill-teal-300'}
        />
        {/* Horizontal beam */}
        <rect
          x="11"
          y="21"
          width="26"
          height="6"
          rx="3"
          className={monochrome ? 'fill-slate-200' : 'fill-teal-300'}
        />

        {/* Center vitality pulse dot */}
        <circle
          cx="24"
          cy="24"
          r="4.5"
          className={monochrome ? 'fill-white' : 'fill-emerald-400'}
        />
        
        {/* Ascending caring arc / gentle stetho-ring */}
        <path
          d="M15 33C17 35.5 20.2 37 24 37C29.5 37 34 32.5 34 27"
          stroke={monochrome ? 'white' : '#A7F3D0'}
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="1 3"
        />
      </svg>
    </div>
  );
};
