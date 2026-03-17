import React from "react";

const StatsCard = ({ label, count, color, icon }) => (
  <div className={`flex-1 flex items-center gap-4 border-2 border-${color}-200 bg-${color}-50 rounded-2xl px-6 py-5`}>
    <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-${color}-400 flex items-center justify-center shadow-md shadow-${color}-200`}>
      <i className={`fa-solid ${icon} text-white text-xl lg:text-2xl`} />
    </div>
    <div>
      <p className={`text-${color}-700 text-xs lg:text-sm font-bold mb-0.5`}>{label}</p>
      <p className={`font-black text-${color}-600 text-3xl lg:text-4xl leading-none`}>{count}</p>
    </div>
  </div>
);

export default StatsCard;