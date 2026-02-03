import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description: string;
    image?: string;
    url?: string;
    keywords?: string;
}

const SEO = ({
    title,
    description,
    image = "/images/TECHNICAL EVENTS POSTER.png",
    url = "https://vyuga.net.in/",
    keywords
}: SEOProps) => {
    const siteTitle = "Vyuga 26 | National Level Technical Symposium";

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{title === "Vyuga 26" ? siteTitle : `${title} | Vyuga 26`}</title>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}
            <link rel="canonical" href={url} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:site_name" content="Vyuga 26" />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={image} />
        </Helmet>
    );
};

export default SEO;
