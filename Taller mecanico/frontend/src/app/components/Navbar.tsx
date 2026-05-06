"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-orange-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-xl">TD</span>
          </div>
          <span className="font-bold text-2xl tracking-tight">Taller Digital</span>
        </Link>

        <div className="flex items-center gap-8 text-sm font-medium">
          <Link href="/repuestos" className="hover:text-orange-400 transition">Repuestos</Link>
          <Link href="/taller" className="hover:text-orange-400 transition">Acceder al Taller</Link>
          <a 
            href="tel:+573054778434" 
            className="bg-orange-600 hover:bg-orange-500 px-5 py-2 rounded-full text-sm font-semibold transition flex items-center gap-2"
          >
            Llamar ahora
          </a>
        </div>
      </div>
    </nav>
  );
}