const FloatingAboutCard = ({ cardRef, photoRef, signatureRef }) => {
  return (
    <div
      ref={cardRef}
      className="absolute bottom-0 left-0 w-full flex justify-center pointer-events-auto pb-10 px-[60px]"
    >
      <div className="w-full max-w-[1700px] flex flex-col">
        {/* About card - HTML nativo con Glassmorphism Apple Real */}
        <div className="self-stretch rounded-[80px] bg-[rgba(255,255,255,0.05)] backdrop-blur-[40px] border border-[rgba(255,255,255,0.15)] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] flex flex-col lg:flex-row items-start py-[55px] pl-[94px] pr-[71px] box-border gap-[129px] max-w-full z-[2] mq450:gap-4 mq450:pt-[23px] mq450:pb-[23px] mq450:box-border mq1250:gap-16 mq1250:pl-[47px] mq1250:pr-[35px] mq1250:box-border mq825:gap-8 mq825:pl-[23px] mq825:pt-9 mq825:pb-9 mq825:box-border mq1550:flex-wrap">
          
          <section className="flex-1 flex flex-col items-start pt-[61px] px-0 pb-0 box-border min-w-[647px] max-w-full shrink-0 text-left text-[80.5px] text-white font-['Surgena_Personal_use_only'] mq450:pt-10 mq450:box-border mq1250:min-w-full">
            <div className="self-stretch flex flex-col items-start gap-[108px] max-w-full mq1250:gap-[54px] mq825:gap-[27px]">
              
              {/* Título flotante */}
              <div className="h-[80px] relative w-full overflow-visible">
                <h1 id="about-me-indicator" className="m-0 absolute left-0 top-0 text-[length:inherit] leading-[155%] font-semibold font-[inherit] inline-block max-w-full z-[1] mq450:text-2xl mq450:leading-[50px] mq825:text-[40px] mq825:leading-[75px] drop-shadow-md cursor-pointer will-change-transform"
                    onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}>
                  Sobre mi ...
                </h1>
              </div>

              {/* Biografía */}
              <div className="self-stretch h-auto relative text-[28.5px] leading-[128%] font-['ITC_Avant_Garde_Gothic_Std'] inline-block shrink-0 z-[1] text-white/80 mq450:text-[23px] mq450:leading-[29px]">
                Soy Bruno Guilenia, Director Creativo y Disenador Grafico argentino.
                <br />
                <br />
                Hace mas de 8 anos diseno sistemas visuales para marcas.
                <br />
                <br />
                Integrando branding, contenido digital, motion, UX/UI, editorial, video
                <br />e inteligencia artificial con un objetivo claro: comunicar efectivamente.
              </div>

              {/* Firma vectorial */}
              <img
                ref={signatureRef}
                src="/Path.svg"
                alt="Firma Bruno Guilenia"
                className="w-[120px] h-auto mt-4 opacity-80"
              />
            </div>
          </section>

          {/* Foto del personaje incorporada dinámicamente sobre el cristal */}
          <img
            ref={photoRef}
            className="w-[526px] relative rounded-[74.9px] max-h-full object-cover max-w-full z-[1] shrink-0 mq1550:flex-1 drop-shadow-2xl"
            alt="Bruno Guilenia"
            src="/Rectangle-7@2x.png"
          />
        </div>

        {/* Botón CTA (VER TRABAJOS) anclado orgánicamente al card */}
        <div className="flex items-start py-0 px-[94px] box-border max-w-full mt-[-40px] md:mt-[-80px] lg:mt-[-128px] relative mq450:pl-5 mq450:pr-5 mq450:box-border mq825:pl-[47px] mq825:pr-[47px] mq825:box-border z-10">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer [border:none] pt-[30px] px-[92px] pb-[31px] bg-[rgba(255,255,255,0.08)] backdrop-blur-[40px] border border-[rgba(255,255,255,0.2)] shadow-[0_4px_30px_rgba(0,0,0,0.3)] hover:bg-[rgba(255,255,255,0.15)] rounded-[44px] flex items-start justify-center box-border max-w-full transition-all duration-300 mq450:pl-5 mq450:pr-5 mq450:box-border"
          >
            <div className="h-[27px] w-[230px] relative text-[39.8px] leading-[27px] font-semibold font-['Surgena_Personal_use_only'] text-white text-left inline-block shrink-0">
              MI TRABAJO
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default FloatingAboutCard;
