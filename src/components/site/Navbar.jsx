import React, { useEffect, useState } from "react";
import { Menu, X, Calendar } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const links = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Gallery", path: "/gallery" },
  { label: "Testimonials", path: "/testimonials" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // =====================================================
  // CHECK IF CURRENT PAGE IS HOME
  // =====================================================

  const isHome = location.pathname === "/";

  // =====================================================
  // HANDLE NAVBAR SCROLL
  // =====================================================

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    // Run immediately
    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // =====================================================
  // CLOSE MOBILE MENU WHEN PAGE CHANGES
  // =====================================================

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // =====================================================
  // NAVBAR BACKGROUND
  //
  // HOME:
  // Top     = Transparent
  // Scroll  = Dark
  //
  // OTHER PAGES:
  // Always  = Dark
  // =====================================================

  const darkNavbar = !isHome || scrolled;

  return (
    <nav
      className={`
        fixed
        top-0
        left-0
        right-0
        z-50

        transition-all
        duration-300

        ${
          darkNavbar
            ? "bg-slate-950/95 backdrop-blur-xl shadow-lg border-b border-white/10"
            : "bg-transparent"
        }
      `}
    >
      {/* =====================================================
          MAIN NAVBAR CONTAINER
      ===================================================== */}

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="h-20 flex items-center justify-between">

          {/* =====================================================
              FULL LOGO
          ===================================================== */}

          <Link
            to="/"
            className="
              flex
              items-center
              shrink-0
              group
            "
          >
            <img
              src="/images/logo.png"
              alt="Punjab House Karachi"
              className="
                block

                w-[190px]
                sm:w-[220px]

                h-auto

                object-contain

                transition-all
                duration-300

                group-hover:scale-[1.02]
              "
            />
          </Link>

          {/* =====================================================
              DESKTOP NAVIGATION
          ===================================================== */}

          <div className="hidden lg:flex items-center gap-8">

            {links.map((link) => {
              const active =
                location.pathname === link.path;

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`
                    relative

                    text-sm
                    font-medium

                    transition-colors
                    duration-200

                    group

                    ${
                      active
                        ? "text-[#00c874]"
                        : "text-white/80 hover:text-[#00c874]"
                    }
                  `}
                >
                  {link.label}

                  {/* =========================
                      ACTIVE UNDERLINE
                  ========================== */}

                  <span
                    className={`
                      absolute

                      left-0
                      -bottom-2

                      h-0.5

                      rounded-full

                      bg-[#00c874]

                      transition-all
                      duration-300

                      ${
                        active
                          ? "w-full"
                          : "w-0 group-hover:w-full"
                      }
                    `}
                  />
                </Link>
              );
            })}

          </div>

          {/* =====================================================
              DESKTOP BOOK NOW BUTTON
          ===================================================== */}

          <div className="hidden lg:block">

            <Link
              to="/book"
              className="
                inline-flex

                items-center
                justify-center
                gap-2

                bg-[#00c874]
                hover:bg-[#00b368]

                text-white

                px-5
                py-2.5

                rounded-full

                font-semibold
                text-sm

                shadow-lg
                shadow-[#00c874]/20

                hover:shadow-[#00c874]/40

                transition-all
                duration-300

                hover:-translate-y-0.5
              "
            >
              <Calendar className="w-4 h-4" />

              Book Now
            </Link>

          </div>

          {/* =====================================================
              MOBILE MENU BUTTON
          ===================================================== */}

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="
              lg:hidden

              w-10
              h-10

              flex
              items-center
              justify-center

              rounded-xl

              text-white

              hover:bg-white/10

              transition-all
              duration-200
            "
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

        </div>

        {/* =====================================================
            MOBILE MENU
        ===================================================== */}

        <div
          className={`
            lg:hidden

            overflow-hidden

            transition-all
            duration-300

            ${
              mobileOpen
                ? "max-h-[600px] opacity-100 pb-5"
                : "max-h-0 opacity-0"
            }
          `}
        >
          <div
            className="
              bg-slate-900/95

              backdrop-blur-xl

              rounded-2xl

              p-4

              border
              border-white/10

              shadow-2xl
            "
          >

            <div className="flex flex-col gap-1">

              {/* =====================================================
                  MOBILE NAVIGATION LINKS
              ===================================================== */}

              {links.map((link) => {
                const active =
                  location.pathname === link.path;

                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={`
                      px-4
                      py-3

                      rounded-xl

                      text-sm
                      font-medium

                      transition-all
                      duration-200

                      ${
                        active
                          ? "bg-[#00c874]/10 text-[#00c874]"
                          : "text-white/80 hover:bg-white/5 hover:text-[#00c874]"
                      }
                    `}
                  >
                    {link.label}
                  </Link>
                );
              })}

              {/* =====================================================
                  MOBILE BOOK NOW
              ===================================================== */}

              <Link
                to="/book"
                onClick={() => setMobileOpen(false)}
                className="
                  mt-2

                  flex
                  items-center
                  justify-center
                  gap-2

                  bg-[#00c874]
                  hover:bg-[#00b368]

                  text-white

                  px-5
                  py-3

                  rounded-xl

                  font-semibold
                  text-sm

                  shadow-lg
                  shadow-[#00c874]/20

                  transition-all
                  duration-200
                "
              >
                <Calendar className="w-4 h-4" />

                Book Now
              </Link>

            </div>

          </div>
        </div>

      </div>
    </nav>
  );
}