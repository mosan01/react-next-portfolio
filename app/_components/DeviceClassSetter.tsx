"use client";

import { useEffect } from "react";

const getDeviceType = (width: number) => {
  if (width <= 768) {
    return "sp";
  }
  if (width <= 1024) {
    return "tablet";
  }
  return "pc";
};

export default function DeviceClassSetter() {
  useEffect(() => {
    let frameId = 0;

    const applyDevice = () => {
      const device = getDeviceType(window.innerWidth);
      document.documentElement.dataset.device = device;
    };

    const onResize = () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
      frameId = requestAnimationFrame(applyDevice);
    };

    applyDevice();
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return null;
}
