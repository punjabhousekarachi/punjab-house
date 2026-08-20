import React from "react";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const links = [
  ["Home", "/"],
  ["About", "/about"],
  ["Services", "/services"],
  ["Gallery", "/gallery"],
  ["Testimonials", "/testimonials"],
  ["Contact", "/contact"],
];

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white">

      {/* =========================
          MAIN FOOTER
      ========================== */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16">

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">

          {/* =========================
              BRAND
          ========================== */}
          <div>

            {/* LOGO ONLY */}
            <Link
              to="/"
              className="
                inline-flex
                items-center
                shrink-0
                w-30
                h-16
                overflow-hidden
                rounded-full
                group
              "
            >
              <img
                src="/images/logo.png"
                alt="Punjab House Karachi"
                className="
                  h-16
                  w-auto
                  max-w-none
                  object-contain
                  transition-transform
                  duration-300
                  group-hover:scale-105
                "
              />
            </Link>

            {/* DESCRIPTION */}
            <p className="text-white/60 text-sm leading-7 mt-6 max-w-md">
              Punjab House Karachi provides a spacious venue for
              weddings, corporate gatherings, family functions,
              Nikah ceremonies, and private events.
            </p>

            {/* =========================
                SOCIAL ICONS
            ========================== */}
            <div className="flex gap-3 mt-7">

              {/* Instagram */}
              <a
                aria-label="Instagram"
                href="https://www.instagram.com/punjabhousekarachi/?hl=en"
                className="
                  w-10
                  h-10
                  rounded-full
                  bg-white/5
                  border
                  border-white/10
                  flex
                  items-center
                  justify-center
                  hover:bg-[#00c874]
                  hover:border-[#00c874]
                  transition
                "
              >
                <Instagram size={17} />
              </a>

              {/* WhatsApp */}
              <a
                aria-label="WhatsApp"
                href="https://wa.me/923292158907"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  w-10
                  h-10
                  rounded-full
                  bg-white/5
                  border
                  border-white/10
                  flex
                  items-center
                  justify-center
                  hover:bg-[#00c874]
                  hover:border-[#00c874]
                  transition
                "
              >
                <MessageCircle size={17} />
              </a>

            </div>

          </div>


          {/* =========================
              QUICK LINKS
          ========================== */}
          <div>

            <h4
              className="
                font-bold
                text-sm
                uppercase
                tracking-[0.2em]
                text-white/80
              "
            >
              Quick Links
            </h4>

            <ul className="mt-6 space-y-3">

              {links.map(([label, to]) => (
                <li key={to}>

                  <Link
                    to={to}
                    className="
                      inline-flex
                      items-center
                      gap-2
                      text-white/60
                      hover:text-[#00c874]
                      text-sm
                      transition
                    "
                  >
                    <ArrowRight size={13} />
                    {label}
                  </Link>

                </li>
              ))}

            </ul>

          </div>


          {/* =========================
              CONTACT
          ========================== */}
          <div>

            <h4
              className="
                font-bold
                text-sm
                uppercase
                tracking-[0.2em]
                text-white/80
              "
            >
              Contact
            </h4>

            <div className="mt-6 space-y-5">

              {/* =========================
                  PHONE
              ========================== */}
              <div className="flex items-start gap-4">

                <div
                  className="
                    w-10
                    h-10
                    rounded-xl
                    bg-[#00c874]/10
                    flex
                    items-center
                    justify-center
                    shrink-0
                  "
                >
                  <Phone
                    size={18}
                    className="text-[#00c874]"
                  />
                </div>

                <div>

                  <p className="text-white text-sm font-semibold">
                    +92 329 2158907
                  </p>

                  <p className="text-white/40 text-xs mt-1">
                    Phone
                  </p>

                </div>

              </div>


              {/* =========================
                  EMAIL
              ========================== */}
              <div className="flex items-start gap-4">

                <div
                  className="
                    w-10
                    h-10
                    rounded-xl
                    bg-[#00c874]/10
                    flex
                    items-center
                    justify-center
                    shrink-0
                  "
                >
                  <Mail
                    size={18}
                    className="text-[#00c874]"
                  />
                </div>

                <div>

                  <p className="text-white text-sm font-semibold break-all">
                    punjabhousekarachi@gmail.com
                  </p>

                  <p className="text-white/40 text-xs mt-1">
                    Email
                  </p>

                </div>

              </div>


              {/* =========================
                  LOCATION
              ========================== */}
              <div className="flex items-start gap-4">

                <div
                  className="
                    w-10
                    h-10
                    rounded-xl
                    bg-[#00c874]/10
                    flex
                    items-center
                    justify-center
                    shrink-0
                  "
                >
                  <MapPin
                    size={18}
                    className="text-[#00c874]"
                  />
                </div>

                <div>

                  <p
                    className="
                      text-white
                      text-sm
                      font-semibold
                      leading-6
                    "
                  >
                    GOR-1, Bath Island,
                    <br />
                    Clifton, Karachi
                  </p>

                  <p className="text-white/40 text-xs mt-1">
                    Punjab House Karachi
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* =========================
            BOOKING BAR
        ========================== */}
        <div className="mt-14 pt-8 border-t border-white/10">

          <div
            className="
              rounded-2xl
              border
              border-white/10
              bg-white/5
              px-6
              py-5
              flex
              flex-col
              md:flex-row
              items-center
              justify-between
              gap-5
            "
          >

            <div className="text-center md:text-left">

              <h3 className="text-white font-bold">
                Planning an event?
              </h3>

              <p className="text-white/50 text-sm mt-1">
                Check our booking page and submit your event details.
              </p>

            </div>


            <Link
              to="/book"
              className="
                inline-flex
                items-center
                gap-2
                px-6
                py-3
                rounded-full
                bg-[#00c874]
                hover:bg-[#00b568]
                text-white
                font-bold
                text-sm
                transition
                whitespace-nowrap
              "
            >
              Book Now
              <ArrowRight size={16} />
            </Link>

          </div>

        </div>

      </div>


      {/* =========================
          COPYRIGHT
      ========================== */}
      <div className="border-t border-white/10">

        <div
          className="
            max-w-7xl
            mx-auto
            px-6
            sm:px-8
            py-6
            flex
            flex-col
            md:flex-row
            items-center
            justify-between
            gap-3
            text-center
            md:text-left
          "
        >

          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Punjab House Karachi.
            All rights reserved.
          </p>

          <p className="text-white/30 text-xs">
            Event Venue · Karachi, Pakistan
          </p>

        </div>

      </div>

    </footer>
  );
}
