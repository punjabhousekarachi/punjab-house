import React from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  Briefcase,
  Users,
  Sparkles,
  PartyPopper,
  Check,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: Heart,
    title: "Wedding Ceremonies",
    description:
      "A spacious venue for weddings, receptions, and special wedding gatherings.",
  },
  {
    icon: Briefcase,
    title: "Corporate Events",
    description:
      "A suitable venue for meetings, conferences, launches, and corporate gatherings.",
  },
  {
    icon: Users,
    title: "Family Gatherings",
    description:
      "A welcoming space for family reunions, Eid gatherings, and private functions.",
  },
  {
    icon: Sparkles,
    title: "Nikah Ceremony",
    description:
      "A peaceful venue space for Nikah ceremonies and special family occasions.",
  },
  {
    icon: PartyPopper,
    title: "Private Functions",
    description:
      "Flexible venue space for private events and celebrations according to your requirements.",
  },
];

export default function ServicesPage() {
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

        <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#00c874]/10 rounded-full blur-3xl"></div>

        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#00c874]/5 rounded-full blur-3xl"></div>

        <div className="relative max-w-6xl mx-auto">

          <div className="max-w-4xl">

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-[2px] bg-[#00c874]"></div>

              <p className="text-sm font-bold tracking-[0.3em] text-[#00c874] uppercase">
                OUR VENUE
              </p>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.05]">
              A Space For Your
              <br />
              <span className="text-[#00c874]">
                Special Event.
              </span>
            </h1>

            <p className="max-w-2xl mt-8 text-lg md:text-xl text-slate-300 leading-relaxed">
              Punjab House provides a spacious venue for weddings,
              corporate gatherings, family events, Nikah ceremonies,
              and private functions.
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
                Check Availability
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
                WHAT WE OFFER
              </p>

              <h2 className="mt-4 text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                A Venue That Fits
                <br />
                Your Event
              </h2>

              <p className="mt-7 text-slate-500 text-lg leading-8">
                Punjab House offers venue space for a variety of
                occasions. Whether you are planning a wedding,
                corporate gathering, family event, Nikah ceremony,
                or private function, the space can be arranged
                according to your needs.
              </p>

              <p className="mt-5 text-slate-500 text-lg leading-8">
                We provide the venue area. You decide how you want
                your event to be arranged.
              </p>

            </div>

            {/* RIGHT */}
            <div className="bg-slate-950 rounded-[2rem] p-8 md:p-10">

              <p className="text-[#00c874] text-sm font-bold tracking-[0.25em] uppercase">
                PUNJAB HOUSE
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
                  <div className="mt-1 w-8 h-8 rounded-full bg-[#00c874]/10 flex items-center justify-center shrink-0">
                    <Check size={17} className="text-[#00c874]" />
                  </div>

                  <p className="text-slate-300">
                    Spacious venue area
                  </p>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 w-8 h-8 rounded-full bg-[#00c874]/10 flex items-center justify-center shrink-0">
                    <Check size={17} className="text-[#00c874]" />
                  </div>

                  <p className="text-slate-300">
                    Suitable for different occasions
                  </p>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 w-8 h-8 rounded-full bg-[#00c874]/10 flex items-center justify-center shrink-0">
                    <Check size={17} className="text-[#00c874]" />
                  </div>

                  <p className="text-slate-300">
                    Flexible event arrangements
                  </p>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* =========================
          EVENT TYPES
      ========================== */}
      <section className="bg-slate-50 px-6 py-20 md:py-24">

        <div className="max-w-6xl mx-auto">

          <div className="text-center max-w-3xl mx-auto">

            <p className="text-sm font-bold tracking-[0.3em] text-[#00c874] uppercase">
              EVENT TYPES
            </p>

            <h2 className="mt-4 text-4xl md:text-5xl font-black text-slate-900">
              Choose The Right Space
            </h2>

            <p className="mt-5 text-slate-500 text-lg leading-relaxed">
              Punjab House is suitable for a range of events and
              gatherings.
            </p>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">

            {services.map((service) => {
              const Icon = service.icon;

              return (
                <div
                  key={service.title}
                  className="
                    group
                    bg-white
                    rounded-3xl
                    p-8
                    border border-slate-200
                    hover:-translate-y-1
                    hover:shadow-xl
                    hover:border-[#00c874]/30
                    transition-all
                    duration-300
                  "
                >

                  <div className="w-14 h-14 rounded-2xl bg-[#00c874]/10 flex items-center justify-center">
                    <Icon
                      size={28}
                      className="text-[#00c874] group-hover:scale-110 transition-transform"
                    />
                  </div>

                  <h3 className="mt-7 text-2xl font-bold text-slate-900">
                    {service.title}
                  </h3>

                  <p className="mt-4 text-slate-500 leading-7">
                    {service.description}
                  </p>

                </div>
              );
            })}

          </div>

        </div>
      </section>

      {/* =========================
          VENUE ONLY
      ========================== */}
      <section className="bg-white px-6 py-20 md:py-24">

        <div className="max-w-5xl mx-auto">

          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 md:p-12">

            <div className="max-w-3xl mx-auto text-center">

              <p className="text-sm font-bold tracking-[0.3em] text-[#00c874] uppercase">
                OUR ROLE
              </p>

              <h2 className="mt-4 text-3xl md:text-4xl font-black text-slate-900">
                We Provide The Venue
              </h2>

              <p className="mt-6 text-lg text-slate-500 leading-8">
                Punjab House provides the venue area for your event.
                Decoration, catering, seating arrangements,
                entertainment, and other event requirements can be
                arranged according to your own preferences.
              </p>

            </div>

            <div className="grid md:grid-cols-3 gap-5 mt-10">

              <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center">
                <h3 className="font-bold text-slate-900">
                  Your Decoration
                </h3>

                <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                  Arrange the decoration according to your own theme.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center">
                <h3 className="font-bold text-slate-900">
                  Your Catering
                </h3>

                <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                  Arrange catering according to your event requirements.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center">
                <h3 className="font-bold text-slate-900">
                  Your Setup
                </h3>

                <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                  Organize the seating and event setup as you prefer.
                </p>
              </div>

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
            Book Your Event
            <ArrowRight size={18} />
          </Link>

        </div>
      </section>
    </>
  );
}