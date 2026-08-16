import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import Layout from "./components/site/Layout";

import Home from "./pages/Home";
import BookNow from "./pages/BookNow";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import GalleryPage from "./pages/GalleryPage";
import TestimonialsPage from "./pages/TestimonialsPage";
import ContactPage from "./pages/ContactPage";




const NotFound = () => {
  return (
    <div className="min-h-[80vh] bg-slate-50 flex items-center justify-center px-6">

      <div className="text-center max-w-xl">

        {/* 404 */}
        <h1 className="text-7xl md:text-9xl font-black text-slate-900">
          404
        </h1>

        {/* Green line */}
        <div className="w-16 h-1 bg-[#00c874] mx-auto mt-5 rounded-full"></div>

        <h2 className="mt-7 text-2xl md:text-3xl font-bold text-slate-900">
          Page Not Found
        </h2>

        <p className="mt-4 text-slate-500 leading-relaxed">
          Sorry, the page you are looking for doesn't exist or may have
          been moved to another location.
        </p>

        <Link
          to="/"
          className="
            inline-flex
            items-center
            justify-center
            mt-8
            px-8
            py-3.5
            rounded-full
            bg-[#00c874]
            hover:bg-[#00ad65]
            text-white
            font-bold
            transition-all
            duration-300
            shadow-lg
            shadow-[#00c874]/20
          "
        >
          Back to Home
        </Link>

      </div>

    </div>
  );
};


/* =========================
   APP ROUTES
========================= */

export default function App() {
  return (
    <Routes>

      {/* Main Website Layout */}
      <Route element={<Layout />}>

        {/* Home */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* Booking */}
        <Route
          path="/book"
          element={<BookNow />}
        />

        {/* About */}
        <Route
          path="/about"
          element={<AboutPage />}
        />

        {/* Services */}
        <Route
          path="/services"
          element={<ServicesPage />}
        />

        {/* Gallery */}
        <Route
          path="/gallery"
          element={<GalleryPage />}
        />

        {/* Testimonials */}
        <Route
          path="/testimonials"
          element={<TestimonialsPage />}
        />

        {/* Contact */}
        <Route
          path="/contact"
          element={<ContactPage />}
        />

        {/* 404 */}
        <Route
          path="*"
          element={<NotFound />}
        />

      </Route>

    </Routes>
  );
}