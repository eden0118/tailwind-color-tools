/**
 * SEO Configuration
 * Centralized SEO settings for the Tailwind Color Tools application
 */

export const SEO_CONFIG = {
  site: {
    name: 'Tailwind Color Converter',
    domain: 'https://tailwind-color-tools.example.com',
    description:
      'Free online Tailwind CSS color converter. Convert Hex, RGB, OKLCH to Tailwind classes and find the closest matching colors.',
    author: 'Tailwind Color Tools',
    twitterHandle: '@tailwindcss',
    locale: ['en', 'zh-TW'],
  },

  defaultImage: {
    url: 'https://tailwind-color-tools.example.com/og-image.png',
    width: 1200,
    height: 630,
    type: 'image/png',
    alt: 'Tailwind Color Converter - Free online color conversion tool',
  },

  pages: {
    home: {
      path: '/',
      title: 'Tailwind Color Converter | Hex, RGB, OKLCH to Class',
      description:
        'Free online Tailwind CSS color converter. Convert Hex, RGB, OKLCH to Tailwind classes and find the closest matching colors. Real-time synchronization and copy-paste ready.',
      keywords: [
        'tailwind css',
        'color converter',
        'hex to tailwind',
        'rgb to tailwind',
        'oklch to tailwind',
        'color picker',
        'developer tools',
      ],
      priority: '1.0',
      changefreq: 'weekly',
    },
    codeToClass: {
      path: '/code-to-class',
      title: 'Hex to Tailwind Class Convert | Tailwind Color Converter',
      description:
        'Convert Hex, RGB, and OKLCH color codes to Tailwind CSS classes. Find the closest matching Tailwind colors with real-time preview.',
      keywords: [
        'hex to tailwind',
        'color to tailwind class',
        'rgb to tailwind',
        'oklch converter',
      ],
      priority: '0.9',
      changefreq: 'weekly',
    },
    classToCode: {
      path: '/class-to-code',
      title: 'Tailwind Class to Hex Color | Tailwind Color Converter',
      description:
        'Reverse lookup Tailwind CSS color classes to get their hex, RGB, and OKLCH values. Explore Tailwind color palette with advanced search.',
      keywords: ['tailwind class', 'color to hex', 'tailwind palette', 'color lookup'],
      priority: '0.9',
      changefreq: 'weekly',
    },
  },

  robots: {
    index: true,
    follow: true,
    maxSnippet: -1,
    maxImagePreview: 'large',
    maxVideoPreview: -1,
  },

  vercelAnalytics: {
    enabled: true,
    endpoint: '/_vercel/insights/script.js',
  },

  webVitals: {
    enabled: true,
    trackingUrl: 'https://cdn.jsdelivr.net/npm/web-vitals@4',
  },
};

/**
 * Generate SEO meta tags for a specific page
 * @param pageKey - Key from SEO_CONFIG.pages
 * @returns SEO configuration object
 */
export const getPageSEO = (pageKey: keyof typeof SEO_CONFIG.pages) => {
  const page = SEO_CONFIG.pages[pageKey];
  const siteConfig = SEO_CONFIG.site;

  return {
    title: page.title,
    description: page.description,
    canonical: `${siteConfig.domain}${page.path}`,
    ogType: 'website',
    ogImage: SEO_CONFIG.defaultImage.url,
    twitterCard: 'summary_large_image',
    keywords: page.keywords,
    robots: `index, follow, max-snippet:${SEO_CONFIG.robots.maxSnippet}, max-image-preview:${SEO_CONFIG.robots.maxImagePreview}`,
  };
};
