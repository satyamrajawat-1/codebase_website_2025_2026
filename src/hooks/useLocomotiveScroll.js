/**
 * useLocomotiveScroll — Custom hook for Locomotive Scroll v5 (Lenis-based)
 *
 * Strategy:
 * - Locomotive Scroll v5 uses Lenis under the hood.
 * - By default in "native" mode (wrapper: window), it intercepts wheel/touch
 *   events and then emits them via the native window scroll event.
 * - This means ALL existing window.addEventListener('scroll', ...) handlers
 *   in HeroSection, TeamSection, and ProjectsSection continue to work correctly
 *   because getBoundingClientRect() returns accurate values relative to the
 *   real scroll position.
 *
 * We also expose the `scroll` instance for optional data-scroll attribute animations.
 */

import { useEffect, useRef } from 'react';
import LocomotiveScroll from 'locomotive-scroll';

/**
 * @param {object} options - Lenis options passed to LocomotiveScroll
 * @returns {{ scrollRef: React.MutableRefObject<LocomotiveScroll|null> }}
 */
export function useLocomotiveScroll(options = {}) {
  const scrollRef = useRef(null);

  useEffect(() => {
    // Small delay to ensure the DOM is fully painted
    const timer = setTimeout(() => {
      const locoScroll = new LocomotiveScroll({
        lenisOptions: {
          // Core smoothness — lerp between 0 (no smooth) and 1 (instant).
          // 0.06 gives a luxurious, heavy-inertia feel that matches our
          // long 800vh scroll animations.
          lerp: 0.06,
          // Lower multiplier = each scroll tick covers less distance
          // 0.65 makes the scroll feel slower and more deliberate / cinematic
          wheelMultiplier: 0.65,
          // Multiplier for touch scroll
          touchMultiplier: 1.5,
          // Smooth touch on mobile
          smoothTouch: false,
          // Orientation: vertical only
          orientation: 'vertical',
          // Respect reduced-motion preference
          ...options,
        },
        // We don't use the legacy data-scroll-container approach
        // so no `el` override is needed — it defaults to document
      });

      scrollRef.current = locoScroll;

      // Force a scroll event dispatch so our sticky progress calculations
      // are correct when the page first loads or is refreshed mid-scroll
      window.dispatchEvent(new Event('scroll'));
    }, 100);

    return () => {
      clearTimeout(timer);
      if (scrollRef.current) {
        scrollRef.current.destroy();
        scrollRef.current = null;
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { scrollRef };
}
