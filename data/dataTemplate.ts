export interface TemplateType {
  type_id: number;
  type_name: string;
}

export interface Template {
  template_id: number;
  template_name: string;
  template_des: string;
  template_img: string;
  template_link: string;
  template_demo: string;
  category: "all" | "personal" | "business" | "creative" | "ecommerce";
  template_year: string;
  template_type: TemplateType[];
  status: "New" | "Hot" | "Coming Soon" | "Updated";
  tags: string[];
}

export const templates: Template[] = [
  {
    template_id: 1,
    template_name: "AvantVN - Fashion Structure dictates emotion.",
    template_des:
      "AvantVN is a fashion-focused portfolio website that combines modern design with high-quality visuals to showcase clothing collections and brand identity.",
    template_img: "/template/avant/Screenshot 2026-01-21 010419.jpg",
    template_link: "/templates/neon-verse",
    template_demo: "https://avantvn.vercel.app/",
    category: "creative",
    template_year: "2026",
    template_type: [{ type_id: 1, type_name: "Fashion" }],
    status: "Hot",
    tags: ["React", "TailwindCss", "TypeScript", "Framer Motion", "GSAP"],
  },
];
