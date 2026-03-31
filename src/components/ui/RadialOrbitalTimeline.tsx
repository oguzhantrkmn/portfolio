"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, Zap, Link2 } from "lucide-react";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string[];
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
  location?: string;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {
    let rotationTimer: NodeJS.Timeout;
    if (autoRotate) {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => Number(((prev + 0.25) % 360).toFixed(3)));
      }, 50);
    }
    return () => { if (rotationTimer) clearInterval(rotationTimer); };
  }, [autoRotate]);

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState: Record<number, boolean> = {};
      Object.keys(prev).forEach((key) => { newState[parseInt(key)] = false; });
      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);
        const item = timelineData.find((i) => i.id === id);
        const newPulse: Record<number, boolean> = {};
        item?.relatedIds.forEach((rid) => { newPulse[rid] = true; });
        setPulseEffect(newPulse);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }
      return newState;
    });
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 165;
    const radian = (angle * Math.PI) / 180;
    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);
    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2)));
    return { x, y, angle, zIndex, opacity };
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const item = timelineData.find((i) => i.id === activeNodeId);
    return item?.relatedIds.includes(itemId) ?? false;
  };

  const getStatusColor = (status: TimelineItem["status"]) => {
    switch (status) {
      case "completed": return "text-emerald-400 bg-emerald-400/10 border-emerald-500/30";
      case "in-progress": return "text-indigo-400 bg-indigo-400/10 border-indigo-500/30";
      case "pending": return "text-slate-400 bg-slate-400/10 border-slate-500/30";
    }
  };

  const getStatusLabel = (status: TimelineItem["status"]) => {
    switch (status) {
      case "completed": return "Tamamlandı";
      case "in-progress": return "Devam Ediyor";
      case "pending": return "Bekliyor";
    }
  };

  return (
    <div
      className="relative w-full flex items-center justify-center overflow-hidden"
      style={{ height: "420px" }}
      ref={containerRef}
      onClick={handleContainerClick}
    >
      {/* Center orb */}
      <div
        ref={orbitRef}
        className="absolute flex items-center justify-center"
        style={{ perspective: "1000px" }}
      >
        {/* Orbit ring */}
        <div className="absolute w-[330px] h-[330px] rounded-full border border-indigo-500/10" />
        <div className="absolute w-[320px] h-[320px] rounded-full border border-purple-500/5" />

        {/* Center */}
        <div className="relative z-10 w-14 h-14 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 animate-pulse opacity-80" />
          <div className="absolute inset-0 rounded-full border border-indigo-400/30 animate-ping opacity-30" />
          <div className="relative w-8 h-8 rounded-full bg-white/90 backdrop-blur-md shadow-lg shadow-indigo-500/50" />
        </div>

        {/* Orbital nodes */}
        {timelineData.map((item, index) => {
          const position = calculateNodePosition(index, timelineData.length);
          const isExpanded = expandedItems[item.id];
          const isRelated = isRelatedToActive(item.id);
          const isPulsing = pulseEffect[item.id];
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              ref={(el) => { nodeRefs.current[item.id] = el; }}
              className="absolute transition-all duration-700 cursor-pointer"
              style={{
                transform: `translate(${position.x}px, ${position.y}px)`,
                zIndex: isExpanded ? 200 : position.zIndex,
                opacity: isExpanded ? 1 : position.opacity,
              }}
              onClick={(e) => { e.stopPropagation(); toggleItem(item.id); }}
            >
              {/* Glow halo */}
              {isPulsing && (
                <div className="absolute inset-0 -m-4 rounded-full bg-indigo-500/10 animate-pulse" />
              )}

              {/* Node */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 
                  ${isExpanded
                    ? "bg-indigo-500 border-indigo-400 shadow-lg shadow-indigo-500/40 scale-125"
                    : isRelated
                    ? "bg-indigo-500/30 border-indigo-400/60 animate-pulse"
                    : "bg-slate-900 border-slate-600/50 hover:border-indigo-500/50"
                  }`}
              >
                <Icon size={14} className={isExpanded ? "text-white" : "text-slate-400"} />
              </div>

              {/* Label */}
              <div className={`absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold tracking-wider transition-all duration-300 
                ${isExpanded ? "text-indigo-300" : "text-slate-500"}`}>
                {item.title}
              </div>

              {/* Expanded card */}
              {isExpanded && (
                <div className="absolute left-1/2 -translate-x-1/2 w-64 rounded-xl border border-indigo-500/20 backdrop-blur-xl shadow-2xl shadow-black/50 overflow-hidden"
                  style={{
                    top: position.y > 0 ? "50px" : "auto",
                    bottom: position.y <= 0 ? "50px" : "auto",
                    background: "rgba(10, 15, 26, 0.95)",
                    zIndex: 300,
                  }}
                >
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${getStatusColor(item.status)}`}>
                        {getStatusLabel(item.status)}
                      </span>
                      <span className="text-xs font-mono text-slate-500">{item.date}</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-100 mb-1">{item.title}</h4>
                    {item.location && <p className="text-xs text-indigo-400 mb-2">{item.location}</p>}
                    <ul className="space-y-1 mt-2">
                      {item.content.map((c, i) => (
                        <li key={i} className="text-xs text-slate-400 flex items-start gap-1">
                          <span className="text-indigo-500 mt-0.5">›</span>
                          {c}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-3 pt-3 border-t border-slate-800">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="flex items-center gap-1 text-slate-500">
                          <Zap size={10} /> Deneyim
                        </span>
                        <span className="font-mono text-slate-400">{item.energy}%</span>
                      </div>
                      <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                          style={{ width: `${item.energy}%` }}
                        />
                      </div>
                    </div>

                    {item.relatedIds.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-slate-800">
                        <div className="flex items-center gap-1 mb-2">
                          <Link2 size={10} className="text-slate-500" />
                          <span className="text-xs text-slate-500 uppercase tracking-wider">Bağlantılı</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {item.relatedIds.map((rid) => {
                            const related = timelineData.find((i) => i.id === rid);
                            return (
                              <button
                                key={rid}
                                className="text-xs px-2 py-0.5 rounded border border-slate-700 text-slate-400 hover:border-indigo-500/50 hover:text-indigo-400 flex items-center gap-1 transition-colors"
                                onClick={(e) => { e.stopPropagation(); toggleItem(rid); }}
                              >
                                {related?.title}
                                <ArrowRight size={8} />
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
