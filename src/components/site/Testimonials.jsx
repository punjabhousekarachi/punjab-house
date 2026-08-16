import React from "react";
import { Quote, Star, CheckCircle } from "lucide-react";

const testimonials = [
  {
    name: "Ayesha & Hamza",
    type: "Wedding",
    initials: "AH",
    text: "Punjab House provided a spacious venue for our wedding. The area gave us enough room to arrange everything according to our plans.",
  },
  {
    name: "Khan Group",
    type: "Corporate Event",
    initials: "KG",
    text: "The venue was spacious and suitable for our corporate gathering. The location was convenient for our guests.",
  },
  {
    name: "Malik Family",
    type: "Family Gathering",
    initials: "MF",
    text: "We were happy with the venue space. It gave our family plenty of room to arrange the event comfortably.",
  },
  {
    name: "Usman & Hira",
    type: "Wedding",
    initials: "UH",
    text: "Punjab House was a great choice for our event. The spacious area allowed us to arrange the venue according to our requirements.",
  },
];

export default function Testimonials() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      {testimonials.map((item, index) => (
        <div
          key={index}
          className="
            group
            bg-white
            border
            border-slate-200
            rounded-3xl
            p-7
            md:p-8
            shadow-sm
            hover:-translate-y-1
            hover:shadow-xl
            hover:border-[#00c874]/30
            transition-all
            duration-300
          "
        >

          {/* Top row */}
          <div className="flex items-center justify-between">

            {/* Quote */}
            <div
              className="
                w-12
                h-12
                rounded-xl
                bg-[#00c874]/10
                flex
                items-center
                justify-center
              "
            >
              <Quote
                size={24}
                className="text-[#00c874]"
              />
            </div>

            {/* Stars */}
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={16}
                  className="text-[#00c874] fill-[#00c874]"
                />
              ))}
            </div>

          </div>


          {/* Review */}
          <p className="mt-7 text-slate-600 text-base leading-7">
            &ldquo;{item.text}&rdquo;
          </p>


          {/* Divider */}
          <div className="border-t border-slate-200 my-6"></div>


          {/* Guest information */}
          <div className="flex items-center justify-between gap-4">

            <div className="flex items-center gap-4">

              {/* Initials */}
              <div
                className="
                  w-11
                  h-11
                  rounded-full
                  bg-[#00c874]
                  text-white
                  flex
                  items-center
                  justify-center
                  font-bold
                  shrink-0
                "
              >
                {item.initials}
              </div>

              <div>
                <h3 className="text-slate-900 font-bold">
                  {item.name}
                </h3>

                <p className="text-slate-500 text-sm mt-1">
                  {item.type}
                </p>
              </div>

            </div>


            {/* Guest label */}
            <div className="flex items-center gap-1 text-[#00c874]">

              <CheckCircle size={16} />

              <span className="text-xs font-medium">
                Venue Guest
              </span>

            </div>

          </div>

        </div>
      ))}

    </div>
  );
}