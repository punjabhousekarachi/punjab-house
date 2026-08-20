import React from "react";
import {
  Heart,
  Briefcase,
  Users,
  Sparkles,
  PartyPopper,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  [
    Heart,
    "Wedding Ceremonies",
    "A spacious venue area for weddings, receptions, and special wedding gatherings.",
  ],
  [
    Briefcase,
    "Corporate Events",
    "A suitable venue space for conferences, meetings, launches, and corporate gatherings.",
  ],
  [
    Users,
    "Family Gatherings",
    "A welcoming venue for family reunions, Eid gatherings, and private get-togethers.",
  ],
  [
    Sparkles,
    "Nikah Ceremony",
    "A suitable and peaceful venue space for your Nikah and special family occasion.",
  ],
  [
    PartyPopper,
    "Private Functions",
    "Flexible venue space for private events and celebrations according to your requirements.",
  ],
];

export default function Services() {
  return (
    <section
      id="services"
      className="bg-slate-50 py-24 px-6"
    >
      <div className="max-w-6xl mx-auto">

        {/* =========================
            HEADING
        ========================== */}
        <div className="text-center max-w-3xl mx-auto">

          <p className="text-sm font-bold tracking-[0.3em] text-[#00c874] uppercase">
            PUNJAB HOUSE
          </p>

          <h2 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 leading-tight">
            The Space For Your{" "}
            <span className="text-[#00c874]">
              Special Event
            </span>
          </h2>

          <p className="max-w-2xl mx-auto text-slate-500 mt-5 text-base sm:text-lg leading-relaxed">
            Punjab House provides a spacious venue for weddings,
            corporate events, family gatherings, Nikah ceremonies,
            and private functions.
          </p>

        </div>


        {/* =========================
            SERVICE CARDS
        ========================== */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">

          {services.map(([Icon, title, desc]) => (
            <div
              key={title}
              className="
                group
                bg-white
                rounded-2xl
                p-8
                border
                border-slate-200
                shadow-sm
                hover:shadow-xl
                hover:-translate-y-1
                hover:border-[#00c874]/40
                transition-all
                duration-300
              "
            >

              {/* Icon */}
              <div
                className="
                  w-14
                  h-14
                  rounded-2xl
                  bg-[#00c874]/10
                  text-[#00c874]
                  flex
                  items-center
                  justify-center
                  group-hover:bg-[#00c874]
                  group-hover:text-white
                  transition-all
                  duration-300
                "
              >
                <Icon size={28} />
              </div>


              {/* Title */}
              <h3 className="text-xl font-bold text-slate-900 mt-5">
                {title}
              </h3>


              {/* Description */}
              <p className="text-slate-500 mt-3 text-sm leading-relaxed">
                {desc}
              </p>

            </div>
          ))}

        </div>


        {/* =========================
            CTA
        ========================== */}
        <div className="text-center mt-14">

          <Link
            to="/book"
            className="
              inline-flex
              items-center
              gap-2
              bg-slate-900
              hover:bg-[#00c874]
              text-white
              px-8
              py-3.5
              rounded-full
              font-semibold
              transition-all
              duration-300
              shadow-md
            "
          >
            Book Your Event
            <ArrowRight size={17} />
          </Link>

        </div>

      </div>
    </section>
  );
}