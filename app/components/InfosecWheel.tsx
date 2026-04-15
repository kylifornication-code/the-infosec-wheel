"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useAnimation } from "framer-motion";
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
const ANGLE_PER_SEG_DEG = 360 / SEG_COUNT;
const GAP = 0.03;

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
  const [isSpinning, setIsSpinning] = useState(false);
  const isSpinningRef = useRef(false);
  const rotationRef = useRef(0);
  const controls = useAnimation();

  const spinToIndex = useCallback(
    async (idx: number) => {
      if (isSpinningRef.current) return;

      // Angle (degrees) of segment center, measured clockwise from top (–90°)
      const segCenterDeg = -90 + idx * ANGLE_PER_SEG_DEG + ANGLE_PER_SEG_DEG / 2;
      // Rotation needed so this center aligns with the pointer at top
      const targetAngleDeg = -segCenterDeg;
      const normalizedTarget = ((targetAngleDeg % 360) + 360) % 360;
      const normalizedCurrent = ((rotationRef.current % 360) + 360) % 360;
      let delta = normalizedTarget - normalizedCurrent;
      if (delta <= 0) delta += 360;
      const extraSpins = (Math.floor(Math.random() * 3) + 5) * 360;
      const newRotation = rotationRef.current + delta + extraSpins;

      isSpinningRef.current = true;
      setIsSpinning(true);
      onSelect(null);

      await controls.start({
        rotate: newRotation,
        transition: { duration: 4, ease: [0.12, 0.5, 0.15, 1] },
      });

      rotationRef.current = newRotation;
      isSpinningRef.current = false;
      setIsSpinning(false);
      onSelect(ORDERED_TEAMS[idx]);
    },
    [controls, onSelect]
  );

  const handleSpin = useCallback(() => {
    const idx = Math.floor(Math.random() * SEG_COUNT);
    spinToIndex(idx);
  }, [spinToIndex]);

  // Auto-spin on page load
  useEffect(() => {
    const t = setTimeout(handleSpin, 700);
    return () => clearTimeout(t);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
          <defs>
            {ORDERED_TEAMS.map((team) => (
              <radialGradient key={team.id} id={`grad-${team.id}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={team.hex} stopOpacity="0.25" />
                <stop offset="100%" stopColor={team.hex} stopOpacity="0" />
              </radialGradient>
            ))}
          </defs>

          {/* Rotating segments */}
          <motion.g animate={controls} style={{ transformOrigin: `${CX}px ${CY}px` }}>
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
                  onClick={() => !isSpinning && onSelect(isSelected ? null : team)}
                  onMouseEnter={() => !isSpinning && setHovered(team.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    cursor: isSpinning ? "default" : "pointer",
                    transformOrigin: `${CX}px ${CY}px`,
                    transform: `scale(${scale})`,
                    transition: "transform 0.2s ease, opacity 0.2s ease",
                    opacity,
                  }}
                >
                  <path d={path} fill={team.hex} stroke="#0a0a14" strokeWidth="1.5" />
                  <text
                    x={labelPos.x}
                    y={labelPos.y - 6}
                    textAnchor="middle"
                    fill={team.textHex}
                    fontSize="10"
                    fontWeight="700"
                    fontFamily="system-ui"
                    style={{ pointerEvents: "none" }}
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
          </motion.g>

          {/* Fixed center circle — rendered after rotating group so it sits on top */}
          <circle cx={CX} cy={CY} r={INNER_R - 4} fill="#0f172a" />
          <text x={CX} y={CY - 10} textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="500" fontFamily="system-ui">
            INFOSEC
          </text>
          <text x={CX} y={CY + 8} textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="500" fontFamily="system-ui">
            WHEEL
          </text>
          {selected && (
            <text x={CX} y={CY + 26} textAnchor="middle" fill={selected.hex} fontSize="10" fontFamily="system-ui">
              {selected.name}
            </text>
          )}

          {/* Pointer triangle — fixed on right side, points left into wheel edge */}
          <polygon
            points={`${CX + OUTER_R - 4},${CY} ${CX + OUTER_R + 16},${CY - 9} ${CX + OUTER_R + 16},${CY + 9}`}
            fill={selected ? selected.hex : "white"}
            opacity="0.95"
            style={{ transition: "fill 0.4s ease" }}
          />
        </svg>
      </motion.div>

      {/* Controls row */}
      <div className="mt-3 flex gap-2 items-center">
        <button
          onClick={handleSpin}
          disabled={isSpinning}
          className="px-5 py-1.5 rounded-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white text-xs font-semibold transition-all"
        >
          {isSpinning ? "Spinning…" : "🎯 Spin the wheel"}
        </button>
        <button
          onClick={onToggleExpand}
          className="px-5 py-1.5 rounded-full border border-slate-700 text-slate-400 text-xs font-medium hover:border-slate-500 hover:text-slate-200 transition-all"
        >
          {expanded ? "↑ Collapse" : "↓ Full wheel"}
        </button>
      </div>
    </div>
  );
}
