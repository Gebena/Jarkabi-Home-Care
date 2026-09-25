"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    serwist?: { register: () => Promise<unknown> };
  }
}

export function RegisterSW() {
  useEffect(() => {
    if ("serviceWorker" in navigator && window.serwist) {
      void window.serwist.register();
    }
  }, []);

  return null;
}
