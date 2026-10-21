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
import { SITE, SERVICES, WORKS, waLink } from "../data.js";
import { altFor } from "../alts.js";
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
const Btns = ({ t, band }) => (
  <div className={`mt-7 flex flex-wrap gap-4 ${band ? "justify-center" : ""}`}>
    <a className={band ? btnW : btnP} href={waLink(t("waMsg"))} {...ext}>
      <FaWhatsapp />
      {t("cta.wa")}
    </a>
    <a className={band ? `${btnO} text-inherit` : btnO} href={SITE.callHref}>
      <FiPhone />
      {t("cta.call")}
    </a>
  </div>
);
export default function Home() {
  const { t, lang } = useApp(),
    [lb, setLb] = useState(null);
  const swiperRef = useRef(null);

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
        className="relative flex min-h-svh scroll-mt-nav items-center overflow-hidden bg-cover bg-center text-white"
        style={{
          backgroundImage:
            "linear-gradient(180deg,rgba(0,0,0,.55),rgba(0,0,0,.75)),url(/images/hero/hero-storefront.jpg)",
        }}
      >
        <div
          className={`${C} animate-up pb-20 pt-[calc(theme(spacing.nav)+24px)] motion-reduce:animate-none`}
        >
          <span className={`${kick} !text-[#ffb089]`}>{t("short")}</span>
          <h1 className="mb-4 mt-3 text-[clamp(2rem,5vw,4rem)] font-extrabold leading-tight rtl:max-w-[16ch] ltr:max-w-[20ch]">
            {t("hero.title")}
          </h1>
          <p className="max-w-[60ch] text-lg text-neutral-200">{t("hero.p")}</p>
          <Btns t={t} />
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
            {SERVICES.map((s, i) => (
              <Reveal key={s.slug} delay={i * 80} className="h-full">
                <Link
                  to={`/services/${s.slug}`}
                  className="group block h-full overflow-hidden rounded-card border border-line bg-bg shadow-card transition duration-300 hover:-translate-y-1.5"
                >
                  <h3 className="px-[18px] pb-3 pt-[18px] text-xl font-bold">
                    {t(`services.items.${s.slug}.title`)}
                  </h3>
                  <div className="aspect-[4/3] overflow-hidden bg-surface">
                    <img
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      src={s.images[0]}
                      alt={altFor(s.dir, 0, lang)}
                      loading="lazy"
                    />
                  </div>
                  <div className="p-[18px]">
                    <p className="mb-3 text-[.92rem] text-muted">
                      {t(`services.items.${s.slug}.list`).join(" – ")}
                    </p>
                    <span className="inline-flex items-center gap-1.5 font-bold text-brand-t">
                      {t("cta.view")}{" "}
                      <FiArrowRight className="rtl:-scale-x-100" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <Btns t={t} />
        </div>
      </section>

      <section id="portfolio" className={sec}>
        <div className={C}>
          <Head
            k={t("works.k")}
            title={t("works.title")}
            sub={t("works.sub")}
          />

          <div className="relative px-10 sm:px-12">
            <Swiper
              key={lang}
              dir={lang === "ar" ? "rtl" : "ltr"}
              onSwiper={(s) => (swiperRef.current = s)}
              modules={[Autoplay, Keyboard]}
              keyboard
              loop
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
              {WORKS.map((src, i) => (
                <SwiperSlide key={src}>
                  <button
                    className="group block aspect-[4/5] w-full overflow-hidden rounded-card bg-surface"
                    onClick={() => setLb(i)}
                  >
                    <img
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                      src={src}
                      alt={altFor("works", i, lang)}
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

          <Lightbox
            items={WORKS}
            index={lb}
            setIndex={setLb}
            alts={WORKS.map((_, i) => altFor("works", i, lang))}
          />
        </div>
      </section>

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
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {t("rev.list").map((r, i) => (
              <Reveal key={i} delay={(i % 3) * 80} className="h-full">
                <figure className="relative h-full rounded-card border border-line bg-surface p-6">
                  <div
                    className="mb-3 flex gap-0.5 text-[#f5a623]"
                    aria-label="5/5"
                  >
                    {[...Array(5)].map((_, j) => (
                      <FaStar key={j} />
                    ))}
                  </div>
                  <blockquote className="mb-3.5 text-[1.05rem]">
                    {r.t}
                  </blockquote>
                  <figcaption className="font-bold">{r.n}</figcaption>
                  <FaQuoteRight className="absolute bottom-[18px] end-5 text-3xl text-brand opacity-20" />
                </figure>
              </Reveal>
            ))}
          </div>
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
            <Btns t={t} band />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
