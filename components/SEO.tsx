
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
    schema?: any;
}

const SEO: React.FC<SEOProps> = ({
    title = "Nguyễn Hiệp | Software Engineer | Full-stack Developer",
    description = "Nguyễn Hiệp - Software Engineer. Xây dựng giải pháp phần mềm tối ưu, website, app và ứng dụng quản lý hiện đại.",
    keywords = "Nguyễn Hiệp, nguyen hiep, nguyễn hiệp, nguyen hiep dev, nguyen thanh hiep, Software Engineer HCM, Front-end Developer ReactJS, Full-stack Developer Spring Boot, IT CNTT, Web Developer Vietnam",
    image = "https://nguyenhiep.dev/let-your-dreams-be-your-wings.png",
    type = "website",
    author = "Nguyễn Hiệp",
    schema
}) => {
    const location = useLocation();
    // Consolidate main portfolio sections to the root domain to avoid duplicate content penalties
    const isMainSection = ['/about', '/projects', '/skills', '/contact'].includes(location.pathname);
    const canonicalUrl = isMainSection ? 'https://nguyenhiep.dev/' : `https://nguyenhiep.dev${location.pathname === '/' ? '' : location.pathname}`;

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content={author} />
            <meta name="theme-color" content="#10b981" />
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

            {/* Structured Data */}
            {schema && (
                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            )}
        </Helmet>
    );
};

export default SEO;
