export default function Repuestos() {
  const motos = [
    { nombre: "Aceite 10W-40 para Moto", precio: 32000, categoria: "Lubricantes" },
    { nombre: "Pastillas de Freno Moto", precio: 48000, categoria: "Frenos" },
    { nombre: "Kit de Arrastre (Cadena + Piñones)", precio: 125000, categoria: "Transmisión" },
    { nombre: "Bujías NGK", precio: 15000, categoria: "Motor" },
    { nombre: "Filtro de Aire Moto", precio: 28000, categoria: "Filtración" },
  ];

  const carros = [
    { nombre: "Aceite Sintético 5W-30", precio: 68000, categoria: "Lubricantes" },
    { nombre: "Pastillas de Freno Delanteras", precio: 95000, categoria: "Frenos" },
    { nombre: "Amortiguador Delantero", precio: 185000, categoria: "Suspensión" },
    { nombre: "Filtro de Aceite", precio: 24000, categoria: "Filtración" },
    { nombre: "Correa de Distribución", precio: 145000, categoria: "Motor" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-12">
        <h1 className="text-5xl font-bold tracking-tight">Catálogo de Repuestos</h1>
        <p className="text-slate-400 mt-2 text-lg">Repuestos de calidad para motos y carros</p>
      </div>

      {/* MOTOS */}
      <div className="mb-16">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-orange-600 text-white px-4 py-1 rounded-full text-sm font-semibold">MOTOS</div>
          <h2 className="text-3xl font-semibold">Repuestos para Motocicletas</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {motos.map((item, index) => (
            <div key={index} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-orange-500/40 transition">
              <div className="text-xs uppercase tracking-widest text-orange-400 mb-1">{item.categoria}</div>
              <h3 className="font-semibold text-xl mb-4">{item.nombre}</h3>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-bold text-orange-400">${item.precio.toLocaleString()}</span>
                <button className="text-sm border border-slate-700 hover:bg-slate-800 px-4 py-2 rounded-2xl transition">
                  Consultar disponibilidad
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CARROS */}
      <div>
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">CARROS</div>
          <h2 className="text-3xl font-semibold">Repuestos para Automóviles</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {carros.map((item, index) => (
            <div key={index} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-blue-500/40 transition">
              <div className="text-xs uppercase tracking-widest text-blue-400 mb-1">{item.categoria}</div>
              <h3 className="font-semibold text-xl mb-4">{item.nombre}</h3>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-bold text-blue-400">${item.precio.toLocaleString()}</span>
                <button className="text-sm border border-slate-700 hover:bg-slate-800 px-4 py-2 rounded-2xl transition">
                  Consultar disponibilidad
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}