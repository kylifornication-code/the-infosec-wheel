"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MERGED_COLOR_TEAMS as COLOR_TEAMS, ColorTeam } from "@/lib/data";

const WHEEL_ORDER = ["red", "orange", "yellow", "green", "blue", "purple", "white"];
const ORDERED_TEAMS = WHEEL_ORDER.map((id) => COLOR_TEAMS.find((t) => t.id === id)!);

const CX = 250;
const CY = 250;
const OUTER_R = 220;
const INNER_R = 95;
const LABEL_R = 158;
const SEG_COUNT = ORDERED_TEAMS.length;
const ANGLE_PER_SEG = (2 * Math.PI) / SEG_COUNT;
const GAP = 0.03; // radians gap between segments

function polarToCartesian(cx: number, cy: number, r: number, angle: number) {
  return {
    x: cx + r * Math.cos(angle),
    y: cy + r * Math.sin(angle),
  };
}

function segmentPath(
  cx: number,
  cy: number,
  outerR: number,
  innerR: number,
  startAngle: number,
  endAngle: number
): string {
  const s = startAngle + GAP / 2;
  const e = endAngle - GAP / 2;
  const o1 = polarToCartesian(cx, cy, outerR, s);
  const o2 = polarToCartesian(cx, cy, outerR, e);
  const i1 = polarToCartesian(cx, cy, innerR, e);
  const i2 = polarToCartesian(cx, cy, innerR, s);
  const large = e - s > Math.PI ? 1 : 0;
  return `M ${o1.x} ${o1.y} A ${outerR} ${outerR} 0 ${large} 1 ${o2.x} ${o2.y} L ${i1.x} ${i1.y} A ${innerR} ${innerR} 0 ${large} 0 ${i2.x} ${i2.y} Z`;
}

function segmentLabelPos(index: number) {
  const mid = -Math.PI / 2 + index * ANGLE_PER_SEG + ANGLE_PER_SEG / 2;
  return polarToCartesian(CX, CY, LABEL_R, mid);
}

function segmentAngles(index: number) {
  const start = -Math.PI / 2 + index * ANGLE_PER_SEG;
  return { start, end: start + ANGLE_PER_SEG };
}

type Props = {
  onSelect: (team: ColorTeam | null) => void;
  selected: ColorTeam | null;
  expanded: boolean;
  onToggleExpand: () => void;
};

export default function InfosecWheel({ onSelect, selected, expanded, onToggleExpand }: Props) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="relative flex flex-col items-center select-none">
      {/* Pill-jar container: clips to top half unless expanded */}
      <motion.div
        className="overflow-hidden w-full flex justify-center"
        animate={{ height: expanded ? 520 : 270 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        style={{ maxWidth: 520 }}
      >
        <svg viewBox="0 0 500 500" className="w-full max-w-[520px]" style={{ display: "block" }}>
          {/* Subtle glow behind wheel */}
          <defs>
            {ORDERED_TEAMS.map((team) => (
              <radialGradient key={team.id} id={`grad-${team.id}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={team.hex} stopOpacity="0.25" />
                <stop offset="100%" stopColor={team.hex} stopOpacity="0" />
              </radialGradient>
            ))}
          </defs>

          {/* Center circle */}
          <circle cx={CX} cy={CY} r={INNER_R - 4} fill="#0f172a" />
          <text
            x={CX}
            y={CY - 10}
            textAnchor="middle"
            fill="#94a3b8"
            fontSize="12"
            fontWeight="500"
            fontFamily="system-ui"
          >
            INFOSEC
          </text>
          <text
            x={CX}
            y={CY + 8}
            textAnchor="middle"
            fill="#94a3b8"
            fontSize="12"
            fontWeight="500"
            fontFamily="system-ui"
          >
            WHEEL
          </text>
          {selected && (
            <text
              x={CX}
              y={CY + 26}
              textAnchor="middle"
              fill={selected.hex}
              fontSize="10"
              fontFamily="system-ui"
            >
              {selected.name}
            </text>
          )}

          {/* Segments */}
          {ORDERED_TEAMS.map((team, i) => {
            const { start, end } = segmentAngles(i);
            const path = segmentPath(CX, CY, OUTER_R, INNER_R, start, end);
            const labelPos = segmentLabelPos(i);
            const isSelected = selected?.id === team.id;
            const isHovered = hovered === team.id;
            const scale = isSelected ? 1.04 : isHovered ? 1.02 : 1;
            const opacity = selected && !isSelected ? 0.45 : 1;

            return (
              <g
                key={team.id}
                onClick={() => onSelect(isSelected ? null : team)}
                onMouseEnter={() => setHovered(team.id)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: "pointer", transformOrigin: `${CX}px ${CY}px`, transform: `scale(${scale})`, transition: "transform 0.2s ease, opacity 0.2s ease", opacity }}
              >
                <path
                  d={path}
                  fill={team.hex}
                  stroke="#0a0a14"
                  strokeWidth="1.5"
                />
                {/* Label */}
                <text
                  x={labelPos.x}
                  y={labelPos.y - 6}
                  textAnchor="middle"
                  fill={team.textHex}
                  fontSize="10"
                  fontWeight="700"
                  fontFamily="system-ui"
                  style={{ pointerEvents: "none", textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}
                >
                  {team.name.split(" ")[0]}
                </text>
                <text
                  x={labelPos.x}
                  y={labelPos.y + 7}
                  textAnchor="middle"
                  fill={team.textHex}
                  fontSize="9"
                  fontFamily="system-ui"
                  opacity="0.85"
                  style={{ pointerEvents: "none" }}
                >
                  Team
                </text>
              </g>
            );
          })}
        </svg>
      </motion.div>

      {/* Expand/collapse toggle */}
      <button
        onClick={onToggleExpand}
        className="mt-3 px-5 py-1.5 rounded-full border border-slate-700 text-slate-400 text-xs font-medium hover:border-slate-500 hover:text-slate-200 transition-all"
      >
        {expanded ? "↑ Collapse wheel" : "↓ View full wheel"}
      </button>
    </div>
  );
}
