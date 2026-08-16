import React, { useEffect, useRef } from "react";
import { Calendar, ArrowDown, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const stats = [
  ["70+", "Events Hosted"],
  ["5★", "Guest Rating"],
  ["3+", "Years Experience"],
];

export default function Hero() {
  const navigate = useNavigate();
  const desktopVideoRef = useRef(null);
  const mobileVideoRef = useRef(null);

  useEffect(() => {
    if (desktopVideoRef.current) {
      desktopVideoRef.current.playbackRate = 1;
    }

    if (mobileVideoRef.current) {
      mobileVideoRef.current.playbackRate = 1;
    }
  }, []);

  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden flex flex-col justify-center"
    >
      {/* =====================================================
          BACKGROUND VIDEOS
          Desktop = Horizontal Video
          Mobile = Vertical Video
      ====================================================== */}

      <div className="absolute inset-0 overflow-hidden bg-black">

        {/* =========================
            DESKTOP VIDEO
        ========================== */}
        <video
          ref={desktopVideoRef}
          className="
            hidden
            md:block
            absolute
            inset-0
            w-full
            h-full
            object-cover
          "
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/hero-poster.jpg"
        >
          <source
            src="/videos/punjab-house.mp4"
            type="video/mp4"
          />

          Your browser does not support the video tag.
        </video>

        {/* =========================
            MOBILE VIDEO
        ========================== */}
        <video
          ref={mobileVideoRef}
          className="
            md:hidden
            absolute
            inset-0
            w-full
            h-full
            object-cover
          "
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/hero-poster.jpg"
        >
          <source
            src="/videos/punjab-house-mobile.mp4"
            type="video/mp4"
          />

          Your browser does not support the video tag.
        </video>

      </div>

      {/* =====================================================
          VIDEO OVERLAY
      ====================================================== */}

      <div className="absolute inset-0 bg-black/25 pointer-events-none" />

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-b
          from-black/10
          via-transparent
          to-black/55
          pointer-events-none
        "
      />

      {/* =====================================================
          GREEN GLOW
      ====================================================== */}

      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.08, 0.15, 0.08],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          -top-32
          -left-32
          w-96
          h-96
          rounded-full
          bg-[#00c874]
          blur-[120px]
          pointer-events-none
        "
      />

      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.05, 0.12, 0.05],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="
          absolute
          -bottom-40
          -right-40
          w-[500px]
          h-[500px]
          rounded-full
          bg-[#00c874]
          blur-[150px]
          pointer-events-none
        "
      />

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <div
        className="
          relative
          z-10
          flex
          flex-col
          items-center
          justify-center
          text-center
          px-5
          pt-28
          pb-16
        "
      >

        {/* =========================
            BADGE
        ========================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: -25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
          }}
          className="
            inline-flex
            items-center
            gap-2
            border
            border-[#00c874]/50
            text-[#00c874]
            rounded-full
            px-5
            py-2
            text-xs
            font-semibold
            tracking-[0.2em]
            uppercase
            backdrop-blur-md
            bg-slate-950/20
          "
        >
          <Star className="w-3.5 h-3.5 fill-[#00c874]" />

          Punjab House Karachi

          <Star className="w-3.5 h-3.5 fill-[#00c874]" />
        </motion.div>

        {/* =========================
            HEADING
        ========================== */}

        <motion.h1
          initial={{
            opacity: 0,
            y: 45,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.9,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            text-5xl
            sm:text-7xl
            lg:text-8xl
            font-bold
            text-white
            max-w-5xl
            leading-[1.02]
            mt-7
          "
        >
          Your Perfect Venue

          <br />

          <span className="text-[#00c874]">
            Awaits You
          </span>
        </motion.h1>

        {/* =========================
            SUBTITLE
        ========================== */}

        <motion.p
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.35,
          }}
          className="
            text-[#00c874]
            font-semibold
            tracking-wide
            text-lg
            sm:text-xl
            mt-6
          "
        >
          A Spacious Venue For Your Special Event
        </motion.p>

        {/* =========================
            DESCRIPTION
        ========================== */}

        <motion.p
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.45,
          }}
          className="
            text-white/80
            max-w-2xl
            mt-5
            text-base
            sm:text-lg
            leading-relaxed
            font-light
          "
        >
          Punjab House Karachi provides a spacious venue for weddings,
          corporate gatherings, family functions, Nikah ceremonies,
          and private events.
        </motion.p>

        {/* =========================
            BUTTONS
        ========================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.6,
          }}
          className="
            flex
            flex-col
            sm:flex-row
            gap-4
            mt-9
          "
        >

          {/* BOOK NOW */}

          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow:
                "0 15px 40px rgba(0,200,116,0.35)",
            }}
            whileTap={{
              scale: 0.97,
            }}
            onClick={() => navigate("/book")}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              bg-[#00c874]
              hover:bg-[#00b368]
              text-white
              px-8
              py-3.5
              rounded-full
              font-semibold
              transition-colors
            "
          >
            <Calendar className="w-5 h-5" />

            Book Now
          </motion.button>

          {/* EXPLORE */}

          <motion.button
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.97,
            }}
            onClick={() => scrollTo("#about")}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              border
              border-white/30
              hover:border-[#00c874]
              text-white
              hover:text-[#00c874]
              px-8
              py-3.5
              rounded-full
              font-semibold
              backdrop-blur-md
              bg-white/5
              transition-colors
            "
          >
            Explore More
          </motion.button>

        </motion.div>

        {/* =========================
            STATISTICS
        ========================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.9,
            delay: 0.8,
          }}
          className="
            grid
            grid-cols-3
            gap-6
            sm:gap-16
            mt-16
            sm:mt-24
          "
        >
          {stats.map(([value, label], index) => (
            <motion.div
              key={label}
              whileHover={{
                y: -6,
              }}
              transition={{
                duration: 0.2,
              }}
              className="text-center relative"
            >

              {index > 0 && (
                <span
                  className="
                    hidden
                    sm:block
                    absolute
                    -left-8
                    top-1/2
                    -translate-y-1/2
                    h-10
                    w-px
                    bg-white/20
                  "
                />
              )}

              <div
                className="
                  text-3xl
                  sm:text-5xl
                  font-bold
                  text-white
                "
              >
                {value}
              </div>

              <div
                className="
                  text-white/60
                  text-[10px]
                  sm:text-sm
                  mt-2
                  tracking-wider
                  uppercase
                "
              >
                {label}
              </div>

            </motion.div>
          ))}
        </motion.div>

      </div>

      {/* =====================================================
          SCROLL INDICATOR
      ====================================================== */}

      <motion.button
        animate={{
          y: [0, 8, 0],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        onClick={() => scrollTo("#about")}
        className="
          relative
          z-10
          mx-auto
          mb-7
          text-white/60
          hover:text-[#00c874]
          transition-colors
        "
        aria-label="Go to about section"
      >
        <ArrowDown className="w-6 h-6" />
      </motion.button>

    </section>
  );
}