import React from "react";
import About from "../components/site/About";
import {
  Building2,
  CalendarDays,
  MapPin,
  ArrowRight,
  Check,
} from "lucide-react";

export default function AboutPage() {
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

        {/* Background glow */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#00c874]/10 rounded-full blur-3xl"></div>

        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#00c874]/5 rounded-full blur-3xl"></div>

        <div className="relative max-w-6xl mx-auto">

          <div className="max-w-4xl">

            <div className="flex items-center gap-3 mb-6">

              <div className="w-10 h-[2px] bg-[#00c874]"></div>

              <p className="text-sm font-bold tracking-[0.3em] text-[#00c874] uppercase">
                About Punjab House
              </p>

            </div>

            <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.05]">
              A Venue Made For
              <br />

              <span className="text-[#00c874]">
                Your Special Moments.
              </span>
            </h1>

            <p className="max-w-2xl mt-8 text-lg md:text-xl text-slate-300 leading-relaxed">
              Punjab House offers a spacious and flexible venue for
              weddings, corporate gatherings, family events and
              private functions.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">

              <a
                href="/book"
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
                Reserve Date
                <ArrowRight size={18} />
              </a>

              <a
                href="/gallery"
                className="
                  inline-flex
                  items-center
                  px-7
                  py-3.5
                  rounded-full
                  border
                  border-slate-700
                  hover:border-[#00c874]
                  text-white
                  font-semibold
                  transition
                "
              >
                View Gallery
              </a>

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
                The Venue
              </p>

              <h2 className="mt-4 text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                A Spacious Place
                <br />
                For Your Event
              </h2>

              <p className="mt-7 text-slate-500 text-lg leading-8">
                Punjab House is designed as a spacious venue where
                you can bring your own vision to life. Whether you are
                planning a wedding, corporate gathering, family event
                or private function, the space gives you the flexibility
                to arrange it your way.
              </p>

              <p className="mt-5 text-slate-500 text-lg leading-8">
                We provide the venue area. You decide how you want
                your event to look, feel and operate.
              </p>

            </div>


            {/* RIGHT */}
            <div className="relative">

              <div className="bg-slate-950 rounded-[2rem] p-8 md:p-10">

                <p className="text-[#00c874] text-sm font-bold tracking-[0.25em] uppercase">
                  Punjab House
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

                    <div className="mt-1 w-7 h-7 rounded-full bg-[#00c874]/10 flex items-center justify-center">
                      <Check
                        size={16}
                        className="text-[#00c874]"
                      />
                    </div>

                    <p className="text-slate-300">
                      Spacious venue area
                    </p>

                  </div>

                  <div className="flex items-start gap-4">

                    <div className="mt-1 w-7 h-7 rounded-full bg-[#00c874]/10 flex items-center justify-center">
                      <Check
                        size={16}
                        className="text-[#00c874]"
                      />
                    </div>

                    <p className="text-slate-300">
                      Flexible event arrangements
                    </p>

                  </div>

                  <div className="flex items-start gap-4">

                    <div className="mt-1 w-7 h-7 rounded-full bg-[#00c874]/10 flex items-center justify-center">
                      <Check
                        size={16}
                        className="text-[#00c874]"
                      />
                    </div>

                    <p className="text-slate-300">
                      Suitable for different occasions
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =========================
          VENUE FEATURES
      ========================== */}
      <section className="bg-slate-50 px-6 py-20 md:py-24">

        <div className="max-w-6xl mx-auto">

          <div className="text-center max-w-2xl mx-auto">

            <p className="text-sm font-bold tracking-[0.3em] text-[#00c874] uppercase">
              Why Punjab House
            </p>

            <h2 className="mt-4 text-4xl md:text-5xl font-black text-slate-900">
              A Venue That Fits Your Plans
            </h2>

            <p className="mt-5 text-slate-500 text-lg">
              A straightforward venue solution for events of
              different types and sizes.
            </p>

          </div>


          <div className="grid md:grid-cols-3 gap-6 mt-14">

            {/* Card 1 */}
            <div
              className="
                bg-white
                rounded-3xl
                p-8
                border border-slate-200
                hover:-translate-y-2
                hover:shadow-xl
                hover:border-[#00c874]/30
                transition-all
                duration-300
              "
            >

              <div className="w-14 h-14 rounded-2xl bg-[#00c874]/10 flex items-center justify-center">

                <Building2
                  size={28}
                  className="text-[#00c874]"
                />

              </div>

              <h3 className="mt-7 text-2xl font-bold text-slate-900">
                Spacious Area
              </h3>

              <p className="mt-4 text-slate-500 leading-7">
                A spacious venue area that gives you room to
                organize your event comfortably.
              </p>

            </div>


            {/* Card 2 */}
            <div
              className="
                bg-white
                rounded-3xl
                p-8
                border border-slate-200
                hover:-translate-y-2
                hover:shadow-xl
                hover:border-[#00c874]/30
                transition-all
                duration-300
              "
            >

              <div className="w-14 h-14 rounded-2xl bg-[#00c874]/10 flex items-center justify-center">

                <CalendarDays
                  size={28}
                  className="text-[#00c874]"
                />

              </div>

              <h3 className="mt-7 text-2xl font-bold text-slate-900">
                Flexible Events
              </h3>

              <p className="mt-4 text-slate-500 leading-7">
                Suitable for weddings, corporate events, family
                gatherings and private functions.
              </p>

            </div>


            {/* Card 3 */}
            <div
              className="
                bg-white
                rounded-3xl
                p-8
                border border-slate-200
                hover:-translate-y-2
                hover:shadow-xl
                hover:border-[#00c874]/30
                transition-all
                duration-300
              "
            >

              <div className="w-14 h-14 rounded-2xl bg-[#00c874]/10 flex items-center justify-center">

                <MapPin
                  size={28}
                  className="text-[#00c874]"
                />

              </div>

              <h3 className="mt-7 text-2xl font-bold text-slate-900">
                Convenient Location
              </h3>

              <p className="mt-4 text-slate-500 leading-7">
                A convenient venue location for guests attending
                your event.
              </p>

            </div>

          </div>

        </div>
      </section>


      {/* =========================
          OUR MOTIVE
      ========================== */}
      <section className="bg-white px-6 py-20 md:py-28">

        <div className="max-w-6xl mx-auto">

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* IMAGE */}
            <div className="relative">

              <div className="overflow-hidden rounded-[2rem] shadow-2xl">

                <img
                  src="https://static.india.com/wp-content/uploads/2024/02/QT-Maryam-Nawaz-Sharif.jpg?impolicy=Medium_Widthonly&w=200&h=400"
                  alt="Hon'ble Chief Minister Punjab Maryam Nawaz Sharif"
                  className="
                    w-full
                    h-[590px]
                    md:h-[920px]
                    object-cover
                    object-top
                    transition-transform
                    duration-700
                    hover:scale-105
                  "
                />

              </div>

              {/* Floating label */}
              <div
                className="
                  absolute
                  -bottom-6
                  left-5
                  md:left-8
                  bg-slate-950
                  text-white
                  rounded-2xl
                  px-6
                  py-5
                  shadow-2xl
                  border border-slate-800
                "
              >

                <p className="text-[#00c874] text-xs font-bold tracking-[0.25em] uppercase">
                  OUR MOTIVE
                </p>

                <p className="mt-1 text-lg font-bold">
                  Sustainable Facility
                </p>

              </div>

            </div>


            {/* CONTENT */}
            <div>

              <div className="flex items-center gap-3">

                <div className="w-10 h-[2px] bg-[#00c874]"></div>

                <p className="text-sm font-bold tracking-[0.3em] text-[#00c874] uppercase">
                  Our Motive
                </p>

              </div>

              <h2 className="mt-5 text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                Creating A
                <span className="text-[#00c874]">
                  {" "}Self-Sustaining
                </span>
                <br />
                Facility
              </h2>

              <p className="mt-7 text-lg text-slate-500 leading-8">
                Under the dynamic and visionary leadership of
                Hon'ble Chief Minister Punjab, Maryam Nawaz Sharif,
                Punjab has witnessed remarkable progress through
                effective governance and people-centric initiatives.
              </p>

              <p className="mt-5 text-lg text-slate-500 leading-8">
                Inspired by her vision of strengthening public
                institutions, Punjab House Karachi aims to organize
                events that will help make the facility financially
                self-sufficient.
              </p>

              <p className="mt-5 text-lg text-slate-500 leading-8">
                The revenue generated from these events will contribute
                towards meeting the operational and maintenance
                expenses of Punjab House Karachi, enabling it to
                continue providing quality accommodation and services
                while ensuring the comfort and convenience of visiting
                guests.
              </p>

              {/* Highlight */}
              <div className="mt-8 rounded-2xl bg-[#00c874]/5 border border-[#00c874]/15 p-6">

                <div className="flex items-start gap-4">

                  <div className="w-11 h-11 rounded-xl bg-[#00c874]/10 flex items-center justify-center shrink-0">

                    <Building2
                      size={21}
                      className="text-[#00c874]"
                    />

                  </div>

                  <div>

                    <h3 className="font-bold text-slate-900">
                      Purpose Behind The Venue
                    </h3>

                    <p className="mt-2 text-sm text-slate-500 leading-6">
                      The objective is to support the continued
                      operation and maintenance of Punjab House
                      Karachi while providing a suitable venue for
                      individuals, families, companies and
                      organizations.
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =========================
          EXISTING ABOUT COMPONENT
      ========================== */}
      <About />


      {/* =========================
          IMPORTANT NOTE
      ========================== */}
      <section className="bg-slate-50 px-6 py-20">

        <div className="max-w-5xl mx-auto">

          <div
            className="
              rounded-[2rem]
              border border-slate-200
              bg-white
              p-8
              md:p-12
              shadow-sm
            "
          >

            <div className="max-w-3xl mx-auto text-center">

              <p className="text-sm font-bold tracking-[0.3em] text-[#00c874] uppercase">
                OUR APPROACH
              </p>

              <h2 className="mt-4 text-3xl md:text-4xl font-black text-slate-900">
                We Provide The Venue.
              </h2>

              <p className="mt-6 text-lg text-slate-500 leading-8">
                Punjab House provides the venue area for your event.
                Decoration, catering, seating arrangements,
                entertainment and other event requirements can be
                arranged according to your own preferences.
              </p>

            </div>

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
            Ready To Find Your
            <span className="text-[#00c874]">
              {" "}Event Space?
            </span>
          </h2>

          <p className="mt-5 text-slate-400 text-lg leading-relaxed">
            Check the availability of Punjab House and start
            planning your event.
          </p>

          <a
            href="/book"
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
            Book Your Event
            <ArrowRight size={18} />
          </a>

        </div>
      </section>
    </>
  );
}