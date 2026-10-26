import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";
import { useApp } from "../i18n.jsx";
import { useSite } from "../context/SiteData.jsx";
import { C, btnP } from "../ui.js";
const IDS = [
  "home",
  "about",
  "services",
  "portfolio",
  "testimonials",
  "contact",
];
const ic =
  "grid h-[42px] w-[42px] place-items-center rounded-xl text-xl transition hover:bg-neutral-500/20";
export default function Navbar() {
  const { t, theme, toggleLang, toggleTheme } = useApp();
  const { contact } = useSite();
  const [scrolled, setScrolled] = useState(false),
    [open, setOpen] = useState(false),
    [active, setActive] = useState("home");
  const dark = theme === "dark";
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    const t0 = setTimeout(
      () =>
        IDS.forEach((id) => {
          const el = document.getElementById(id);
          el && io.observe(el);
        }),
      300,
    );
    return () => {
      clearTimeout(t0);
      io.disconnect();
    };
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const f = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener("resize", f);
    return () => {
      window.removeEventListener("resize", f);
      document.body.style.overflow = "";
    };
  }, [open]);
  const solid = scrolled || open;
  const white = dark || !solid;
  const link = (id, extra = "") => (
    <Link
      key={id}
      to={{ pathname: "/", hash: "#" + id }}
      onClick={() => setOpen(false)}
      className={`font-bold hover:border-brand border-b-[2.3px] hover:text-brand duration-300 ${active === id ? "border-brand text-brand" : "border-transparent"} ${extra}`}
    >
      {t("nav." + id)}
    </Link>
  );
  const tools = (
    <>
      <button
        className={ic}
        onClick={toggleTheme}
        aria-pressed={dark}
        aria-label={dark ? t("tip.light") : t("tip.dark")}
      >
        {dark ? <FiSun className="text-[25px]" /> : <FiMoon className="text-[25px]" />}
      </button>
      <button
        className={`${ic} w-auto px-2.5 text-[2rem] font-bold`}
        onClick={toggleLang}
      >
        {t("tip.lang")}
      </button>
    </>
  );
  const order = (c) => (
    <a
      className={`${btnP} ${c}`}
      href={contact.wa(t("waMsg"))}
      target="_blank"
      rel="noopener noreferrer"
    >
      {t("cta.order")}
    </a>
  );
  return (
    <>
      <header
        className={`py-[9px] fixed inset-x-0 top-0 z-50 transition duration-300 ${solid ? "bg-[color-mix(in_srgb,var(--bg)_90%,transparent)] text-ink shadow-md backdrop-blur-md" : "text-white"}`}
      >
        <div className={`${C} flex h-nav items-center justify-between gap-4`}>
          <Link to="/" aria-label={t("brand")} onClick={() => setOpen(false)}>
            <img
              className="h-[85px] w-auto mt-2"
              src={`/images/logo/logo-${white ? "white" : "orange"}.png`}
              alt={t("brand")}
            />
          </Link>
          <nav className="hidden gap-5 lg:flex">
            {IDS.map((id) => link(id, "border-b-2 py-1"))}
          </nav>
          <div className="flex items-center gap-5">
            {tools}
            {order("hidden px-4 py-2 text-[.95rem] lg:inline-flex")}
            <button
              className={`${ic} lg:hidden`}
              aria-expanded={open}
              aria-label={t("tip.menu")}
              onClick={() => setOpen(!open)}
            >
              {open ? <FiX className="text-[28px]"/> : <FiMenu className="text-[28px]"/>}
            </button>
          </div>
        </div>
      </header>
      {open && (
        <div className="fixed inset-x-0 bottom-0 top-nav z-40 flex flex-col gap-6 overflow-auto bg-bg p-6 text-ink lg:hidden">
          <nav className="flex flex-col">
            {IDS.map((id) =>
              link(id, "border-b border-b-line py-3.5 text-xl font-bold"),
            )}
          </nav>
          {order("justify-center")}
        </div>
      )}
    </>
  );
}
