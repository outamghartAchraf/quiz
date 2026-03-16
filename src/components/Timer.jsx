import React from "react";

const Timer = ({ timeLeft, dashArray = 163, dashOffset = 0 }) => {
  return (
    <div className="relative w-14 h-14 lg:w-20 lg:h-20 flex-shrink-0">
      <svg viewBox="0 0 56 56" width="100%" height="100%">
        <circle cx="28" cy="28" r="26" className="fill-none stroke-gray-200" strokeWidth="5" />
        <circle
          cx="28"
          cy="28"
          r="26"
          className="fill-none stroke-indigo-600"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={dashArray}
          strokeDashoffset={dashOffset}
          style={{ transformOrigin: "center", transform: "rotate(-90deg)", transition: "stroke-dashoffset 0.25s linear" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-black text-indigo-700 text-xs lg:text-base">{timeLeft}</span>
      </div>
    </div>
  );
};

export default Timer;