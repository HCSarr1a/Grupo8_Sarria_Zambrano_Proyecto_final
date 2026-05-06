"use client";

import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    vehiculo: "",
    fecha: "",
    descripcion: "",
  });
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí luego podemos conectar con el backend
    console.log("Cita agendada:", formData);
    setEnviado(true);
    
    setTimeout(() => {
      setShowModal(false);
      setEnviado(false);
      setFormData({ nombre: "", telefono: "", vehiculo: "", fecha: "", descripcion: "" });
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero */}
      <div className="max-w-5xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-block bg-orange-600/10 text-orange-400 px-4 py-1 rounded-full text-sm font-medium mb-6">
          Neiva • Huila
        </div>
        <h1 className="text-6xl font-bold tracking-tighter mb-4">
          Tu vehículo en <span className="text-orange-500">buenas manos</span>
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          Servicio profesional, repuestos de calidad y atención personalizada. 
          Agenda tu cita en segundos.
        </p>
      </div>

      {/* Opciones principales */}
      <div className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-3 gap-6">
          
          {/* Agendar Cita */}
          <div 
            onClick={() => setShowModal(true)}
            className="group bg-slate-900 border border-slate-800 hover:border-orange-500/50 rounded-3xl p-8 cursor-pointer transition-all active:scale-[0.985]"
          >
            <div className="w-14 h-14 bg-orange-600/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-600/20 transition">
              <span className="text-4xl">📅</span>
            </div>
            <h3 className="text-2xl font-semibold mb-3">Agendar Cita</h3>
            <p className="text-slate-400 mb-6">Reserva tu turno de forma rápida y sencilla. Elige el día y hora que más te convenga.</p>
            <div className="text-orange-500 font-semibold flex items-center gap-2 group-hover:gap-3 transition">
              Agendar ahora <span>→</span>
            </div>
          </div>

          {/* Hablar con Asesor */}
          <a 
            href="tel:+573054778434"
            className="group bg-slate-900 border border-slate-800 hover:border-orange-500/50 rounded-3xl p-8 transition-all active:scale-[0.985] block"
          >
            <div className="w-14 h-14 bg-blue-600/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600/20 transition">
              <span className="text-4xl">📞</span>
            </div>
            <h3 className="text-2xl font-semibold mb-3">Hablar con un Asesor</h3>
            <p className="text-slate-400 mb-6">¿Tienes dudas? Llámanos directamente y te atendemos de inmediato.</p>
            <div className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-2xl transition">
              Marca aquí → 305 477 8434
            </div>
          </a>

          {/* Repuestos */}
          <Link 
            href="/repuestos"
            className="group bg-slate-900 border border-slate-800 hover:border-orange-500/50 rounded-3xl p-8 transition-all active:scale-[0.985] block"
          >
            <div className="w-14 h-14 bg-emerald-600/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600/20 transition">
              <span className="text-4xl">🔧</span>
            </div>
            <h3 className="text-2xl font-semibold mb-3">Repuestos</h3>
            <p className="text-slate-400 mb-6">Explora nuestro catálogo de repuestos originales para motos y carros.</p>
            <div className="text-emerald-500 font-semibold flex items-center gap-2 group-hover:gap-3 transition">
              Ver catálogo <span>→</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Modal Agendar Cita */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-md p-8 relative">
            <button 
              onClick={() => setShowModal(false)} 
              className="absolute top-5 right-5 text-slate-400 hover:text-white text-2xl"
            >
              ×
            </button>

            {!enviado ? (
              <>
                <h2 className="text-3xl font-bold mb-2">Agendar Cita</h2>
                <p className="text-slate-400 mb-8">Completa el formulario y te contactaremos para confirmar.</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <input 
                    type="text" placeholder="Tu nombre completo" required
                    className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-3.5 focus:border-orange-500 outline-none"
                    value={formData.nombre} onChange={(e) => setFormData({...formData, nombre: e.target.value})} 
                  />
                  <input 
                    type="tel" placeholder="Tu teléfono" required
                    className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-3.5 focus:border-orange-500 outline-none"
                    value={formData.telefono} onChange={(e) => setFormData({...formData, telefono: e.target.value})} 
                  />
                  <input 
                    type="text" placeholder="Placa o modelo del vehículo" required
                    className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-3.5 focus:border-orange-500 outline-none"
                    value={formData.vehiculo} onChange={(e) => setFormData({...formData, vehiculo: e.target.value})} 
                  />
                  <input 
                    type="date" required
                    className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-3.5 focus:border-orange-500 outline-none"
                    value={formData.fecha} onChange={(e) => setFormData({...formData, fecha: e.target.value})} 
                  />
                  <textarea 
                    placeholder="¿Qué servicio necesitas?" rows={3} required
                    className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-3.5 focus:border-orange-500 outline-none resize-y"
                    value={formData.descripcion} onChange={(e) => setFormData({...formData, descripcion: e.target.value})} 
                  />

                  <button 
                    type="submit"
                    className="w-full bg-orange-600 hover:bg-orange-500 py-4 rounded-2xl font-bold text-lg mt-2 transition"
                  >
                    Confirmar Cita
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-10">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-2xl font-bold text-green-400 mb-2">¡Cita agendada!</h3>
                <p className="text-slate-400">Nos pondremos en contacto contigo muy pronto para confirmar.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}