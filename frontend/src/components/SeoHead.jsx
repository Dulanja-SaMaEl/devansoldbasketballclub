import React, { useEffect } from 'react';
import { BASE_SITE_URL, DEFAULT_OG_IMAGE, getCanonicalUrl } from '../utils/seoUtils';

/**
 * Dynamic Head & Meta Manager component for Single Page Application SEO.
 * Updates DOM title, meta tags, canonical link, Open Graph, Twitter cards, and JSON-LD structured data.
 */
export default function SeoHead({
  title = 'Devans Old Basketball Club | Maliyadeva College, Kurunegala',
  description = 'Official living archive of Devans Old Basketball Club at Maliyadeva College, Kurunegala, Sri Lanka. Explore team history, championships, legends, photos, stories, and generations.',
  canonicalPath = '',
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  noindex = false,
  jsonLd = null
}) {
  useEffect(() => {
    // 1. Update Document Title
    const fullTitle = title.includes('Devans') 
      ? title 
      : `${title} | Devans Old Basketball Club`;
    document.title = fullTitle;

    // Helper to update or create meta tag
    const updateMetaTag = (selector, attrName, attrValue, content) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content || '');
    };

    // Helper to update or create link tag
    const updateLinkTag = (rel, href) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // 2. Standard Meta Tags
    updateMetaTag('meta[name="description"]', 'name', 'description', description);
    updateMetaTag(
      'meta[name="robots"]', 
      'name', 
      'robots', 
      noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    );

    // 3. Canonical Link Tag
    const canonicalUrl = getCanonicalUrl(canonicalPath);
    updateLinkTag('canonical', canonicalUrl);

    // 4. Open Graph Meta Tags
    updateMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', 'Devans Old Basketball Club');
    updateMetaTag('meta[property="og:title"]', 'property', 'og:title', fullTitle);
    updateMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
    updateMetaTag('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    updateMetaTag('meta[property="og:type"]', 'property', 'og:type', ogType);
    updateMetaTag('meta[property="og:image"]', 'property', 'og:image', ogImage);

    // 5. Twitter Card Meta Tags
    updateMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    updateMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle);
    updateMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    updateMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);

    // 6. JSON-LD Structured Data Ingestion
    let scriptTag = document.querySelector('script[id="json-ld-seo"]');
    if (jsonLd) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.setAttribute('id', 'json-ld-seo');
        scriptTag.setAttribute('type', 'application/ld+json');
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(jsonLd);
    } else if (scriptTag) {
      scriptTag.remove();
    }

  }, [title, description, canonicalPath, ogImage, ogType, noindex, jsonLd]);

  return null;
}
