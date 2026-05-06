"use client";
import { useState } from "react";

export default function TallerDigital() {
  const [paso, setPaso] = useState("RECEPCION");
  const [cargando, setCargando] = useState(false);
  const [orden, setOrden] = useState({
    placa: "",
    cliente: "",
    cedula: "",
    modelo: "",
    mecanico: "1",
    problema: "",
    manoObra: 0,
    repuestos: [] as any[],
  });

  const verificarVehiculo = async (placa: string) => {
    if (placa.length < 5) return;
    setCargando(true);
    try {
      const res = await fetch(`http://localhost:3001/ordenes/vehiculo/${placa.toUpperCase()}`);
      if (res.ok) {
        const data = await res.json();
        if (data.length > 0) {
          const ultima = data[0];
          setOrden({
            ...orden,
            placa: ultima.vehiculo.placa,
            cliente: ultima.vehiculo.cliente.nombre,
            cedula: ultima.vehiculo.cliente.cedula,
            modelo: ultima.vehiculo.modelo,
          });
        }
      }
    } catch (e) { console.log("Vehículo nuevo"); }
    finally { setCargando(false); }
  };

  const agregarRepuesto = (nombre: string, precio: number) => {
    setOrden({
      ...orden,
      repuestos: [...orden.repuestos, { nombre, precio, cantidad: 1 }]
    });
  };

  const calcularTotal = () => {
    const totalRepuestos = orden.repuestos.reduce((acc, r) => acc + (r.precio * r.cantidad), 0);
    return totalRepuestos + Number(orden.manoObra);
  };

  const finalizarOrden = async () => {
    setCargando(true);
    try {
      const res = await fetch('http://localhost:3001/ordenes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...orden, total: calcularTotal() })
      });
      if (res.ok) setPaso("CIERRE");
    } catch (e) { alert("Error de conexión con el Backend"); }
    finally { setCargando(false); }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8 font-sans">
      <header className="mb-10 border-b border-slate-800 pb-4 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-orange-500">Gestión de Taller Automotriz</h1>
          <p className="text-slate-400">Control de Reparaciones y Suministros</p>
        </div>
        <div className="bg-slate-900 px-4 py-2 rounded-lg border border-slate-800 font-mono text-orange-300">
          FASE: {paso}
        </div>
      </header>

      <main className="max-w-4xl mx-auto bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-2xl">
        {paso === "RECEPCION" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold border-l-4 border-orange-500 pl-3">1. Datos del Vehículo</h2>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="PLACA" className="bg-slate-800 p-3 rounded-lg border border-slate-700 uppercase focus:border-orange-500 outline-none" 
                value={orden.placa} onChange={(e) => setOrden({...orden, placa: e.target.value.toUpperCase()})} onBlur={() => verificarVehiculo(orden.placa)} />
              <input type="text" placeholder="CLIENTE" className="bg-slate-800 p-3 rounded-lg border border-slate-700" 
                value={orden.cliente} onChange={(e) => setOrden({...orden, cliente: e.target.value})} />
              <input type="text" placeholder="CÉDULA" className="bg-slate-800 p-3 rounded-lg border border-slate-700" 
                value={orden.cedula} onChange={(e) => setOrden({...orden, cedula: e.target.value})} />
              <input type="text" placeholder="MARCA/MODELO" className="bg-slate-800 p-3 rounded-lg border border-slate-700" 
                value={orden.modelo} onChange={(e) => setOrden({...orden, modelo: e.target.value})} />
            </div>
            <textarea placeholder="Descripción del problema..." className="w-full bg-slate-800 p-3 rounded-lg border border-slate-700 h-24" 
              onChange={(e) => setOrden({...orden, problema: e.target.value})} />
            <button onClick={() => setPaso("TALLER")} className="w-full bg-orange-600 hover:bg-orange-500 py-3 rounded-lg font-bold">Iniciar Orden</button>
          </div>
        )}

        {paso === "TALLER" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold border-l-4 border-blue-500 pl-3">2. Hoja de Trabajo: {orden.placa}</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-800 p-4 rounded-lg">
                <p className="text-xs text-slate-500 uppercase">Falla</p>
                <p className="text-sm">{orden.problema || "Sin descripción"}</p>
              </div>
              <div className="bg-slate-800 p-4 rounded-lg">
                <label className="text-xs text-slate-500 block mb-1">MANO DE OBRA ($)</label>
                <input type="number" className="bg-slate-700 w-full p-2 rounded border border-slate-600 text-orange-400 font-mono" 
                  onChange={(e) => setOrden({...orden, manoObra: Number(e.target.value)})} />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-bold text-slate-400">Insumos:</p>
              <div className="flex gap-2">
                <button onClick={() => agregarRepuesto("Aceite", 45000)} className="bg-slate-700 px-4 py-2 rounded-full text-xs hover:bg-orange-500 transition">+ Aceite</button>
                <button onClick={() => agregarRepuesto("Pastillas", 38000)} className="bg-slate-700 px-4 py-2 rounded-full text-xs hover:bg-orange-500 transition">+ Pastillas</button>
                <button onClick={() => agregarRepuesto("Kit Arrastre", 180000)} className="bg-slate-700 px-4 py-2 rounded-full text-xs hover:bg-orange-500 transition">+ Kit Arrastre</button>
              </div>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-800">
              <table className="w-full text-sm">
                <thead><tr className="text-slate-500 border-b border-slate-700"><th className="pb-2 text-left">Ítem</th><th className="pb-2 text-right">Precio</th></tr></thead>
                <tbody>
                  {orden.repuestos.map((r, i) => (
                    <tr key={i}><td className="py-1 text-slate-300">{r.nombre}</td><td className="text-right font-mono">${r.precio.toLocaleString()}</td></tr>
                  ))}
                  <tr><td className="pt-4 font-bold text-orange-400">TOTAL ESTIMADO</td><td className="pt-4 text-right text-xl font-bold text-orange-400">${calcularTotal().toLocaleString()}</td></tr>
                </tbody>
              </table>
            </div>
            <button onClick={finalizarOrden} className="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded-lg font-bold">Finalizar Reparación</button>
          </div>
        )}

        {paso === "CIERRE" && (
          <div className="text-center space-y-6 py-10 animate-in fade-in zoom-in duration-300">
            <div className="text-5xl">📄</div>
            <h2 className="text-3xl font-bold text-green-400">¡Orden Exitosa!</h2>
            <div className="max-w-md mx-auto text-left bg-white text-slate-900 p-8 rounded-lg shadow-2xl font-mono text-sm border-t-8 border-orange-500">
              <p className="text-center font-bold text-lg mb-4">RECIBO DE SERVICIO</p>
              <p>PLACA: {orden.placa}</p>
              <p>CLIENTE: {orden.cliente}</p>
              <div className="border-t border-dashed border-slate-300 my-4"></div>
              {orden.repuestos.map((r, i) => (
                <div key={i} className="flex justify-between"><span>{r.nombre}</span><span>${r.precio.toLocaleString()}</span></div>
              ))}
              <div className="flex justify-between"><span>Mano de Obra</span><span>${orden.manoObra.toLocaleString()}</span></div>
              <div className="border-t border-slate-900 mt-4 pt-2 flex justify-between font-bold text-lg">
                <span>TOTAL:</span><span>${calcularTotal().toLocaleString()}</span>
              </div>
            </div>
            <button onClick={() => window.location.reload()} className="bg-orange-600 px-8 py-3 rounded-lg font-bold hover:bg-orange-500 transition">Nueva Orden</button>
          </div>
        )}
      </main>
    </div>
  );
}