"use client";
import React from 'react';
import { FaGithub as Github, FaLinkedin as Linkedin } from "react-icons/fa";
import { personalInfo } from "@/lib/data";
import './social-links.css';

export const SocialLinks = () => {
  const socialLinksData = [
    { name: "GitHub", url: personalInfo.github, icon: Github, color: "#ffffff" },
    { name: "LinkedIn", url: personalInfo.linkedin, icon: Linkedin, color: "#0077b5" },
  ].filter(link => link.url);

  return (
    <div className="social-card">
      <ul>
        {socialLinksData.map((link, idx) => {
          const Icon = link.icon;
          return (
          <li className="iso-pro" key={idx} style={{ color: link.color || "#fff" }}>
            <span />
            <span />
            <span />
            <a href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.name}>
              <Icon className="social-svg" />
            </a>
            <div className="social-text">{link.name}</div>
          </li>
        )})}
      </ul>
    </div>
  );
};
