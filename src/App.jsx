import { Routes, Route, Link, useLocation } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import ServicePage from "./pages/ServicePage.jsx";
import { useApp } from "./i18n.jsx";
import { C, btnP } from "./ui.js";

const AdminApp = lazy(() => import("./admin/AdminApp.jsx"));

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const t = setTimeout(
        () =>
          document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" }),
        80,
      );
      return () => clearTimeout(t);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}
function NotFound() {
  const { t } = useApp();
  return (
    <main className={`${C} min-h-[70vh] pb-20 pt-[calc(theme(spacing.nav)+80px)] text-center`}>
      <h1 className="mb-5 text-3xl font-extrabold">{t("nf")}</h1>
      <Link className={btnP} to="/">{t("nav.home")}</Link>
    </main>
  );
}
function PublicSite() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services/:slug" element={<ServicePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}
export default function App() {
  return (
    <Routes>
      <Route
        path="/admin/*"
        element={
          <Suspense fallback={<div className="grid min-h-svh place-items-center text-muted">...</div>}>
            <AdminApp />
          </Suspense>
        }
      />
      <Route path="*" element={<PublicSite />} />
    </Routes>
  );
}
