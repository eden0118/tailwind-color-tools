import { useEffect } from 'react';

/**
 * SEO Hook for managing meta tags dynamically
 * @param config - SEO configuration object
 */
interface SEOConfig {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
}

export const useSEO = (config: SEOConfig = {}) => {
  const {
    title = 'Tailwind Color Converter | Hex, RGB, OKLCH to Class',
    description = 'Free online Tailwind CSS color converter. Convert Hex, RGB, OKLCH to Tailwind classes and find the closest matching colors.',
    canonical = 'https://tailwind-color-tools.example.com',
    ogImage = 'https://tailwind-color-tools.example.com/og-image.png',
    ogType = 'website',
    twitterCard = 'summary_large_image',
  } = config;

  useEffect(() => {
    // Update title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property = false) => {
      let tag = document.querySelector(
        property ? `meta[property="${name}"]` : `meta[name="${name}"]`
      ) as HTMLMetaElement | null;

      if (!tag) {
        tag = document.createElement('meta');
        property ? tag.setAttribute('property', name) : tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.content = content;
    };

    // Update og:title (property-based)
    updateMetaTag('og:title', title, true);
    updateMetaTag('description', description);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', ogImage, true);
    updateMetaTag('og:type', ogType, true);
    updateMetaTag('twitter:card', twitterCard, true);
    updateMetaTag('twitter:title', title, true);
    updateMetaTag('twitter:description', description, true);
    updateMetaTag('twitter:image', ogImage, true);

    // Update canonical link
    let canonicalTag = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.rel = 'canonical';
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.href = canonical;
  }, [title, description, canonical, ogImage, ogType, twitterCard]);
};
