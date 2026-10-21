import { createContext, useContext, useEffect, useState } from "react";
const ar = {
  nav: {
    home: "الرئيسية",
    about: "ماذا عنا",
    services: "خدماتنا",
    portfolio: "معرض الأعمال",
    testimonials: "آراء العملاء",
    contact: "تواصل",
  },
  cta: {
    order: "اطلب خدمتك",
    wa: "تواصل واتساب",
    call: "اتصل بنا الآن",
    view: "شاهد الأعمال",
  },
  tip: {
    light: "الوضع الفاتح",
    dark: "الوضع الداكن",
    lang: "EN",
    menu: "القائمة",
    wa: "تواصل معنا",
    top: "العودة لأعلى",
  },
  brand: "مربع الفكرة للدعاية والإعلان",
  short: "وكالة مربع الفكرة",
  waMsg: "السلام عليكم، أرغب في الاستفسار عن خدماتكم.",
  waSvc: "السلام عليكم، أرغب في الاستفسار عن خدمة: ",
  hero: {
    title: "نطبع أفكارك بجودة ترى وتدوم",
    p: "نقدم في مربع الفكرة حلول طباعة متكاملة تلبي جميع احتياجاتك، سواء كانت كميات كبيرة أو مقاسات متنوعة، مع الالتزام بأعلى معايير الجودة والدقة في التنفيذ. دعنا نكون شريكك الموثوق في تحويل أفكارك إلى مطبوعات.",
  },
  about: {
    k: "ماذا عنا",
    title: "شريكك في تحويل الفكرة إلى مطبوع",
    p1: "في مربع الفكرة للدعاية والإعلان نجمع بين الإبداع والتنفيذ الدقيق لنقدم لك مطبوعات تعبّر عن علامتك وتترك أثرًا. نبدأ من فكرتك، ونهتم بأدق التفاصيل حتى يصلك المنتج النهائي كما تخيلته.",
    p2: "من الورقيات والاستيكرات إلى لوحات الإكريليك واللوحات الإعلانية، نوفر لك خدمات متكاملة في مكان واحد، بمقاسات وكميات تناسب احتياجك.",
    f: [
      ["جودة تدوم", "خامات مختارة وطباعة واضحة تعيش طويلًا"],
      ["تنفيذ مرتب وسريع", "التزام بالمواعيد وتنظيم في العمل"],
      ["دقة في التفاصيل", "اهتمام بكل مقاس وكل لون"],
      ["حلول متنوعة", "كل احتياجاتك الإعلانية في مكان واحد"],
    ],
  },
  services: {
    k: "خدماتنا",
    title: "حلول طباعة متكاملة",
    back: "العودة للخدمات",
    photos: "صورة",
    more: "خدمات أخرى",
    ask: "عاجبك شغلنا؟ اطلب الآن",
    items: {
      papers: {
        title: "الورقيات",
        list: [
          "كروت شخصية",
          "فولدرات",
          "ظروف",
          "أوراق رسمية",
          "بروشور",
          "علب منتجات",
          "نوت بوك",
        ],
      },
      stickers: {
        title: "الاستيكرات",
        list: [
          "استيكرات بأنواعها",
          "يوفي",
          "DTF",
          "استيكرات سيارات",
          "استيكر جداري",
        ],
      },
      acrylic: {
        title: "الإكريليك",
        list: ["بوكسات إكريليك", "ستاند إكريليك", "لوحات إرشادية"],
      },
      signs: {
        title: "اللوحات",
        list: ["لوحات إعلانية", "لوحات إرشادية", "أحرف بارزة", "لوحات نيون"],
      },
    },
  },
  works: {
    k: "معرض الأعمال",
    title: "شاهد بعض أعمالنا",
    sub: "أعمال نفذناها لعملائنا",
    alt: "من أعمالنا",
  },
  process: {
    k: "كيف نشتغل",
    title: "من الفكرة إلى التسليم",
    steps: [
      ["أرسل فكرتك", "تواصل معنا واحكي لنا تفاصيل طلبك"],
      ["نراجع ونحدد", "نتفق على الخامة والمقاس والكمية"],
      ["ننفذ بدقة", "طباعة وتنفيذ بأعلى معايير الجودة"],
      ["نسلّم لك", "نسلّم طلبك في الموعد المتفق عليه"],
    ],
  },
  rev: {
    k: "آراء العملاء",
    title: "ثقة عملائنا بنا",
    list: [
      { n: "نور محمد", t: "جيد جدًا، شكرًا" },
      { n: "سعيد محمد", t: "ممتاز، شكرًا لكم" },
      { n: "عبدالله", t: "الله يعطيكم العافية، شغل مرتب وسريع" },
      { n: "أحمد محمد", t: "ممتاز، الله يعطيكم العافية" },
      { n: "هاشم محمد", t: "خدمة ممتازة، شكرًا جزيلًا" },
      { n: "طلال الحمد", t: "تجربة ممتازة وتعامل رائع، شكرًا لكم" },
    ],
  },
  band: { title: "جاهز تطبع فكرتك؟", p: "تواصل معنا الآن ونبدأ بتنفيذ طلبك." },
  foot: {
    desc: "نقدم في مربع الفكرة حلول طباعة متكاملة تلبي جميع احتياجاتك، مع الالتزام بأعلى معايير الجودة والدقة في التنفيذ.",
    links: "روابط سريعة",
    contact: "تواصل معنا",
    hours: "أوقات الدوام",
    h1: "السبت إلى الخميس: 10 ص – 7 م",
    h2: "الجمعة: إجازة",
    follow: "تابعونا على",
    rights: "جميع الحقوق محفوظة.",
  },
  nf: "الصفحة غير موجودة",
  close: "إغلاق",
  prev: "السابق",
  next: "التالي",
};
const en = {
  nav: {
    home: "Home",
    about: "About",
    services: "Services",
    portfolio: "Portfolio",
    testimonials: "Testimonials",
    contact: "Contact",
  },
  cta: {
    order: "Order now",
    wa: "Chat on WhatsApp",
    call: "Call us now",
    view: "View work",
  },
  tip: {
    light: "Light mode",
    dark: "Dark mode",
    lang: "عربي",
    menu: "Menu",
    wa: "Contact us",
    top: "Back to top",
  },
  brand: "Murabba Al-Fikra Advertising",
  short: "Murabba Al-Fikra Agency",
  waMsg: "Hello, I'd like to inquire about your services.",
  waSvc: "Hello, I'd like to inquire about: ",
  hero: {
    title: "We print your ideas with quality you can see, and that lasts.",
    p: "At Murabba Al-Fikra we offer complete printing solutions for every need, whether large quantities or custom sizes, with the highest standards of quality and precision. Let us be your trusted partner in turning your ideas into print.",
  },
  about: {
    k: "About us",
    title: "Your partner in turning ideas into print",
    p1: "At Murabba Al-Fikra Advertising we combine creativity with precise execution to deliver printed work that reflects your brand and leaves an impression. We start from your idea and care about every detail, so the final product reaches you just as you imagined it.",
    p2: "From stationery and stickers to acrylic and signage, we offer complete services in one place, in the sizes and quantities that suit your needs.",
    f: [
      [
        "Lasting quality",
        "Selected materials and sharp printing that stand the test of time",
      ],
      ["Neat, fast execution", "Organized work and respect for deadlines"],
      ["Attention to detail", "Care for every size and every color"],
      ["Diverse solutions", "All your advertising needs in one place"],
    ],
  },
  services: {
    k: "Our services",
    title: "Complete printing solutions",
    back: "Back to services",
    photos: "photos",
    more: "Other services",
    ask: "Like our work? Order now",
    items: {
      papers: {
        title: "Stationery",
        list: [
          "Business cards",
          "Folders",
          "Envelopes",
          "Letterheads",
          "Brochures",
          "Product boxes",
          "Notebooks",
        ],
      },
      stickers: {
        title: "Stickers",
        list: [
          "Stickers of all kinds",
          "UV",
          "DTF",
          "Car stickers",
          "Wall stickers",
        ],
      },
      acrylic: {
        title: "Acrylic",
        list: ["Acrylic boxes", "Acrylic stands", "Directional signs"],
      },
      signs: {
        title: "Signage",
        list: [
          "Advertising signs",
          "Directional signs",
          "Raised letters",
          "Neon signs",
        ],
      },
    },
  },
  works: {
    k: "Portfolio",
    title: "See some of our work",
    sub: "Projects we delivered for our clients",
    alt: "Our work",
  },
  process: {
    k: "How we work",
    title: "From idea to delivery",
    steps: [
      ["Share your idea", "Contact us and tell us about your request"],
      ["We review & confirm", "We agree on material, size and quantity"],
      ["Precise production", "Printing and execution to the highest standards"],
      ["Delivery", "We deliver your order on the agreed date"],
    ],
  },
  rev: {
    k: "Client reviews",
    title: "Our clients' trust",
    list: [
      { n: "Nour Mohammed", t: "Very good, thank you" },
      { n: "Saeed Mohammed", t: "Excellent, thank you" },
      { n: "Abdullah", t: "God bless you — neat and fast work" },
      { n: "Ahmed Mohammed", t: "Excellent, God bless you" },
      { n: "Hashem Mohammed", t: "Excellent service, thank you very much" },
      {
        n: "Talal Al-Hamad",
        t: "Excellent experience and wonderful service, thank you",
      },
    ],
  },
  band: {
    title: "Ready to print your idea?",
    p: "Contact us now and we'll start on your order.",
  },
  foot: {
    desc: "At Murabba Al-Fikra we offer complete printing solutions that meet all your needs, with the highest standards of quality and precision.",
    links: "Quick links",
    contact: "Contact us",
    hours: "Working hours",
    h1: "Saturday – Thursday: 10 AM – 7 PM",
    h2: "Friday: Closed",
    follow: "Follow us",
    rights: "All rights reserved.",
  },
  nf: "Page not found",
  close: "Close",
  prev: "Previous",
  next: "Next",
};
const DICT = { ar, en };
const Ctx = createContext(null);
export const useApp = () => useContext(Ctx);
const save = (k, v) => {
  try {
    localStorage.setItem(k, v);
  } catch {}
};
export function AppProvider({ children }) {
  const [lang, setLang] = useState(() =>
    document.documentElement.lang === "en" ? "en" : "ar",
  );
  const [theme, setTheme] = useState(
    () => document.documentElement.dataset.theme || "light",
  );
  useEffect(() => {
    const d = document.documentElement;
    d.lang = lang;
    d.dir = lang === "ar" ? "rtl" : "ltr";
    save("lang", lang);
    document.title =
      lang === "ar"
        ? "مربع الفكرة للدعاية والإعلان | طباعة ودعاية وإعلان"
        : "Murabba Al-Fikra | Printing & Advertising";
  }, [lang]);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    save("theme", theme);
  }, [theme]);
  const t = (key) =>
    key.split(".").reduce((o, k) => o?.[k], DICT[lang]) ??
    key.split(".").reduce((o, k) => o?.[k], ar) ??
    key;
  return (
    <Ctx.Provider
      value={{
        lang,
        theme,
        t,
        toggleLang: () => setLang((l) => (l === "ar" ? "en" : "ar")),
        toggleTheme: () => setTheme((x) => (x === "dark" ? "light" : "dark")),
      }}
    >
      {children}
    </Ctx.Provider>
  );
}
