import { useEffect, useMemo, useRef, useState } from "react";
import mentorImg from "./assets/pal-mentor.png";
import ringImg from "./assets/pal-ring.png";
import badgeImg from "./assets/pal-badge.png";

const WHATSAPP_LINK = "https://wa.me/message/LMSJBMQJW4E2A1";

const slides = [
  {
    id: 1,
    type: "cover",
    eyebrow: "¿AÑOS DE INGLÉS Y\nSIGUES SIN EMPLEO?",
    title: "LOS 3 CÓDIGOS\nCONFIDENCIALES",
    subtitle: "GUÍA DE MENTORÍA\n(POR PAL CALL CENTER)",
  },
  {
    id: 2,
    type: "content",
    smallTop: "CÓDIGO CONFIDENCIAL 1",
    title: "EL CÓDIGO DEL DOMINIO",
    subtitle: "(CONFIDENCE + GRAMÁTICA PERFECTA)",
    circleText:
      "EL RECLUTADOR\nPERDONA UN ERROR\nGRAMATICAL PEQUEÑO,\nPERO JAMÁS PERDONA\nTU MIEDO.\n\nSI TÚ DUDAS, ELLOS DUDAN.\nTU INSEGURIDAD TE CUESTA\nEL EMPLEO.",
    bottom:
      "*LA ENTREVISTA SE GANA POR CÓMO LO DICES, NO SOLO POR QUÉ DICES.*",
    circleClass:
      "text-[1rem] leading-[1.02] sm:text-[1.3rem] md:text-[1.55rem]",
    bottomClass: "text-[0.72rem] leading-[1.06] sm:text-[0.9rem]",
    ringSize: "h-[160px] w-[160px] sm:h-[210px] sm:w-[210px]",
    wrap: "max-w-[340px] sm:max-w-[420px]",
  },
  {
    id: 3,
    type: "content",
    smallTop: "CÓDIGO CONFIDENCIAL 2",
    title: "EL CÓDIGO DE LA ESTRUCTURA",
    subtitle: "(EL MÉTODO S.T.A.R.)",
    circleText:
      "EL 90% DE LOS\nCANDIDATOS DIVAGA.\nEL RECLUTADOR ODIA\nEL DESORDEN MENTAL.\n\nNARRA TU HISTORIA (EN INGLÉS):\n“A customer was upset (S), my\ngoal was to calm him (T), I fixed\nthe error step-by-step (A), and\nI got a 5-star rating (R).”",
    bottom:
      "UN FINAL FELIZ CON RESULTADOS ESPECÍFICOS VALE MÁS QUE MIL PALABRAS.",
    circleClass:
      "text-[1rem] leading-[1.02] sm:text-[1.3rem] md:text-[1.55rem]",
    bottomClass: "text-[0.72rem] leading-[1.06] sm:text-[0.9rem]",
    ringSize: "h-[160px] w-[160px] sm:h-[210px] sm:w-[210px]",
    wrap: "max-w-[340px] sm:max-w-[420px]",
  },
  {
    id: 4,
    type: "content",
    smallTop: "CÓDIGO 3",
    title: "EL CÓDIGO DEL VALOR",
    subtitle: "DEMUESTRA QUE ERES EL ACTIVO QUE NECESITAN",
    circleText:
      "¿SIN EXPERIENCIA?\n➜ Actitud, Logros\nPersonales y Carrera\nen la empresa.\n\n¿CON EXPERIENCIA?\n➜ Números y Soluciones\nCríticas en trabajo anterior.",
    bottom: "Sé la solución que cierra su meta hoy.",
    circleClass:
      "text-[1rem] leading-[1.02] sm:text-[1.26rem] md:text-[1.5rem]",
    bottomClass: "text-[0.82rem] leading-[1.05] sm:text-[1rem]",
    ringSize: "h-[165px] w-[165px] sm:h-[220px] sm:w-[220px]",
    wrap: "max-w-[340px] sm:max-w-[420px]",
  },
  {
    id: 5,
    type: "cta",
    smallTop: "CÓDIGO CONFIDENCIAL",
    title: "EL EMPLEO TE LO GANAS TÚ.\nYO TE DOY LAS ARMAS.",
    paragraph:
      "Las academias te dan gramática.\nYo te doy la estrategia y la fluidez para que\nno te quedes en blanco frente al reclutador.",
    bullets: [
      ["PRÁCTICA REAL:", "Escenarios de Call Center."],
      ["LÓGICA:", "Responde lo que ellos quieren oír."],
      ["COMUNIDAD:", "Practica diario a tu ritmo."],
    ],
    cta: "¡QUIERO MI ENTRENAMIENTO!   $100",
    footnote: "*Acceso inmediato. Sesiones hoy 7:00 PM.*",
  },
];

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Arrow({ side, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === "left" ? "Anterior" : "Siguiente"}
      className={cn(
        "absolute top-1/2 z-30 -translate-y-1/2 rounded-full",
        "border border-white/15 bg-black/70 text-white",
        "flex h-11 w-11 items-center justify-center sm:h-12 sm:w-12",
        "transition hover:border-lime-400/60 hover:text-lime-300"
      )}
      style={side === "left" ? { left: "-4px" } : { right: "-4px" }}
    >
      <span className="text-4xl leading-none">{side === "left" ? "‹" : "›"}</span>
    </button>
  );
}

function Dots({ total, active, onSelect }) {
  return (
    <div className="mt-3 flex items-center justify-center gap-2 pb-3">
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          type="button"
          onClick={() => onSelect(index)}
          aria-label={`Ir a slide ${index + 1}`}
          className={cn(
            "h-2 rounded-full transition-all",
            active === index
              ? "w-7 bg-lime-400 shadow-[0_0_16px_rgba(57,255,20,0.9)]"
              : "w-2 bg-white/25"
          )}
        />
      ))}
    </div>
  );
}

function GlowText({ children, className = "" }) {
  return (
    <div
      className={cn(
        "whitespace-pre-line text-center font-black uppercase text-[#b9ff57]",
        "[text-shadow:0_0_3px_rgba(120,255,80,.45),0_0_10px_rgba(80,255,70,.2)]",
        className
      )}
    >
      {children}
    </div>
  );
}

function RingOnly({ size, opacity = "opacity-80" }) {
  return (
    <div className={cn("relative", size)}>
      <img
        src={ringImg}
        alt=""
        className={cn("absolute inset-0 h-full w-full object-contain", opacity)}
      />
    </div>
  );
}

function PortraitHero({ size = "h-[170px] w-[170px] sm:h-[220px] sm:w-[220px]" }) {
  return (
    <div className={cn("relative", size)}>
      <img
        src={ringImg}
        alt=""
        className="absolute inset-0 h-full w-full object-contain brightness-125 saturate-125"
      />
      <div className="absolute inset-[22px] overflow-hidden rounded-full bg-black sm:inset-[28px]">
        <img src={mentorImg} alt="" className="h-full w-full object-cover" />
      </div>
    </div>
  );
}

function CoverSlide({ slide }) {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <PortraitHero />

      <div className="mt-3 whitespace-pre-line text-center text-[1.05rem] font-black uppercase leading-[0.98] tracking-tight text-white sm:text-[1.4rem]">
        {slide.eyebrow}
      </div>

      <GlowText className="mt-3 text-[1.95rem] leading-[0.9] tracking-tight sm:text-[2.85rem]">
        {slide.title}
      </GlowText>

      <div className="mt-3 whitespace-pre-line text-center text-[1rem] font-black uppercase leading-[0.98] tracking-tight text-white sm:text-[1.45rem]">
        {slide.subtitle}
      </div>
    </div>
  );
}

function ContentSlide({ slide }) {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="text-center text-[0.95rem] font-medium uppercase tracking-wide text-white sm:text-[1.18rem]">
        {slide.smallTop}
      </div>

      <div className="mx-auto mt-2 h-px w-full max-w-[320px] bg-white/70" />

      <div className="mt-2 text-center text-[1.35rem] font-black uppercase leading-[0.95] tracking-tight text-white sm:text-[2rem]">
        {slide.title}
      </div>

      <div className="mt-1 text-center text-[0.8rem] font-black uppercase leading-none tracking-tight text-white sm:text-[1.12rem]">
        {slide.subtitle}
      </div>

      <div className="relative mt-1 flex w-full flex-1 items-center justify-center">
        <div className="absolute inset-0 flex items-center justify-center">
          <RingOnly size={slide.ringSize} />
        </div>

        <GlowText
          className={cn(
            "relative z-10 px-2 tracking-[-0.02em]",
            slide.wrap,
            slide.circleClass
          )}
        >
          {slide.circleText}
        </GlowText>
      </div>

      <div
        className={cn(
          "mt-2 max-w-[94%] text-center font-semibold italic uppercase tracking-tight text-white",
          slide.bottomClass
        )}
      >
        {slide.bottom}
      </div>
    </div>
  );
}

function BadgeImage() {
  return (
    <img
      src={badgeImg}
      alt=""
      className="absolute left-0 top-[72px] z-20 h-[78px] w-[78px] object-contain sm:left-3 sm:top-[88px] sm:h-[110px] sm:w-[110px]"
    />
  );
}

function Bullet({ label, text }) {
  return (
    <div className="flex items-start gap-2.5">
      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-lime-500 text-sm font-black text-white sm:h-7 sm:w-7">
        ✓
      </div>
      <div className="text-[0.9rem] font-bold leading-[1.1] text-white sm:text-[1.12rem]">
        <span className="text-lime-400">{label}</span> {text}
      </div>
    </div>
  );
}

function CtaSlide({ slide }) {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="text-center text-[0.95rem] font-medium uppercase tracking-wide text-white sm:text-[1.18rem]">
        {slide.smallTop}
      </div>

      <div className="mx-auto mt-2 h-px w-full max-w-[320px] bg-white/70" />

      <div className="relative mt-3">
        <div className="relative h-[150px] w-[150px] sm:h-[190px] sm:w-[190px]">
          <img
            src={ringImg}
            alt=""
            className="absolute inset-0 h-full w-full object-contain brightness-125 saturate-125"
          />
          <div className="absolute inset-[20px] overflow-hidden rounded-full bg-black sm:inset-[25px]">
            <img src={mentorImg} alt="" className="h-full w-full object-cover" />
          </div>
        </div>
        <BadgeImage />
      </div>

      <GlowText className="mt-4 text-[1.45rem] leading-[0.94] sm:text-[2.2rem]">
        {slide.title}
      </GlowText>

      <div className="mt-3 whitespace-pre-line text-center text-[0.88rem] font-semibold leading-[1.12] text-white sm:text-[1.08rem]">
        {slide.paragraph}
      </div>

      <div className="mt-4 flex w-full max-w-[360px] flex-col gap-3">
        {slide.bullets.map(([label, text]) => (
          <Bullet key={label} label={label} text={text} />
        ))}
      </div>

      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noreferrer"
        className="mt-5 flex w-full max-w-[360px] items-center justify-center rounded-2xl bg-lime-400 px-5 py-3 text-center text-[0.98rem] font-black uppercase tracking-tight text-black shadow-[0_0_22px_rgba(57,255,20,0.35)] transition hover:brightness-105 sm:text-[1.25rem]"
      >
        {slide.cta}
      </a>

      <div className="mt-2 text-center text-[0.76rem] font-medium text-white/90 sm:text-[0.9rem]">
        {slide.footnote}
      </div>
    </div>
  );
}

function Slide({ slide }) {
  return (
    <div className="relative mx-auto h-[100dvh] max-h-[100dvh] w-full max-w-[600px] overflow-hidden bg-black px-5 pb-4 pt-4 sm:px-8 sm:pb-5 sm:pt-5">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(57,255,20,0.08),transparent_34%),radial-gradient(circle_at_bottom,rgba(57,255,20,0.04),transparent_28%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:linear-gradient(rgba(80,255,90,.45)_1px,transparent_1px),linear-gradient(90deg,rgba(80,255,90,.45)_1px,transparent_1px)] [background-size:34px_34px]" />

      {slide.type === "cover" && <CoverSlide slide={slide} />}
      {slide.type === "content" && <ContentSlide slide={slide} />}
      {slide.type === "cta" && <CtaSlide slide={slide} />}
    </div>
  );
}

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const activeSlide = useMemo(() => slides[activeIndex], [activeIndex]);

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goTo = (index) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") goNext();
      if (event.key === "ArrowLeft") goPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleTouchStart = (event) => {
    touchStartX.current = event.changedTouches[0].clientX;
  };

  const handleTouchEnd = (event) => {
    touchEndX.current = event.changedTouches[0].clientX;
    const delta = touchStartX.current - touchEndX.current;

    if (Math.abs(delta) < 40) return;
    if (delta > 0) goNext();
    if (delta < 0) goPrev();
  };

  return (
    <main className="h-[100dvh] overflow-hidden bg-black text-white">
      <div className="mx-auto h-[100dvh] max-w-[720px]">
        <div
          className="relative h-[calc(100dvh-44px)]"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <Arrow side="left" onClick={goPrev} />
          <Slide slide={activeSlide} />
          <Arrow side="right" onClick={goNext} />
        </div>

        <Dots total={slides.length} active={activeIndex} onSelect={goTo} />
      </div>
    </main>
  );
}