const FloatingNav = () => {
  const scrollTo = (id) => {
    if (id === "inicio" || id === "contacto") {
      window.scrollTo({ top: id === "inicio" ? 0 : document.body.scrollHeight, behavior: "smooth" });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  // 🛠️ Truco nativo de Vite para leer la carpeta public en producción sin romper rutas
  const baseUrl = import.meta.env.BASE_URL; // Esto devolverá "/bruno/" en producción y "/" en local

  return (
    <nav className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-6 pointer-events-auto">
      {/* Logo a la izquierda */}
      <img
        src={`${baseUrl}images/LogoBG.png`}
        alt="Logo"
        className="h-8 w-auto object-contain cursor-pointer"
        onClick={() => scrollTo("inicio")}
      />

      {/* Links a la derecha */}
      <div className="flex items-center gap-8">
        <div className="relative">
          <button onClick={() => scrollTo("inicio")} className="text-white font-['ITC_Avant_Garde_Gothic_Std'] text-sm tracking-wide hover:opacity-70 transition-opacity cursor-pointer">
            Inicio
          </button>
          <div className="absolute -bottom-[4px] left-0 right-0 h-[1px] bg-white/70"></div>
        </div>

        <button onClick={() => scrollTo("sobre-mi")} className="text-white font-['ITC_Avant_Garde_Gothic_Std'] text-sm tracking-wide hover:opacity-70 transition-opacity cursor-pointer">
          Sobre mi
        </button>

        <button onClick={() => scrollTo("trabajos")} className="text-white font-['ITC_Avant_Garde_Gothic_Std'] text-sm tracking-wide hover:opacity-70 transition-opacity cursor-pointer">
          Mis trabajos
        </button>

        <button onClick={() => scrollTo("contacto")} className="text-white font-['ITC_Avant_Garde_Gothic_Std'] text-sm tracking-wide hover:opacity-70 transition-opacity cursor-pointer">
          Contacto
        </button>

        {/* Botón de traducción */}
        <img
          src={`${baseUrl}images/Boton-translate.svg`}
          alt="EN"
          className="w-8 h-8 cursor-pointer"
        />
      </div>
    </nav>
  );
};

export default FloatingNav;