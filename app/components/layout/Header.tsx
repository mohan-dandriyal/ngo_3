
"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  ArrowUpRight,
  Menu,
  X,
} from "lucide-react";

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

  const [menuState, setMenuState] = useState({
    pathname,
    open: false,
  });

  const open =
    menuState.pathname === pathname && menuState.open;

  const setOpen = useCallback(
    (nextOpen: boolean) => {
      setMenuState({
        pathname,
        open: nextOpen,
      });
    },
    [pathname]
  );

  const [scrolled, setScrolled] = useState(false);
  const [logoFailed, setLogoFailed] = useState(!logo?.src);
  const [activeHash, setActiveHash] = useState("");

  // --------------------------------
  // Sticky Header Scroll Detection
  // --------------------------------

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

  // --------------------------------
  // Track Active Hash
  // --------------------------------

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

  // --------------------------------
  // Close Menu on Route Change
  // --------------------------------

  useEffect(() => {
    setMenuState({
      pathname,
      open: false,
    });
  }, [pathname]);

  // --------------------------------
  // Escape Key & Body Scroll Lock
  // --------------------------------

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;

      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, setOpen]);

  // --------------------------------
  // Active Navigation Detection
  // --------------------------------

  const isActive = (href?: string) => {
    if (!href || href === "#") return false;

    if (href.startsWith("#")) {
      return activeHash === href;
    }

    if (href.includes("#")) {
      const [path, hash] = href.split("#");

      return (
        pathname === path &&
        activeHash === `#${hash}`
      );
    }

    if (href === "/") {
      return pathname === "/" && !activeHash;
    }

    return pathname === href ||
      pathname.startsWith(`${href}/`);
  };

  const closeMenu = () => setOpen(false);

  // --------------------------------
  // Animation Settings
  // --------------------------------

  const menuTransition = reduceMotion
    ? { duration: 0 }
    : {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1] as const,
      };

  return (
    <>
      {/* ==================================
          FIXED HEADER
      ================================== */}

      <motion.header
        role="banner"
        initial={false}
        animate={{
          backgroundColor: scrolled
            ? "rgba(255,255,255,0.97)"
            : "rgba(250,248,245,0.90)",

          boxShadow: scrolled
            ? "0 8px 30px -12px rgba(20,24,20,0.14)"
            : "0 0px 0px rgba(20,24,20,0)",

          borderColor: scrolled
            ? "rgba(229,223,213,1)"
            : "rgba(237,231,220,1)",
        }}
        transition={{
          duration: reduceMotion ? 0 : 0.3,
          ease: "easeInOut",
        }}
        className="
          fixed left-0 top-0 z-[100]
          w-full border-b
          backdrop-blur-xl
        "
      >
        {/* Bottom Accent Line */}

        <span
          aria-hidden="true"
          className="
            pointer-events-none absolute
            inset-x-0 -bottom-px h-px
            bg-gradient-to-r
            from-transparent
            via-[#e0503a]/40
            to-transparent
          "
        />

        {/* Header Container */}

        <div
          className="
            relative mx-auto grid
            max-w-[1440px]
            grid-cols-[1fr_auto]
            items-center gap-3
            px-4 sm:px-8
            lg:px-12 xl:px-[72px]
            h-[72px]
            min-[1024px]:h-[86px]
            min-[1024px]:grid-cols-[auto_1fr_auto]
          "
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
              focus-visible:ring-[#e0503a]
            "
          >
            {!logoFailed && logo?.src ? (
              <Image
                src={logo.src}
                alt={logo.alt ?? "WKX Foundation"}
                width={230}
                height={64}
                priority
                onError={() => setLogoFailed(true)}
                className="
                  block h-auto w-auto
                  max-w-[170px]
                  sm:max-w-[210px]
                  max-h-[90px]
                  object-contain
                  transition-all duration-300
                "
              />
            ) : (
              <span
                className="
                  font-['Cormorant_Garamond',Georgia,serif]
                  text-2xl font-bold
                  tracking-tight text-[#141714]
                "
              >
                WKX{" "}
                <span className="text-[#e0503a]">
                  Foundation
                </span>
              </span>
            )}
          </Link>

          {/* ==================================
              DESKTOP NAVIGATION
          ================================== */}

          <nav
            aria-label="Main navigation"
            className="
              hidden items-center justify-center
              gap-6
              min-[1024px]:flex
              xl:gap-9
            "
          >
            {navItems
              .filter(
                (item) => item.label && item.linkTo
              )
              .map((item) => {
                const active = isActive(item.linkTo);

                return (
                  <Link
                    key={item.label}
                    href={item.linkTo}
                    aria-current={
                      active ? "page" : undefined
                    }
                    className={`
                      relative whitespace-nowrap
                      py-2.5 text-[14px]
                      font-medium capitalize
                      tracking-wide outline-none
                      transition-colors duration-200
                      hover:text-[#e0503a]
                      focus-visible:text-[#e0503a]

                      after:absolute after:bottom-0
                      after:left-0 after:h-[2px]
                      after:w-full
                      after:origin-left
                      after:bg-[#e0503a]
                      after:transition-transform
                      after:duration-300

                      ${
                        active
                          ? "font-semibold text-[#e0503a] after:scale-x-100"
                          : "text-[#343a34] after:scale-x-0 hover:after:scale-x-100"
                      }
                    `}
                  >
                    {item.label}
                  </Link>
                );
              })}
          </nav>

          {/* ==================================
              HEADER ACTIONS
          ================================== */}

          <div
            className="
              flex items-center
              justify-self-end gap-2 sm:gap-3
            "
          >
            {/* CTA Button */}

            {btnText && (
              <Link
                href={linkToBtn || "/#causes"}
                onClick={closeMenu}
                className="
                  group relative inline-flex
                  shrink-0 items-center
                  justify-center gap-2
                  overflow-hidden
                  bg-[#e0503a]
                  px-4 py-2.5
                  sm:px-6 sm:py-3
                  text-xs sm:text-sm
                  font-semibold tracking-wider
                  uppercase text-white
                  outline-none
                  transition-all duration-300
                  hover:bg-[#cb3d28]
                  hover:shadow-[0_8px_24px_-6px_rgba(224,80,58,0.45)]
                  focus-visible:ring-2
                  focus-visible:ring-[#e0503a]
                  focus-visible:ring-offset-2
                "
              >
                <span
                  aria-hidden="true"
                  className="
                    absolute inset-0
                    -translate-x-full
                    bg-[#f06450]
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
                  size={15}
                  className="
                    relative shrink-0
                    transition-transform duration-300
                    group-hover:translate-x-0.5
                    group-hover:-translate-y-0.5
                  "
                />
              </Link>
            )}

            {/* Mobile Menu Button */}

            <button
              type="button"
              aria-expanded={open}
              aria-controls="wkx-mobile-nav"
              aria-label={
                open ? "Close menu" : "Open menu"
              }
              onClick={() => setOpen(!open)}
              className="
                relative grid h-10 w-10
                shrink-0 place-items-center
                border border-[#141714]/15
                bg-white text-[#141714]
                transition-colors
                hover:border-[#e0503a]
                hover:text-[#e0503a]
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#e0503a]
                min-[1024px]:hidden
              "
            >
              <AnimatePresence
                mode="wait"
                initial={false}
              >
                {open ? (
                  <motion.span
                    key="close"
                    initial={{
                      opacity: 0,
                      rotate: -90,
                    }}
                    animate={{
                      opacity: 1,
                      rotate: 0,
                    }}
                    exit={{
                      opacity: 0,
                      rotate: 90,
                    }}
                    transition={menuTransition}
                  >
                    <X size={20} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{
                      opacity: 0,
                      rotate: 90,
                    }}
                    animate={{
                      opacity: 1,
                      rotate: 0,
                    }}
                    exit={{
                      opacity: 0,
                      rotate: -90,
                    }}
                    transition={menuTransition}
                  >
                    <Menu size={20} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* ==================================
            MOBILE NAVIGATION
        ================================== */}

        <AnimatePresence initial={false}>
          {open && (
            <>
              {/* Mobile Overlay */}

              <motion.div
                key="mobile-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={menuTransition}
                onClick={closeMenu}
                aria-hidden="true"
                className="
                  fixed inset-0 top-[72px]
                  z-[-1] bg-black/30
                  min-[1024px]:hidden
                "
              />

              {/* Mobile Menu */}

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
                  border-b border-[#e5dfd5]
                  bg-white shadow-[0_20px_35px_-10px_rgba(20,24,20,0.12)]
                  backdrop-blur-xl
                  min-[1024px]:hidden
                "
              >
                <nav
                  aria-label="Mobile navigation"
                  className="
                    mx-auto flex max-w-[1440px]
                    flex-col px-5 pb-6 pt-3
                    sm:px-8
                  "
                >
                  {navItems
                    .filter(
                      (item) =>
                        item.label && item.linkTo
                    )
                    .map((item, index) => {
                      const active = isActive(
                        item.linkTo
                      );

                      return (
                        <motion.div
                          key={item.label}
                          initial={
                            reduceMotion
                              ? false
                              : {
                                  opacity: 0,
                                  x: -10,
                                }
                          }
                          animate={{
                            opacity: 1,
                            x: 0,
                          }}
                          transition={{
                            duration: reduceMotion
                              ? 0
                              : 0.2,
                            delay: reduceMotion
                              ? 0
                              : index * 0.03,
                          }}
                        >
                          <Link
                            href={item.linkTo}
                            onClick={closeMenu}
                            aria-current={
                              active ? "page" : undefined
                            }
                            className={`
                              flex items-center
                              justify-between
                              border-b border-[#141714]/[0.07]
                              py-3.5 text-base
                              font-medium capitalize
                              transition-colors
                              hover:text-[#e0503a]

                              ${
                                active
                                  ? "font-semibold text-[#e0503a]"
                                  : "text-[#222823]"
                              }
                            `}
                          >
                            {item.label}

                            {active && (
                              <span
                                className="
                                  h-1.5 w-1.5
                                  rounded-full
                                  bg-[#e0503a]
                                "
                              />
                            )}
                          </Link>
                        </motion.div>
                      );
                    })}

                  {/* Mobile CTA */}

                  {btnText && (
                    <Link
                      href={linkToBtn || "/#causes"}
                      onClick={closeMenu}
                      className="
                        mt-5 flex w-full
                        items-center justify-center
                        gap-2 bg-[#e0503a]
                        px-6 py-3.5
                        text-sm font-semibold
                        uppercase tracking-wider
                        text-white transition-colors
                        hover:bg-[#cb3d28]
                      "
                    >
                      {btnText}
                      <ArrowUpRight size={17} />
                    </Link>
                  )}
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
