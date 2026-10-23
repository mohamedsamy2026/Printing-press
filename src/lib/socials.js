import { FaInstagram, FaTiktok, FaFacebookF, FaSnapchatGhost, FaYoutube, FaLinkedinIn, FaTelegramPlane, FaWhatsapp } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

// المنصات المتاحة للأدمن (الأيقونة جاهزة في الكود)
export const PLATFORMS = [
  { id: 'instagram', label: 'إنستجرام', Icon: FaInstagram },
  { id: 'tiktok', label: 'تيك توك', Icon: FaTiktok },
  { id: 'facebook', label: 'فيسبوك', Icon: FaFacebookF },
  { id: 'x', label: 'X (تويتر)', Icon: FaXTwitter },
  { id: 'snapchat', label: 'سناب شات', Icon: FaSnapchatGhost },
  { id: 'youtube', label: 'يوتيوب', Icon: FaYoutube },
  { id: 'linkedin', label: 'لينكدإن', Icon: FaLinkedinIn },
  { id: 'telegram', label: 'تيليجرام', Icon: FaTelegramPlane },
  { id: 'whatsapp', label: 'واتساب (قناة)', Icon: FaWhatsapp },
]
export const platformOf = (id) => PLATFORMS.find((p) => p.id === id)
