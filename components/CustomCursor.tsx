import React, { useEffect } from 'react';

const CustomCursor: React.FC = () => {
  useEffect(() => {
    // Hide default cursor on desktop
    if (window.innerWidth > 1024) {
      document.body.style.cursor = 'none';
    }

    const dot = document.getElementById("cursor-dot");
    const outline = document.getElementById("cursor-outline");

    if (!dot || !outline) return;

    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let outlineX = 0, outlineY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      const target = e.target as HTMLElement;
      if (
        target.closest("button") ||
        target.closest("a") ||
        target.closest(".cursor-pointer")
      ) {
        outline.style.width = "64px";
        outline.style.height = "64px";
        outline.style.backgroundColor = "rgba(var(--primary-rgb, 16, 185, 129), 0.1)";
        outline.style.borderColor = "transparent";
      } else {
        outline.style.width = "40px";
        outline.style.height = "40px";
        outline.style.backgroundColor = "transparent";
        outline.style.borderColor = "var(--primary-color)";
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      dotX += (mouseX - dotX);
      dotY += (mouseY - dotY);
      outlineX += (mouseX - outlineX) * 0.15;
      outlineY += (mouseY - outlineY) * 0.15;

      const outlineSize = outline.style.width === "64px" ? 64 : 40;
      
      dot.style.transform = `translate3d(${dotX - 4}px, ${dotY - 4}px, 0)`;
      outline.style.transform = `translate3d(${outlineX - outlineSize / 2}px, ${outlineY - outlineSize / 2}px, 0)`;

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <>
      <div id="cursor-dot" className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-[9999] will-change-transform hidden lg:block" />
      <div id="cursor-outline" className="fixed top-0 left-0 w-10 h-10 border-2 border-primary rounded-full pointer-events-none z-[9999] transition-[width,height,background-color] duration-300 ease-out will-change-transform hidden lg:block" />
    </>
  );
};

export default CustomCursor;
