import React from "react";
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  CalendarDays,
} from "lucide-react";
import { Link } from "react-router-dom";

const Name = "Syed Ahsan Abrar";
const PHONE = "+92 329 2158907";
const EMAIL = "punjabhousekarachi@gmail.com";

const info = [
  {
    icon: Phone,
    title: "Contact",
    value: Name,
    note: "Caretaker Punjab House Karachi",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: PHONE,
    note: "Quick response",
  },
  {
    icon: Mail,
    title: "Email",
    value: EMAIL,
    note: "We reply within 24 hours",
  },

  {
    icon: Clock,
    title: "Working Hours",
    value: "10 AM – 3 PM",
    note: "6 days a week",
  },
];

export default function Contact() {
  return (
    <section id="contact">

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
                GET IN TOUCH
              </p>

            </div>

            <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.05]">
              Let&apos;s Talk About
              <br />

              <span className="text-[#00c874]">
                Your Event.
              </span>
            </h1>

            <p className="max-w-2xl mt-8 text-lg md:text-xl text-slate-300 leading-relaxed">
              Have questions about Punjab House or want to check
              the availability of the venue? Get in touch with us.
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

              <a
                href={`https://wa.me/${PHONE.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
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
                <MessageCircle size={18} />
                WhatsApp
              </a>

            </div>

          </div>

        </div>
      </section>


      {/* =========================
          CONTACT INFORMATION
      ========================== */}
      <section className="bg-white px-6 py-20 md:py-28">

        <div className="max-w-6xl mx-auto">

          <div className="grid lg:grid-cols-2 gap-14 items-start">

            {/* LEFT */}
            <div>

              <p className="text-sm font-bold tracking-[0.3em] text-[#00c874] uppercase">
                CONTACT DETAILS
              </p>

              <h2 className="mt-4 text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                We&apos;re Here To
                <br />
                Help You
              </h2>

              <p className="mt-7 text-lg text-slate-500 leading-8">
                Contact Punjab House for venue availability, general
                information, or questions about booking the space
                for your event.
              </p>

              <p className="mt-5 text-lg text-slate-500 leading-8">
                For booking requests, use our dedicated Book Now page
                and submit your event details through the booking form.
              </p>

              {/* Info Cards */}
              <div className="grid sm:grid-cols-2 gap-4 mt-10">

                {info.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="
                        group
                        bg-slate-50
                        rounded-2xl
                        border border-slate-200
                        p-5
                        hover:bg-white
                        hover:border-[#00c874]/30
                        hover:shadow-lg
                        transition-all
                        duration-300
                      "
                    >

                      <div className="w-11 h-11 rounded-xl bg-[#00c874]/10 text-[#00c874] flex items-center justify-center group-hover:bg-[#00c874] group-hover:text-white transition">
                        <Icon size={20} />
                      </div>

                      <p className="mt-4 text-xs font-bold tracking-[0.2em] text-slate-400 uppercase">
                        {item.title}
                      </p>

                      <p className="mt-2 text-slate-900 font-semibold text-sm break-words">
                        {item.value}
                      </p>

                      <p className="mt-1 text-slate-500 text-sm">
                        {item.note}
                      </p>

                    </div>
                  );
                })}

              </div>

            </div>


            {/* RIGHT - BOOKING CARD */}
            <div>

              <div className="bg-slate-50 rounded-[2rem] border border-slate-200 p-8 md:p-10">

                <div className="w-14 h-14 rounded-2xl bg-[#00c874]/10 flex items-center justify-center">
                  <CalendarDays
                    size={28}
                    className="text-[#00c874]"
                  />
                </div>

                <p className="mt-7 text-sm font-bold tracking-[0.3em] text-[#00c874] uppercase">
                  BOOKING
                </p>

                <h3 className="mt-4 text-3xl md:text-4xl font-black text-slate-900">
                  Ready To Reserve
                  <br />
                  The Venue?
                </h3>

                <p className="mt-5 text-slate-500 text-lg leading-8">
                  Punjab House provides the venue space. You can
                  arrange your decoration, catering, seating,
                  entertainment, and other event requirements
                  according to your preferences.
                </p>

                {/* Booking Points */}
                <div className="mt-8 space-y-5">

                  <div className="flex items-start gap-4">

                    <div className="w-8 h-8 rounded-full bg-[#00c874]/10 flex items-center justify-center shrink-0">
                      <span className="text-[#00c874] font-bold">
                        01
                      </span>
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-900">
                        Book Now
                      </h4>

                      <p className="text-sm text-slate-500 mt-1">
                        Select your preferred event date.
                      </p>
                    </div>

                  </div>

                  <div className="flex items-start gap-4">

                    <div className="w-8 h-8 rounded-full bg-[#00c874]/10 flex items-center justify-center shrink-0">
                      <span className="text-[#00c874] font-bold">
                        02
                      </span>
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-900">
                        Submit Your Details
                      </h4>

                      <p className="text-sm text-slate-500 mt-1">
                        Complete the booking form with your event information.
                      </p>
                    </div>

                  </div>

                  <div className="flex items-start gap-4">

                    <div className="w-8 h-8 rounded-full bg-[#00c874]/10 flex items-center justify-center shrink-0">
                      <span className="text-[#00c874] font-bold">
                        03
                      </span>
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-900">
                        Plan Your Event
                      </h4>

                      <p className="text-sm text-slate-500 mt-1">
                        Arrange your event according to your requirements.
                      </p>
                    </div>

                  </div>

                </div>

                {/* Button */}
                <Link
                  to="/book"
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
                    transition
                    shadow-lg
                    shadow-[#00c874]/20
                  "
                >
                  Open Booking Form
                  <ArrowRight size={18} />
                </Link>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =========================
          LOCATION
      ========================== */}
      <section className="bg-slate-50 px-6 py-20 md:py-24">

        <div className="max-w-6xl mx-auto">

          <div className="grid lg:grid-cols-2 gap-8 items-stretch">

            {/* LOCATION DETAILS */}
            <div className="bg-white rounded-[2rem] border border-slate-200 p-8 md:p-10 shadow-sm">

              <p className="text-sm font-bold tracking-[0.3em] text-[#00c874] uppercase">
                FIND US
              </p>

              <h2 className="mt-4 text-3xl md:text-4xl font-black text-slate-900">
                Punjab House Karachi
              </h2>

              <p className="mt-5 text-lg text-slate-500 leading-8">
                GOR-1, Bath Island, Clifton, Karachi
              </p>

              <div className="mt-8 flex items-start gap-4">

                <div className="w-12 h-12 rounded-xl bg-[#00c874]/10 flex items-center justify-center shrink-0">
                  <MapPin
                    size={22}
                    className="text-[#00c874]"
                  />
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">
                    Venue Location
                  </h3>

                  <p className="text-slate-500 mt-1 leading-relaxed">
                    Visit Punjab House Karachi for your event
                    requirements and venue inquiries.
                  </p>
                </div>

              </div>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Punjab+House+Karachi"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex
                  items-center
                  gap-2
                  mt-8
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
                Open in Google Maps
                <ArrowRight size={18} />
              </a>

            </div>


            {/* EMBEDDED MAP */}
            <div className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm min-h-[400px]">

              <iframe
                src="https://www.google.com/maps?q=Punjab%20House%20Karachi&output=embed"
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  minHeight: "400px",
                }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Punjab House Karachi Location"
              ></iframe>

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
            Have An Event In Mind?
          </h2>

          <p className="mt-5 text-slate-400 text-lg leading-relaxed">
            Visit Punjab House or submit your booking request online.
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

    </section>
  );
}