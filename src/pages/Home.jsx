// Imports
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaWhatsapp, FaStar, FaQuoteRight } from "react-icons/fa";
import {
  FiPhone,
  FiArrowRight,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import Reveal from "../components/Reveal.jsx";
import Lightbox from "../components/Lightbox.jsx";
import { useApp } from "../i18n.jsx";
import { useSite } from "../context/SiteData.jsx";
import { mediaUrl } from "../lib/media.js";
import { pick, lines } from "../lib/text.js";
import { C, btnP, btnO, btnW, kick, bar, H2, sec } from "../ui.js";
const ext = { target: "_blank", rel: "noopener noreferrer" };
const Head = ({ k, title, sub }) => (
  <Reveal className="mb-11 text-center">
    <span className={kick}>{k}</span>
    <h2 className={H2}>{title}</h2>
    {sub && <p className="text-muted">{sub}</p>}
    <i className={`${bar} mx-auto`} />
  </Reveal>
);
const Skel = ({ className = "" }) => (
  <div className={`animate-pulse rounded-card bg-line/60 ${className}`} />
);
const Btns = ({ t, band, contact }) => (
  <div className={`mt-7 flex flex-wrap gap-4 ${band ? "justify-center" : ""}`}>
    <a className={band ? btnW : btnP} href={contact.wa(t("waMsg"))} {...ext}>
      <FaWhatsapp />
      {t("cta.wa")}
    </a>
    <a className={band ? `${btnO} text-inherit` : btnO} href={contact.callHref}>
      <FiPhone />
      {t("cta.call")}
    </a>
  </div>
);
export default function Home() {
  const { t, lang } = useApp(),
    { services, works, reviews, loading, contact } = useSite(),
    [lb, setLb] = useState(null);
  const workUrls = works.map((w) => mediaUrl(w.path));
  const workAlts = works.map(
    (w, i) => pick(w.alt_ar, w.alt_en, lang) || `${t("works.alt")} ${i + 1}`,
  );
  const swiperRef = useRef(null);
  const revSwiperRef = useRef(null);

  useEffect(() => {
    const autoplay = swiperRef.current?.autoplay;
    if (!autoplay) return;
    if (lb !== null)
      autoplay.stop(); // الصورة اتفتحت: وقّف
    else autoplay.start(); // الصورة اتقفلت: شغّل
  }, [lb]);
  return (
    <main>
      <section
        id="home"
        className="relative flex scroll-mt-nav items-center overflow-hidden text-white"
      >
        <style>{`
    #home {
      min-height: 100vh;
      min-height: 100dvh;
      background-color: #000;
      background-image:
        linear-gradient(180deg,rgba(0,0,0,.45),rgba(0,0,0,.65)),
        url("/images/hero/hero-storefront.jpg");
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }


    @media (max-width: 740px) {
      #home {
        background-image:
          linear-gradient(180deg,rgba(0,0,0,.45),rgba(0,0,0,.65)),
          url("/images/hero/hero-storefront-mobile.webp");
        background-size: auto 143%;
        background-position: center top;
      }
      }
      @media (max-width: 530px) {
      #home{
              background-size: auto 100%;

      }
      }
  `}</style>

        <div
          className={`${C} animate-up md:pb-60 pb-0 pt-[calc(theme(spacing.nav)+24px)] motion-reduce:animate-none`}
        >
          <span className={`${kick} !text-[#ffb089]`}>{t("short")}</span>

          <h1 className="mb-4 mt-3 text-[clamp(1rem,4.5vw,4rem)] font-extrabold leading-tight whitespace-nowrap md:whitespace-normal md:max-w-[16ch] rtl:max-w-none md:rtl:max-w-[16ch] ltr:whitespace-normal md:ltr:max-w-[25ch]">
            {t("hero.title")}
          </h1>

          <Btns t={t} contact={contact} />
        </div>

        <a
          className="absolute inset-x-0 bottom-6 mx-auto grid h-11 w-11 animate-bob place-items-center text-2xl motion-reduce:animate-none"
          href="#about"
          aria-label={t("nav.about")}
          onClick={(e) => {
            e.preventDefault();
            document
              .getElementById("about")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <FiChevronDown />
        </a>
      </section>
      <section id="about" className={sec}>
        <div className={`${C}`}>
          <Reveal>
            <span className={kick}>{t("about.k")}</span>
            <h2 className={H2}>{t("about.title")}</h2>
            <i className={bar} />
            <p className="mt-3.5 text-muted">{t("about.p1")}</p>
            <p className="mt-3.5 text-muted">{t("about.p2")}</p>
            <div className="mt-6 grid gap-3.5 sm:grid-cols-2">
              {t("about.f").map(([a, b], i) => (
                <div
                  key={i}
                  className="rounded-card border border-line border-s-4 border-s-brand bg-surface px-4 py-3.5"
                >
                  <b className="block">{a}</b>
                  <span className="text-[.95rem] text-muted">{b}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="services" className={`${sec} bg-surface`}>
        <div className={C}>
          <Head k={t("services.k")} title={t("services.title")} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {loading &&
              [0, 1, 2, 3].map((i) => <Skel key={i} className="h-[340px]" />)}
            {services.map((s, i) => {
              const title = pick(s.title_ar, s.title_en, lang);
              const cover = s.images[0];
              return (
                <Reveal key={s.slug} delay={i * 80} className="h-full">
                  <Link
                    to={`/services/${s.slug}`}
                    className="group block h-full overflow-hidden rounded-card border border-line bg-bg shadow-card transition duration-300 hover:-translate-y-1.5"
                  >
                    <h3 className="px-[18px] pb-3 pt-[18px] text-xl font-bold">
                      {title}
                    </h3>
                    <div className="aspect-[4/3] overflow-hidden bg-surface">
                      {cover && (
                        <img
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          src={mediaUrl(cover.path)}
                          alt={pick(cover.alt_ar, cover.alt_en, lang) || title}
                          loading="lazy"
                        />
                      )}
                    </div>
                    <div className="p-[18px]">
                      <p className="mb-3 text-[.92rem] text-muted">
                        {lines(pick(s.items_ar, s.items_en, lang)).join(" – ")}
                      </p>
                      <span className="inline-flex items-center gap-1.5 font-bold text-brand-t">
                        {t("cta.view")}{" "}
                        <FiArrowRight className="rtl:-scale-x-100" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
          <Btns t={t} contact={contact} />
        </div>
      </section>

      {(loading || works.length > 0) && (
        <section id="portfolio" className={sec}>
          <div className={C}>
            <Head
              k={t("works.k")}
              title={t("works.title")}
              sub={t("works.sub")}
            />

            {loading ? (
              <div className="grid grid-cols-2 gap-5 px-10 sm:grid-cols-4 sm:px-12">
                {[0, 1, 2, 3].map((i) => (
                  <Skel key={i} className="aspect-[4/5]" />
                ))}
              </div>
            ) : (
              <div className="relative px-10 sm:px-12">
                <Swiper
                  key={`${lang}-${works.length}`}
                  dir={lang === "ar" ? "rtl" : "ltr"}
                  onSwiper={(s) => (swiperRef.current = s)}
                  modules={[Autoplay, Keyboard]}
                  keyboard
                  loop={works.length > 8}
                  slidesPerView={2}
                  spaceBetween={16}
                  autoplay={{
                    delay: 3500,
                    pauseOnMouseEnter: true,
                    disableOnInteraction: false,
                  }}
                  breakpoints={{
                    400: { slidesPerView: 2, spaceBetween: 20 },
                    700: { slidesPerView: 3, spaceBetween: 24 },
                    1000: { slidesPerView: 4, spaceBetween: 24 },
                  }}
                >
                  {works.map((w, i) => (
                    <SwiperSlide key={w.id}>
                      <button
                        className="group block aspect-[4/5] w-full overflow-hidden rounded-card bg-surface"
                        onClick={() => setLb(i)}
                      >
                        <img
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                          src={workUrls[i]}
                          alt={workAlts[i]}
                          loading={i < 3 ? "eager" : "lazy"}
                        />
                      </button>
                    </SwiperSlide>
                  ))}
                </Swiper>

                <button
                  type="button"
                  aria-label={t("prev")}
                  onClick={() => swiperRef.current?.slidePrev()}
                  className="bg-brand text-white absolute start-0 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white shadow-card  duration-300 hover:bg-orange-700"
                >
                  <FiChevronLeft className="rtl:-scale-x-100 text-2xl" />
                </button>

                <button
                  type="button"
                  aria-label={t("next")}
                  onClick={() => swiperRef.current?.slideNext()}
                  className="bg-brand text-white absolute end-0 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white shadow-card duration-300 hover:bg-orange-700"
                >
                  <FiChevronRight className="rtl:-scale-x-100 text-2xl" />
                </button>
              </div>
            )}

            <Lightbox
              items={workUrls}
              index={lb}
              setIndex={setLb}
              alts={workAlts}
            />
          </div>
        </section>
      )}

      <section id="process" className={`${sec} bg-surface`}>
        <div className={C}>
          <Head k={t("process.k")} title={t("process.title")} />
          <div className="grid gap-5 md:grid-cols-4">
            {t("process.steps").map(([a, b], i) => (
              <Reveal key={i} delay={i * 80} className="h-full">
                <div className="h-full rounded-card border border-line bg-bg p-6">
                  <em className="mb-3 grid h-11 w-11 place-items-center rounded-xl bg-brand font-extrabold not-italic text-onp">
                    {i + 1}
                  </em>
                  <h3 className="text-xl font-bold">{a}</h3>
                  <p className="text-[.95rem] text-muted">{b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className={sec}>
        <div className={C}>
          <Head k={t("rev.k")} title={t("rev.title")} />

          {loading ? (
            <div className="grid grid-cols-1 gap-5 px-10 sm:grid-cols-2 sm:px-12 lg:grid-cols-3">
              {[0, 1, 2].map((i) => (
                <Skel key={i} className="h-[150px]" />
              ))}
            </div>
          ) : (
            <div className="relative px-10 sm:px-12">
              <Swiper
                key={`rev-${lang}-${reviews.length}`}
                dir={lang === "ar" ? "rtl" : "ltr"}
                onSwiper={(s) => (revSwiperRef.current = s)}
                modules={[Autoplay, Keyboard]}
                keyboard
                loop={reviews.length > 3}
                slidesPerView={1}
                spaceBetween={16}
                autoHeight={false}
                autoplay={{
                  delay: 4000,
                  pauseOnMouseEnter: true,
                  disableOnInteraction: false,
                }}
                breakpoints={{
                  700: { slidesPerView: 2, spaceBetween: 20 },
                  1000: { slidesPerView: 3, spaceBetween: 24 },
                }}
                className="!items-stretch"
              >
                {reviews.map((r) => (
                  <SwiperSlide key={r.id} className="!h-auto">
                    <figure className="relative h-full rounded-card border border-line bg-surface p-5 sm:p-6">
                      <div
                        className="mb-3 flex gap-0.5 text-[#f5a623]"
                        aria-label={`${r.rating}/5`}
                      >
                        {[...Array(r.rating || 5)].map((_, j) => (
                          <FaStar key={j} />
                        ))}
                      </div>
                      <blockquote className="mb-3.5 text-[1.05rem]">
                        {pick(r.text_ar, r.text_en, lang)}
                      </blockquote>
                      <figcaption className="font-bold">
                        {pick(r.name_ar, r.name_en, lang)}
                      </figcaption>
                      <FaQuoteRight className="absolute bottom-[18px] end-5 text-3xl text-brand opacity-20" />
                    </figure>
                  </SwiperSlide>
                ))}
              </Swiper>

              <button
                type="button"
                aria-label={t("prev")}
                onClick={() => revSwiperRef.current?.slidePrev()}
                className="bg-brand text-white absolute start-0 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white shadow-card duration-300 hover:bg-orange-700"
              >
                <FiChevronLeft className="rtl:-scale-x-100 text-2xl" />
              </button>

              <button
                type="button"
                aria-label={t("next")}
                onClick={() => revSwiperRef.current?.slideNext()}
                className="bg-brand text-white absolute end-0 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white shadow-card duration-300 hover:bg-orange-700"
              >
                <FiChevronRight className="rtl:-scale-x-100 text-2xl" />
              </button>
            </div>
          )}
        </div>
      </section>

      <section
        id="contact"
        className="relative scroll-mt-nav overflow-hidden bg-brand py-[70px] text-center text-onp"
      >
        <span className="absolute -start-12 -top-16 h-56 w-56 rotate-[15deg] rounded-[44px] bg-white/10" />
        <span className="absolute -bottom-20 -end-10 h-56 w-56 rotate-[15deg] rounded-[44px] bg-white/10" />
        <div className={`${C} relative`}>
          <Reveal>
            <h2 className={H2}>{t("band.title")}</h2>
            <p>{t("band.p")}</p>
            <Btns t={t} band contact={contact} />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
