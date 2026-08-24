import React from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  Users,
  Briefcase,
  MapPin,
  CalendarDays,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: Heart,
    title: "Wedding Events",
    text: "A spacious venue for weddings and reception gatherings.",
  },
  {
    icon: Users,
    title: "Family Gatherings",
    text: "A comfortable space for family functions and private occasions.",
  },
  {
    icon: Briefcase,
    title: "Corporate Events",
    text: "Suitable venue space for corporate meetings and gatherings.",
  },
  {
    icon: CalendarDays,
    title: "Flexible Event Space",
    text: "Arrange the venue according to your own event requirements.",
  },
];

const LOCATION_URL =
  "https://www.google.com/maps/search/?api=1&query=Punjab+House+Karachi+GOR-1+Bath+Island+Clifton+Karachi";

export default function About() {
  return (
    <section id="about" className="bg-white py-24 px-6">
      <div className="max-w-6xl mx-auto">

        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* IMAGE */}
          <div className="relative">

            <div className="overflow-hidden rounded-[2rem] shadow-2xl">
              <img
                src="/images/image2.png"
                alt="Punjab House venue"
                className="
                  w-full
                  h-[420px]
                  sm:h-[500px]
                  object-cover
                  transition-transform
                  duration-700
                  hover:scale-105
                "
              />
            </div>

            {/* CLICKABLE LOCATION BADGE */}
            <a
              href={LOCATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Punjab House location on Google Maps"
              className="
                absolute
                -bottom-6
                right-4
                sm:right-8
                bg-slate-950
                text-white
                rounded-2xl
                px-6
                py-5
                shadow-2xl
                border
                border-slate-800
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-[#00c874]/50
                hover:shadow-[#00c874]/10
                cursor-pointer
              "
            >
              <div className="flex items-center gap-3">

                <div className="
                  w-11
                  h-11
                  rounded-xl
                  bg-[#00c874]/10
                  flex
                  items-center
                  justify-center
                  group-hover:bg-[#00c874]
                  transition
                ">
                  <MapPin
                    size={22}
                    className="text-[#00c874]"
                  />
                </div>

                <div>
                  <p className="text-lg font-bold">
                    Punjab House
                  </p>

                  <p className="text-sm text-slate-400">
                    GOR-1, Bath Island, Clifton
                  </p>

                  <p className="text-xs text-[#00c874] mt-1">
                    View on Google Maps →
                  </p>
                </div>

              </div>
            </a>
          </div>

          {/* CONTENT */}
          <div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-[2px] bg-[#00c874]"></div>

              <span className="
                text-[#00c874]
                font-bold
                text-xs
                tracking-[0.25em]
                uppercase
              ">
                WHO WE ARE
              </span>
            </div>

            <h2 className="
              text-4xl
              sm:text-5xl
              font-black
              text-slate-900
              mt-5
              leading-tight
            ">
              About
              <span className="text-[#00c874]">
                {" "}Punjab House
              </span>
            </h2>

            <h3 className="
              text-xl
              md:text-2xl
              font-semibold
              text-slate-700
              mt-5
            ">
              A Spacious Place For Your Special Event
            </h3>

            <p className="
              text-slate-500
              mt-6
              leading-8
              text-lg
            ">
              Punjab House provides a spacious venue for weddings,
              corporate gatherings, family functions and private
              events. Our focus is simple: providing you with the
              space where you can arrange your event your own way.
            </p>

            <p className="
              text-slate-500
              mt-4
              leading-8
            ">
              The venue gives you the freedom to organize your own
              decoration, catering, seating and other event
              requirements according to your preferences.
            </p>

            {/* FEATURES */}
            <div className="
              grid
              sm:grid-cols-2
              gap-4
              mt-9
            ">

              {features.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="
                      group
                      p-4
                      rounded-2xl
                      border
                      border-slate-200
                      bg-slate-50
                      hover:bg-white
                      hover:border-[#00c874]/30
                      hover:shadow-md
                      transition-all
                      duration-300
                    "
                  >
                    <div className="flex items-start gap-4">

                      <div className="
                        w-11
                        h-11
                        rounded-xl
                        bg-[#00c874]/10
                        text-[#00c874]
                        flex
                        items-center
                        justify-center
                        shrink-0
                        group-hover:bg-[#00c874]
                        group-hover:text-white
                        transition-all
                      ">
                        <Icon size={20} />
                      </div>

                      <div>
                        <h4 className="
                          font-bold
                          text-slate-900
                        ">
                          {item.title}
                        </h4>

                        <p className="
                          text-sm
                          text-slate-500
                          mt-1
                          leading-relaxed
                        ">
                          {item.text}
                        </p>
                      </div>

                    </div>
                  </div>
                );
              })}

            </div>

            {/* BUTTON */}
            <Link
              to="/about"
              className="
                inline-flex
                items-center
                gap-2
                mt-9
                px-7
                py-3.5
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
              Learn More About Us
              <ArrowRight size={18} />
            </Link>

          </div>

        </div>

      </div>
    </section>
  );
}