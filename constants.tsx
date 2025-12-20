import React from 'react';
import { Project, Skill, SocialLink, ThemeColor } from './types';
import { Github, Linkedin, Mail, Twitter, Code, Server, PenTool, Database } from 'lucide-react';

export const THEME_COLORS: Record<string, ThemeColor> = {
  blue: { name: 'Xanh Dương', hex: '#3b82f6', hoverHex: '#2563eb' },
  purple: { name: 'Tím', hex: '#8b5cf6', hoverHex: '#7c3aed' },
  emerald: { name: 'Ngọc Lục Bảo', hex: '#10b981', hoverHex: '#059669' },
  rose: { name: 'Hồng', hex: '#f43f5e', hoverHex: '#e11d48' },
  orange: { name: 'Cam', hex: '#f97316', hoverHex: '#ea580c' },
};

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "E-Commerce Dashboard",
    category: "Web App",
    description: "Hệ thống quản lý bán hàng toàn diện với phân tích dữ liệu thời gian thực và quản lý kho.",
    image: "https://picsum.photos/800/600?random=1",
    technologies: ["React", "TypeScript", "Tailwind", "Node.js"],
    link: "#",
    github: "#"
  },
  {
    id: 2,
    title: "AI Chat Assistant",
    category: "AI",
    description: "Ứng dụng chat tích hợp Gemini API giúp trả lời câu hỏi và viết code tự động.",
    image: "https://picsum.photos/800/600?random=2",
    technologies: ["Next.js", "Gemini API", "OpenAI"],
    link: "#",
    github: "#"
  },
  {
    id: 3,
    title: "Travel Booking App",
    category: "Mobile",
    description: "Ứng dụng đặt vé du lịch với giao diện trực quan và tính năng gợi ý địa điểm thông minh.",
    image: "https://picsum.photos/800/600?random=3",
    technologies: ["React Native", "Firebase", "Redux"],
    link: "#",
    github: "#"
  },
  {
    id: 4,
    title: "Finance Tracker",
    category: "Web App",
    description: "Công cụ theo dõi chi tiêu cá nhân với biểu đồ trực quan và báo cáo hàng tháng.",
    image: "https://picsum.photos/800/600?random=4",
    technologies: ["Vue.js", "D3.js", "Supabase"],
    link: "#",
    github: "#"
  }
];

export const SKILLS: Skill[] = [
  { name: "React / Next.js", level: 95, icon: <Code size={20} />, category: "Frontend" },
  { name: "TypeScript", level: 90, icon: <Code size={20} />, category: "Frontend" },
  { name: "Tailwind CSS", level: 95, icon: <PenTool size={20} />, category: "Design" },
  { name: "Node.js", level: 85, icon: <Server size={20} />, category: "Backend" },
  { name: "PostgreSQL", level: 80, icon: <Database size={20} />, category: "Backend" },
  { name: "MongoDB", level: 75, icon: <Server size={20} />, category: "Backend" },
  { name: "Java", level: 75, icon: <Code size={20} />, category: "Backend" },
  { name: "Spring Boot", level: 70, icon: <Code size={20} />, category: "Backend" },
  { name: "Figma", level: 75, icon: <PenTool size={20} />, category: "Design" },
  { name: "Docker", level: 70, icon: <Server size={20} />, category: "Tools" },
  { name: "Git / CI/CD", level: 85, icon: <Code size={20} />, category: "Tools" },
];

export const SOCIALS: SocialLink[] = [
  { platform: "GitHub", url: "https://github.com", icon: <Github size={20} /> },
  { platform: "LinkedIn", url: "https://linkedin.com", icon: <Linkedin size={20} /> },
  { platform: "Twitter", url: "https://twitter.com", icon: <Twitter size={20} /> },
  { platform: "Email", url: "mailto:hiepnguyen.250402@gmail.com", icon: <Mail size={20} /> },
];

export const NAVIGATION = [
  { name: "Trang chủ", href: "#home" },
  { name: "Giới thiệu", href: "#about" },
  { name: "Dự án", href: "#projects" },
  { name: "Kỹ năng", href: "#skills" },
  { name: "Liên hệ", href: "#contact" },
];
