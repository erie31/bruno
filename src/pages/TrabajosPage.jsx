import { Link } from "react-router-dom";

const projects = Array.from({ length: 18 }, (_, i) => ({
  id: i + 1,
  src: `/images/${i + 1}.png`,
  title: `Proyecto ${i + 1}`,
}));

const TrabajosPage = () => {
  return (
    <div className="w-full min-h-screen bg-[#010101] text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors font-['ITC_Avant_Garde_Gothic_Std'] text-sm tracking-wide"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M10 12L6 8L10 4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Volver
        </Link>
        <img src="./Vector1.svg" alt="Logo" className="w-6 h-6" />
      </header>

      {/* Title */}
      <div className="px-8 md:px-16 pb-8">
        <h1 className="text-[80px] md:text-[120px] font-['Surgena_Personal_use_only'] text-icon-color leading-[1.1]">
          Mis Trabajos
        </h1>
      </div>

      {/* Projects Grid */}
      <div className="px-8 md:px-16 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <div
              key={p.id}
              className="group relative overflow-hidden rounded-[24px] aspect-[4/3] bg-neutral-900 cursor-pointer"
            >
              <img
                src={p.src}
                alt={p.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex flex-col items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-lg font-['ITC_Avant_Garde_Gothic_Std'] font-medium">
                  {p.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="px-8 md:px-16 py-8 border-t border-white/10">
        <p className="text-white/40 font-['ITC_Avant_Garde_Gothic_Std'] text-sm text-center">
          &copy; {new Date().getFullYear()} Bruno Guilenia — Director Creativo
          & Diseñador Gráfico
        </p>
      </footer>
    </div>
  );
};

export default TrabajosPage;
