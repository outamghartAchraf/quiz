import React from "react";
import ThemeToggle from "./ThemeToggle";

const Header = ({
  title = "SportQuiz",
  subtitle,
  theme,
  onToggleTheme,
  rightSlot = null,
}) => {
  return (
    <div className="flex items-center justify-between gap-4 mb-8 w-full">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 lg:w-14 lg:h-14 rounded-2xl bg-indigo-600 flex items-center justify-center  ">
         
          <i className="fa-solid fa-medal text-white text-xl lg:text-2xl" aria-hidden="true" />
        </div>

        <div>
          <h1 className="font-black text-gray-800 dark:text-white text-xl lg:text-3xl leading-none">
            {title}
          </h1>

          {subtitle && (
            <p className="text-gray-400 text-xs lg:text-sm font-semibold">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {rightSlot ? rightSlot : <ThemeToggle theme={theme} onToggleTheme={onToggleTheme} />}
    </div>
  );
};

export default Header;