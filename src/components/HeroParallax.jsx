import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ClockIndicator from "./ClockIndicator";
import FloatingNav from "./FloatingNav";
import FloatingAboutCard from "./FloatingAboutCard";
import bgCielo from "/images/BG 2.png";
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
            // CONTROL DE CLICKABLE: Si el scroll apenas arranca, desactivamos clicks
            cardRef.current.style.pointerEvents = self.progress > 0.05 ? "auto" : "none";

            // 🔥 TRUCO MAESTRO DE PLANOS (Z-INDEX DINÁMICO)
            // Al principio, la tarjeta está en z-30 (detrás de las rocas z-40).
            // Cuando el scroll pasa el 45%, la tarjeta salta al frente (z-45) de las rocas.
            // Esto hace que el texto "Sobre mí..." nazca en el valle y pase ADELANTE de las piedras.
            cardRef.current.style.zIndex = self.progress > 0.45 ? "45" : "30";
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

    // 4. EL INDICADOR "SOBRE MÍ" (Zona 1 a Zona 2)
    // Lo empujamos 480px hacia abajo relativos a la tarjeta. Como la tarjeta está subiendo,
    // este desfase lo clava visualmente abajo en el valle de la roca (Zona 1)
    masterTl.fromTo("#about-me-indicator",
      {
        y: "480px",
        scale: 0.85,
        opacity: 1 // Aseguramos que esté 100% visible desde el inicio
      },
      {
        y: "0px", // Vuelve a su lugar natural arriba a la izquierda de la tarjeta (Zona 2)
        scale: 1,
        opacity: 1,
        ease: "power2.out",
        duration: 1
      },
      0
    );


    masterTl.fromTo(rocksRef.current,
      { yPercent: 2 },
      {
        yPercent: 4,
        ease: "power1.inOut",
        duration: 1
      },
      0
    );

    // Contenido interno de la tarjeta (Garantiza dinamismo fluido)
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
      <div ref={mountainRef} className="absolute inset-0 w-full h-full pointer-events-none origin-bottom z-10">
        <img src={montanaFondo} alt="Far Mountain" className="object-cover w-[120%] h-[100%] scale-80 object-bottom origin-bottom" />
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
      <div
        ref={cardRef}
        style={{ zIndex: 30 }}
        className="absolute inset-0 w-full h-full pointer-events-none flex items-end justify-center pb-24"
      >
        <div className="pointer-events-auto w-full max-w-[1300px] px-4">
          <FloatingAboutCard photoRef={cardInnerPhotoRef} signatureRef={cardInnerSignatureRef} />
        </div>
      </div>


      {/* z-35: Firma SVG (bottom-right, fades in after card settles) */}
      <div ref={firmaRef} className="absolute bottom-8 right-8 w-32 h-auto pointer-events-none z-[35] opacity-0">
        <img src={firmaSvg} alt="Firma" className="w-full h-auto" />
      </div>


      {/* z-40: Rocas negras del frente */}
      <div ref={rocksRef} className="absolute inset-0 w-full h-full pointer-events-none z-40 origin-bottom">
        <img src={rocasFrente} alt="Foreground Rocks" className="w-full h-full object-cover object-bottom" />
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