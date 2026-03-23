
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
    title = "Nguyễn Hiệp | Software Engineer | Full-stack Developer (ReactJS, Spring Boot)",
    description = "Nguyễn Hiệp - Software Engineer chuyên sâu ReactJS, NextJS và Spring Boot. Xây dựng giải pháp phần mềm tối ưu, hệ thống Check-in QR và ứng dụng quản lý hiện đại.",
    keywords = "Nguyễn Hiệp, Nguyen Hiep Dev, Software Engineer HCM, Front-end Developer ReactJS, Full-stack Developer Spring Boot, Lập trình viên Gò Vấp, IT CNTT, Web Developer Vietnam",
    image = "https://www.nguyenhiep.dev/og-image.jpg",
    type = "website",
    author = "Nguyễn Hiệp"
}) => {
    const location = useLocation();
    const canonicalUrl = `https://www.nguyenhiep.dev${location.pathname}`;

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content={author} />
            <meta name="theme-color" content="#10b981" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
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
