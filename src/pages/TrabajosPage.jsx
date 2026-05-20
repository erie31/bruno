import { useState, Fragment } from "react";
import { Link } from "react-router-dom";

const projects = Array.from({ length: 18 }, (_, i) => ({
  id: i + 1,
  src: `/images/${i + 1}.png`,
  title: `Proyecto ${i + 1}`,
  description: '',
  nota: 'Descripción próximamente',
}));

const TrabajosPage = () => {
  const [expandedId, setExpandedId] = useState(null);

  const toggleProject = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

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
        <img src="/Vector1.svg" alt="Logo" className="w-6 h-6" />
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
            <Fragment key={p.id}>
              <div
                onClick={() => toggleProject(p.id)}
                className={`group relative overflow-hidden rounded-[24px] aspect-[4/3] bg-neutral-900 cursor-pointer ${expandedId === p.id ? 'ring-2 ring-white/30' : ''}`}
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
              {expandedId === p.id && (
                <div className="col-span-1 md:col-span-2 lg:col-span-3 overflow-hidden rounded-[24px] transition-all duration-500 ease-in-out">
                  <div
                    className="relative w-full min-h-[300px] bg-cover bg-center"
                    style={{ backgroundImage: 'url(/images/montana-parallax@2x.png)' }}
                  >
                    {/* Dark gradient overlay for readability */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80" />

                    {/* Content */}
                    <div className="relative z-10 px-16 py-12">
                      <h2 className="text-[80px] font-['Surgena_Personal_use_only'] text-white leading-none mb-8">
                        {p.title}
                      </h2>

                      <p className="text-[20px] font-['ITC_Avant_Garde_Gothic_Std'] text-white/80 max-w-3xl leading-relaxed mb-10">
                        {p.description || 'Descripción próximamente'}
                      </p>

                      <div className="border-t border-white/20 pt-6">
                        <span className="text-[14px] font-['ITC_Avant_Garde_Gothic_Std'] text-white/40 italic block mb-2">
                          — Nota —
                        </span>
                        <p className="text-[16px] font-['ITC_Avant_Garde_Gothic_Std'] text-white/50">
                          {p.nota}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Fragment>
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
