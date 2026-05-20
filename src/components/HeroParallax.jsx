import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ClockIndicator from "./ClockIndicator";
import FloatingNav from "./FloatingNav";
import FloatingAboutCard from "./FloatingAboutCard";
import bgCielo from "/images/BG2.png";
import montanaFondo from "/images/montana@2x.png";
import rocasFrente from "/images/montana-parallax@2x.png";
import firmaSvg from "/images/firma.svg";

gsap.registerPlugin(ScrollTrigger);

const PARALLAX_SCRUB = 1;
const SCROLL_DISTANCE = "+=2000";

const TEXT_Y_SPEED = -45;
const TEXT_X_SPEED = -15;
const TEXT_FADE_END = 0.35;

const MOUNTAIN_Y_SPEED = 0;
const MOUNTAIN_X_SPEED = 38;
const MOUNTAIN_FADE_END = 0.55;

const HeroParallax = () => {
  const containerRef = useRef(null);
  const mountainRef = useRef(null);
  const textRef = useRef(null);
  const rocksRef = useRef(null);
  const cardRef = useRef(null);
  const cardInnerPhotoRef = useRef(null);
  const cardInnerSignatureRef = useRef(null);
  const firmaRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        pin: true,
        start: "top top",
        end: SCROLL_DISTANCE,
        scrub: PARALLAX_SCRUB,
        onUpdate: (self) => {
          if (cardRef.current) {
            cardRef.current.style.pointerEvents = self.progress > 0.05 ? "auto" : "none";
            cardRef.current.style.zIndex = self.progress > 0.1 ? "30" : "30";
          }
          if (textRef.current) {
            textRef.current.style.zIndex = self.progress > 0.1 ? "50" : "20";
          }
        }
      },
    });

    // 1. La Montaña Lejana (Paneo lateral)
    masterTl.to(mountainRef.current, {
      yPercent: MOUNTAIN_Y_SPEED,
      xPercent: MOUNTAIN_X_SPEED,
      opacity: 0.7,
      ease: "none",
      duration: MOUNTAIN_FADE_END
    }, 0);

    // 2. El Texto PORTFOLIO (Sube y fade-out rápido)
    masterTl.to(textRef.current, {
      yPercent: TEXT_Y_SPEED,
      xPercent: TEXT_X_SPEED,
      opacity: 0,
      ease: "none",
      duration: TEXT_FADE_END
    }, 0);

    // 3. LA TARJETA (Arranca invisible y emerge)
    masterTl.fromTo(cardRef.current,
      {
        y: "100vh",
        opacity: 0,
        scale: 0.95
      },
      {
        y: "0vh",
        opacity: 1,
        scale: 1,
        ease: "power2.inOut",
        duration: 1
      },
      0
    );

    // =========================================================================
    // DESVANECIMIENTO SINCRÓNICO DEL INDICADOR DE MOUSE Y TEXTOS CENTRALES
    // =========================================================================

    masterTl.fromTo("#scroll-mouse-indicator",
      {
        opacity: 1,
        y: 0
      },
      {
        opacity: 0,
        y: -30,
        ease: "power1.out",
        duration: 0.2
      },
      0
    );

    masterTl.fromTo(textRef.current,
      {
        opacity: 1,
        scale: 1
      },
      {
        opacity: 0,
        scale: 0.92,
        ease: "power1.out",
        duration: 0.4
      },
      0
    );

    // =========================================================================
    // 🔥 NUEVA ANIMACIÓN DE ROCAS (Z-40): SE LEVANTAN AL FINAL CON LA CARD 🔥
    // =========================================================================
    masterTl.fromTo(rocksRef.current,
      { 
        yPercent: 49 //
      },
      {
        yPercent: 0, 
        ease: "power2.out", 
        duration: 1 // 
      },
      0
    );

    // Contenido interno de la tarjeta
    masterTl.fromTo(cardInnerPhotoRef.current,
      { yPercent: 15 },
      { yPercent: 0, ease: "power2.out", duration: 1.2 },
      0.2
    );

    masterTl.fromTo(cardInnerSignatureRef.current,
      { scale: 0 },
      { scale: 1, ease: "back.out(1.5)", duration: 1.2 },
      0.4
    );

    // Firma SVG - fade + scale after card settles
    masterTl.fromTo(firmaRef.current,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        ease: "power2.out",
        duration: 0.2
      }, 0.8
    );

    return () => {
      masterTl.scrollTrigger?.kill();
      masterTl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div ref={containerRef} id="parallax-scene" className="relative w-full h-screen overflow-hidden bg-[#010101]">

      {/* z-0: Cielo */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <img src={bgCielo} alt="Background" className="object-cover w-full h-full object-bottom" />
      </div>

      {/* z-10: Montaña lejana */}
      <div
        ref={mountainRef}
        className="absolute inset-0 w-full h-full pointer-events-none origin-bottom z-10"
      >
        <img
          src={montanaFondo}
          alt="Far Mountain"
          className="object-cover w-[90%] h-[90%] object-bottom origin-bottom -translate-x-[-14.5%] -translate-y-[-50%]"
        />
      </div>

      {/* z-20: Texto PORTFOLIO, Reloj, y Badge 2026 */}
<div ref={textRef} className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none origin-bottom z-20 px-10">
  
  {/* 🔥 CONTENEDOR SE AJUSTA AL ANCHO EXACTO DE LA PALABRA 🔥 */}
  <div className="relative flex flex-col items-start w-fit mx-auto">

    {/* Reloj arriba a la izquierda (Clavado con el inicio de la P) */}
    <div className="absolute -top-[80px] md:-top-[100px] left-[18px]">
      <ClockIndicator />
    </div>

    {/* TEXTO PRINCIPAL: Quitamos text-center y w-full para que mande sobre el ancho del contenedor */}
    <h1 className="text-[13vw] md:text-[18vw] font-['Surgena_Personal_use_only'] text-white leading-[0.8] select-none tracking-tight whitespace-nowrap overflow-visible">
      PORTFOLIO
    </h1>

    {/* 🔥 BRUNO ALINEADO MILIMÉTRICAMENTE: Al no tener paddings raros, se pega al inicio del bloque de la 'P' 🔥 */}
    <h2 className="text-[24px] sm:text-[30px] md:text-[40px] font-['ITC_Avant_Garde_Gothic_Std'] text-white mt-3 font-light tracking-wide pl-5">
      Bruno Guilenia
    </h2>

    {/* 🔥 BADGE 2026: Centro matemático sobre la última 'O' 🔥 */}
    {/* 'right-[5.5%]' ubica el borde en el medio de la O, y 'translate-x-1/2' centra el badge ahí mismo */}
    <div className="absolute top-0 right-[6.9%] -translate-y-[90%] translate-x-1/2 rounded-[66px] bg-[rgba(255,255,255,0.02)] backdrop-blur-[45px] border border-[rgba(255,255,255,0.15)] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] px-[20px] py-[6px] md:px-[60px] md:py-[10px] z-50 whitespace-nowrap">
      <span className="text-white font-bold text-[18px] md:text-[28px] drop-shadow-md">2026</span>
    </div>

  </div>
</div>

      {/* COMPONENTE: INDICADOR DE SCROLL (Z-45) */}
      <div
        id="scroll-mouse-indicator"
        className="absolute inset-x-0 bottom-32 flex flex-col items-center justify-center pointer-events-none z-[45] transition-opacity duration-300"
      >
        <span className="text-white/60 font-['ITC_Avant_Garde_Gothic_Std'] text-[12px] md:text-[14px] tracking-[0.2em] uppercase mb-3 drop-shadow-md">
          Sobre mi...
        </span>
        <div className="w-[24px] h-[38px] rounded-[12px] border-2 border-white/30 flex justify-center p-1 bg-black/10 backdrop-blur-sm">
          <div className="w-[4px] h-[8px] bg-white rounded-full animate-bounce mt-1" />
        </div>
      </div>

      {/* z-30: La Tarjeta de Cristal */}
      <div
        ref={cardRef}
        style={{ zIndex: 30 }}
        className="absolute inset-0 w-full h-full pointer-events-none flex items-end justify-center pb-24"
      >
        <div className="pointer-events-auto w-full max-w-[1300px] px-4">
          <FloatingAboutCard photoRef={cardInnerPhotoRef} signatureRef={cardInnerSignatureRef} />
        </div>
      </div>

      {/* z-35: Firma SVG */}
      <div ref={firmaRef} className="absolute bottom-8 right-8 w-32 h-auto pointer-events-none z-[35] opacity-0">
        <img src={firmaSvg} alt="Firma" className="w-full h-auto" />
      </div>

      {/* z-40: Rocas negras del frente - AHORA MANEJADAS DESDE GSAP */}
      <div ref={rocksRef} className="absolute inset-0 w-full h-full pointer-events-none z-40 origin-bottom">
        <img 
          src={rocasFrente} 
          alt="Foreground Rocks" 
          className="w-full h-full object-cover object-bottom scale-[1] origin-bottom" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90 pointer-events-none" />
      </div>

      {/* z-50: UI Fija */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-50">
        <div className="pointer-events-auto"><FloatingNav /></div>
      </div>

    </div>
  );
};

export default HeroParallax;