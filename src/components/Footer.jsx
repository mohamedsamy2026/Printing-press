import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaWhatsapp, FaInstagram, FaTiktok } from "react-icons/fa";
import { FiPhone, FiMail, FiArrowUp } from "react-icons/fi";
import { useApp } from "../i18n.jsx";
import { SITE, SERVICES, waLink } from "../data.js";
import { C } from "../ui.js";
const a =
  "flex items-center gap-2.5 py-1 text-neutral-200 transition hover:text-brand";
const h4 = "mb-2.5 font-bold text-brand";
const ltr = "inline-block [direction:ltr] [unicode-bidi:isolate]";
export default function Footer() {
  const { t } = useApp(),
    [top, setTop] = useState(false);
  useEffect(() => {
    const f = () => setTop(window.scrollY > 600);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  const ext = { target: "_blank", rel: "noopener noreferrer" };
  return (
    <>
      <footer
        className="bg-cover bg-center pt-14 text-neutral-200"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,.88),rgba(0,0,0,.92)),url(/images/og/footer-pattern.jpg)",
        }}
      >
        <div className={`${C} grid gap-8 md:grid-cols-[1.4fr_1fr_1.2fr_1fr]`}>
          <div>
            <img
              className="mb-3.5 h-14 w-auto"
              src="/images/logo/logo-white.png"
              alt={t("brand")}
            />
            <p className="text-[.93rem] text-neutral-300">{t("foot.desc")}</p>
          </div>
          <div>
            <h4 className={h4}>{t("foot.links")}</h4>
            {SERVICES.map((s) => (
              <Link key={s.slug} className={a} to={`/services/${s.slug}`}>
                {t(`services.items.${s.slug}.title`)}
              </Link>
            ))}
          </div>
          <div>
            <h4 className={h4}>{t("foot.contact")}</h4>
            <a className={a} href={waLink(t("waMsg"))} {...ext}>
              <FaWhatsapp />
              <span className={ltr}>{SITE.waShow}</span>
            </a>
            <a className={a} href={SITE.callHref}>
              <FiPhone />
              <span className={ltr}>{SITE.call}</span>
            </a>
            <a className={a} href={`mailto:${SITE.email}`}>
              <FiMail />
              <span className={ltr}>{SITE.email}</span>
            </a>
          </div>
          <div>
            <h4 className={h4}>{t("foot.hours")}</h4>
            <p className="mb-5 text-[.93rem] text-neutral-300">
              {t("foot.h1")}
              <br />
              {t("foot.h2")}
            </p>
            <h4 className={h4}>{t("foot.follow")}</h4>
            <div className="flex gap-3 mb-6">
              {[
                [SITE.social.instagram, "Instagram", FaInstagram],
                [SITE.social.tiktok, "TikTok", FaTiktok],
              ].map(([href, l, I]) => (
                <a
                  key={l}
                  href={href}
                  aria-label={l}
                  {...ext}
                  className="grid h-[42px] w-[42px] place-items-center rounded-xl bg-white/10 text-xl transition hover:bg-brand"
                >
                  <I />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 px-4 py-4 text-center text-sm text-neutral-400">
          © {new Date().getFullYear()} {t("brand")}. {t("foot.rights")}
        </div>
      </footer>
      {top && (
        <button
          className="fixed bottom-5 left-5 z-[60] grid h-[46px] w-[46px] place-items-center rounded-full bg-brand text-xl text-onp shadow-card"
          aria-label={t("tip.top")}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <FiArrowUp />
        </button>
      )}
      <a
        className="fixed bottom-5 right-5 z-[60] grid h-[58px] w-[58px] animate-wa place-items-center rounded-full bg-[#25d366] text-[2rem] text-white shadow-lg motion-reduce:animate-none"
        href={waLink(t("waMsg"))}
        {...ext}
        aria-label={t("tip.wa")}
      >
        <FaWhatsapp />
      </a>
    </>
  );
}
