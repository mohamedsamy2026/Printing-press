// بيانات احتياطية: تظهر لو Supabase مش متصل أو الجداول فاضية (قبل الاستيراد).
// بنفس شكل صفوف قاعدة البيانات. مسارات الصور هنا محلية (تبدأ بـ /).
export const FALLBACK = {
 "settings": {
  "call_number": "0540330205",
  "wa_number": "+966 54 033 0205",
  "email": "m.alebttkar@gmail.com",
  "hours_ar": "السبت إلى الخميس: 10 ص – 7 م\nالجمعة: إجازة",
  "hours_en": "Saturday – Thursday: 10 AM – 7 PM\nFriday: Closed"
 },
 "socials": [],
 "services": [
  {
   "id": "local-papers",
   "slug": "papers",
   "title_ar": "الورقيات",
   "title_en": "Stationery",
   "items_ar": "كروت شخصية\nفولدرات\nظروف\nأوراق رسمية\nبروشور\nعلب منتجات\nنوت بوك",
   "items_en": "Business cards\nFolders\nEnvelopes\nLetterheads\nBrochures\nProduct boxes\nNotebooks",
   "sort_order": 0,
   "images": [
    {
     "id": "local-pap-0",
     "path": "/images/pap/pap-13-made.jpg",
     "alt_ar": "مجموعة ورقيات بهوية البراند",
     "alt_en": "Brand stationery collection",
     "sort_order": 0
    },
    {
     "id": "local-pap-1",
     "path": "/images/pap/pap-1.jpg",
     "alt_ar": "شنطة ورقية برتقالية بشعار مربع الفكرة",
     "alt_en": "Orange paper bag with the Murabba Al-Fikra logo",
     "sort_order": 1
    },
    {
     "id": "local-pap-2",
     "path": "/images/pap/pap-2.jpg",
     "alt_ar": "علب عطور وتغليف فاخر",
     "alt_en": "Perfume boxes and premium packaging",
     "sort_order": 2
    },
    {
     "id": "local-pap-3",
     "path": "/images/pap/pap-3.jpg",
     "alt_ar": "علب هدايا للسبح والإكسسوارات",
     "alt_en": "Gift boxes for prayer beads and accessories",
     "sort_order": 3
    },
    {
     "id": "local-pap-4",
     "path": "/images/pap/pap-4.jpg",
     "alt_ar": "هوية ورقيات أسود وذهبي",
     "alt_en": "Black and gold stationery identity",
     "sort_order": 4
    },
    {
     "id": "local-pap-5",
     "path": "/images/pap/pap-5.jpg",
     "alt_ar": "دفتر وورق مراسلات بشعار ذهبي",
     "alt_en": "Notebook and letterhead with gold logo",
     "sort_order": 5
    },
    {
     "id": "local-pap-6",
     "path": "/images/pap/pap-6.jpg",
     "alt_ar": "كروت شخصية وظرف مراسلات",
     "alt_en": "Business cards and envelope",
     "sort_order": 6
    },
    {
     "id": "local-pap-7",
     "path": "/images/pap/pap-7.jpg",
     "alt_ar": "دفتر سلك وأقلام وعلب هدايا",
     "alt_en": "Spiral notebook, pens and gift boxes",
     "sort_order": 7
    },
    {
     "id": "local-pap-8",
     "path": "/images/pap/pap-8.jpg",
     "alt_ar": "تيشيرت بتطريز برتقالي",
     "alt_en": "T-shirt with orange embroidery",
     "sort_order": 8
    },
    {
     "id": "local-pap-9",
     "path": "/images/pap/pap-9.jpg",
     "alt_ar": "تيشيرت بتطريز الشعار على الصدر",
     "alt_en": "T-shirt with chest logo embroidery",
     "sort_order": 9
    },
    {
     "id": "local-pap-10",
     "path": "/images/pap/pap-10.jpg",
     "alt_ar": "ظهر التيشيرت بتطريز الشعار",
     "alt_en": "T-shirt back embroidery",
     "sort_order": 10
    },
    {
     "id": "local-pap-11",
     "path": "/images/pap/pap-11.jpg",
     "alt_ar": "كاب بتطريز الشعار من كل الزوايا",
     "alt_en": "Embroidered cap from every angle",
     "sort_order": 11
    },
    {
     "id": "local-pap-12",
     "path": "/images/pap/pap-12.jpg",
     "alt_ar": "كاب أسود بتطريز برتقالي",
     "alt_en": "Black cap with orange embroidery",
     "sort_order": 12
    }
   ]
  },
  {
   "id": "local-stickers",
   "slug": "stickers",
   "title_ar": "الاستيكرات",
   "title_en": "Stickers",
   "items_ar": "استيكرات بأنواعها\nيوفي\nDTF\nاستيكرات سيارات\nاستيكر جداري",
   "items_en": "Stickers of all kinds\nUV\nDTF\nCar stickers\nWall stickers",
   "sort_order": 1,
   "images": [
    {
     "id": "local-stk-0",
     "path": "/images/stk/stk-6-made.jpg",
     "alt_ar": "أنواع مميزة: ذهبي، هولوجرام، شفاف",
     "alt_en": "Premium types: gold, hologram, clear",
     "sort_order": 0
    },
    {
     "id": "local-stk-1",
     "path": "/images/stk/stk-1.jpg",
     "alt_ar": "أنواع الاستيكرات وقص الداي كت",
     "alt_en": "Sticker types and die-cutting",
     "sort_order": 1
    },
    {
     "id": "local-stk-2",
     "path": "/images/stk/stk-2.jpg",
     "alt_ar": "ورقي، PP مقاوم للماء، شفاف",
     "alt_en": "Paper, waterproof PP, clear",
     "sort_order": 2
    },
    {
     "id": "local-stk-3",
     "path": "/images/stk/stk-3.jpg",
     "alt_ar": "فينيل PVC، ذهبي وفضي، هولوجرام أمني",
     "alt_en": "PVC vinyl, gold and silver, security hologram",
     "sort_order": 3
    },
    {
     "id": "local-stk-4",
     "path": "/images/stk/stk-4.jpg",
     "alt_ar": "ثابت، قابل للإزالة، شكل مخصص",
     "alt_en": "Permanent, removable, custom shape",
     "sort_order": 4
    },
    {
     "id": "local-stk-5",
     "path": "/images/stk/stk-5.jpg",
     "alt_ar": "أمثلة قص الداي كت",
     "alt_en": "Die-cut shape examples",
     "sort_order": 5
    }
   ]
  },
  {
   "id": "local-acrylic",
   "slug": "acrylic",
   "title_ar": "الإكريليك",
   "title_en": "Acrylic",
   "items_ar": "بوكسات إكريليك\nستاند إكريليك\nلوحات إرشادية",
   "items_en": "Acrylic boxes\nAcrylic stands\nDirectional signs",
   "sort_order": 2,
   "images": [
    {
     "id": "local-acr-0",
     "path": "/images/acr/acr-10-made.jpg",
     "alt_ar": "لوحة حائط ولوحة مكتبية إكريليك",
     "alt_en": "Acrylic wall sign and desk sign",
     "sort_order": 0
    },
    {
     "id": "local-acr-1",
     "path": "/images/acr/acr-1.jpg",
     "alt_ar": "لوحات إرشادية أسود وذهبي",
     "alt_en": "Directional signs, black and gold",
     "sort_order": 1
    },
    {
     "id": "local-acr-2",
     "path": "/images/acr/acr-2.jpg",
     "alt_ar": "لوحات إرشادية برتقالي",
     "alt_en": "Directional signs, brand orange",
     "sort_order": 2
    },
    {
     "id": "local-acr-3",
     "path": "/images/acr/acr-3.jpg",
     "alt_ar": "لوحة بحروف بارزة: غرفة الاجتماعات",
     "alt_en": "Raised-letter sign: Conference Room",
     "sort_order": 3
    },
    {
     "id": "local-acr-4",
     "path": "/images/acr/acr-4.jpg",
     "alt_ar": "لوحة بارزة مع المواصفات",
     "alt_en": "Raised sign with specifications",
     "sort_order": 4
    },
    {
     "id": "local-acr-5",
     "path": "/images/acr/acr-5.jpg",
     "alt_ar": "لوحة مكتبية إكريليك ثلجي",
     "alt_en": "Frosted acrylic desk sign",
     "sort_order": 5
    },
    {
     "id": "local-acr-6",
     "path": "/images/acr/acr-6.jpg",
     "alt_ar": "لوحة مكتبية ومميزاتها",
     "alt_en": "Desk sign and its features",
     "sort_order": 6
    },
    {
     "id": "local-acr-7",
     "path": "/images/acr/acr-7.jpg",
     "alt_ar": "لوحات إرشادية برتقالي للمكاتب والمطاعم",
     "alt_en": "Orange signs for offices and restaurants",
     "sort_order": 7
    },
    {
     "id": "local-acr-8",
     "path": "/images/acr/acr-8.jpg",
     "alt_ar": "لوحات إرشادية أسود وأبيض",
     "alt_en": "Black and white directional signs",
     "sort_order": 8
    },
    {
     "id": "local-acr-9",
     "path": "/images/acr/acr-9.jpg",
     "alt_ar": "تركيب فعلي في مكاتب ومطعم",
     "alt_en": "Installed in offices and a restaurant",
     "sort_order": 9
    }
   ]
  },
  {
   "id": "local-signs",
   "slug": "signs",
   "title_ar": "اللوحات",
   "title_en": "Signage",
   "items_ar": "لوحات إعلانية\nلوحات إرشادية\nأحرف بارزة\nلوحات نيون",
   "items_en": "Advertising signs\nDirectional signs\nRaised letters\nNeon signs",
   "sort_order": 3,
   "images": [
    {
     "id": "local-sgn-0",
     "path": "/images/sgn/sgn-6-made.jpg",
     "alt_ar": "ستاند المعرض ورول أب",
     "alt_en": "Exhibition stand and roll-up",
     "sort_order": 0
    },
    {
     "id": "local-sgn-1",
     "path": "/images/sgn/sgn-1.jpg",
     "alt_ar": "رول أب برتقالي للخدمات",
     "alt_en": "Orange services roll-up",
     "sort_order": 1
    },
    {
     "id": "local-sgn-2",
     "path": "/images/sgn/sgn-2.jpg",
     "alt_ar": "رول أب: الشعار والعنوان والمنتجات",
     "alt_en": "Roll-up: logo, headline and products",
     "sort_order": 2
    },
    {
     "id": "local-sgn-3",
     "path": "/images/sgn/sgn-3.jpg",
     "alt_ar": "رول أب: شبكة الخدمات",
     "alt_en": "Roll-up: services grid",
     "sort_order": 3
    },
    {
     "id": "local-sgn-4",
     "path": "/images/sgn/sgn-4.jpg",
     "alt_ar": "ستاند معرض وكاونتر ورول أب",
     "alt_en": "Exhibition stand, counter and roll-up",
     "sort_order": 4
    },
    {
     "id": "local-sgn-5",
     "path": "/images/sgn/sgn-5.jpg",
     "alt_ar": "خلفية معرض منحنية مع كاونتر",
     "alt_en": "Curved exhibition backdrop with counter",
     "sort_order": 5
    }
   ]
  }
 ],
 "works": [
  {
   "id": "local-w-0",
   "path": "/images/works/work-01.jpg",
   "alt_ar": "واجهة محل بلوحة نيون زرقاء",
   "alt_en": "Storefront with blue neon sign",
   "sort_order": 0
  },
  {
   "id": "local-w-1",
   "path": "/images/works/work-02.jpg",
   "alt_ar": "لوحة نيون وردية على واجهة مبنى",
   "alt_en": "Pink neon sign on a building",
   "sort_order": 1
  },
  {
   "id": "local-w-2",
   "path": "/images/works/work-03.jpg",
   "alt_ar": "سيارة بشعار مطبوع",
   "alt_en": "Van with printed logo graphics",
   "sort_order": 2
  },
  {
   "id": "local-w-3",
   "path": "/images/works/work-04.jpg",
   "alt_ar": "لوحات أسماء مكتبية ومعدنية",
   "alt_en": "Office and metal nameplates",
   "sort_order": 3
  },
  {
   "id": "local-w-4",
   "path": "/images/works/work-05.jpg",
   "alt_ar": "ستاند عجلة حظ للأطفال",
   "alt_en": "Kids prize-wheel stand",
   "sort_order": 4
  },
  {
   "id": "local-w-5",
   "path": "/images/works/work-06.jpg",
   "alt_ar": "غلاف جلد أزرق للتقرير السنوي",
   "alt_en": "Blue leather annual report cover",
   "sort_order": 5
  },
  {
   "id": "local-w-6",
   "path": "/images/works/work-07.jpg",
   "alt_ar": "لوحة واجهة بحروف بارزة",
   "alt_en": "Facade sign with raised letters",
   "sort_order": 6
  },
  {
   "id": "local-w-7",
   "path": "/images/works/work-08.jpg",
   "alt_ar": "فولدر جلد أخضر بشعار ذهبي",
   "alt_en": "Green leather folder with gold logo",
   "sort_order": 7
  },
  {
   "id": "local-w-8",
   "path": "/images/works/work-09.jpg",
   "alt_ar": "علامات ولوحات صغيرة لعلامات تجارية",
   "alt_en": "Small brand labels and plaques",
   "sort_order": 8
  },
  {
   "id": "local-w-9",
   "path": "/images/works/work-10.jpg",
   "alt_ar": "جناح معرض بخلفية مطبوعة",
   "alt_en": "Exhibition booth with printed backdrop",
   "sort_order": 9
  },
  {
   "id": "local-w-10",
   "path": "/images/works/work-11.jpg",
   "alt_ar": "منديل مطبوع بشعار كافيه",
   "alt_en": "Napkin printed with a café logo",
   "sort_order": 10
  },
  {
   "id": "local-w-11",
   "path": "/images/works/work-12.jpg",
   "alt_ar": "لوحات إرشادية وأرقام غرف",
   "alt_en": "Directional signs and room numbers",
   "sort_order": 11
  },
  {
   "id": "local-w-12",
   "path": "/images/works/work-13.jpg",
   "alt_ar": "حبل تعليق بطاقة مطبوع",
   "alt_en": "Printed lanyard and badge holder",
   "sort_order": 12
  },
  {
   "id": "local-w-13",
   "path": "/images/works/work-14.jpg",
   "alt_ar": "رول أب إعلاني",
   "alt_en": "Advertising roll-up banners",
   "sort_order": 13
  },
  {
   "id": "local-w-14",
   "path": "/images/works/work-15.jpg",
   "alt_ar": "إطار لوحة تذكارية",
   "alt_en": "Framed commemorative piece",
   "sort_order": 14
  },
  {
   "id": "local-w-15",
   "path": "/images/works/work-16.jpg",
   "alt_ar": "جناح في معرض داخل قاعة",
   "alt_en": "Exhibition booth inside a hall",
   "sort_order": 15
  },
  {
   "id": "local-w-16",
   "path": "/images/works/work-17.jpg",
   "alt_ar": "ستاند عجلة حظ للأطفال (زاوية أخرى)",
   "alt_en": "Kids prize-wheel stand, another angle",
   "sort_order": 16
  },
  {
   "id": "local-w-17",
   "path": "/images/works/work-18.jpg",
   "alt_ar": "ملصق جداري لنادي رياضي",
   "alt_en": "Wall graphics for a sports hall",
   "sort_order": 17
  },
  {
   "id": "local-w-18",
   "path": "/images/works/work-19.jpg",
   "alt_ar": "رول أب ترحيبي",
   "alt_en": "Welcome roll-up banners",
   "sort_order": 18
  },
  {
   "id": "local-w-19",
   "path": "/images/works/work-20.jpg",
   "alt_ar": "لوحة إكريليك شفافة مطبوعة",
   "alt_en": "Printed clear acrylic plaque",
   "sort_order": 19
  },
  {
   "id": "local-w-20",
   "path": "/images/works/work-21.jpg",
   "alt_ar": "لوحة اسم مكتبية إكريليك أبيض وأسود",
   "alt_en": "Black and white acrylic desk nameplate",
   "sort_order": 20
  },
  {
   "id": "local-w-21",
   "path": "/images/works/work-22.jpg",
   "alt_ar": "لوحة اسم مكتبية إكريليك بتصميم زهور",
   "alt_en": "Acrylic desk nameplate with floral design",
   "sort_order": 21
  },
  {
   "id": "local-w-22",
   "path": "/images/works/work-23.jpg",
   "alt_ar": "مطبوعات وبوسترات",
   "alt_en": "Printed posters and cards",
   "sort_order": 22
  },
  {
   "id": "local-w-23",
   "path": "/images/works/work-24.jpg",
   "alt_ar": "ستاند إكريليك بـ QR لتقييم جوجل",
   "alt_en": "Acrylic stand with Google review QR",
   "sort_order": 23
  },
  {
   "id": "local-w-24",
   "path": "/images/works/work-25.jpg",
   "alt_ar": "لوحات اسم مكتبية على جدار خشبي",
   "alt_en": "Office plaques on a wooden wall",
   "sort_order": 24
  },
  {
   "id": "local-w-25",
   "path": "/images/works/work-26.jpg",
   "alt_ar": "ملصق جداري مطبوع بحجم كبير",
   "alt_en": "Large printed wall graphics",
   "sort_order": 25
  },
  {
   "id": "local-w-26",
   "path": "/images/works/work-27.jpg",
   "alt_ar": "لوحة واجهة محل بحروف وألوان",
   "alt_en": "Storefront sign with printed lettering",
   "sort_order": 26
  },
  {
   "id": "local-w-27",
   "path": "/images/works/work-28.jpg",
   "alt_ar": "كاونتر استقبال بشعار ذهبي",
   "alt_en": "Reception counter with gold logo",
   "sort_order": 27
  },
  {
   "id": "local-w-28",
   "path": "/images/works/work-29.jpg",
   "alt_ar": "درع تذكاري أسود",
   "alt_en": "Black commemorative plaque",
   "sort_order": 28
  },
  {
   "id": "local-w-29",
   "path": "/images/works/work-30.jpg",
   "alt_ar": "عجلة حظ ملوّنة",
   "alt_en": "Colorful prize wheel",
   "sort_order": 29
  },
  {
   "id": "local-w-30",
   "path": "/images/works/work-31.jpg",
   "alt_ar": "ستاند عجلة حظ للأطفال (زاوية ثالثة)",
   "alt_en": "Kids prize-wheel stand, third angle",
   "sort_order": 30
  },
  {
   "id": "local-w-31",
   "path": "/images/works/work-32.jpg",
   "alt_ar": "لوحة نيون ذهبية بكلمة Soup",
   "alt_en": "Golden neon sign reading Soup",
   "sort_order": 31
  },
  {
   "id": "local-w-32",
   "path": "/images/works/work-33.jpg",
   "alt_ar": "بوستر مطبوع على ستاند",
   "alt_en": "Printed poster on a stand",
   "sort_order": 32
  }
 ],
 "reviews": [
  {
   "id": "local-r-0",
   "name_ar": "نور محمد",
   "name_en": "Nour Mohammed",
   "text_ar": "جيد جدًا، شكرًا",
   "text_en": "Very good, thank you",
   "rating": 5,
   "sort_order": 0
  },
  {
   "id": "local-r-1",
   "name_ar": "سعيد محمد",
   "name_en": "Saeed Mohammed",
   "text_ar": "ممتاز، شكرًا لكم",
   "text_en": "Excellent, thank you",
   "rating": 5,
   "sort_order": 1
  },
  {
   "id": "local-r-2",
   "name_ar": "عبدالله",
   "name_en": "Abdullah",
   "text_ar": "الله يعطيكم العافية، شغل مرتب وسريع",
   "text_en": "God bless you — neat and fast work",
   "rating": 5,
   "sort_order": 2
  },
  {
   "id": "local-r-3",
   "name_ar": "أحمد محمد",
   "name_en": "Ahmed Mohammed",
   "text_ar": "ممتاز، الله يعطيكم العافية",
   "text_en": "Excellent, God bless you",
   "rating": 5,
   "sort_order": 3
  },
  {
   "id": "local-r-4",
   "name_ar": "هاشم محمد",
   "name_en": "Hashem Mohammed",
   "text_ar": "خدمة ممتازة، شكرًا جزيلًا",
   "text_en": "Excellent service, thank you very much",
   "rating": 5,
   "sort_order": 4
  },
  {
   "id": "local-r-5",
   "name_ar": "طلال الحمد",
   "name_en": "Talal Al-Hamad",
   "text_ar": "تجربة ممتازة وتعامل رائع، شكرًا لكم",
   "text_en": "Excellent experience and wonderful service, thank you",
   "rating": 5,
   "sort_order": 5
  }
 ]
}
