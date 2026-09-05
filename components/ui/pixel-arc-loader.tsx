"use client";

import { useEffect, useState } from "react";

const FONT_LINK_ID = "pixel-arc-loader-fonts";
const FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Press+Start+2P&display=block";
const FONT_FAMILY = '"Press Start 2P", ui-monospace, monospace';

const DEPTH = 11;
const WAVE_LIFT = -16;
const WAVE_DURATION = 1.42;
const WAVE_STAGGER = 0.11;
const SKY_GRADIENT =
  "linear-gradient(180deg, #1b0b59 0%, #51209a 11%, #9b2ab7 22%, #f13e9a 31%, #ff765f 39%, #ffb36d 47%, #ffe2a5 55%, #fff5ca 67%, #e9f6d3 76%, #b9ecfa 88%, #7ed7f5 100%)";
const PIXEL_TEXTURE =
  "radial-gradient(circle at center, rgba(255,255,255,0.75) 1px, transparent 1.4px), repeating-linear-gradient(0deg, transparent 0 5px, rgba(42,11,79,0.16) 5px 6px)";

export type PixelArcLoaderProps = {
  title?: string;
  sceneSrc?: string;
  sceneAlt?: string;
  preview?: boolean;
  className?: string;
};

function cn(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

function usePixelArcFonts() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (!document.getElementById(FONT_LINK_ID)) {
      const link = document.createElement("link");
      link.id = FONT_LINK_ID;
      link.rel = "stylesheet";
      link.href = FONT_HREF;
      document.head.appendChild(link);
    }

    let cancelled = false;
    const fallback = window.setTimeout(() => {
      if (!cancelled) setReady(true);
    }, 900);

    void (async () => {
      try {
        await document.fonts?.load?.('400 64px "Press Start 2P"');
        await document.fonts?.ready;
      } catch {
        /* fallback */
      }
      if (!cancelled) setReady(true);
    })();

    return () => {
      cancelled = true;
      window.clearTimeout(fallback);
    };
  }, []);

  return ready;
}

function splitTitleChars(title: string) {
  const chars = Array.from(title);
  const mid = Math.max(chars.length - 1, 1) / 2;
  return chars.map((char, index) => ({
    key: `${index}-${char === " " ? "sp" : char}`,
    char: char === " " ? "\u00A0" : char,
    index,
    fromCenter: index - mid,
  }));
}

function stillWaveLift(index: number) {
  const dist = Math.abs(index - 2);
  if (dist >= 2.4) return 0;
  return WAVE_LIFT * Math.max(0, 1 - dist / 2.15);
}

function PixelLetter({
  char,
  fromCenter,
  index,
  preview,
}: {
  char: string;
  fromCenter: number;
  index: number;
  preview: boolean;
}) {
  const rotate = fromCenter * 7.2;
  const drop = fromCenter * fromCenter * 4.1;

  return (
    <span
      className={cn(
        "relative inline-block will-change-transform",
        !preview && "gen-pixel-arc-wave",
      )}
      style={
        preview
          ? { transform: `translateY(${stillWaveLift(index)}px)` }
          : {
              animationDuration: `${WAVE_DURATION}s`,
              animationDelay: `${index * WAVE_STAGGER}s`,
            }
      }
    >
      <span
        className="relative inline-block"
        style={{
          transform: `rotate(${rotate}deg) translateY(${drop}px)`,
          transformOrigin: "50% 85%",
        }}
      >
        {Array.from({ length: DEPTH }, (_, layer) => (
          <span
            key={layer}
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 select-none"
            style={{
              transform: `translate(${layer}px, ${layer}px)`,
              color: layer > DEPTH - 3 ? "#070707" : "#161616",
              zIndex: 0,
            }}
          >
            {char}
          </span>
        ))}
        <span
          className="relative z-[1] text-[#f6f6f6]"
          style={{
            textShadow:
              "-1px -1px 0 #0a0a0a, 1px -1px 0 #0a0a0a, -1px 1px 0 #0a0a0a, 1px 1px 0 #0a0a0a",
            WebkitTextStroke: "0.8px #111111",
            paintOrder: "stroke fill",
          }}
        >
          {char}
        </span>
      </span>
    </span>
  );
}

export function PixelArcLoader({
  title = "LOADING",
  sceneSrc,
  sceneAlt = "",
  preview = false,
  className,
}: PixelArcLoaderProps) {
  const fontReady = usePixelArcFonts();
  const letters = splitTitleChars(title);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className={cn(
        "relative isolate min-h-[100dvh] w-full overflow-hidden bg-[#1b0b59]",
        className,
      )}
      style={{ backgroundImage: SKY_GRADIENT }}
    >
      <style>{`
        @keyframes gen-pixel-arc-wave {
          0% { transform: translate3d(0, 0, 0); }
          14% { transform: translate3d(0, ${WAVE_LIFT}px, 0); }
          22% { transform: translate3d(0, ${WAVE_LIFT}px, 0); }
          36% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .gen-pixel-arc-wave {
          animation-name: gen-pixel-arc-wave;
          animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
          animation-iteration-count: infinite;
          animation-fill-mode: both;
        }
        @media (prefers-reduced-motion: reduce) {
          .gen-pixel-arc-wave { animation: none !important; }
        }
      `}</style>
      {sceneSrc && (
        <img
          src={sceneSrc}
          alt={sceneAlt}
          className="pointer-events-none absolute inset-0 h-full w-full scale-110 object-cover opacity-25 mix-blend-soft-light"
          style={{ filter: "blur(28px) saturate(0.78) brightness(0.72)" }}
        />
      )}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: PIXEL_TEXTURE,
          backgroundSize: "9px 9px, 100% 6px",
          mixBlendMode: "soft-light",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, rgba(42,11,79,0.02) 0%, rgba(42,11,79,0.2) 58%, rgba(17,5,47,0.72) 100%)",
        }}
      />
      <span className="sr-only">{title}</span>
      <div className="relative z-[1] flex min-h-[100dvh] w-full items-center justify-center px-4">
        <p
          aria-hidden="true"
          className={cn(
            "flex items-end justify-center transition-opacity duration-200",
            fontReady ? "opacity-100" : "opacity-95",
          )}
          style={{
            fontFamily: FONT_FAMILY,
            fontWeight: 400,
            fontSize: "clamp(1.95rem, 7.6vw, 5.6rem)",
            letterSpacing: "0.06em",
            lineHeight: 1,
            gap: "0.08em",
            filter: "drop-shadow(0 12px 22px rgba(0,0,0,0.5))",
          }}
        >
          {letters.map((letter) => (
            <PixelLetter
              key={letter.key}
              char={letter.char}
              fromCenter={letter.fromCenter}
              index={letter.index}
              preview={preview}
            />
          ))}
        </p>
      </div>
    </div>
  );
}

export default PixelArcLoader;
