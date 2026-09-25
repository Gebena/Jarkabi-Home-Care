"use client";

import { useEffect, type RefObject } from "react";

const FOCUSABLE =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

type FocusTrapOptions = {
  /** Focus this element when the trap activates; otherwise first focusable in container. */
  initialFocusRef?: RefObject<HTMLElement | null>;
  /** Restore focus here when the trap deactivates. */
  restoreFocusRef?: RefObject<HTMLElement | null>;
  /** Lock document body scroll while active. */
  lockScroll?: boolean;
};

/**
 * Traps Tab within a container while active. Used for mobile nav sheet, search, and install prompt.
 */
export function useFocusTrap(
  active: boolean,
  containerRef: RefObject<HTMLElement | null>,
  options: FocusTrapOptions = {},
) {
  const { initialFocusRef, restoreFocusRef, lockScroll = true } = options;

  useEffect(() => {
    if (!active) return;

    const previousOverflow = document.body.style.overflow;
    if (lockScroll) document.body.style.overflow = "hidden";

    const focusTarget = initialFocusRef?.current;
    if (focusTarget) {
      focusTarget.focus();
    } else {
      containerRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !containerRef.current) return;

      const focusables = [...containerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)];
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      if (lockScroll) document.body.style.overflow = previousOverflow;
      restoreFocusRef?.current?.focus();
    };
  }, [active, containerRef, initialFocusRef, restoreFocusRef, lockScroll]);
}
