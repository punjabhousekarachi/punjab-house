import React, { useState } from "react";

const items = [
  [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRswsuPK9van1eCyKppXmdzo-gUXlrZr9GIjHfZj_IeqxgDjFZgWV93VTxh&s=10",
    "Wedding",
    "Wedding Venue",
  ],
  [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCDuh8PppY_KeN3IOTR2SRpRE8GmV3SYP2GkVEbuEIQ2YDScqqwWc4DJ8&s=10",
    "Reception",
    "Reception Venue",
  ],
  [
    "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=85",
    "Corporate",
    "Corporate Event",
  ],
[
  "/images/wedding2.png",
  "Wedding",
  "Outdoor Event Space",
],
[
  "/images/wedding3.png",
  "Reception",
  "Elegant Event Space",
],
];

const filters = [
  "All",
  "Wedding",
  "Reception",
  "Corporate",
];

export default function Gallery() {
  const [active, setActive] = useState("All");

  const shown =
    active === "All"
      ? items
      : items.filter((item) => item[1] === active);

  return (
    <section id="gallery" className="bg-slate-50 py-20 md:py-24 px-6">
      <div className="max-w-7xl mx-auto">

        {/* =========================
            HEADING
        ========================== */}
        <div className="text-center max-w-3xl mx-auto">

          <p className="text-[#00c874] font-bold text-sm tracking-[0.3em] uppercase">
            VENUE PHOTOS
          </p>

          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mt-4">
            Explore Punjab House
          </h2>

          <p className="text-slate-500 mt-5 text-lg leading-relaxed">
            Take a look at the venue space and see how Punjab House
            can be used for different types of events.
          </p>

        </div>


        {/* =========================
            FILTERS
        ========================== */}
        <div className="flex flex-wrap justify-center gap-3 mt-10">

          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActive(filter)}
              className={`
                px-6
                py-2.5
                rounded-full
                text-sm
                font-semibold
                transition-all
                duration-300
                ${
                  active === filter
                    ? "bg-[#00c874] text-white shadow-md"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-[#00c874]/40 hover:text-[#00a963]"
                }
              `}
            >
              {filter}
            </button>
          ))}

        </div>


        {/* =========================
            GALLERY GRID
        ========================== */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">

          {shown.map(([image, category, title]) => (
            <div
              key={`${category}-${title}`}
              className="
                group
                relative
                rounded-3xl
                overflow-hidden
                bg-white
                border border-slate-200
                shadow-sm
                h-[360px]
                hover:shadow-xl
                transition-all
                duration-300
              "
            >

              {/* Image */}
              <img
                src={image}
                alt={title}
                className="
                  w-full
                  h-full
                  object-cover
                  transition-transform
                  duration-700
                  group-hover:scale-110
                "
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">

                <span className="text-[#00c874] text-xs font-bold uppercase tracking-[0.2em]">
                  {category}
                </span>

                <h3 className="text-white font-bold text-xl mt-2">
                  {title}
                </h3>

              </div>

            </div>
          ))}

        </div>


        {/* Empty state */}
        {shown.length === 0 && (
          <div className="text-center py-16 text-slate-500">
            No photos available for this category.
          </div>
        )}

      </div>
    </section>
  );
}