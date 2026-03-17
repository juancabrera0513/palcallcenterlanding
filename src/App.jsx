import { useEffect, useMemo, useRef, useState } from "react";
import mentorImg from "./assets/pal-mentor.png";
import mentorImg2 from "./assets/pal-mentor2.png";
import ringImg from "./assets/pal-ring.png";

const WHATSAPP_LINK = "https://wa.me/message/LMSJBMQJW4E2A1";

const slides = [
  {
    id: 1,
    type: "cover",
    eyebrow: (
      <>
        ¿AÑOS DE INGLÉS Y
        <br />
        <span className="text-red-500">SIGUES SIN EMPLEO?</span>
      </>
    ),
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
      "text-[clamp(2.2rem,6vw,3.2rem)] leading-[0.92]",
    bottomClass: "text-[0.95rem] leading-[1] sm:text-[1.08rem]",
    wrap: "max-w-[520px] sm:max-w-[620px]",
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
      "text-[clamp(1.8rem,5vw,2.6rem)] leading-[0.92]",
    bottomClass: "text-[0.92rem] leading-[1] sm:text-[1.04rem]",
    wrap: "max-w-[540px] sm:max-w-[640px]",
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
    "text-[clamp(2rem,5.5vw,2.8rem)] leading-[0.92]",
    bottomClass: "text-[1rem] leading-[1] sm:text-[1.12rem]",
    wrap: "max-w-[540px] sm:max-w-[640px]",
  },
  {
    id: 5,
    type: "cta",
    smallTop: "CÓDIGO CONFIDENCIAL",
    title: "EL EMPLEO TE LO GANAS TÚ.\nYO TE DOY LAS ARMAS.",
    paragraph:
      "Las academias te dan gramática.\nYo te doy la estrategia y la fluidez para que\nno te quedes en blanco frente al reclutador.\n\n",
    bullets: [
      ["PRÁCTICA REAL:", "Escenarios de Call Center."],
      ["LÓGICA:", "Responde lo que ellos quieren oír."],
      ["COMUNIDAD:", "Practica diario a tu ritmo. "],
    ],
    cta: "¡SÍ! QUIERO ENTRAR AL RETO GRATIS",
    footnote: "*(Grupo WhatsApp).*",
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
        "border border-lime-400/40 bg-black/70 text-white",
        "flex h-11 w-11 items-center justify-center sm:h-12 sm:w-12",
        "transition hover:border-lime-400/80 hover:text-lime-300"
      )}
      style={side === "left" ? { left: "10px" } : { right: "10px" }}
    >
      <span className="text-4xl leading-none">{side === "left" ? "‹" : "›"}</span>
    </button>
  );
}

function Dots({ total, active, onSelect }) {
  return (
    <div className="mt-2 flex items-center justify-center gap-2 pb-2">
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
        "whitespace-pre-line text-center font-['Bebas_Neue'] uppercase text-[#b8ff54]",
        "[text-shadow:0_0_4px_rgba(120,255,80,.28),0_0_10px_rgba(80,255,70,.14)]",
        className
      )}
    >
      {children}
    </div>
  );
}

function CoverHero() {
  return (
    <div className="relative h-[330px] w-[330px] sm:h-[410px] sm:w-[410px]">
      <img
        src={ringImg}
        alt=""
        className="absolute inset-0 h-full w-full object-contain"
      />
      <div className="absolute inset-[30px] overflow-hidden rounded-full bg-black sm:inset-[38px]">
        <img src={mentorImg} alt="" className="h-full w-full object-cover" />
      </div>
    </div>
  );
}

function CtaHero() {
  return (
    <div className="flex justify-center">
      <img
        src={mentorImg2}
        alt=""
        className="h-[240px] w-[240px] object-cover sm:h-[300px] sm:w-[300px]"
      />
    </div>
  );
}

function CoverSlide({ slide }) {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <CoverHero />

      <div className="mt-6 text-center font-['Bebas_Neue'] text-[2rem] leading-[0.92] tracking-tight text-white sm:text-[2.25rem]">
        {slide.eyebrow}
      </div>

      <GlowText className="mt-5 text-[4.6rem] leading-[0.86] tracking-[0.01em] sm:text-[5.2rem]">
        {slide.title}
      </GlowText>

      <div className="mt-5 whitespace-pre-line text-center font-['Bebas_Neue'] text-[1.8rem] leading-[0.94] tracking-tight text-white sm:text-[2.1rem]">
        {slide.subtitle}
      </div>
    </div>
  );
}

function ContentSlide({ slide }) {
  return (
    <div className="flex h-full flex-col px-2">
      <div className="pt-4">
        <div className="text-center font-['Bebas_Neue'] text-[1.15rem] leading-none tracking-[0.05em] text-white sm:text-[1.5rem]">
          {slide.smallTop}
        </div>

        <div className="mx-auto mt-2 h-px w-[86%] max-w-[460px] bg-white/70" />

        <div className="mt-3 text-center font-['Bebas_Neue'] text-[2.35rem] leading-[0.88] tracking-tight text-white sm:text-[3.3rem]">
          {slide.title}
        </div>

        <div className="mt-2 text-center font-['Bebas_Neue'] text-[1.28rem] leading-[0.9] tracking-tight text-white/90 sm:text-[1.9rem]">
          {slide.subtitle}
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center py-4">
        <GlowText
          className={cn(
            "px-2 tracking-[0.01em]",
            slide.wrap,
            slide.circleClass
          )}
        >
          {slide.circleText}
        </GlowText>
      </div>

      <div
        className={cn(
          "pb-3 text-center font-['Bebas_Neue'] uppercase tracking-tight text-white/95",
          slide.bottomClass
        )}
      >
        {slide.bottom}
      </div>
    </div>
  );
}

function Bullet({ label, text }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-lime-500 text-base font-black text-white">
        ✓
      </div>
      <div className="text-[0.96rem] leading-[1.08] text-white sm:text-[1.12rem]">
        <span className="font-['Bebas_Neue'] text-[1.12rem] tracking-[0.03em] text-lime-400 sm:text-[1.36rem]">
          {label}
        </span>{" "}
        <span>{text}</span>
      </div>
    </div>
  );
}

function CtaSlide({ slide }) {
  return (
    <div className="flex h-full flex-col px-2">
      <div className="pt-3">
        <div className="text-center font-['Bebas_Neue'] text-[1.1rem] leading-none tracking-[0.05em] text-white sm:text-[1.4rem]">
          {slide.smallTop}
        </div>

        <div className="mx-auto mt-2 h-px w-full max-w-[430px] bg-white/70" />

        <div className="mt-4">
          <CtaHero />
        </div>

        <GlowText className="mt-4 text-[2.1rem] leading-[0.9] tracking-[0.01em] sm:text-[2.9rem]">
          {slide.title}
        </GlowText>

        <div className="mt-3 whitespace-pre-line text-center text-[1rem] leading-[1.1] text-white sm:text-[1.08rem]">
          {slide.paragraph}
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <div className="mx-auto flex w-full max-w-[430px] flex-col gap-4">
          {slide.bullets.map(([label, text]) => (
            <Bullet key={label} label={label} text={text} />
          ))}
        </div>
      </div>

      <div className="pb-3">
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noreferrer"
          className="mx-auto flex w-full max-w-[420px] flex-col items-center justify-center rounded-[28px] bg-[#a7ef2d] px-6 py-5 text-center text-black shadow-[0_0_24px_rgba(167,239,45,0.35)] transition hover:brightness-105"
        >
          <span className="font-['Bebas_Neue'] text-[2.05rem] leading-[0.92] tracking-tight sm:text-[3rem]">
            {slide.cta}
          </span>
        </a>

        <div className="mt-2 text-center text-[0.8rem] italic text-white/75 sm:text-[0.9rem]">
          {slide.footnote}
        </div>
      </div>
    </div>
  );
}

function Slide({ slide }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-black px-5 py-4 sm:px-8 sm:py-5">
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
    <main className="h-[100dvh] w-screen overflow-hidden bg-black text-white">
      <div className="h-[100dvh] w-full">
        <div
          className="relative h-[calc(100dvh-38px)] w-full"
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