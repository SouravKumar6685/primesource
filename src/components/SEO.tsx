import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
}

const SEO: React.FC<SEOProps> = ({
    title = 'Primesource - Strategic Technology Partner',
    description = 'Primesource is your strategic technology partner, specializing in AI/ML, Cloud, Data Engineering, Enterprise Systems, and bespoke Web Development solutions.',
    keywords = 'Technology Partner, AI, ML, Cloud Architecture, Data Engineering, Software Development, Primesource',
    image = '/og-image.jpg', // Fallback generic image URL
    url = 'https://primesource.com'
}) => {
    // Determine if suffix is needed
    const pageTitle = title === 'Primesource - Strategic Technology Partner'
        ? title
        : `${title} | Primesource`;

    return (
        <Helmet>
            {/* Standard Meta tags */}
            <title>{pageTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />

            {/* OpenGraph tags (Facebook, LinkedIn, etc.) */}
            <meta property="og:title" content={pageTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url} />
            <meta property="og:image" content={image} />

            {/* Twitter Card tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={pageTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
        </Helmet>
    );
};

export default SEO;
