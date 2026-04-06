"use client";

import { useEffect } from "react";

const SELECTOR =
  ".animate-on-scroll, .animate-on-scroll-left, .animate-on-scroll-right, .animate-on-scroll-scale";

export function useScrollAnimation() {
  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("will-animate");
            entry.target.classList.add("is-visible");
            intersectionObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -20px 0px" }
    );

    const observe = () => {
      document.querySelectorAll<Element>(SELECTOR).forEach((el) => {
        if (!el.classList.contains("is-visible") && !el.classList.contains("will-animate")) {
          el.classList.add("will-animate");
          intersectionObserver.observe(el);
        }
      });
    };

    observe();

    // Catch elements added by lazy/streaming rendering
    const mutationObserver = new MutationObserver(observe);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      intersectionObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
}
