import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Quote, Check } from "lucide-react";
import Testimonials from "../components/site/Testimonials";

export default function TestimonialsPage() {
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
                OUR GUESTS
              </p>

            </div>

            <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.05]">
              What Our Guests
              <br />
              <span className="text-[#00c874]">
                Say About Us.
              </span>
            </h1>

            <p className="max-w-2xl mt-8 text-lg md:text-xl text-slate-300 leading-relaxed">
              Hear from guests who chose Punjab House for weddings,
              corporate gatherings, family events, and private functions.
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
                Book Now
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/gallery"
                className="
                  inline-flex
                  items-center
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
                View Gallery
              </Link>

            </div>

          </div>

        </div>
      </section>


      {/* =========================
          INTRODUCTION
      ========================== */}
      <section className="bg-white px-6 py-20 md:py-28">

        <div className="max-w-6xl mx-auto">

          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* LEFT */}
            <div>

              <p className="text-sm font-bold tracking-[0.3em] text-[#00c874] uppercase">
                GUEST EXPERIENCES
              </p>

              <h2 className="mt-4 text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                Experiences That
                <br />
                Matter
              </h2>

              <p className="mt-7 text-lg text-slate-500 leading-8">
                Our guests choose Punjab House because they need a
                spacious venue where they can arrange their own event
                according to their requirements.
              </p>

              <p className="mt-5 text-lg text-slate-500 leading-8">
                From weddings and corporate gatherings to family
                functions, every event can be planned around the
                space provided by Punjab House.
              </p>

            </div>


            {/* RIGHT */}
            <div className="bg-slate-950 rounded-[2rem] p-8 md:p-10">

              <div className="w-14 h-14 rounded-2xl bg-[#00c874]/10 flex items-center justify-center">
                <Quote
                  size={28}
                  className="text-[#00c874]"
                />
              </div>

              <p className="mt-7 text-[#00c874] text-sm font-bold tracking-[0.25em] uppercase">
                OUR APPROACH
              </p>

              <h3 className="mt-4 text-3xl md:text-4xl font-black text-white">
                Your Space.
                <br />
                Your Event.
                <br />
                Your Way.
              </h3>

              <div className="mt-8 space-y-5">

                <div className="flex items-start gap-4">

                  <div className="w-8 h-8 rounded-full bg-[#00c874]/10 flex items-center justify-center shrink-0">
                    <Check size={17} className="text-[#00c874]" />
                  </div>

                  <p className="text-slate-300">
                    Spacious venue area
                  </p>

                </div>

                <div className="flex items-start gap-4">

                  <div className="w-8 h-8 rounded-full bg-[#00c874]/10 flex items-center justify-center shrink-0">
                    <Check size={17} className="text-[#00c874]" />
                  </div>

                  <p className="text-slate-300">
                    Flexible event arrangements
                  </p>

                </div>

                <div className="flex items-start gap-4">

                  <div className="w-8 h-8 rounded-full bg-[#00c874]/10 flex items-center justify-center shrink-0">
                    <Check size={17} className="text-[#00c874]" />
                  </div>

                  <p className="text-slate-300">
                    Suitable for different occasions
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =========================
          TESTIMONIALS
      ========================== */}
      <section className="bg-slate-50 px-6 py-20 md:py-24">

        <div className="max-w-7xl mx-auto">

          <div className="text-center max-w-3xl mx-auto mb-14">

            <p className="text-sm font-bold tracking-[0.3em] text-[#00c874] uppercase">
              REVIEWS
            </p>

            <h2 className="mt-4 text-4xl md:text-5xl font-black text-slate-900">
              What They Say
            </h2>

            <p className="mt-5 text-lg text-slate-500 leading-relaxed">
              A few words from guests who have chosen Punjab House
              for their events.
            </p>

          </div>

          {/* Existing testimonial cards */}
          <Testimonials />

        </div>
      </section>


      {/* =========================
          VENUE NOTE
      ========================== */}
      <section className="bg-white px-6 py-20 md:py-24">

        <div className="max-w-5xl mx-auto">

          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 md:p-12 text-center">

            <p className="text-sm font-bold tracking-[0.3em] text-[#00c874] uppercase">
              OUR VENUE
            </p>

            <h2 className="mt-4 text-3xl md:text-4xl font-black text-slate-900">
              A Space You Can Make Your Own
            </h2>

            <p className="max-w-3xl mx-auto mt-6 text-lg text-slate-500 leading-8">
              Punjab House provides the venue area for your event.
              Event organizers can arrange their own decoration,
              catering, seating, entertainment, and other requirements
              according to their preferences.
            </p>

          </div>

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
            Ready To Plan Your
            <span className="text-[#00c874]">
              {" "}Event?
            </span>
          </h2>

          <p className="mt-5 text-slate-400 text-lg leading-relaxed">
            Check the availability of Punjab House and submit
            your booking request.
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
              transition
              shadow-lg
              shadow-[#00c874]/20
            "
          >
            Book Now
            <ArrowRight size={18} />
          </Link>

        </div>
      </section>
    </>
  );
}