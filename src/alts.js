// [عربي, إنجليزي] بنفس ترتيب الصور (الغلاف أولًا ثم 1..n)
export const ALTS = {
  pap: [['مجموعة ورقيات بهوية البراند', 'Brand stationery collection'], ['شنطة ورقية برتقالية بشعار مربع الفكرة', 'Orange paper bag with the Murabba Al-Fikra logo'], ['علب عطور وتغليف فاخر', 'Perfume boxes and premium packaging'], ['علب هدايا للسبح والإكسسوارات', 'Gift boxes for prayer beads and accessories'], ['هوية ورقيات أسود وذهبي', 'Black and gold stationery identity'], ['دفتر وورق مراسلات بشعار ذهبي', 'Notebook and letterhead with gold logo'], ['كروت شخصية وظرف مراسلات', 'Business cards and envelope'], ['دفتر سلك وأقلام وعلب هدايا', 'Spiral notebook, pens and gift boxes'], ['تيشيرت بتطريز برتقالي', 'T-shirt with orange embroidery'], ['تيشيرت بتطريز الشعار على الصدر', 'T-shirt with chest logo embroidery'], ['ظهر التيشيرت بتطريز الشعار', 'T-shirt back embroidery'], ['كاب بتطريز الشعار من كل الزوايا', 'Embroidered cap from every angle'], ['كاب أسود بتطريز برتقالي', 'Black cap with orange embroidery']],
  stk: [['أنواع مميزة: ذهبي، هولوجرام، شفاف', 'Premium types: gold, hologram, clear'], ['أنواع الاستيكرات وقص الداي كت', 'Sticker types and die-cutting'], ['ورقي، PP مقاوم للماء، شفاف', 'Paper, waterproof PP, clear'], ['فينيل PVC، ذهبي وفضي، هولوجرام أمني', 'PVC vinyl, gold and silver, security hologram'], ['ثابت، قابل للإزالة، شكل مخصص', 'Permanent, removable, custom shape'], ['أمثلة قص الداي كت', 'Die-cut shape examples'], ['شرح قالب القص', 'How the die template works']],
  acr: [['لوحة حائط ولوحة مكتبية إكريليك', 'Acrylic wall sign and desk sign'], ['لوحات إرشادية أسود وذهبي', 'Directional signs, black and gold'], ['لوحات إرشادية برتقالي', 'Directional signs, brand orange'], ['لوحة بحروف بارزة: غرفة الاجتماعات', 'Raised-letter sign: Conference Room'], ['لوحة بارزة مع المواصفات', 'Raised sign with specifications'], ['لوحة مكتبية إكريليك ثلجي', 'Frosted acrylic desk sign'], ['لوحة مكتبية ومميزاتها', 'Desk sign and its features'], ['لوحات إرشادية برتقالي للمكاتب والمطاعم', 'Orange signs for offices and restaurants'], ['لوحات إرشادية أسود وأبيض', 'Black and white directional signs'], ['تركيب فعلي في مكاتب ومطعم', 'Installed in offices and a restaurant']],
  sgn: [['ستاند المعرض ورول أب', 'Exhibition stand and roll-up'], ['رول أب برتقالي للخدمات', 'Orange services roll-up'], ['رول أب: الشعار والعنوان والمنتجات', 'Roll-up: logo, headline and products'], ['رول أب: شبكة الخدمات', 'Roll-up: services grid'], ['ستاند معرض وكاونتر ورول أب', 'Exhibition stand, counter and roll-up'], ['خلفية معرض منحنية مع كاونتر', 'Curved exhibition backdrop with counter']],
  works: [
    ['واجهة محل بلوحة نيون زرقاء', 'Storefront with blue neon sign'], // 1
    ['لوحة نيون وردية على واجهة مبنى', 'Pink neon sign on a building'], // 2
    ['سيارة بشعار مطبوع', 'Van with printed logo graphics'], // 3
    ['لوحات أسماء مكتبية ومعدنية', 'Office and metal nameplates'], // 4
    ['ستاند عجلة حظ للأطفال', 'Kids prize-wheel stand'], // 5
    ['غلاف جلد أزرق للتقرير السنوي', 'Blue leather annual report cover'], // 6
    ['لوحة واجهة بحروف بارزة', 'Facade sign with raised letters'], // 7
    ['فولدر جلد أخضر بشعار ذهبي', 'Green leather folder with gold logo'], // 8
    ['علامات ولوحات صغيرة لعلامات تجارية', 'Small brand labels and plaques'], // 9
    ['جناح معرض بخلفية مطبوعة', 'Exhibition booth with printed backdrop'], // 10
    ['منديل مطبوع بشعار كافيه', 'Napkin printed with a café logo'], // 11
    ['لوحات إرشادية وأرقام غرف', 'Directional signs and room numbers'], // 12
    ['حبل تعليق بطاقة مطبوع', 'Printed lanyard and badge holder'], // 13
    ['رول أب إعلاني', 'Advertising roll-up banners'], // 14
    ['إطار لوحة تذكارية', 'Framed commemorative piece'], // 15
    ['جناح في معرض داخل قاعة', 'Exhibition booth inside a hall'], // 16
    ['ستاند عجلة حظ للأطفال (زاوية أخرى)', 'Kids prize-wheel stand, another angle'], // 17
    ['ملصق جداري لنادي رياضي', 'Wall graphics for a sports hall'], // 18
    ['رول أب ترحيبي', 'Welcome roll-up banners'], // 19
    ['لوحة إكريليك شفافة مطبوعة', 'Printed clear acrylic plaque'], // 20
    ['لوحة اسم مكتبية إكريليك أبيض وأسود', 'Black and white acrylic desk nameplate'], // 21
    ['لوحة اسم مكتبية إكريليك بتصميم زهور', 'Acrylic desk nameplate with floral design'], // 22
    ['مطبوعات وبوسترات', 'Printed posters and cards'], // 23
    ['ستاند إكريليك بـ QR لتقييم جوجل', 'Acrylic stand with Google review QR'], // 24
    ['لوحات اسم مكتبية على جدار خشبي', 'Office plaques on a wooden wall'], // 25
    ['ملصق جداري مطبوع بحجم كبير', 'Large printed wall graphics'], // 26
    ['لوحة واجهة محل بحروف وألوان', 'Storefront sign with printed lettering'], // 27
    ['كاونتر استقبال بشعار ذهبي', 'Reception counter with gold logo'], // 28
    ['درع تذكاري أسود', 'Black commemorative plaque'], // 29
    ['عجلة حظ ملوّنة', 'Colorful prize wheel'], // 30
    ['ستاند عجلة حظ للأطفال (زاوية ثالثة)', 'Kids prize-wheel stand, third angle'], // 31
    ['لوحة نيون ذهبية بكلمة Soup', 'Golden neon sign reading Soup'], // 32
    ['بوستر مطبوع على ستاند', 'Printed poster on a stand'], // 33
    ['لوحة نيون ذهبية بخط عربي', 'Golden neon sign in Arabic calligraphy'], // 34
    ['بطاقات ورقية مطبوعة', 'Printed paper tags'], // 35
  ],
}
export const altFor = (dir, i, lang) => ALTS[dir]?.[i]?.[lang === 'ar' ? 0 : 1] ?? ''
