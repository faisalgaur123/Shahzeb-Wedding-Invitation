import { createFileRoute } from "@tanstack/react-router";
import {
  Calendar,
  Car,
  Check,
  Clock,
  Edit3,
  Heart,
  MapPin,
  Phone,
  RotateCcw,
  Sparkles,
  Upload,
  Users,
  Utensils,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

import coupleHands from "@/assets/couple-hands.jpg";
import coupleHero from "@/assets/couple-hero.jpg";
import weddingTable from "@/assets/wedding-table.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { OpeningEnvelope } from "@/components/OpeningEnvelope";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dr. Mohd. Shahzeb & Dr. Azmi Suhail | Neha Parveen & Mohd. Siraj — Wedding Invitation" },
      {
        name: "description",
        content:
          "Late Mr. Haji Ali Hasan family request the pleasure of your company on the auspicious occasion of the wedding ceremonies of their beloved grandchildren: Dr. Mohd. Shahzeb with Dr. Azmi Suhail, and Neha Parveen with Mohd. Siraj on Friday, 11th December 2026 at Royal Palace, Muzaffarnagar.",
      },
      { property: "og:title", content: "Dr. Mohd. Shahzeb & Dr. Azmi Suhail | Neha Parveen & Mohd. Siraj — Wedding Invitation" },
      {
        property: "og:description",
        content:
          "Late Mr. Haji Ali Hasan family request the pleasure of your company on the auspicious occasion of the wedding ceremonies of their beloved grandchildren: Dr. Mohd. Shahzeb with Dr. Azmi Suhail, and Neha Parveen with Mohd. Siraj on Friday, 11th December 2026 at Royal Palace, Muzaffarnagar.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
    ],
  }),
  component: WeddingInvitation,
});

type Invitation = {
  bride: string;
  groom: string;
  date: string;
  weddingDateFormatted: string;
  receptionDateFormatted: string;
  baraatTime: string;
  baraatDepartureNote: string;
  weddingVenue: string;
  weddingAddress: string;
  receptionTime: string;
  receptionVenue: string;
  receptionAddress: string;
  hostName: string;
  hostAddress: string;
  hostPhones: string[];
  message: string;
  photo: string;
  musicUrl: string;
  ceremonyTime: string;
  venue: string;
  address: string;
};

const defaults: Invitation = {
  bride: "Dr. Azmi Suhail",
  groom: "Dr. Mohd. Shahzeb",
  date: "2026-12-11",
  weddingDateFormatted: "Friday, 11th December 2026",
  receptionDateFormatted: "Friday, 11th December 2026",
  baraatTime: "06:00 P.M.",
  baraatDepartureNote: "Arrival of Barat — 06:00 P.M. • Nikah — 07:00 P.M.",
  weddingVenue: "ROYAL PALACE",
  weddingAddress: "N.H. 58, Baghonwali Rathedi Bypass, Muzaffarnagar",
  receptionTime: "08:00 P.M.",
  receptionVenue: "ROYAL PALACE",
  receptionAddress: "N.H. 58, Baghonwali Rathedi Bypass, Muzaffarnagar",
  hostName: "LATE MR. HAJI ALI HASAN",
  hostAddress: "ROYAL PALACE, N.H. 58, Baghonwali Rathedi Bypass, Muzaffarnagar",
  hostPhones: ["+91 97190 02067", "+91 8937-093417"],
  ceremonyTime: "07:00 P.M.",
  venue: "ROYAL PALACE",
  address: "N.H. 58, Baghonwali Rathedi Bypass, Muzaffarnagar",
  message:
    "Late Mr. Haji Ali Hasan request the pleasure of your company on the auspicious occasion of the wedding ceremonies of their beloved grandchildren: grandson Dr. Mohd. Shahzeb (Son of Mr. Haji Mazahir Hasan) with Dr. Azmi Suhail (Daughter of Mr. Mohd. Suhail, R/o Mawana, Meerut), and granddaughter Neha Parveen (Daughter of Mr. Mohd. Mazahir Hasan) with Mohd. Siraj (Son of Mr. Mohd. Hasan (Lalla), R/o Bajheri, Muzaffarnagar).",
  photo: coupleHero,
  musicUrl: "/wedding-music.mp3",
};

const storageKey = "wedding-invitation-shahzeb-neha-v2";

function safeStoredInvitation(value: string | null): Invitation | null {
  if (!value) return null;
  try {
    const parsed = JSON.parse(value) as Partial<Invitation>;
    if (
      parsed.groom &&
      (/adv/i.test(parsed.groom) || /zayd/i.test(parsed.groom) || /ehatsham/i.test(parsed.groom))
    ) {
      parsed.groom = defaults.groom;
    }
    if (
      !parsed.weddingVenue ||
      parsed.weddingVenue.includes("Rosewood") ||
      parsed.weddingVenue.includes("Grand View") ||
      parsed.venue?.includes("Rosewood")
    ) {
      parsed.weddingVenue = defaults.weddingVenue;
      parsed.weddingAddress = defaults.weddingAddress;
      parsed.receptionVenue = defaults.receptionVenue;
      parsed.receptionAddress = defaults.receptionAddress;
      parsed.hostName = defaults.hostName;
      parsed.hostAddress = defaults.hostAddress;
      parsed.hostPhones = defaults.hostPhones;
    }
    if (!parsed.hostPhones || !Array.isArray(parsed.hostPhones) || parsed.hostPhones.length === 0) {
      parsed.hostPhones = defaults.hostPhones;
    }
    return { ...defaults, ...parsed };
  } catch {
    return null;
  }
}

function countdown(value: string) {
  const target = new Date(`${value}T18:00:00`).getTime();
  const difference = Math.max(0, target - Date.now());
  return {
    days: Math.floor(difference / 86_400_000),
    hours: Math.floor((difference / 3_600_000) % 24),
    minutes: Math.floor((difference / 60_000) % 60),
    seconds: Math.floor((difference / 1_000) % 60),
  };
}

export function WeddingInvitation() {
  const [details, setDetails] = useState<Invitation>(defaults);
  const [draft, setDraft] = useState<Invitation>(defaults);
  const [opened, setOpened] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [isCustomizePath, setIsCustomizePath] = useState(false);
  const [editorError, setEditorError] = useState("");
  const [remaining, setRemaining] = useState(() => countdown(defaults.date));
  const fileRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const startMusic = useCallback(() => {
    if (!audioRef.current) return;
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise.then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  }, []);

  const toggleMusic = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    try {
      window.localStorage.removeItem("editable-muslim-wedding-invitation-v1");
      window.localStorage.removeItem("editable-muslim-wedding-invitation-v2");
      window.localStorage.removeItem("editable-muslim-wedding-invitation-v3");
      window.localStorage.removeItem("editable-muslim-wedding-invitation-v4");
      window.localStorage.removeItem("editable-muslim-wedding-invitation-v5");
    } catch { }
    const saved = safeStoredInvitation(window.localStorage.getItem(storageKey));
    if (saved) {
      setDetails(saved);
      setDraft(saved);
    }
    setHydrated(true);

    if (typeof window !== "undefined") {
      const search = new URLSearchParams(window.location.search);
      const hash = window.location.hash.toLowerCase();
      const pathname = window.location.pathname.toLowerCase();
      const isCustom =
        search.has("customize") ||
        search.has("edit") ||
        search.has("admin") ||
        pathname === "/customize" ||
        pathname === "/edit" ||
        pathname.endsWith("/customize") ||
        pathname.endsWith("/edit") ||
        hash === "#customize" ||
        hash === "#edit";

      setIsCustomizePath(isCustom);
      if (
        isCustom &&
        (pathname.includes("customize") ||
          pathname.includes("edit") ||
          search.get("open") === "true")
      ) {
        setOpened(true);
        setEditorOpen(true);
      }
    }
  }, []);

  useEffect(() => {
    const update = () => setRemaining(countdown(details.date));
    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, [details.date]);

  function scrollToProgramme() {
    document.getElementById("programme-section")?.scrollIntoView({ behavior: "smooth" });
  }

  function openEditor() {
    setDraft(details);
    setEditorError("");
    setEditorOpen(true);
  }

  function saveEditor(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const required = [
      draft.bride,
      draft.groom,
      draft.date,
      draft.weddingVenue,
      draft.receptionVenue,
    ];
    if (required.some((value) => !value.trim())) {
      setEditorError("Please complete the couple names, date, and venues.");
      return;
    }
    const cleaned: Invitation = {
      ...draft,
      bride: draft.bride.trim().slice(0, 60),
      groom: draft.groom.trim().slice(0, 60),
      date: draft.date.trim(),
      weddingDateFormatted: draft.weddingDateFormatted.trim().slice(0, 60),
      receptionDateFormatted: draft.receptionDateFormatted.trim().slice(0, 60),
      baraatTime: draft.baraatTime.trim().slice(0, 30),
      baraatDepartureNote: draft.baraatDepartureNote.trim().slice(0, 180),
      weddingVenue: draft.weddingVenue.trim().slice(0, 100),
      weddingAddress: draft.weddingAddress.trim().slice(0, 180),
      receptionTime: draft.receptionTime.trim().slice(0, 30),
      receptionVenue: draft.receptionVenue.trim().slice(0, 100),
      receptionAddress: draft.receptionAddress.trim().slice(0, 180),
      hostName: draft.hostName.trim().slice(0, 80),
      hostAddress: draft.hostAddress.trim().slice(0, 180),
      hostPhones: Array.isArray(draft.hostPhones) ? draft.hostPhones : defaults.hostPhones,
      message: draft.message.trim().slice(0, 320),
      musicUrl: (draft.musicUrl || "").trim() || defaults.musicUrl,
      ceremonyTime: draft.baraatTime.trim().slice(0, 30),
      venue: draft.receptionVenue.trim().slice(0, 100),
      address: draft.receptionAddress.trim().slice(0, 180),
    };
    setDetails(cleaned);
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(cleaned));
    } catch {
      setEditorError("The photo is too large to save in this browser. Try a smaller image.");
      return;
    }
    setEditorOpen(false);
  }

  function uploadPhoto(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setEditorError("Please choose a JPG, PNG, or WebP image.");
      return;
    }
    if (file.size > 1_500_000) {
      setEditorError("Please choose an image smaller than 1.5 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string")
        setDraft((current) => ({ ...current, photo: reader.result as string }));
    };
    reader.onerror = () => setEditorError("That image could not be read. Please try another.");
    reader.readAsDataURL(file);
  }

  function resetInvitation() {
    setDetails(defaults);
    setDraft(defaults);
    try {
      window.localStorage.removeItem(storageKey);
      window.localStorage.removeItem("editable-muslim-wedding-invitation-v1");
      window.localStorage.removeItem("editable-muslim-wedding-invitation-v2");
      window.localStorage.removeItem("editable-muslim-wedding-invitation-v3");
      window.localStorage.removeItem("editable-muslim-wedding-invitation-v4");
      window.localStorage.removeItem("editable-muslim-wedding-invitation-v5");
    } catch { }
    setEditorError("");
    setEditorOpen(false);
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={details.musicUrl || defaults.musicUrl}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <MusicButton isPlaying={isPlaying} onToggle={toggleMusic} />

      {!opened ? (
        <OpeningEnvelope
          details={details}
          onOpen={() => setOpened(true)}
          onStartMusic={startMusic}
        />
      ) : (
        <main className="relative min-h-screen overflow-hidden bg-background invitation-grain">
          <AmbientDecor />

          {/* Floating Top Customize Pill - only visible on custom path/query */}
          {isCustomizePath && (
            <div className="fixed top-4 right-4 z-40">
              <Button
                variant="soft"
                size="sm"
                onClick={openEditor}
                className="rounded-full bg-card/85 text-xs text-foreground shadow-md backdrop-blur-md border border-border/80 hover:bg-card hover:scale-105 transition-all"
              >
                <Edit3 className="size-3.5 text-gold" aria-hidden />
                <span>Customize</span>
              </Button>
            </div>
          )}

          {/* Small Names at Top with Gold Gradient - single line on all screen sizes */}
          <header className="relative z-20 pt-5 pb-2 px-2 sm:px-4 text-center page-reveal flex items-center justify-center gap-1.5 sm:gap-3 max-w-full overflow-hidden">
            <span className="h-px w-3 sm:w-16 bg-gradient-to-r from-transparent via-gold/60 to-transparent shrink" />
            <p className="gold-gradient-text font-display text-[13px] xs:text-[15px] sm:text-lg md:text-xl tracking-[0.08em] sm:tracking-[0.22em] font-semibold drop-shadow-sm whitespace-nowrap truncate max-w-[92vw]">
              Dr. Mohd. Shahzeb weds Dr. Azmi Suhail <br />&<br />  Neha Parveen weds Mohd. Siraj
            </p>
            <span className="h-px w-3 sm:w-16 bg-gradient-to-r from-transparent via-gold/60 to-transparent shrink" />
          </header>

          {/* All Sections Rendered on One Flowing Page */}
          <div className="relative z-10 divide-y divide-border/40">
            <Welcome details={details} remaining={remaining} onViewProgramme={scrollToProgramme} />

            <div className="py-2">
              <OurStory details={details} />
            </div>

            <div className="py-2">
              <Events details={details} />
            </div>

            <div className="py-2">
              <HostSection details={details} />
            </div>

            <div className="py-2">
              <Gallery details={details} />
            </div>
          </div>

          <footer className="relative z-10 border-t border-border/70 px-4 py-12 text-center bg-card/30 backdrop-blur-sm">
            <p className="font-script text-3xl text-gold">With love & prayers</p>
            <p className="mt-2 text-[11px] sm:text-xs uppercase tracking-[0.14em] sm:tracking-[0.26em] text-muted-foreground font-medium whitespace-nowrap">
              {details.groom} &amp; {details.bride}
            </p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-gold font-medium">
              A Cordial Invitation From {details.hostName} &amp; Family
            </p>
            <p className="mt-4 text-[11px] text-muted-foreground/70 max-w-md mx-auto">
              “May Allah bless you and shower His blessings upon you and bring you together in
              goodness.”
            </p>

            <div className="my-6 h-px max-w-xs mx-auto bg-gradient-to-r from-transparent via-border/80 to-transparent" />

            {/* Design & Development Credit */}
            <div className="text-center text-xs text-muted-foreground">
              <p className="flex flex-wrap items-center justify-center gap-1.5 text-[11.5px] sm:text-xs">
                <span>Designed &amp; Developed by</span>
                <a
                  href="https://bluepeaklabs.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-gold hover:underline hover:text-gold/90 transition-colors inline-flex items-center gap-1"
                  title="BluePeak Labs — Growth. Strategy. Results."
                >
                  BluePeak Labs
                </a>
              </p>
              <p className="mt-2 flex items-center justify-center gap-1.5 text-[11.5px] text-muted-foreground/90">
                <span>Contact:</span>
                <a
                  href="tel:8750448343"
                  className="inline-flex items-center gap-1 font-medium text-foreground hover:text-gold transition-colors"
                >
                  <Phone className="size-3 text-gold" aria-hidden="true" />
                  <span>8750448343</span>
                </a>
              </p>
            </div>
          </footer>

          {hydrated && editorOpen && (
            <EditorPanel
              draft={draft}
              error={editorError}
              fileRef={fileRef}
              onChange={setDraft}
              onPhoto={uploadPhoto}
              onClose={() => setEditorOpen(false)}
              onReset={resetInvitation}
              onSave={saveEditor}
            />
          )}
        </main>
      )}
    </>
  );
}

function AmbientDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Soft background ambient light blooms */}
      <div className="absolute left-[10%] top-[20%] h-80 w-80 rounded-full bg-gold/10 blur-[90px]" />
      <div className="absolute right-[12%] top-[45%] h-96 w-96 rounded-full bg-rose/10 blur-[100px]" />

      {/* Drifting petals with staggered delays */}
      <span className="petal absolute left-[6%] top-[15%] h-4 w-2 rounded-[80%_20%] bg-rose/40" />
      <span className="petal-slow absolute right-[10%] top-[32%] h-3.5 w-2 rotate-45 rounded-[70%_30%] bg-gold/35 [animation-delay:1.5s]" />
      <span className="petal absolute bottom-[22%] left-[14%] h-5 w-2.5 -rotate-12 rounded-[80%_20%] bg-rose/30 [animation-delay:2.4s]" />
      <span className="petal-slow absolute bottom-[12%] right-[18%] h-4 w-2 rotate-25 rounded-[70%_30%] bg-gold/30 [animation-delay:3.8s]" />
      <span className="petal absolute left-[45%] top-[8%] h-3.5 w-2 rotate-60 rounded-[80%_20%] bg-rose/25 [animation-delay:4.5s]" />

      {/* Shimmering stardust sparkles */}
      <span className="sparkle absolute right-[22%] top-[12%] size-2 rounded-full bg-gold shadow-[0_0_8px_var(--gold)]" />
      <span className="sparkle absolute left-[20%] top-[40%] size-1.5 rounded-full bg-gold [animation-delay:1.8s]" />
      <span className="sparkle absolute bottom-[26%] right-[8%] size-2 rounded-full bg-gold [animation-delay:1.4s]" />
      <span className="sparkle absolute left-[8%] bottom-[40%] size-1.5 rounded-full bg-gold [animation-delay:2.8s]" />
    </div>
  );
}

function Welcome({
  details,
  remaining,
  onViewProgramme,
}: {
  details: Invitation;
  remaining: ReturnType<typeof countdown>;
  onViewProgramme: () => void;
}) {
  return (
    <section className="mx-auto grid min-h-[calc(100vh-68px)] max-w-7xl items-center gap-10 px-5 py-12 md:grid-cols-[1.1fr_.9fr] md:px-8 lg:py-16">
      <div className="order-2 text-center md:order-1 md:text-left page-reveal">
        <p
          lang="ar"
          dir="rtl"
          className="mb-4 font-display text-xl sm:text-2xl text-gold drop-shadow-sm transition-transform hover:scale-105 duration-300"
        >
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
        </p>
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="h-px w-6 bg-gold/60" />
          <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground font-medium">
            Late Mr. Haji Ali Hasan Family
          </p>
          <span className="h-px w-6 bg-gold/60" />
        </div>
        <h1 className="font-display text-[clamp(1.35rem,3.6vw,3.5rem)] leading-none text-foreground whitespace-nowrap transition-all tracking-tight sm:tracking-normal flex items-center justify-center md:justify-start">
          <span className="hover:text-gold transition-colors duration-300">{details.groom}</span>
          <span className="font-script text-[.82em] text-gold animate-pulse [animation-duration:4s] mx-1.5 sm:mx-2.5">
            weds
          </span>
          <span className="hover:text-gold transition-colors duration-300">{details.bride}</span>
        </h1>
        <p className="mx-auto mt-6 max-w-lg leading-7 text-muted-foreground md:mx-0 font-sans">
          {details.message}
        </p>

        {/* Highlighted Event Dates Banner */}
        <div className="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-2.5 sm:gap-3">
          <div className="rounded-full border border-gold/40 bg-gold/5 px-4 py-1.5 backdrop-blur-sm">
            <span className="text-[11px] uppercase tracking-wider text-gold font-medium mr-1.5">
              Date:
            </span>
            <span className="font-display text-sm sm:text-base text-foreground font-semibold">
              Fri, 11 Dec 2026
            </span>
          </div>
          <div className="rounded-full border border-gold/40 bg-gold/5 px-4 py-1.5 backdrop-blur-sm">
            <span className="text-[11px] uppercase tracking-wider text-gold font-medium mr-1.5">
              Venue:
            </span>
            <span className="font-display text-sm sm:text-base text-foreground font-semibold">
              Royal Palace, Muzaffarnagar
            </span>
          </div>
        </div>

        {/* Live Countdown Timer */}
        <div className="mx-auto mt-7 grid max-w-md grid-cols-4 rounded-lg border border-border/80 bg-card/60 p-2 shadow-sm backdrop-blur-sm md:mx-0">
          {Object.entries(remaining).map(([label, value]) => (
            <div
              key={label}
              className="border-r border-border/60 px-2 text-center last:border-r-0 transition-transform duration-300 hover:scale-105"
            >
              <div className="font-display text-2xl text-foreground sm:text-3xl tabular-nums">
                {String(value).padStart(2, "0")}
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.16em] text-muted-foreground font-medium">
                {label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Button
            variant="invitation"
            size="lg"
            className="shine-effect group px-8 py-3 text-base shadow-[0_8px_25px_var(--shadow-warm)] transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_35px_var(--shadow-warm)]"
            onClick={onViewProgramme}
          >
            <span>View Programme</span>
            <Calendar className="size-4 transition-transform duration-300 group-hover:scale-110" />
          </Button>
        </div>
      </div>

      <div className="order-1 mx-auto w-full max-w-lg md:order-2 page-reveal stagger-2">
        <div className="relative aspect-[4/5] overflow-hidden rounded-t-[45%] border-2 border-gold/40 bg-muted shadow-[0_28px_80px_var(--shadow-warm)] group">
          <img
            src={details.photo}
            alt="Wedding couple portrait"
            width={1024}
            height={1280}
            className="hero-breathe h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 p-6 pt-24 text-primary-foreground">
            <p className="font-script text-3xl sm:text-4xl drop-shadow-md">Our forever begins</p>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-gold-foreground/90 uppercase tracking-widest">
              <Sparkles className="size-3 text-gold" />
              <span>Insha'Allah</span>
            </div>
          </div>
          {/* Subtle gold arch accent line */}
          <div className="absolute inset-2 rounded-t-[45%] border border-gold/30 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}

function SectionHeading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
}) {
  return (
    <header className="mx-auto mb-12 max-w-2xl text-center page-reveal">
      <div className="inline-flex items-center gap-2">
        <span className="h-px w-6 bg-gold/60" />
        <p className="text-xs uppercase tracking-[0.28em] text-gold font-medium">{eyebrow}</p>
        <span className="h-px w-6 bg-gold/60" />
      </div>
      <h1 className="mt-3 font-display text-4xl text-foreground sm:text-6xl tracking-tight">
        {title}
      </h1>
      {copy && <p className="mx-auto mt-4 max-w-xl leading-7 text-muted-foreground">{copy}</p>}
    </header>
  );
}

function OurStory({ details }: { details: Invitation }) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <SectionHeading
        eyebrow="Written by Allah"
        title="Our Sacred Union"
        copy="In the Name of Allah, the Most Gracious, the Most Merciful"
      />
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div className="relative group page-reveal">
          <div className="relative overflow-hidden rounded-t-[45%] border-2 border-gold/30 shadow-[0_24px_60px_var(--shadow-warm)]">
            <img
              src={coupleHands}
              alt="Wedding rings and joined hands"
              loading="lazy"
              width={1024}
              height={1280}
              className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="absolute -inset-2 rounded-t-[45%] border border-gold/20 -z-10 pointer-events-none transition-all duration-500 group-hover:-inset-3 group-hover:border-gold/40" />
        </div>
        <div className="text-center md:text-left page-reveal stagger-2">
          <Sparkles
            className="mx-auto mb-5 text-gold md:mx-0 size-6 animate-pulse"
            strokeWidth={1.2}
          />
          <blockquote className="font-display text-3xl leading-tight text-foreground sm:text-4xl">
            “And We created you in pairs.”
          </blockquote>
          <p className="mt-3 text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
            Qur’an 78:8
          </p>
          <div className="my-8 h-px bg-gradient-to-r from-gold/60 via-border to-transparent" />
          <p className="leading-8 text-muted-foreground font-sans text-base">
            With the divine blessings of Almighty Allah, Late Mr. Haji Ali Hasan and family cordially
            invite you to celebrate the joyous wedding ceremonies of their beloved grandchildren:
            grandson Dr. Mohd. Shahzeb with Dr. Azmi Suhail, and granddaughter Neha Parveen with Mohd. Siraj.
            Your presence, heartfelt blessings, and warm prayers are the greatest gift as they embark on
            this sacred journey of love and companionship.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-xs tracking-wider text-gold font-medium">
            <span>SHAHZEB &amp; AZMI • NEHA &amp; SIRAJ</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Events({ details }: { details: Invitation }) {
  const weddingMapHref = "https://maps.app.goo.gl/MDewvP3vPtjzNz3T6";

  return (
    <section id="programme-section" className="mx-auto max-w-4xl px-5 py-16 sm:px-8">
      <SectionHeading
        eyebrow="Insha Allah"
        title=":: Programme ::"
        copy="We cordially invite you and your family to join us in these celebratory moments."
      />

      <article className="group relative mx-auto overflow-hidden rounded-xl border border-border/80 bg-card p-6 sm:p-10 shadow-sm transition-all duration-300 hover:border-gold/50 hover:shadow-[0_18px_45px_var(--shadow-warm)] page-reveal">
        <div className="pointer-events-none absolute -top-10 -right-10 size-36 rounded-full bg-gold/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 size-36 rounded-full bg-rose/10 blur-2xl" />

        {/* Date and Event Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-4 mb-6">
          <div className="inline-flex items-center gap-2">
            <Calendar className="size-4 text-gold" />
            <span className="text-xs uppercase tracking-[0.18em] text-gold font-semibold">
              {details.weddingDateFormatted}
            </span>
          </div>
          <span className="rounded-full bg-gold/10 border border-gold/30 px-3 py-1 text-[11px] font-semibold text-gold uppercase tracking-wider">
            Wedding Ceremonies
          </span>
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="font-display text-2xl sm:text-3xl text-foreground group-hover:text-gold transition-colors">
            Auspicious Wedding Ceremonies
          </h2>
          <div className="font-script text-gold mt-2 flex flex-col items-center justify-center space-y-0.5">
            <span className="block whitespace-nowrap text-[clamp(13px,4.3vw,22px)] tracking-tight sm:tracking-normal">
              Dr. Mohd. Shahzeb weds Dr. Azmi Suhail
            </span>
            <span className="block text-xs sm:text-sm text-gold/80 font-sans tracking-widest uppercase my-0.5">
              &amp;
            </span>
            <span className="block whitespace-nowrap text-[clamp(13px,4.3vw,22px)] tracking-tight sm:tracking-normal">
              Neha Parveen weds Mohd. Siraj
            </span>
          </div>
        </div>

        {/* Both Couples */}
        <div className="grid gap-4 sm:grid-cols-2 mb-6">
          <div className="rounded-lg bg-secondary/50 p-4 text-xs leading-relaxed text-muted-foreground border border-border/50 space-y-1">
            <span className="inline-block text-[10px] uppercase tracking-wider font-semibold text-gold mb-1">
              First Wedding
            </span>
            <p className="font-semibold text-foreground text-sm">Dr. Mohd. Shahzeb weds Dr. Azmi Suhail</p>
            <p>Son of Mr. Haji Mazahir Hasan</p>
            <p>Daughter of Mr. Mohd. Suhail • R/o Mawana, Meerut</p>
          </div>

          <div className="rounded-lg bg-secondary/50 p-4 text-xs leading-relaxed text-muted-foreground border border-border/50 space-y-1">
            <span className="inline-block text-[10px] uppercase tracking-wider font-semibold text-gold mb-1">
              Second Wedding
            </span>
            <p className="font-semibold text-foreground text-sm">Neha Parveen weds Mohd. Siraj</p>
            <p>Daughter of Mr. Mohd. Mazahir Hasan</p>
            <p>Son of Mr. Mohd. Hasan (Lalla) • R/o Bajheri, Muzaffarnagar</p>
          </div>
        </div>

        {/* Programme Box */}
        <div className="mb-6 rounded-xl border border-gold/40 bg-gold/5 p-5 sm:p-6 shadow-sm">
          <div className="text-center mb-4">
            <span className="inline-block rounded-full bg-gold/15 border border-gold/30 px-3.5 py-1 text-[11px] font-semibold tracking-[0.25em] uppercase text-gold">
              :: PROGRAMME ::
            </span>
            <p className="mt-1 font-display text-sm sm:text-base text-foreground font-semibold">
              Friday, 11th December 2026
            </p>
          </div>

          <div className="mx-auto max-w-md space-y-2.5 font-sans text-xs sm:text-sm">
            <div className="flex items-center justify-between border-b border-border/50 pb-2.5">
              <span className="font-medium text-foreground flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-gold" />
                Arri. of Barat
              </span>
              <span className="font-display font-semibold text-gold tracking-wide">06.00 P.M.</span>
            </div>
            <div className="flex items-center justify-between border-b border-border/50 pb-2.5">
              <span className="font-medium text-foreground flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-gold" />
                Nikah
              </span>
              <span className="font-display font-semibold text-gold tracking-wide">07.00 P.M.</span>
            </div>
            <div className="flex items-center justify-between border-b border-border/50 pb-2.5">
              <span className="font-medium text-foreground flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-gold" />
                Dawat-E-Walima
              </span>
              <span className="font-display font-semibold text-gold tracking-wide">08.00 P.M.</span>
            </div>
            <div className="flex items-center justify-between pb-1">
              <span className="font-medium text-foreground flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-gold" />
                Rukhsati
              </span>
              <span className="font-display font-semibold text-gold tracking-wide">11.00 P.M.</span>
            </div>
          </div>
        </div>

        {/* Venue Section */}
        <div className="pt-5 border-t border-border/60">
          <div className="flex items-start gap-3">
            <MapPin className="size-5 shrink-0 text-gold mt-1" />
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-medium">
                Venue
              </p>
              <p className="font-display text-xl sm:text-2xl text-foreground font-semibold mt-0.5">
                {details.weddingVenue}
              </p>
              <p className="text-sm text-muted-foreground mt-1">{details.weddingAddress}</p>
            </div>
          </div>
        </div>

        {/* Contact Numbers */}
        {details.hostPhones.length > 0 && (
          <div className="mt-6 pt-5 border-t border-border/60 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs uppercase tracking-[0.16em] text-gold font-semibold flex items-center gap-1.5">
              <Phone className="size-3.5 text-gold" />
              <span>Contact:</span>
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {details.hostPhones.map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone.replace(/[\s-]+/g, "")}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/5 px-3 py-1 text-xs font-medium text-foreground transition-all hover:bg-gold/15 hover:border-gold"
                >
                  <Phone className="size-3 text-gold" />
                  <span>{phone}</span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Maps CTA Button */}
        <div className="mt-6 pt-2">
          <Button
            asChild
            variant="invitation"
            className="w-full shine-effect group justify-center"
          >
            <a href={weddingMapHref} target="_blank" rel="noreferrer">
              <span>Open Royal Palace in Maps</span>
              <MapPin className="size-4 transition-transform group-hover:translate-x-0.5 ml-1" />
            </a>
          </Button>
        </div>
      </article>
    </section>
  );
}

function HostSection({ details }: { details: Invitation }) {
  const hostMapHref = "https://maps.app.goo.gl/MDewvP3vPtjzNz3T6";
  return (
    <section className="mx-auto max-w-4xl px-5 py-14 sm:px-8">
      <div className="relative overflow-hidden rounded-xl border-2 border-gold/40 bg-card p-8 sm:p-12 text-center shadow-[0_20px_60px_var(--shadow-warm)] page-reveal">
        {/* Soft corner glow accents */}
        <div className="pointer-events-none absolute -top-12 -left-12 size-36 rounded-full bg-gold/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-12 -right-12 size-36 rounded-full bg-rose/10 blur-2xl" />

        <div className="inline-flex items-center gap-2 mb-3">
          <span className="h-px w-8 bg-gold/60" />
          <p className="font-sans text-xs uppercase tracking-[0.28em] text-gold font-medium">
            Late Mr. Haji Ali Hasan Family
          </p>
          <span className="h-px w-8 bg-gold/60" />
        </div>

        <h2 className="font-script text-3xl sm:text-4xl md:text-5xl text-gold drop-shadow-sm">
          A Cordial Invitation From
        </h2>

        <div className="my-5 h-px max-w-xs mx-auto bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

        <h3 className="font-display text-2xl sm:text-4xl text-foreground font-semibold tracking-wide">
          {details.hostName}
        </h3>

        <p className="mt-3 text-sm sm:text-base text-gold/90 font-medium max-w-lg mx-auto">
          Request the pleasure of your company on the auspicious occasion of the wedding ceremonies of their beloved grandchildren.
        </p>

        <div className="mt-4 flex items-center justify-center gap-2 text-sm sm:text-base text-muted-foreground max-w-md mx-auto leading-relaxed">
          <MapPin className="size-4 shrink-0 text-gold" />
          <span>{details.hostAddress}</span>
        </div>

        {/* Contact Numbers */}
        {details.hostPhones.length > 0 && (
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {details.hostPhones.map((phone) => (
              <a
                key={phone}
                href={`tel:${phone.replace(/[\s-]+/g, "")}`}
                className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/5 px-3.5 py-1.5 text-xs sm:text-sm font-medium text-foreground transition-all duration-300 hover:scale-105 hover:bg-gold/15 hover:border-gold"
              >
                <Phone className="size-3 text-gold" />
                <span>{phone}</span>
              </a>
            ))}
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-display text-xs sm:text-sm uppercase tracking-[0.25em] text-gold font-semibold">
            SHAHZEB &amp; AZMI • NEHA &amp; SIRAJ
          </span>
          <Button asChild variant="soft" size="sm" className="rounded-full text-xs">
            <a href={hostMapHref} target="_blank" rel="noreferrer">
              <MapPin className="size-3.5 mr-1 text-gold" />
              <span>View Venue Map</span>
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

function Gallery({ details }: { details: Invitation }) {
  const images = [
    { src: details.photo, alt: "Replaceable couple photograph", position: "md:row-span-2" },
    { src: coupleHands, alt: "Wedding rings and joined hands", position: "" },
    { src: weddingTable, alt: "Wedding reception table", position: "" },
  ];
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <SectionHeading
        eyebrow="A glimpse of us"
        title="Gallery"
        copy="Celebration moments and precious memories."
      />
      <div className="grid auto-rows-[260px] gap-4 md:grid-cols-2 md:auto-rows-[300px]">
        {images.map((image, index) => (
          <figure
            key={`${image.alt}-${index}`}
            className={cn(
              "group relative overflow-hidden rounded-md border border-border/70 bg-muted shadow-sm transition-all duration-300 hover:shadow-xl hover:border-gold/50 page-reveal",
              image.position,
              `stagger-${index + 1}`,
            )}
          >
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              width={1024}
              height={1280}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {index === 0 && (
              <figcaption className="absolute bottom-4 left-4 rounded-full bg-card/90 px-3.5 py-1.5 text-xs uppercase tracking-[0.14em] text-foreground backdrop-blur border border-gold/30">
                Couple portrait
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2 text-sm text-foreground">
      <span>{label}</span>
      {children}
    </label>
  );
}

type EditorProps = {
  draft: Invitation;
  error: string;
  fileRef: React.RefObject<HTMLInputElement | null>;
  onChange: React.Dispatch<React.SetStateAction<Invitation>>;
  onPhoto: (event: ChangeEvent<HTMLInputElement>) => void;
  onClose: () => void;
  onReset: () => void;
  onSave: (event: FormEvent<HTMLFormElement>) => void;
};

function EditorPanel({
  draft,
  error,
  fileRef,
  onChange,
  onPhoto,
  onClose,
  onReset,
  onSave,
}: EditorProps) {
  const update = (key: keyof Invitation, value: string) =>
    onChange((current) => ({ ...current, [key]: value }));
  return (
    <div
      className="fixed inset-0 z-50 bg-foreground/30 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Customize invitation"
    >
      <div className="absolute inset-y-0 right-0 w-full max-w-lg overflow-y-auto border-l border-border bg-background p-5 shadow-2xl sm:p-7">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-[0.2em] text-gold">Live editor</p>
            <h2 className="mt-2 font-display text-3xl">Customize invitation</h2>
            <p className="mt-2 text-sm text-muted-foreground">Changes are saved on this device.</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close editor">
            <X />
          </Button>
        </div>
        <form onSubmit={onSave} className="mt-8 grid gap-5 sm:grid-cols-2">
          <Field label="Groom name">
            <Input
              value={draft.groom}
              onChange={(event) => update("groom", event.target.value)}
              required
              maxLength={60}
            />
          </Field>
          <Field label="Bride name">
            <Input
              value={draft.bride}
              onChange={(event) => update("bride", event.target.value)}
              required
              maxLength={60}
            />
          </Field>
          <Field label="Wedding countdown date">
            <Input
              type="date"
              value={draft.date}
              onChange={(event) => update("date", event.target.value)}
              required
            />
          </Field>
          <Field label="Wedding date text">
            <Input
              value={draft.weddingDateFormatted}
              onChange={(event) => update("weddingDateFormatted", event.target.value)}
              required
              maxLength={60}
            />
          </Field>
          <Field label="Baraat departure time">
            <Input
              value={draft.baraatTime}
              onChange={(event) => update("baraatTime", event.target.value)}
              maxLength={30}
            />
          </Field>
          <Field label="Reception date text">
            <Input
              value={draft.receptionDateFormatted}
              onChange={(event) => update("receptionDateFormatted", event.target.value)}
              maxLength={60}
            />
          </Field>
          <Field label="Walima dinner time">
            <Input
              value={draft.receptionTime}
              onChange={(event) => update("receptionTime", event.target.value)}
              maxLength={30}
            />
          </Field>
          <Field label="First wedding venue">
            <Input
              value={draft.weddingVenue}
              onChange={(event) => update("weddingVenue", event.target.value)}
              required
              maxLength={100}
            />
          </Field>
          <div className="sm:col-span-2">
            <Field label="First wedding venue address">
              <Input
                value={draft.weddingAddress}
                onChange={(event) => update("weddingAddress", event.target.value)}
                maxLength={180}
              />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Field label="Baraat & Nikah note">
              <Input
                value={draft.baraatDepartureNote}
                onChange={(event) => update("baraatDepartureNote", event.target.value)}
                maxLength={180}
              />
            </Field>
          </div>
          <Field label="Second wedding venue">
            <Input
              value={draft.receptionVenue}
              onChange={(event) => update("receptionVenue", event.target.value)}
              required
              maxLength={100}
            />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Second wedding venue address">
              <Input
                value={draft.receptionAddress}
                onChange={(event) => update("receptionAddress", event.target.value)}
                maxLength={180}
              />
            </Field>
          </div>
          <Field label="Host name">
            <Input
              value={draft.hostName}
              onChange={(event) => update("hostName", event.target.value)}
              maxLength={80}
            />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Host residence address">
              <Input
                value={draft.hostAddress}
                onChange={(event) => update("hostAddress", event.target.value)}
                maxLength={180}
              />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Field label="Host contact numbers (comma-separated)">
              <Input
                value={draft.hostPhones.join(", ")}
                onChange={(event) =>
                  onChange((current) => ({
                    ...current,
                    hostPhones: event.target.value
                      .split(",")
                      .map((p) => p.trim())
                      .filter(Boolean),
                  }))
                }
                maxLength={180}
              />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Field label="Invitation message">
              <Textarea
                value={draft.message}
                onChange={(event) => update("message", event.target.value)}
                maxLength={320}
                rows={4}
              />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Field label="Background music URL (MP3)">
              <Input
                value={draft.musicUrl || ""}
                onChange={(event) => update("musicUrl", event.target.value)}
                placeholder="/wedding-music.mp3"
              />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <span className="mb-2 block text-sm">Couple photo</span>
            <div className="grid grid-cols-[88px_minmax(0,1fr)] items-center gap-4 rounded-md border border-border bg-card p-3">
              <img
                src={draft.photo}
                alt="Current couple photo preview"
                className="aspect-[4/5] w-full rounded-sm object-cover"
              />
              <div className="min-w-0">
                <p className="text-sm text-foreground">JPG, PNG, or WebP</p>
                <p className="mt-1 text-xs text-muted-foreground">Maximum 1.5 MB</p>
                <Button
                  type="button"
                  variant="soft"
                  size="sm"
                  className="mt-3"
                  onClick={() => fileRef.current?.click()}
                >
                  <Upload /> Choose photo
                </Button>
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="sr-only"
                onChange={onPhoto}
              />
            </div>
          </div>
          {error && (
            <p className="text-sm text-destructive sm:col-span-2" role="alert">
              {error}
            </p>
          )}
          <div className="flex flex-wrap gap-2 border-t border-border pt-5 sm:col-span-2">
            <Button type="submit" variant="invitation" className="flex-1">
              Save changes <Check />
            </Button>
            <Button type="button" variant="soft" onClick={onReset}>
              <RotateCcw /> Reset
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function MusicButton({ isPlaying, onToggle }: { isPlaying: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isPlaying ? "Pause background music" : "Play background music"}
      title={isPlaying ? "Pause background music" : "Play background music"}
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-full border border-gold/40 bg-card/90 px-3.5 py-2 text-foreground shadow-[0_8px_25px_var(--shadow-warm)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-gold hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
    >
      <div className="flex items-center gap-0.5 h-4 w-4 justify-center" aria-hidden="true">
        {isPlaying ? (
          <>
            <span className="w-0.5 bg-gold rounded-full music-bar-1 h-3" />
            <span className="w-0.5 bg-gold rounded-full music-bar-2 h-4" />
            <span className="w-0.5 bg-gold rounded-full music-bar-3 h-2" />
            <span className="w-0.5 bg-gold rounded-full music-bar-4 h-3.5" />
          </>
        ) : (
          <VolumeX className="size-4 text-muted-foreground" />
        )}
      </div>

      <span className="font-sans text-xs font-medium tracking-wide">
        {isPlaying ? (
          <span className="flex items-center gap-1.5 text-foreground">
            <span>Music</span>
            <span className="inline-block size-1.5 rounded-full bg-gold animate-pulse" />
          </span>
        ) : (
          <span className="text-muted-foreground">Play music</span>
        )}
      </span>
    </button>
  );
}
