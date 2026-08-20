import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Camera, Images } from "lucide-react";
import Gallery from "../components/site/Gallery";

export default function GalleryPage() {
  return (
    <>
      {/* =========================
          NAVBAR SPACING
      ========================== */}
      <div className="h-20 bg-slate-950"></div>


      {/* =========================
          HERO
      ========================== */}
      <section className="relative overflow-hidden bg-slate-950 px-6 py-24 md:py-32">

        {/* Background Glow */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#00c874]/10 rounded-full blur-3xl"></div>

        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#00c874]/5 rounded-full blur-3xl"></div>

        <div className="relative max-w-6xl mx-auto">

          <div className="max-w-4xl">

            <div className="flex items-center gap-3 mb-6">

              <div className="w-10 h-[2px] bg-[#00c874]"></div>

              <p className="text-sm font-bold tracking-[0.3em] text-[#00c874] uppercase">
                PUNJAB HOUSE
              </p>

            </div>

            <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.05]">
              See The Space
              <br />
              <span className="text-[#00c874]">
                For Yourself.
              </span>
            </h1>

            <p className="max-w-2xl mt-8 text-lg md:text-xl text-slate-300 leading-relaxed">
              Explore the Punjab House venue and see the space available
              for weddings, corporate events, family gatherings,
              Nikah ceremonies, and private functions.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">

              <Link
                to="/book"
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-7
                  py-3.5
                  rounded-full
                  bg-[#00c874]
                  hover:bg-[#00b568]
                  text-white
                  font-bold
                  transition
                  shadow-lg
                  shadow-[#00c874]/20
                "
              >
               Book Your Event

                <ArrowRight size={18} />
              </Link>

              <a
                href="#venue-gallery"
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-7
                  py-3.5
                  rounded-full
                  border
                  border-slate-700
                  hover:border-[#00c874]
                  hover:bg-white/5
                  text-white
                  font-semibold
                  transition
                "
              >
                View Photos
                <Camera size={18} />
              </a>

            </div>

          </div>

        </div>
      </section>


      {/* =========================
          GALLERY INTRODUCTION
      ========================== */}
      <section className="bg-white px-6 py-20 md:py-28">

        <div className="max-w-6xl mx-auto">

          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* LEFT */}
            <div>

              <p className="text-sm font-bold tracking-[0.3em] text-[#00c874] uppercase">
                THE VENUE
              </p>

              <h2 className="mt-4 text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                Take A Look
                <br />
                At Punjab House
              </h2>

              <p className="mt-7 text-slate-500 text-lg leading-8">
                Pictures can give you a better idea of the space,
                layout, and overall venue environment before you
                make your decision.
              </p>

              <p className="mt-5 text-slate-500 text-lg leading-8">
                Browse the gallery and get a feel for the venue
                space where you can arrange your own event.
              </p>

            </div>


            {/* RIGHT */}
            <div className="bg-slate-950 rounded-[2rem] p-8 md:p-10">

              <div className="w-14 h-14 rounded-2xl bg-[#00c874]/10 flex items-center justify-center">
                <Images
                  size={28}
                  className="text-[#00c874]"
                />
              </div>

              <p className="mt-7 text-[#00c874] text-sm font-bold tracking-[0.25em] uppercase">
                VENUE PHOTOS
              </p>

              <h3 className="mt-4 text-3xl md:text-4xl font-black text-white">
                Explore The Space
              </h3>

              <p className="mt-5 text-slate-400 leading-7">
                See the venue from different views and get a better
                understanding of the space available for your event.
              </p>

            </div>

          </div>

        </div>
      </section>


      {/* =========================
          GALLERY
      ========================== */}
      <section
        id="venue-gallery"
        className="bg-slate-50 px-6 py-20 md:py-24"
      >

        <div className="max-w-7xl mx-auto">

          <div className="text-center max-w-3xl mx-auto mb-14">

            <p className="text-sm font-bold tracking-[0.3em] text-[#00c874] uppercase">
              OUR GALLERY
            </p>

            <h2 className="mt-4 text-4xl md:text-5xl font-black text-slate-900">
              Explore Punjab House
            </h2>

            <p className="mt-5 text-lg text-slate-500 leading-relaxed">
              Take a closer look at the venue and imagine how you
              would arrange your own event here.
            </p>

          </div>

          <Gallery />

        </div>
      </section>


      {/* =========================
          CTA
      ========================== */}
      <section className="bg-slate-950 px-6 py-20 md:py-24">

        <div className="max-w-4xl mx-auto text-center">

          <p className="text-[#00c874] text-sm font-bold tracking-[0.3em] uppercase">
            PLAN YOUR EVENT
          </p>

          <h2 className="mt-4 text-4xl md:text-5xl font-black text-white">
            Like The Space?
            <br />
            <span className="text-[#00c874]">
              Reserve Your Date.
            </span>
          </h2>

          <p className="max-w-2xl mx-auto mt-5 text-lg text-slate-400 leading-relaxed">
            Check the availability of Punjab House and reserve
            the venue for your upcoming event.
          </p>

          <Link
            to="/book"
            className="
              inline-flex
              items-center
              gap-2
              mt-8
              px-8
              py-4
              rounded-full
              bg-[#00c874]
              hover:bg-[#00b568]
              text-white
              font-bold
              transition-all
              duration-300
              shadow-lg
              shadow-[#00c874]/20
            "
          >
            Book The Venue
            <ArrowRight size={18} />
          </Link>

        </div>
      </section>
    </>
  );
}