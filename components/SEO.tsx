
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    type?: 'website' | 'article' | 'profile';
    author?: string;
}

const SEO: React.FC<SEOProps> = ({
    title = "Nguyễn Hiệp | Software Engineer",
    description = "Khám phá Portfolio của Nguyễn Hiệp - Kỹ sư phần mềm chuyên sâu về React, Next.js, Node.js và tích hợp AI. Xem các dự án thực chiến và tương tác với trợ lý Alex AI thông minh.",
    keywords = "Nguyễn Hiệp, Software Engineer, Portfolio, React Developer, Next.js, AI Engineer, Fullstack Developer, Web Developer Việt Nam, Frontend Developer, Backend Developer",
    image = "/webdev-1.svg",
    type = "website",
    author = "Nguyễn Hiệp"
}) => {
    const location = useLocation();
    const canonicalUrl = `https://portfolio-seven-roan-80.vercel.app${location.pathname}`;

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content={author} />
            <link rel="canonical" href={canonicalUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={canonicalUrl} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={image} />
        </Helmet>
    );
};

export default SEO;
