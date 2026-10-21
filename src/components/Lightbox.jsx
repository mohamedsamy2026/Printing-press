import { useEffect } from "react";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useApp } from "../i18n.jsx";
const b =
  "absolute grid h-11 w-11 place-items-center rounded-full bg-white/15 text-2xl text-white transition hover:bg-brand";
export default function Lightbox({ items, index, setIndex, alts }) {
  const { t } = useApp(),
    open = index !== null,
    n = items.length;
  const go = (d) => setIndex((index + d + n) % n);
  useEffect(() => {
    if (!open) return;
    const k = (e) => {
      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", k);
      document.body.style.overflow = "";
    };
  });
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-black/90 px-4 py-14"
      role="dialog"
      aria-modal="true"
      onClick={() => setIndex(null)}
    >
      <button
        className={`${b} right-3.5 top-3.5`}
        aria-label={t("close")}
        onClick={() => setIndex(null)}
      >
        <FiX />
      </button>
      <button
        className={`${b} left-3 top-1/2`}
        aria-label={t("prev")}
        onClick={(e) => {
          e.stopPropagation();
          go(-1);
        }}
      >
        <FiChevronLeft />
      </button>
      <img
        className="max-h-full max-w-full rounded-lg object-contain"
        src={items[index]}
        alt={alts[index]}
        onClick={(e) => e.stopPropagation()}
      />
      <button
        className={`${b} right-3 top-1/2`}
        aria-label={t("next")}
        onClick={(e) => {
          e.stopPropagation();
          go(1);
        }}
      >
        <FiChevronRight />
      </button>
      <span className="absolute bottom-4 text-sm text-white" dir="ltr">
        {index + 1} / {n}
      </span>
    </div>
  );
}
