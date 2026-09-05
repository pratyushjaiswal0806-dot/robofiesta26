"use client";

import { useEffect, useState } from "react";
import PixelArcLoader from "@/components/ui/pixel-arc-loader";

const SEEN_KEY = "robofiesta-pixel-arc-loader-seen";
const MIN_DURATION = 1500;
const MAX_WAIT = 6000;
const EXIT_DURATION = 500;

type LoaderPhase = "loading" | "exiting" | "done";

function waitForWindowLoad() {
  if (document.readyState === "complete") return Promise.resolve();

  return new Promise<void>((resolve) => {
    window.addEventListener("load", () => resolve(), { once: true });
  });
}

function waitForImages() {
  const images = Array.from(document.images);

  return Promise.all(
    images.map(
      (image) =>
        new Promise<void>((resolve) => {
          if (image.complete) {
            resolve();
            return;
          }

          const complete = () => resolve();
          image.addEventListener("load", complete, { once: true });
          image.addEventListener("error", complete, { once: true });
        }),
    ),
  );
}

export function SiteLoader() {
  const [phase, setPhase] = useState<LoaderPhase>("loading");

  useEffect(() => {
    let seen = false;
    try {
      seen = window.localStorage.getItem(SEEN_KEY) === "1";
    } catch {
      /* Continue with the intro when storage is unavailable. */
    }

    if (seen) {
      setPhase("done");
      return;
    }

    const startedAt = performance.now();
    let cancelled = false;
    let finished = false;
    let finishTimer: number | undefined;
    let exitTimer: number | undefined;

    const finish = () => {
      if (cancelled || finished) return;
      finished = true;
      const remaining = Math.max(
        0,
        MIN_DURATION - (performance.now() - startedAt),
      );

      finishTimer = window.setTimeout(() => {
        if (cancelled) return;
        try {
          window.localStorage.setItem(SEEN_KEY, "1");
        } catch {
          /* The loader can still complete without persistent storage. */
        }
        setPhase("exiting");
        exitTimer = window.setTimeout(() => setPhase("done"), EXIT_DURATION);
      }, remaining);
    };

    const maxTimer = window.setTimeout(finish, MAX_WAIT);
    void Promise.all([
      waitForWindowLoad(),
      waitForImages(),
      document.fonts?.ready,
    ]).then(finish);

    return () => {
      cancelled = true;
      window.clearTimeout(maxTimer);
      if (finishTimer !== undefined) window.clearTimeout(finishTimer);
      if (exitTimer !== undefined) window.clearTimeout(exitTimer);
    };
  }, []);

  useEffect(() => {
    if (phase === "done") return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-[2000] transition-opacity duration-500 ease-out ${
        phase === "exiting"
          ? "pointer-events-none opacity-0"
          : "pointer-events-auto opacity-100"
      }`}
    >
      <PixelArcLoader />
    </div>
  );
}

export default SiteLoader;
