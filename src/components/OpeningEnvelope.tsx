import { Heart } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type Invitation = {
  bride: string;
  groom: string;
  date: string;
  ceremonyTime: string;
  receptionTime: string;
  venue: string;
  address: string;
  message: string;
  photo: string;
};

type OpeningEnvelopeProps = {
  details: Invitation;
  onOpen: () => void;
  onStartMusic?: () => void;
};

type AnimationState = "idle" | "unsealing" | "opening" | "fading" | "opened";

export function OpeningEnvelope({ details, onOpen, onStartMusic }: OpeningEnvelopeProps) {
  const [animState, setAnimState] = useState<AnimationState>("idle");

  // Extract initials for seal monogram (stripping common titles like Adv, Dr, Mohd, etc.)
  const cleanBride = details.bride
    .replace(/^((dr|er|ms|mrs|miss)\.?\s*)+/i, "")
    .replace(/[^a-zA-Z]/g, "")
    .trim();
  const cleanGroom = details.groom
    .replace(/^((adv|advocate|dr|er|mr|md|mohd|sheikh)\.?\s*)+/i, "")
    .replace(/[^a-zA-Z]/g, "")
    .trim();
  const brideInitial = (
    cleanBride ? cleanBride.charAt(0) : details.bride.trim().charAt(0) || "A"
  ).toUpperCase();
  const groomInitial = (
    cleanGroom ? cleanGroom.charAt(0) : details.groom.trim().charAt(0) || "S"
  ).toUpperCase();

  const handleOpen = () => {
    if (animState !== "idle") return;

    if (onStartMusic) {
      onStartMusic();
    }

    setAnimState("unsealing");

    // Smooth luxury sequence:
    // 1. Unseal (0-200ms) -> Wax seal softly lifts with golden glow
    setTimeout(() => {
      setAnimState("opening");
    }, 200);

    // 2. Flap unfolds 3D + Card glides upward gracefully (200-1100ms)
    setTimeout(() => {
      setAnimState("fading");
    }, 1100);

    // 3. Complete and smoothly transition into the opened invitation page
    setTimeout(() => {
      setAnimState("opened");
      onOpen();
    }, 1600);
  };

  const isFlapOpen = animState === "opening" || animState === "fading" || animState === "opened";
  const isUnsealed = animState !== "idle";
  const isFadingOut = animState === "fading" || animState === "opened";

  return (
    <main
      className={`relative grid min-h-screen w-full place-items-center overflow-hidden bg-background px-4 py-8 select-none invitation-grain transition-all ease-out ${isFadingOut ? "opacity-0 scale-[1.04] pointer-events-none" : "opacity-100 scale-100"
        }`}
      style={{
        transitionDuration: "550ms",
      }}
    >
      {/* Subtle Floating Petals & Glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[100px]" />
        <span className="petal absolute left-[8%] top-[18%] h-4 w-2 rounded-[80%_20%] bg-rose/40" />
        <span className="petal absolute right-[12%] top-[25%] h-3 w-2 rotate-45 rounded-[70%_30%] bg-gold/40 [animation-delay:1.2s]" />
        <span className="petal absolute bottom-[18%] left-[15%] h-5 w-2.5 -rotate-12 rounded-[80%_20%] bg-rose/30 [animation-delay:2.1s]" />
        <span className="sparkle absolute right-[22%] top-[14%] size-1.5 rounded-full bg-gold shadow-[0_0_8px_var(--gold)]" />
        <span className="sparkle absolute bottom-[22%] right-[10%] size-2 rounded-full bg-gold [animation-delay:1.4s]" />
      </div>

      {/* Top Direct Skip Action */}
      <div className="absolute top-4 right-4 z-40">
        <Button
          variant="ghost"
          size="sm"
          onClick={onOpen}
          className="rounded-full bg-card/70 text-xs text-muted-foreground backdrop-blur border border-border/50 hover:text-foreground"
        >
          Skip Intro
        </Button>
      </div>

      <div className="relative z-10 flex w-full max-w-lg flex-col items-center text-center">
        {/* Sacred Calligraphy Header */}
        <div
          className={`transition-all duration-500 ${animState !== "idle"
            ? "opacity-0 -translate-y-4 pointer-events-none"
            : "opacity-100 translate-y-0"
            }`}
        >
          <p
            lang="ar"
            dir="rtl"
            className="mb-2 font-display text-2xl tracking-wide text-gold sm:text-3xl drop-shadow-sm"
          >
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </p>
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-gold/50" />
            <p className="font-sans text-xs sm:text-sm uppercase tracking-[0.26em] text-muted-foreground font-medium">
              Late Mr. Haji Ali Hasan Family
            </p>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-gold/50" />
          </div>
        </div>

        {/* Portrait Mode 3D Envelope Container */}
        <div
          className="relative mt-7 w-full max-w-[340px] sm:max-w-[390px] cursor-pointer"
          style={{ perspective: "1200px" }}
          onClick={handleOpen}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleOpen();
            }
          }}
          aria-label="Click wax seal to open wedding invitation"
        >
          {/* Main Portrait Envelope Body */}
          <div
            className={`envelope-body relative aspect-[1/1.38] w-full rounded-md transition-all duration-700 ${animState === "idle"
              ? "envelope-float hover:scale-[1.015] hover:-translate-y-1 shadow-[0_24px_70px_var(--shadow-warm)]"
              : "shadow-[0_35px_90px_var(--shadow-warm)]"
              }`}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {/* 1. ENVELOPE BACK LINING */}
            <div className="absolute inset-0 rounded-md bg-[#f7efe5] dark:bg-[#25201b] border border-[#dfceb9] dark:border-[#42372c] overflow-hidden shadow-inner">
              {/* Elegant Geometric Damask Pattern */}
              <div
                className="absolute inset-0 opacity-35 mix-blend-multiply dark:mix-blend-screen"
                style={{
                  backgroundImage: `radial-gradient(circle at 50% 50%, #c59b27 1px, transparent 1px), radial-gradient(circle at 0% 0%, #c59b27 1px, transparent 1px)`,
                  backgroundSize: "20px 20px",
                }}
              />
              <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#dfcaaf]/35 to-transparent" />
            </div>

            {/* 1.5 INNER INVITATION CARD (Slides upward smoothly when opened) */}
            <div
              className="absolute inset-x-3 sm:inset-x-4 top-3 sm:top-4 z-10 rounded-t-sm bg-gradient-to-b from-[#fffbf4] via-[#fcf7ec] to-[#f4ebe0] dark:from-[#2a241e] dark:to-[#1c1813] border border-[#d4af37]/50 shadow-[0_6px_20px_rgba(0,0,0,0.1)] p-2.5 sm:p-4 flex flex-col items-center justify-start text-center pointer-events-none transition-all"
              style={{
                height: "82%",
                transform: isFlapOpen ? "translateY(-50%) scale(1.02)" : "translateY(0%) scale(1)",
                transitionDuration: "800ms",
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                opacity: isUnsealed ? 1 : 0.9,
              }}
            >
              <div className="w-full h-full border border-[#d4af37]/35 rounded-sm p-3 sm:p-4 flex flex-col items-center justify-center gap-0.5 sm:gap-1">
                <p className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.22em] text-gold font-semibold">
                  Insha Allah
                </p>
                <p
                  lang="ar"
                  dir="rtl"
                  className="font-display text-base sm:text-lg text-gold drop-shadow-xs my-0.5"
                >
                  بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
                </p>
                <p className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
                  Wedding Invitation
                </p>
                <div className="flex items-center justify-center gap-1 sm:gap-1.5 max-w-full whitespace-nowrap my-1 px-1">
                  <span className="font-display text-[12px] xs:text-[13px] sm:text-base text-foreground font-semibold tracking-normal truncate">
                    {details.groom}
                  </span>
                  <span className="font-script text-sm sm:text-lg text-gold font-normal px-0.5 shrink-0 inline-block align-middle">
                    weds
                  </span>
                  <span className="font-display text-[12px] xs:text-[13px] sm:text-base text-foreground font-semibold tracking-normal truncate">
                    {details.bride}
                  </span>
                </div>
                <div className="my-0.5 flex flex-col items-center text-[10.5px] sm:text-xs text-foreground/85 font-medium leading-relaxed">
                  <p>
                    <span className="text-gold font-semibold">Wedding:</span> Friday, 11th Dec 2026
                  </p>
                  <p>
                    <span className="text-gold font-semibold">Barat:</span> 06:00 PM • <span className="text-gold font-semibold">Nikah:</span> 07:00 PM
                  </p>
                </div>
                <p className="font-sans text-[9.5px] sm:text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-medium mt-0.5">
                  Royal Palace, Muzaffarnagar
                </p>
              </div>
            </div>

            {/* 2. SOLID FRONT POCKET (Seamless pocket, no diagonal fold seams slicing through text) */}
            <div
              className="absolute inset-x-0 bottom-0 h-[88%] z-20 rounded-b-md pointer-events-none overflow-hidden"
              style={{
                background: "linear-gradient(180deg, #f4e7d7 0%, #ecd7be 50%, #e0ceb7 100%)",
                boxShadow: "0 -2px 10px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.7)",
                borderTop: "1.5px solid rgba(212,175,55,0.45)",
              }}
            >
              {/* Soft Luxury Satin Cardstock Sheen (Clean finish without dotted grid) */}
              <div
                className="absolute inset-0 pointer-events-none opacity-40 mix-blend-soft-light"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 65%, rgba(255,255,255,0.7) 0%, transparent 65%)",
                }}
              />

              {/* Elegant Gold Foil Frame & Royal Typography */}
              <div className="absolute inset-3 sm:inset-4 rounded-sm border border-gold/35 flex flex-col items-center justify-end pb-5 sm:pb-7 px-3 sm:px-6">
                <div
                  className={`w-full max-w-full flex flex-col items-center text-center transition-opacity duration-500 ${isFlapOpen ? "opacity-30" : "opacity-95"
                    }`}
                >
                  <div className="h-px w-10 sm:w-14 bg-gradient-to-r from-transparent via-gold/60 to-transparent mb-1.5" />
                  <p className="font-sans text-[9px] sm:text-[10.5px] uppercase tracking-[0.24em] text-gold font-semibold mb-1">
                    Late Mr. Haji Ali Hasan Family
                  </p>
                  <div className="flex items-center justify-center gap-1 sm:gap-1.5 max-w-full whitespace-nowrap px-1 my-0.5">
                    <span className="font-display text-[12px] xs:text-[13px] sm:text-[16px] md:text-lg text-foreground font-semibold tracking-normal truncate">
                      {details.groom}
                    </span>
                    <span className="font-script text-sm xs:text-base sm:text-xl text-gold font-normal px-0.5 shrink-0 inline-block align-middle">
                      weds
                    </span>
                    <span className="font-display text-[12px] xs:text-[13px] sm:text-[16px] md:text-lg text-foreground font-semibold tracking-normal truncate">
                      {details.bride}
                    </span>
                  </div>
                  <p className="font-sans text-[9px] sm:text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground font-medium mt-1">
                    Friday, 11th December 2026
                  </p>
                  <div className="h-px w-10 sm:w-14 bg-gradient-to-r from-transparent via-gold/60 to-transparent mt-1.5" />
                </div>
              </div>

              {/* Soft lighting highlight */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-white/20" />
            </div>

            {/* 3. ENVELOPE TOP FLAP (Euro-Flap that completely overlaps front pocket with zero gaps) */}
            <div
              className="absolute inset-x-0 top-0 h-[46%] origin-top transition-transform"
              style={{
                transformStyle: "preserve-3d",
                transform: isFlapOpen ? "rotateX(-180deg)" : "rotateX(0deg)",
                transitionDuration: "750ms",
                transitionTimingFunction: "cubic-bezier(0.25, 1, 0.5, 1)",
                zIndex: isFlapOpen ? 5 : 30,
              }}
            >
              {/* Top Flap Front (Visible when closed) */}
              <div
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 100% 32%, 50% 100%, 0 32%)",
                  background: "linear-gradient(180deg, #faf2e7 0%, #ecdcc7 80%, #dfcaa9 100%)",
                  backfaceVisibility: "hidden",
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 100% 32%, 50% 100%, 0 32%)",
                    background:
                      "radial-gradient(circle at 50% 100%, rgba(212,175,55,0.25) 0%, transparent 60%)",
                  }}
                />
              </div>

              {/* Top Flap Back / Inner (Visible when flipped open backwards) */}
              <div
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 100% 32%, 50% 100%, 0 32%)",
                  background: "linear-gradient(180deg, #ecdac4 0%, #f6eee3 100%)",
                  transform: "rotateX(180deg)",
                  backfaceVisibility: "hidden",
                }}
              >
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: `radial-gradient(circle at 50% 50%, #c59b27 1px, transparent 1px)`,
                    backgroundSize: "16px 16px",
                  }}
                />
              </div>
            </div>

            {/* 4. ROYAL WAX SEAL */}
            <div
              className={`wax-seal-wrapper absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 z-35 transition-all ${isUnsealed
                ? "scale-110 opacity-0 pointer-events-none"
                : "scale-100 opacity-100 hover:scale-108"
                }`}
              style={{
                transitionDuration: "350ms",
                transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              {/* Satin Gold Ribbons */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-16 w-28 pointer-events-none">
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 h-12 w-3.5 -rotate-12 bg-gradient-to-b from-amber-700 via-yellow-600 to-amber-800 shadow-md rounded-b-sm [clip-path:polygon(0_0,100%_0,100%_100%,50%_80%,0_100%)] opacity-85" />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 h-12 w-3.5 rotate-15 bg-gradient-to-b from-amber-700 via-yellow-600 to-amber-800 shadow-md rounded-b-sm [clip-path:polygon(0_0,100%_0,100%_100%,50%_80%,0_100%)] opacity-85" />
              </div>

              {/* Soft Pulsing Halo */}
              <div className="absolute inset-0 -m-2 rounded-full bg-gold/30 blur-md seal-glow pointer-events-none" />

              {/* Wax Seal SVG Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpen();
                }}
                className="group relative size-18 sm:size-20 rounded-full p-0 cursor-pointer border-0 bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                aria-label="Break wax seal to open invitation"
              >
                <svg
                  viewBox="0 0 100 100"
                  className="size-full drop-shadow-[0_6px_14px_rgba(0,0,0,0.32)] transition-transform duration-300 group-hover:rotate-6"
                >
                  <defs>
                    <radialGradient id="waxGoldGrad" cx="35%" cy="30%" r="70%">
                      <stop offset="0%" stopColor="#f5d77f" />
                      <stop offset="25%" stopColor="#d4a338" />
                      <stop offset="65%" stopColor="#9a6e1a" />
                      <stop offset="100%" stopColor="#5c400c" />
                    </radialGradient>
                    <filter id="sealShadow" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow
                        dx="0"
                        dy="1.5"
                        stdDeviation="1.5"
                        floodColor="#000"
                        floodOpacity="0.4"
                      />
                    </filter>
                  </defs>

                  {/* Organic Wax Edge */}
                  <path
                    d="M50 3
                       C62 2, 70 8, 80 15
                       C88 22, 96 32, 97 44
                       C98 57, 91 68, 85 78
                       C78 87, 68 96, 54 97
                       C40 98, 29 93, 20 86
                       C10 78, 3 67, 3 53
                       C3 39, 10 27, 20 18
                       C30 9, 39 4, 50 3 Z"
                    fill="url(#waxGoldGrad)"
                  />

                  {/* Inner Ring */}
                  <circle
                    cx="50"
                    cy="50"
                    r="37"
                    fill="none"
                    stroke="#7a5513"
                    strokeWidth="2"
                    opacity="0.6"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="36"
                    fill="none"
                    stroke="#ffeaa7"
                    strokeWidth="1"
                    opacity="0.8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="33"
                    fill="none"
                    stroke="#ffeaa7"
                    strokeWidth="0.8"
                    strokeDasharray="2, 3"
                    opacity="0.75"
                  />

                  {/* Center Basin */}
                  <circle
                    cx="50"
                    cy="50"
                    r="29"
                    fill="url(#waxGoldGrad)"
                    filter="url(#sealShadow)"
                    opacity="0.95"
                  />

                  {/* Monogram Crest */}
                  <g className="text-amber-100">
                    <path
                      d="M34 36 C42 30, 58 30, 66 36 M34 64 C42 70, 58 70, 66 64"
                      fill="none"
                      stroke="#ffeaa7"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      opacity="0.8"
                    />
                    <text
                      x="50"
                      y="54"
                      textAnchor="middle"
                      fontFamily="Italiana, serif"
                      fontSize="16"
                      fontWeight="bold"
                      fill="#fff8e7"
                      style={{
                        letterSpacing: "1px",
                        filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.7))",
                      }}
                    >
                      {groomInitial}
                      <tspan fontSize="11" fill="#fce5a2" fontFamily="Parisienne, cursive">
                        {" "}
                        &{" "}
                      </tspan>
                      {brideInitial}
                    </text>
                  </g>
                </svg>

                {/* Glare Sheen */}
                <span className="absolute inset-2 rounded-full bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </div>
        </div>

        {/* Subtle Tap to Open Indicator */}
        <div
          className={`mt-6 transition-all duration-300 flex items-center justify-center gap-2 ${animState !== "idle" ? "opacity-0 translate-y-1 pointer-events-none" : "opacity-100"
            }`}
        >
          <span className="size-1.5 rounded-full bg-gold/80 animate-ping" />
          <p className="font-sans text-xs sm:text-sm uppercase tracking-[0.24em] text-gold font-medium">
            Tap wax seal to open
          </p>
          <span className="size-1.5 rounded-full bg-gold/80 animate-ping" />
        </div>
      </div>
    </main>
  );
}
