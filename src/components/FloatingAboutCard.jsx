import pathFirma from "/images/firma.svg";
import fotoBruno from "/images/bruno.png";

const FloatingAboutCard = ({ cardRef, photoRef, signatureRef }) => {
  return (
    <div
      ref={cardRef}
      className="relative w-full flex justify-center pointer-events-auto px-4 sm:px-8 md:px-12 max-w-[1300px] mx-auto pb-16 md:pb-24"
    >
      <div className="w-full flex flex-col relative">
        {/* Glassmorphism Card Wrapper */}
        <div className="w-full rounded-[40px] md:rounded-[60px] lg:rounded-[80px] bg-[rgba(255,255,255,0.05)] backdrop-blur-[40px] border border-[rgba(255,255,255,0.15)] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] flex flex-col lg:flex-row items-center lg:items-start p-8 md:p-12 lg:p-20 gap-10 lg:gap-20 z-[2]">

          {/* Left Column (Typography & Content) */}
          <section className="flex-1 flex flex-col text-left text-white max-w-full lg:max-w-3xl">
            {/* Title */}
            <h1 className="font-['Surgena_Personal_use_only'] text-4xl md:text-6xl mb-8 text-white">
              Sobre mí ...
            </h1>

            {/* Biography */}
            <div className="text-xl md:text-2xl leading-relaxed font-['ITC_Avant_Garde_Gothic_Std'] text-white/90">
              <p className="mb-6">
                Soy Bruno Guilenia, Director Creativo y Diseñador Gráfico argentino.
              </p>
              <p className="mb-6">
                Hace más de 8 años diseño sistemas visuales para marcas.
              </p>
              <p className="mb-8">
                Integrando branding, contenido digital, motion, UX/UI, editorial, video e inteligencia artificial con un objetivo claro: comunicar efectivamente.
              </p>

              {/* Specialty Tags */}
              <div className="border-t border-white/20 pt-6 mt-4">
                <p className="text-sm md:text-base font-semibold font-['ITC_Avant_Garde_Gothic_Std'] text-white/80 tracking-wide">
                  Branding - Motion Graphics - UX/UI - Editorial - Video - Social Media - AI
                </p>
              </div>
            </div>
          </section>

          {/* Right Column (Photo & Signature Treatment) */}
          <div className="flex flex-col items-center w-full lg:w-auto shrink-0">
            {/* The Photo Frame */}
            <div className="relative w-full max-w-[350px] lg:max-w-[420px] aspect-[4/5] rounded-[60px] md:rounded-[74.9px] overflow-hidden drop-shadow-2xl z-[1]">
              <img
                ref={photoRef}
                src={fotoBruno}
                alt="Bruno Guilenia"
                className="w-full h-full object-cover object-top scale-135 transition-transform sepia brightness-[0.85] contrast-[1.15]"
              />
            </div>

            {/* Signature Placement */}
            <img
              ref={signatureRef}
              src={pathFirma}
              alt="Firma Bruno Guilenia"
              className="absolute -bottom-8 -right-8 w-[160px] h-auto opacity-100 z-[60] drop-shadow-xl"
            />
          </div>
        </div>

        {/* Call to Action Button ("MI TRABAJO") */}
        <div className="absolute -bottom-6 left-8 md:left-24 z-10">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-white text-[#010101] hover:bg-gray-200 transition-colors duration-300 rounded-full px-10 py-4 md:px-14 md:py-6 shadow-2xl"
          >
            <span className="font-['Surgena_Personal_use_only'] text-2xl md:text-4xl font-semibold leading-none pt-1">
              MI TRABAJO
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default FloatingAboutCard;