"use client";

import { useState } from "react";
import Link from "next/link";
import { COLOR_TEAMS } from "@/lib/data";

const OUTPUT_TYPES = ["tool", "team", "role"] as const;
type SubmitType = (typeof OUTPUT_TYPES)[number];

export default function SubmitPage() {
  const [type, setType] = useState<SubmitType>("tool");
  const [colorId, setColorId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [license, setLicense] = useState("open-source");
  const [certifications, setCertifications] = useState<string[]>([]);
  const [certInput, setCertInput] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function addCert(raw: string) {
    const cert = raw.trim().toUpperCase();
    if (cert && !certifications.includes(cert)) {
      setCertifications((prev) => [...prev, cert]);
    }
    setCertInput("");
  }

  function handleCertKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addCert(certInput);
    } else if (e.key === "Backspace" && certInput === "" && certifications.length > 0) {
      setCertifications((prev) => prev.slice(0, -1));
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!colorId || !name || !description) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, colorId, name, description, url, license, certifications }),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-[#080810] text-white flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full text-center space-y-4">
          <div className="text-4xl">✓</div>
          <h1 className="text-xl font-bold">Submission received!</h1>
          <p className="text-slate-400 text-sm">Thanks for contributing to the community catalog.</p>
          <Link href="/" className="inline-block mt-4 text-sm text-indigo-400 hover:text-indigo-300">
            ← Back to the wheel
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#080810] text-white flex flex-col items-center p-6 py-16">
      <div className="w-full max-w-lg space-y-8">
        <div>
          <Link href="/" className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
            ← Back to the wheel
          </Link>
        </div>

        <div>
          <h1 className="text-2xl font-bold">Submit a Tool, Team, or Role</h1>
          <p className="text-slate-400 text-sm mt-2">
            Help the community grow — add a tool, team structure, or role to any section of the wheel.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Type */}
          <div>
            <label className="block text-xs text-slate-400 mb-2 font-medium uppercase tracking-wider">What are you submitting?</label>
            <div className="flex gap-2">
              {OUTPUT_TYPES.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setType(t)}
                  className={`flex-1 py-2 rounded-lg border text-sm font-medium capitalize transition-all ${
                    type === t ? "border-indigo-500 bg-indigo-950 text-white" : "border-slate-700 bg-slate-900 text-slate-400 hover:border-slate-500"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Color team */}
          <div>
            <label className="block text-xs text-slate-400 mb-2 font-medium uppercase tracking-wider">Team / Color</label>
            <select
              value={colorId}
              onChange={(e) => setColorId(e.target.value)}
              required
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-indigo-500 text-white"
            >
              <option value="">Select a team...</option>
              {COLOR_TEAMS.map((t) => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>

          {/* Name */}
          <div>
            <label className="block text-xs text-slate-400 mb-2 font-medium uppercase tracking-wider">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder={type === "tool" ? "e.g. Nessus" : type === "team" ? "e.g. Threat Intelligence" : "e.g. SOC Analyst"}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs text-slate-400 mb-2 font-medium uppercase tracking-wider">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={3}
              placeholder="What does it do? Why is it useful for this team?"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-indigo-500 resize-none"
            />
          </div>

          {/* Certifications (roles only) */}
          {type === "role" && (
            <div>
              <label className="block text-xs text-slate-400 mb-2 font-medium uppercase tracking-wider">
                Certifications <span className="normal-case font-normal">(optional)</span>
              </label>
              <div className="w-full min-h-[44px] bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 flex flex-wrap gap-1.5 focus-within:border-indigo-500 transition-colors">
                {certifications.map((cert) => (
                  <span
                    key={cert}
                    className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium bg-indigo-950 border border-indigo-700 text-indigo-300"
                  >
                    {cert}
                    <button
                      type="button"
                      onClick={() => setCertifications((prev) => prev.filter((c) => c !== cert))}
                      className="text-indigo-400 hover:text-white leading-none"
                      aria-label={`Remove ${cert}`}
                    >
                      ×
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  value={certInput}
                  onChange={(e) => setCertInput(e.target.value)}
                  onKeyDown={handleCertKeyDown}
                  onBlur={() => addCert(certInput)}
                  placeholder={certifications.length === 0 ? "e.g. OSCP, CEH, CISSP — press Enter to add" : "Add another…"}
                  className="flex-1 min-w-[140px] bg-transparent text-sm focus:outline-none text-white placeholder:text-slate-600"
                />
              </div>
              <p className="mt-1.5 text-xs text-slate-600">Press Enter or comma to add each cert. Backspace removes the last one.</p>
            </div>
          )}

          {/* URL + License (tools only) */}
          {type === "tool" && (
            <>
              <div>
                <label className="block text-xs text-slate-400 mb-2 font-medium uppercase tracking-wider">URL (optional)</label>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-2 font-medium uppercase tracking-wider">License</label>
                <div className="flex gap-2">
                  {(["open-source", "freemium", "commercial"] as const).map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => setLicense(l)}
                      className={`flex-1 py-2 rounded-lg border text-sm font-medium capitalize transition-all ${
                        license === l ? "border-indigo-500 bg-indigo-950 text-white" : "border-slate-700 bg-slate-900 text-slate-400 hover:border-slate-500"
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading || !colorId || !name || !description}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-600 font-semibold text-sm transition-all"
          >
            {loading ? "Submitting…" : "Submit"}
          </button>
        </form>
      </div>
    </main>
  );
}
