const FloatingNav = () => {
  const scrollTo = (id) => {
    if (id === "inicio" || id === "contacto") {
      window.scrollTo({ top: id === "inicio" ? 0 : document.body.scrollHeight, behavior: "smooth" });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-6 pointer-events-auto">
      {/* Logo a la izquierda */}
      <img
        src="./images/image-1@2x.png"
        alt="Logo"
        className="h-8 w-auto object-contain cursor-pointer"
      />
      {/* CAMBIAR NOMBRE AQUÍ si tu logo tiene otro nombre en la carpeta /public */}

      {/* Links a la derecha */}
      <div className="flex items-center gap-8">
        <div className="relative">
          <button onClick={() => scrollTo("inicio")} className="text-white font-['ITC_Avant_Garde_Gothic_Std'] text-sm tracking-wide hover:opacity-70 transition-opacity">
            Inicio
          </button>
          <div className="absolute -bottom-[4px] left-0 right-0 h-[1px] bg-white/70"></div>
        </div>
        <button onClick={() => scrollTo("sobre-mi")} className="text-white font-['ITC_Avant_Garde_Gothic_Std'] text-sm tracking-wide hover:opacity-70 transition-opacity">
          Sobre mi
        </button>
        <button onClick={() => scrollTo("trabajos")} className="text-white font-['ITC_Avant_Garde_Gothic_Std'] text-sm tracking-wide hover:opacity-70 transition-opacity">
          Mis trabajos
        </button>
        <button onClick={() => scrollTo("contacto")} className="text-white font-['ITC_Avant_Garde_Gothic_Std'] text-sm tracking-wide hover:opacity-70 transition-opacity">
          Contacto
        </button>
        <img
          src="./Boton-translate.svg"
          alt="EN"
          className="w-8 h-8 cursor-pointer"
        />
      </div>
    </nav>
  );
};

export default FloatingNav;
