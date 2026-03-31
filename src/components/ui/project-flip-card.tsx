import React, { CSSProperties } from 'react';
import './project-flip-card.css';
import { ExternalLink, Activity } from "lucide-react";
import { FaGithub as Github } from "react-icons/fa";

export interface ProjectFlipCardProps {
  title: string;
  description: string;
  status: string;
  technologies: string[];
  github?: string | null;
  live?: string | null;
}

const ProjectFlipCard = ({ title, description, status, technologies, github, live }: ProjectFlipCardProps) => {
  // Determine gradient colors based on project status
  let themeColor = "#666666"; // default neutral
  let c1 = "#444444", c2 = "#888888", c3 = "#222222";

  if (status === "Tamamlandı") {
    themeColor = "#10b981"; // emerald
    c1 = "#059669"; c2 = "#34d399"; c3 = "#065f46";
  } else if (status === "Yayında") {
    themeColor = "#06b6d4"; // cyan
    c1 = "#0891b2"; c2 = "#22d3ee"; c3 = "#164e63";
  } else if (status === "Devam Ediyor") {
    themeColor = "#3b82f6"; // blue
    c1 = "#2563eb"; c2 = "#60a5fa"; c3 = "#1e3a8a";
  }

  const customStyle = {
    '--theme-color': themeColor,
    '--color-1': c1,
    '--color-2': c2,
    '--color-3': c3,
  } as CSSProperties;

  return (
    <div className="project-flip-wrapper">
      <div className="content">
        <div className="back" style={customStyle}>
          <div className="back-content">
            <Activity size={50} stroke={themeColor} strokeWidth={1.5} />
            <div>
              <strong className="text-xl tracking-tight block">{title}</strong>
              <span className="text-zinc-500 text-sm mt-2 block">Görüntülemek için fareyi üzerine getirin.</span>
            </div>
          </div>
        </div>
        <div className="front" style={customStyle}>
          <div className="img">
            <div className="circle" id="right"></div>
            <div className="circle" id="bottom"></div>
          </div>

          <div className="front-content">
            <small className="badge" style={{ color: themeColor }}>
              {status}
            </small>

            <div className="description">
              <div className="title">
                <span className="truncate pr-4">{title}</span>
                <div className="actions">
                  {github && (
                    <a href={github} target="_blank" rel="noopener noreferrer">
                      <Github size={18} />
                    </a>
                  )}
                  {live && (
                    <a href={live} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>
              </div>
              <p className="card-footer">
                {description}
              </p>
              <div className="tags">
                {technologies.slice(0, 4).map((tech, i) => (
                  <span key={i} className="tag">{tech}</span>
                ))}
                {technologies.length > 4 && (
                  <span className="tag">+{technologies.length - 4}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectFlipCard;
