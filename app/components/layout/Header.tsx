
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";

import content from "@/app/data/header_footer.json";
import { headerContent } from "@/app/types/header";

const data: headerContent = content.header;

export default function Header() {
  const {
    logo,
    navItems = [],
    btnText,
    linkToBtn,
  } = data;

  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  const [menuState, setMenuState] = useState({ pathname, open: false });
  const open = menuState.pathname === pathname && menuState.open;
  const setOpen = (nextOpen: boolean) => {
    setMenuState({ pathname, open: nextOpen });
  };
  const [scrolled, setScrolled] = useState(false);
  const [logoFailed, setLogoFailed] = useState(!logo?.src);
  const [activeHash, setActiveHash] = useState("");

  // Sticky header scroll state
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Track section anchor
  useEffect(() => {
    const updateHash = () => {
      setActiveHash(window.location.hash);
    };

    updateHash();

    window.addEventListener("hashchange", updateHash);

    return () => {
      window.removeEventListener("hashchange", updateHash);
    };
  }, [pathname]);

  // Close menu on Escape and prevent background scrolling
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  // Active route detection
  const isActive = (href?: string) => {
    if (!href || href === "#") return false;

    // Section navigation
    if (href.startsWith("#")) {
      return activeHash === href;
    }

    // Separate page + section navigation
    const url = new URL(href, "https://example.com");
    const targetPath = url.pathname;

    if (targetPath !== pathname) return false;

    if (url.hash) {
      return activeHash === url.hash;
    }

    // Exact and nested routes
    if (targetPath === "/") {
      return pathname === "/";
    }

    return (
      pathname === targetPath ||
      pathname.startsWith(`${targetPath}/`)
    );
  };

  const closeMenu = () => {
    setOpen(false);
  };

  const menuTransition = reduceMotion
    ? { duration: 0 }
    : {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1] as const,
    };

  return (
    <header
      className={`
        sticky top-0 z-50 w-full
        border-b
        font-['Hanken_Grotesk','Helvetica_Neue',Arial,sans-serif]
        text-[#bdb7aa]
        transition-all duration-300
        ${scrolled
          ? "border-[#e8c99a]/25 bg-[#0a0a09]/95 shadow-[0_12px_32px_-16px_rgba(0,0,0,0.8)] backdrop-blur-xl"
          : "border-[#e8c99a]/15 bg-[#0a0a09] bg-[radial-gradient(60%_220%_at_88%_0%,#27382e_0%,transparent_70%)]"
        }
      `}
    >
      {/* Bottom Gold Line */}

      <span
        aria-hidden="true"
        className="
          pointer-events-none absolute
          inset-x-0 -bottom-px h-px
          bg-gradient-to-r
          from-transparent via-[#e8c99a]/60
          to-transparent
        "
      />

      {/* Header Container */}

      <div
        className={`
          relative mx-auto grid max-w-[1440px]
          grid-cols-[1fr_auto] items-center
          gap-3 px-4 sm:px-8
          lg:px-12 xl:px-[72px]
          transition-[height] duration-300
          min-[1024px]:grid-cols-[auto_1fr_auto]
          ${scrolled
            ? "h-[68px] min-[1024px]:h-[90px]"
            : "h-[68px] min-[1024px]:h-[90px]"
          }
        `}
      >
        {/* Logo */}

        <Link
          href="/"
          aria-label="WKX Foundation home"
          onClick={closeMenu}
          className="
            flex min-w-0 items-center
            justify-self-start rounded-sm
            outline-none
            focus-visible:ring-2
            focus-visible:ring-[#e8c99a]
          "
        >
          {!logoFailed && logo?.src &&
            <Image
              src={logo.src}
              alt={logo.alt ?? "WKX Foundation"}
              width={250}
              height={70}
              priority
              onError={() => setLogoFailed(true)}
              className={`
                block h-auto w-auto
                max-w-[185px] object-contain
                transition-all duration-300
                sm:max-w-[225px]
                ${scrolled
                  ? "max-h-30"
                  : "max-h-50"
                }
              `}
            />
          }
        </Link>

        {/* Desktop Navigation */}

        <nav
          aria-label="Main navigation"
          className="
            hidden items-center justify-center
            gap-5
            min-[1024px]:flex
            xl:gap-8
          "
        >
          {navItems
            .filter((item) => item.label && item.linkTo)
            .map((item) => {
              const active = isActive(item.linkTo);

              return (
                <Link
                  key={item.label}
                  href={item.linkTo}
                  aria-current={active ? "page" : undefined}
                  className={`
                    relative whitespace-nowrap
                    py-3 text-[14px]
                    font-medium tracking-wide
                    outline-none transition-colors
                    hover:text-[#f1ece1]
                    focus-visible:text-[#f1ece1]
                    after:absolute after:bottom-1
                    after:left-0 after:h-[2px]
                    after:w-full after:origin-left
                    after:bg-[#e8c99a]
                    after:transition-transform
                    after:duration-300
                    ${active
                      ? "text-[#f1ece1] after:scale-x-100"
                      : "after:scale-x-0 hover:after:scale-x-100"
                    }
                  `}
                >
                  {item.label}
                </Link>
              );
            })}
        </nav>

        {/* Header Actions */}

        <div className="
          flex items-center justify-self-end
          gap-2 sm:gap-3
        ">
          {/* Primary CTA */}

          {btnText && (
            <Link
              href={linkToBtn || "#"}
              onClick={closeMenu}
              className="
                group relative inline-flex
                shrink-0 items-center justify-center
                gap-2 overflow-hidden
                bg-[#e8c99a]
                px-3 py-3
                text-[12px] font-semibold
                tracking-wide text-[#14110c]
                outline-none
                transition-shadow duration-300
                hover:shadow-[0_8px_28px_-6px_rgba(232,201,154,0.55)]
                focus-visible:ring-2
                focus-visible:ring-[#f1d9b3]
                focus-visible:ring-offset-2
                focus-visible:ring-offset-[#0a0a09]
                sm:px-5 sm:text-sm
              "
            >
              <span
                aria-hidden="true"
                className="
                  absolute inset-0
                  -translate-x-full
                  bg-[#f6e3c3]
                  transition-transform duration-500
                  ease-out
                  group-hover:translate-x-0
                  motion-reduce:transition-none
                "
              />

              <span className="relative whitespace-nowrap">
                {btnText}
              </span>

              <ArrowUpRight
                size={16}
                className="
                  relative shrink-0
                  transition-transform duration-300
                  group-hover:translate-x-0.5
                  group-hover:-translate-y-0.5
                "
              />
            </Link>
          )}

          {/* Mobile Menu Toggle */}

          <button
            type="button"
            aria-expanded={open}
            aria-controls="wkx-mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
            className="
              relative grid h-10 w-10
              shrink-0 place-items-center
              border border-[#e8c99a]/30
              text-[#f1ece1]
              transition-colors
              hover:border-[#e8c99a]
              hover:bg-[#e8c99a]/10
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#e8c99a]
              min-[1024px]:hidden
            "
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.span
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={menuTransition}
                >
                  <X size={22} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={menuTransition}
                >
                  <Menu size={22} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="wkx-mobile-nav"
            key="mobile-navigation"
            initial={{
              opacity: 0,
              height: 0,
              y: -8,
            }}
            animate={{
              opacity: 1,
              height: "auto",
              y: 0,
            }}
            exit={{
              opacity: 0,
              height: 0,
              y: -8,
            }}
            transition={menuTransition}
            className="
              absolute left-0 right-0 top-full
              z-40 overflow-hidden
              border-b border-[#e8c99a]/20
              bg-[#0a0a09]/[98%]
              shadow-[0_18px_35px_-15px_rgba(0,0,0,0.8)]
              backdrop-blur-xl
              min-[1024px]:hidden
            "
          >
            <nav
              aria-label="Mobile navigation"
              className="
                mx-auto flex max-w-[1440px]
                flex-col px-5 pb-5 pt-2
                sm:px-8
              "
            >
              {navItems
                .filter((item) => item.label && item.linkTo)
                .map((item, index) => {
                  const active = isActive(item.linkTo);

                  return (
                    <motion.div
                      key={item.label}
                      initial={
                        reduceMotion
                          ? false
                          : { opacity: 0, x: -12 }
                      }
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: reduceMotion ? 0 : 0.25,
                        delay: reduceMotion ? 0 : index * 0.04,
                      }}
                    >
                      <Link
                        href={item.linkTo}
                        onClick={closeMenu}
                        aria-current={active ? "page" : undefined}
                        className={`
                          flex items-center
                          justify-between
                          border-b border-[#e8c99a]/10
                          py-4 text-base
                          font-medium
                          transition-colors
                          hover:text-[#e8c99a]
                          ${active
                            ? "text-[#e8c99a]"
                            : "text-[#d5d0c6]"
                          }
                        `}
                      >
                        {item.label}

                        {active && (
                          <span
                            className="
                              h-1.5 w-1.5
                              rounded-full
                              bg-[#e8c99a]
                            "
                          />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
