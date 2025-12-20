
import React from 'react';

export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  technologies: string[];
  link: string;
  github: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100
  icon: React.ReactNode;
  category: 'Frontend' | 'Backend' | 'Tools' | 'Design';
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: React.ReactNode;
}

export interface ThemeColor {
  name: string;
  hex: string;
  hoverHex: string;
}

export interface AppSettings {
  darkMode: boolean;
  primaryColor: string; // Key from THEME_COLORS or hex
  accentColor: string; // Hex for hover/active states
  animationsEnabled: boolean;
  projectLayout: 'grid' | 'list' | 'carousel' | 'minimal' | 'masonry' | 'timeline' | 'comparison';
}
