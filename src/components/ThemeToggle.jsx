import React from "react";

const ThemeToggle = ({ theme, onToggleTheme }) => {
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={onToggleTheme}
      className="w-11 h-11 lg:w-14 lg:h-14 rounded-2xl border-2 border-gray-200 dark:border-slate-800
                 bg-gray-50 dark:bg-slate-900
                 flex items-center justify-center
                 shadow-sm hover:shadow-md
                 hover:-translate-y-0.5 active:scale-95 transition-all"
      aria-label="Toggle dark mode"
      title={isDark ? "Mode clair" : "Mode sombre"}
    >
      <i
        className={`text-xl lg:text-2xl ${
          isDark
            ? "fa-solid fa-sun text-yellow-400"
            : "fa-solid fa-moon text-indigo-700"
        }`}
        aria-hidden="true"
      />
    </button>
  );
};

export default ThemeToggle;