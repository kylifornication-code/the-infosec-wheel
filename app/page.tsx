"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import InfosecWheel from "./components/InfosecWheel";
import TeamPanel from "./components/TeamPanel";
import { ColorTeam } from "@/lib/data";
import Link from "next/link";

export default function Home() {
  const [selected, setSelected] = useState<ColorTeam | null>(null);
  const [expanded, setExpanded] = useState(false);

  return (
    <main className="min-h-screen bg-[#080810] text-white flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-slate-800/60">
        <span className="text-lg font-bold tracking-tight">The Infosec Wheel</span>
        <div className="flex items-center gap-4 text-sm text-slate-400">
          <Link href="/about" className="hover:text-white transition-colors">About</Link>
          <Link
            href="/submit"
            className="px-3 py-1.5 rounded-lg border border-slate-700 hover:border-slate-500 hover:text-white transition-all text-xs font-medium"
          >
            + Submit a Tool
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="text-center pt-10 pb-6 px-4">
        <p className="text-slate-500 text-sm max-w-lg mx-auto">
          Explore the security color wheel — click any team to discover the tools, roles, and
          organizations that make up each domain.
        </p>
      </div>

      {/* Main layout */}
      <div className="flex-1 flex flex-col lg:flex-row gap-6 px-4 pb-10 max-w-6xl mx-auto w-full">
        {/* Wheel column */}
        <div className="flex-1 flex flex-col items-center justify-start pt-2">
          <InfosecWheel
            onSelect={setSelected}
            selected={selected}
            expanded={expanded}
            onToggleExpand={() => setExpanded((v) => !v)}
          />
          {!selected && (
            <p className="mt-8 text-slate-600 text-xs text-center">
              Click a segment to explore that team
            </p>
          )}
        </div>

        {/* Detail panel */}
        <div className="lg:w-[400px] min-h-[400px]">
          <AnimatePresence mode="wait">
            {selected ? (
              <div className="h-full" key={selected.id}>
                <TeamPanel team={selected} />
              </div>
            ) : (
              <div
                key="empty"
                className="h-full flex items-center justify-center rounded-2xl border border-dashed border-slate-800 text-slate-700 text-sm"
              >
                Select a team from the wheel
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
