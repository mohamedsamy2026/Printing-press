export const SITE = {
  call: '0540330205',
  callHref: 'tel:+966540330205',
  waNum: '966540330205',
  waShow: '+966 54 033 0205',
  email: 'm.alebttkar@gmail.com',
  social: {
    instagram: 'https://www.instagram.com/murbalfikra',
    tiktok: 'https://www.tiktok.com/@murbalfikra'
  }
}

export const waLink = (text) =>
  `https://wa.me/${SITE.waNum}?text=${encodeURIComponent(text)}`

const imgs = (dir, n, cover) => [
  `${dir}-${cover}-made.jpg`,
  ...Array.from({ length: n }, (_, i) => `${dir}-${i + 1}.jpg`)
].map(f => `/images/${dir}/${f}`)

export const SERVICES = [
  { slug: 'papers', dir: 'pap', images: imgs('pap', 12, 13) },
  { slug: 'stickers', dir: 'stk', images: imgs('stk', 6, 7) },
  { slug: 'acrylic', dir: 'acr', images: imgs('acr', 9, 10) },
  { slug: 'signs', dir: 'sgn', images: imgs('sgn', 5, 6) }
]

export const WORKS = Array.from(
  { length: 33 },
  (_, i) => `/images/works/work-${String(i + 1).padStart(2, '0')}.jpg`
)