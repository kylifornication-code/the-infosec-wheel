"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ColorTeam } from "@/lib/data";

type Tab = "teams" | "tools" | "roles";

const LICENSE_BADGE: Record<string, string> = {
  "open-source": "bg-emerald-900 text-emerald-300",
  commercial: "bg-red-900 text-red-300",
  freemium: "bg-sky-900 text-sky-300",
};

export default function TeamPanel({ team }: { team: ColorTeam }) {
  const [tab, setTab] = useState<Tab>("tools");

  return (
    <motion.div
      key={team.id}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      className="bg-slate-900/80 backdrop-blur border border-slate-800 rounded-2xl overflow-hidden flex flex-col h-full"
    >
      {/* Header */}
      <div
        className="px-5 py-4 flex items-start gap-3"
        style={{ borderBottom: `2px solid ${team.hex}22` }}
      >
        <div
          className="w-3 h-3 rounded-full mt-1.5 shrink-0 ring-2 ring-offset-2 ring-offset-slate-900"
          style={{ backgroundColor: team.hex }}
        />
        <div>
          <h2 className="text-lg font-bold text-white leading-tight">{team.name}</h2>
          <p className="text-xs font-medium mt-0.5" style={{ color: team.hex }}>
            {team.tagline}
          </p>
          <p className="text-sm text-slate-400 mt-2 leading-relaxed">{team.description}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800">
        {(["tools", "teams", "roles"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all ${
              tab === t ? "text-white border-b-2" : "text-slate-500 hover:text-slate-300"
            }`}
            style={tab === t ? { borderBottomColor: team.hex } : {}}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
        <AnimatePresence mode="wait">
          {tab === "tools" && (
            <motion.div key="tools" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-2">
              {team.tools.map((tool) => (
                <a
                  key={tool.name}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 rounded-xl bg-slate-800/60 border border-slate-700/50 hover:border-slate-600 transition-all group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-sm font-semibold text-white group-hover:text-white/90">{tool.name}</span>
                    <span className={`shrink-0 text-[10px] px-1.5 py-0.5 rounded-full font-medium ${LICENSE_BADGE[tool.license]}`}>
                      {tool.license}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{tool.description}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {tool.tags.map((tag) => (
                      <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-700 text-slate-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                </a>
              ))}
            </motion.div>
          )}

          {tab === "teams" && (
            <motion.div key="teams" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-2">
              {team.teams.map((t) => (
                <div key={t.name} className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: team.hex }} />
                    <span className="text-sm font-semibold text-white">{t.name}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{t.description}</p>
                </div>
              ))}
            </motion.div>
          )}

          {tab === "roles" && (
            <motion.div key="roles" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-2">
              {team.roles.map((r) => (
                <div key={r.title} className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50">
                  <span className="text-sm font-semibold text-white">{r.title}</span>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{r.description}</p>
                  {r.certifications.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {r.certifications.map((cert) => (
                        <span
                          key={cert}
                          className="text-[10px] px-1.5 py-0.5 rounded font-medium"
                          style={{ backgroundColor: `${team.hex}22`, color: team.hex }}
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
