import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ClockIndicator from "./ClockIndicator";
import FloatingNav from "./FloatingNav";
import FloatingAboutCard from "./FloatingAboutCard";

gsap.registerPlugin(ScrollTrigger);

const PARALLAX_SCRUB = 1.5;
const SCROLL_DISTANCE = "+=2000";

const TEXT_Y_SPEED = -45;
const TEXT_X_SPEED = -15;
const TEXT_FADE_END = 0.35;

const MOUNTAIN_Y_SPEED = -10;
const MOUNTAIN_X_SPEED = 45;
const MOUNTAIN_FADE_END = 0.55;

const HeroParallax = () => {
  const containerRef = useRef(null);
  const mountainRef = useRef(null);
  const textRef = useRef(null);
  const rocksRef = useRef(null);
  const cardRef = useRef(null);
  const cardInnerPhotoRef = useRef(null);
  const cardInnerSignatureRef = useRef(null);

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
          }
        }
      },
    });

    // 1. La Montaña Lejana (Paneo lateral)
    masterTl.to(mountainRef.current, {
      yPercent: MOUNTAIN_Y_SPEED,
      xPercent: MOUNTAIN_X_SPEED,
      opacity: 0,
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

    // 3. FIJAMOS LAS ROCAS Y CORREGIMOS OCLUSIÓN (las desfasamos un poco para abajo)
    masterTl.to(rocksRef.current, {
      yPercent: 15,
      ease: "none",
      duration: 1
    }, 0);

    // 4. LA TARJETA (Arranca invisible y emerge)
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

    // 5. EL INDICADOR "SOBRE MÍ" (Animado desde FloatingAboutCard.jsx)
    masterTl.fromTo("#about-me-indicator",
      { 
        y: "450px", 
        scale: 0.85,
        opacity: 1
      },
      { 
        y: "0px", 
        scale: 1,
        opacity: 1,
        ease: "power2.out", 
        duration: 1
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
        <img src="/images/BG 2.png" alt="Background" className="object-cover w-full h-full object-bottom" />
      </div>

      {/* z-10: Montaña lejana */}
      <div ref={mountainRef} className="absolute inset-0 w-full h-full pointer-events-none origin-bottom z-10">
        <img src="/images/montana@2x.png" alt="Far Mountain" className="object-cover w-full h-full object-bottom" />
      </div>

      {/* z-20: Texto PORTFOLIO, Reloj, y Badge 2026 */}
      <div ref={textRef} className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none origin-bottom z-20">
        <div className="relative flex flex-col items-start">
          {/* Reloj arriba a la izquierda */}
          <div className="absolute -top-[80px] left-[5px]">
            <ClockIndicator />
          </div>

          <h1 className="text-[120px] sm:text-[150px] md:text-[250px] lg:text-[320px] font-['Surgena_Personal_use_only'] text-white leading-none select-none tracking-tight">
            PORTFOLIO
          </h1>
          
          {/* Texto Bruno Guilenia abajo a la izquierda */}
          <h2 className="text-[24px] sm:text-[30px] md:text-[40px] font-['ITC_Avant_Garde_Gothic_Std'] text-white mt-1 font-light tracking-wide">
            Bruno Guilenia
          </h2>

          {/* Badge 2026 superpuesto a la O */}
          <div className="absolute top-[8%] right-[-3%] md:right-[-6%] rounded-[66px] bg-[rgba(255,255,255,0.02)] backdrop-blur-[45px] border border-[rgba(255,255,255,0.15)] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] px-[35px] py-[10px] md:px-[60px] md:py-[18px]">
            <span className="text-white font-bold text-[24px] md:text-[35px] drop-shadow-md">2026</span>
          </div>
        </div>
      </div>

      {/* z-30: La Tarjeta de Cristal (Nace invisible, limpia el fondo) */}
      <div ref={cardRef} className="absolute inset-0 w-full h-full z-30 pointer-events-none flex items-end justify-center pb-24">
        <div className="pointer-events-auto w-full max-w-[1300px] px-4">
          <FloatingAboutCard photoRef={cardInnerPhotoRef} signatureRef={cardInnerSignatureRef} />
        </div>
      </div>


      {/* z-40: Rocas negras del frente */}
      <div ref={rocksRef} className="absolute inset-0 w-full h-full pointer-events-none z-40 origin-bottom">
        <img src="/images/montana-parallax@2x.png" alt="Foreground Rocks" className="w-full h-full object-cover object-bottom" />
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