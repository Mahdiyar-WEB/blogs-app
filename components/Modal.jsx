"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.22,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    transition: {
      duration: 0.18,
      ease: "easeInOut",
    },
  },
};

const isFormField = (element) => {
  if (!(element instanceof HTMLElement)) return false;

  return element.matches(
    'input, textarea, select, [contenteditable="true"]',
  );
};

const Modal = ({
  children,
  title = "title",
  description = "",
  open = false,
  onClose,
}) => {
  const modalRef = useRef(null);
  const scrollContainerRef = useRef(null);

  const [isMobile, setIsMobile] = useState(false);
  const [isFieldFocused, setIsFieldFocused] = useState(false);
  const [viewport, setViewport] = useState({
    height: null,
    offsetTop: 0,
  });

  useEffect(() => {
    const mobileMediaQuery = window.matchMedia("(max-width: 767px)");

    const updateDeviceSize = () => {
      setIsMobile(mobileMediaQuery.matches);
    };

    updateDeviceSize();

    mobileMediaQuery.addEventListener("change", updateDeviceSize);

    return () => {
      mobileMediaQuery.removeEventListener("change", updateDeviceSize);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open || !window.visualViewport) return;

    const visualViewport = window.visualViewport;

    const updateViewport = () => {
      setViewport({
        height: visualViewport.height,
        offsetTop: visualViewport.offsetTop,
      });
    };

    updateViewport();

    visualViewport.addEventListener("resize", updateViewport);
    visualViewport.addEventListener("scroll", updateViewport);

    return () => {
      visualViewport.removeEventListener("resize", updateViewport);
      visualViewport.removeEventListener("scroll", updateViewport);
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      setIsFieldFocused(false);
    }
  }, [open]);

  const handleBackdropClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose?.();
    }
  };

  const handleFocusCapture = (event) => {
    if (!isFormField(event.target)) return;

    setIsFieldFocused(true);

    window.setTimeout(() => {
      event.target.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }, 300);
  };

  const handleBlurCapture = (event) => {
    const nextFocusedElement = event.relatedTarget;

    if (
      nextFocusedElement instanceof HTMLElement &&
      modalRef.current?.contains(nextFocusedElement) &&
      isFormField(nextFocusedElement)
    ) {
      return;
    }

    window.setTimeout(() => {
      const activeElement = document.activeElement;

      if (
        activeElement instanceof HTMLElement &&
        modalRef.current?.contains(activeElement) &&
        isFormField(activeElement)
      ) {
        return;
      }

      setIsFieldFocused(false);
    }, 100);
  };

  const backdropStyle =
    isMobile && viewport.height
      ? {
          height: `${viewport.height}px`,
          top: `${viewport.offsetTop}px`,
          bottom: "auto",
        }
      : undefined;

  const modalMaxHeight =
    isMobile && viewport.height
      ? Math.max(viewport.height - 32, 240)
      : undefined;

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-secondary-900/60 px-4 py-4 backdrop-blur-sm"
          style={backdropStyle}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{
            duration: 0.2,
            ease: "easeInOut",
          }}
          onMouseDown={handleBackdropClick}
        >
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby={description ? "modal-description" : undefined}
            className="flex w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-secondary-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.18)]"
            style={{
              maxHeight: modalMaxHeight
                ? `${modalMaxHeight}px`
                : "calc(100dvh - 2rem)",
            }}
            variants={modalVariants}
            initial="hidden"
            animate={{
              opacity: 1,
              scale: 1,
              y: isMobile && isFieldFocused ? -24 : 0,
            }}
            exit="exit"
            transition={{
              duration: 0.22,
              ease: "easeOut",
            }}
            onMouseDown={(event) => event.stopPropagation()}
            onFocusCapture={handleFocusCapture}
            onBlurCapture={handleBlurCapture}
          >
            <div className="flex shrink-0 items-start justify-between gap-4 border-b border-secondary-200 px-5 py-4">
              <div className="min-w-0 space-y-1">
                <h2
                  id="modal-title"
                  className="text-base font-bold text-secondary-900"
                >
                  {title}
                </h2>

                {description ? (
                  <p
                    id="modal-description"
                    className="text-sm leading-6 text-secondary-500"
                  >
                    {description}
                  </p>
                ) : null}
              </div>

              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-secondary-500 transition-all duration-200 hover:bg-secondary-100 hover:text-secondary-700"
                aria-label="بستن مودال"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.8}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div
              ref={scrollContainerRef}
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5"
            >
              {children}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default Modal;
