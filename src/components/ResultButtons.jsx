import React from "react";
import { useNavigate } from "react-router-dom";

const ResultButtons = ({ showReview, setShowReview }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-3 pt-8">
      <button
        onClick={() => navigate("/", { replace: true })}
        className="w-full py-5 rounded-2xl bg-indigo-700 text-white font-black text-base lg:text-xl tracking-wide
                    hover:bg-indigo-800 hover:-translate-y-0.5 active:scale-95 transition-all
                   flex items-center justify-center gap-3"
      >
        <i className="fa-solid fa-rotate-right" /> Nouvelle partie
      </button>

      <button
        onClick={() => setShowReview(v => !v)}
        className="w-full py-5 rounded-2xl border-2 border-indigo-200 bg-indigo-50
                   text-indigo-700 font-black text-base lg:text-xl tracking-wide
                   hover:bg-indigo-100 hover:-translate-y-0.5 active:scale-95 transition-all
                   flex items-center justify-center gap-3"
      >
        {showReview
          ? (<><i className="fa-solid fa-xmark" /> Fermer</>)
          : (<><i className="fa-solid fa-clipboard-list" /> Voir les réponses</>)}
      </button>
    </div>
  );
};

export default ResultButtons;