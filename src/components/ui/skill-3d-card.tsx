import React, { CSSProperties } from 'react';
import './skill-3d-card.css';

interface Skill {
  name: string;
}

interface Skill3DCardProps {
  title: string;
  icon: React.ReactNode;
  color: string;
  skills: Skill[];
}

export const Skill3DCard = ({ title, icon, color, skills }: Skill3DCardProps) => {
  
  // Custom CSS variable injecting for dynamic background based on the category color
  const inlineStyles = {
    '--card-bg': `linear-gradient(135deg, ${color} 0%, rgba(10,10,10,1) 120%)`,
  } as CSSProperties;

  return (
    <div className="skill-3d-wrapper">
      <div className="parent" style={inlineStyles}>
        <div className="card">
          <div className="logo">
            <span className="circle circle1" />
            <span className="circle circle2" />
            <span className="circle circle3" />
            <span className="circle circle4" />
            <span className="circle circle5">
              {icon}
            </span>
          </div>
          <div className="glass" />
          
          <div className="content">
            <span className="title">{title}</span>
            <div className="text">
                {skills.map((skill, idx) => (
                    <span key={idx} className="skills-badge">
                        {skill.name}
                    </span>
                ))}
            </div>
          </div>

          <div className="bottom">
            <div className="social-buttons-container">
              {/* Decorative buttons replicating the Uiverse hover animation effect */}
              <button className="social-button">
                <div className="w-2 h-2 rounded-full bg-black/50" />
              </button>
              <button className="social-button">
                 <div className="w-2 h-2 rounded-full bg-black/50" />
              </button>
              <button className="social-button">
                 <div className="w-2 h-2 rounded-full bg-black/50" />
              </button>
            </div>
            
            <div className="view-more">
              <button className="view-more-button text-right w-full">{skills.length} Yetenek</button>
              <svg className="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skill3DCard;
