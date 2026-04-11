import Link from "next/link";
import { COLOR_TEAMS } from "@/lib/data";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#080810] text-white flex flex-col items-center p-6 py-16">
      <div className="w-full max-w-2xl space-y-10">
        <Link href="/" className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
          ← Back to the wheel
        </Link>

        <div>
          <h1 className="text-3xl font-bold">The Infosec Color Wheel</h1>
          <p className="text-slate-400 mt-2 leading-relaxed">
            A visual framework for understanding how security teams are structured — and what tools,
            roles, and responsibilities belong to each domain.
          </p>
        </div>

        <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
          <p>
            The color wheel framework was introduced by{" "}
            <span className="text-white font-medium">April C. Wright</span> in her 2017 Black Hat
            presentation "Orange Is the New Purple." It expands the traditional Red/Blue team model
            into a complete spectrum of security disciplines.
          </p>
          <p>
            This site maps each color to the teams, tools, and career roles that live within it —
            helping early-career security professionals understand the landscape and where to focus
            their learning.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-semibold">The 7 Teams</h2>
          {COLOR_TEAMS.map((team) => (
            <div
              key={team.id}
              className="flex items-start gap-3 p-4 rounded-xl border border-slate-800 bg-slate-900/50"
            >
              <div
                className="w-3 h-3 rounded-full mt-1 shrink-0"
                style={{ backgroundColor: team.hex }}
              />
              <div>
                <div className="font-semibold text-white">{team.name}</div>
                <div className="text-xs mt-0.5 mb-1" style={{ color: team.hex }}>{team.tagline}</div>
                <div className="text-xs text-slate-400 leading-relaxed">{team.description}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-sm text-slate-600 pt-4 border-t border-slate-800">
          Community contributions welcome —{" "}
          <Link href="/submit" className="text-indigo-400 hover:text-indigo-300">
            submit a tool, team, or role
          </Link>
          .
        </div>
      </div>
    </main>
  );
}
