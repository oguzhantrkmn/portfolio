"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Link as LinkIcon, Zap } from "lucide-react";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [viewMode, setViewMode] = useState<"orbital">("orbital");
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [centerOffset, setCenterOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

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
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  useEffect(() => {
    let rotationTimer: NodeJS.Timeout;

    if (autoRotate && viewMode === "orbital") {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.1) % 360;  // Daha yavaþ, premium dönüþ 0.3->0.1
          return Number(newAngle.toFixed(3));
        });
      }, 50);
    }

    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer);
      }
    };
  }, [autoRotate, viewMode]);

  const centerViewOnNode = (nodeId: number) => {
    if (viewMode !== "orbital" || !nodeRefs.current[nodeId]) return;

    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 240; // Biraz daha geniþ kapsama 200->240
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.4,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
    );

    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed":
        return "text-white bg-green-500/20 border-green-500/30";
      case "in-progress":
        return "text-blue-200 bg-blue-500/20 border-blue-500/30";
      case "pending":
        return "text-white/70 bg-white/5 border-white/10";
      default:
        return "text-white/70 bg-white/5 border-white/10";
    }
  };

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center overflow-hidden font-sans"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full max-w-5xl h-[600px] flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center transition-transform duration-1000 ease-out"
          ref={orbitRef}
          style={{
            perspective: "1200px",
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
          }}
        >
          {/* Merkezi Güneþ/Çekirdek */}
          <div className="absolute w-20 h-20 rounded-full  flex items-center justify-center z-10 transition-all duration-700">
            <div className="absolute w-32 h-32 rounded-full border border-white/5 opacity-50"></div>
            <div className="absolute w-48 h-48 rounded-full border border-white/5 opacity-30"></div>
            <div className="absolute w-64 h-64 rounded-full border border-white/[0.03] opacity-20"></div>
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-zinc-700 to-zinc-900 border border-zinc-600 shadow-[0_0_30px_rgba(255,255,255,0.1)]"></div>
          </div>

          {/* Ana Yörünge */}
          <div className="absolute w-[480px] h-[480px] rounded-full border border-white/[0.05]"></div>

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            };

            return (
              <div
                key={item.id}
                ref={(el) => { nodeRefs.current[item.id] = el; }}
                className="absolute transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] will-change-transform cursor-pointer"
                style={nodeStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                {/* Enerji Alaný */}
                <div
                  className={`absolute rounded-full -inset-1 transition-opacity duration-500 ${
                    isPulsing ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    background: `radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%)`,
                    width: `${item.energy * 0.8 + 40}px`,
                    height: `${item.energy * 0.8 + 40}px`,
                    left: `-${(item.energy * 0.8 + 40 - 48) / 2}px`,
                    top: `-${(item.energy * 0.8 + 40 - 48) / 2}px`,
                  }}
                ></div>

                {/* Düðüm Simgesi */}
                <div
                  className={`
                  w-12 h-12 rounded-full flex items-center justify-center relative z-10
                  ${
                    isExpanded
                      ? "bg-white text-black"
                      : isRelated
                      ? "bg-zinc-800 text-white"
                      : "bg-black/40 text-zinc-400 backdrop-blur-sm"
                  }
                  border 
                  ${
                    isExpanded
                      ? "border-white shadow-[0_0_20px_rgba(255,255,255,0.5)]"
                      : isRelated
                      ? "border-zinc-500 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                      : "border-white/10"
                  }
                  transition-all duration-500 transform
                  ${isExpanded ? "scale-125" : "hover:scale-110 hover:bg-zinc-900"}
                `}
                >
                  <Icon size={20} strokeWidth={isExpanded ? 2.5 : 1.5} />
                </div>

                {/* Baþlýk Eðer Kapalýysa */}
                <div
                  className={`
                  absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap
                  text-xs font-medium tracking-wide
                  transition-all duration-500
                  ${isExpanded ? "opacity-0 invisible" : "text-zinc-500"}
                  ${isRelated ? "text-zinc-300" : ""}
                `}
                >
                  {item.title}
                </div>

                {/* Açýlan Kart */}
                <div
                    className={`absolute top-16 left-1/2 -translate-x-1/2 w-72 bg-[#111] backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl overflow-hidden transition-all duration-500 origin-top
                    ${isExpanded ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}
                    `}
                >
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-white/20"></div>
                    <div className="p-5 flex flex-col gap-3">
                        <div className="flex justify-between items-center bg-white/5 -mt-5 -mx-5 px-5 py-3 border-b border-white/5 mb-2">
                        <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wider border ${getStatusStyles(
                            item.status
                            )}`}
                        >
                            {item.status.toUpperCase()}
                        </span>
                        <span className="text-[11px] font-mono text-zinc-500">
                            {item.date}
                        </span>
                        </div>
                        <h3 className="text-lg font-semibold text-white tracking-tight leading-tight">
                        {item.title}
                        </h3>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                            {item.content}
                        </p>

                        <div className="mt-2 pt-4 border-t border-white/5">
                        <div className="flex justify-between items-center text-xs mb-1.5 text-zinc-500">
                            <span className="flex items-center gap-1.5">
                            <Zap size={12} className="text-amber-400/70" />
                            Enerji/Odak
                            </span>
                            <span className="font-mono text-zinc-300">{item.energy}%</span>
                        </div>
                        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                            <div
                            className="h-full bg-gradient-to-r from-blue-500/80 to-purple-500/80 rounded-full"
                            style={{ width: `${item.energy}%` }}
                            ></div>
                        </div>
                        </div>

                        {item.relatedIds.length > 0 && (
                        <div className="mt-2 pt-4 border-t border-white/5">
                            <div className="flex items-center gap-1.5 mb-3 text-zinc-500">
                            <LinkIcon size={12} />
                            <h4 className="text-[10px] uppercase tracking-widest font-semibold">
                                Baðlantýlý Düðümler
                            </h4>
                            </div>
                            <div className="flex flex-wrap gap-2">
                            {item.relatedIds.map((relatedId) => {
                                const relatedItem = timelineData.find(
                                (i) => i.id === relatedId
                                );
                                return (
                                <button
                                    key={relatedId}
                                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-white/5 bg-white/5 hover:bg-white/10 text-xs text-zinc-300 transition-colors"
                                    onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(relatedId);
                                    }}
                                >
                                    {relatedItem?.title}
                                    <ArrowRight size={10} className="opacity-50" />
                                </button>
                                );
                            })}
                            </div>
                        </div>
                        )}
                    </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
