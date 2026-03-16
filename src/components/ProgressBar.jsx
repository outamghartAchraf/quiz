import React from "react";

const ProgressBar = ({ value }) => {
  return (
    <div className="h-1.5 rounded-full bg-gray-200 overflow-hidden">
      <div className="h-full rounded-full bg-indigo-600" style={{ width: `${value}%` }} />
    </div>
  );
};

export default ProgressBar;