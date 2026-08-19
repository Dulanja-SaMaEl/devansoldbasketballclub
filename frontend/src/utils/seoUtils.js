/**
 * SEO Utilities and Schema Generators for Devans Old Basketball Club
 */

export const BASE_SITE_URL = 'https://olddevansbasketball.com';
export const DEFAULT_OG_IMAGE = 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80';

/**
 * Converts text into a clean, URL-safe slug
 */
export const slugify = (text) => {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
};

/**
 * Generates absolute canonical URL
 */
export const getCanonicalUrl = (path = '') => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${BASE_SITE_URL}${cleanPath === '/' ? '' : cleanPath}`;
};

/**
 * JSON-LD Organization Schema
 */
export const getOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'SportsTeam',
  'name': 'Devans Old Basketball Club',
  'alternateName': ['Devans Basketball', 'Devans Old Boys Basketball Association', 'Maliyadeva College Basketball'],
  'url': BASE_SITE_URL,
  'logo': `${BASE_SITE_URL}/favicon.svg`,
  'description': 'The living digital archive and alumni community of basketball at Maliyadeva College, Kurunegala, Sri Lanka.',
  'address': {
    '@type': 'PostalAddress',
    'streetAddress': 'Maliyadeva College',
    'addressLocality': 'Kurunegala',
    'addressRegion': 'North Western Province',
    'postalCode': '60000',
    'addressCountry': 'LK'
  },
  'location': {
    '@type': 'Place',
    'name': 'Maliyadeva College Basketball Courts',
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Kurunegala',
      'addressCountry': 'LK'
    }
  },
  'parentOrganization': {
    '@type': 'EducationalOrganization',
    'name': 'Maliyadeva College',
    'url': 'https://maliyadeva.sch.lk'
  },
  'sport': 'Basketball'
});

/**
 * JSON-LD WebSite Schema
 */
export const getWebSiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  'name': 'Devans Old Basketball Club',
  'alternateName': 'Devans Basketball Legacy',
  'url': BASE_SITE_URL,
  'potentialAction': {
    '@type': 'SearchAction',
    'target': `${BASE_SITE_URL}/legends?q={search_term_string}`,
    'query-input': 'required name=search_term_string'
  }
});

/**
 * JSON-LD BreadcrumbList Schema
 */
export const getBreadcrumbSchema = (items = []) => {
  const itemListElement = [
    {
      '@type': 'ListItem',
      'position': 1,
      'name': 'Home',
      'item': BASE_SITE_URL
    },
    ...items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 2,
      'name': item.name,
      'item': getCanonicalUrl(item.path)
    }))
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': itemListElement
  };
};

/**
 * JSON-LD Article Schema
 */
export const getArticleSchema = (article) => {
  if (!article) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    'headline': article.title,
    'description': article.excerpt || article.content?.slice(0, 160),
    'image': [article.cover_image_url || DEFAULT_OG_IMAGE],
    'datePublished': article.published_date || new Date().toISOString(),
    'dateModified': article.updated_at || article.published_date || new Date().toISOString(),
    'author': [{
      '@type': 'Person',
      'name': article.author || 'Devans Basketball Editorial'
    }],
    'publisher': {
      '@type': 'Organization',
      'name': 'Devans Old Basketball Club',
      'logo': {
        '@type': 'ImageObject',
        'url': `${BASE_SITE_URL}/favicon.svg`
      }
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': getCanonicalUrl(`/news/${slugify(article.title)}`)
    }
  };
};

/**
 * JSON-LD Person Schema (Legend / Player)
 */
export const getPersonSchema = (legend) => {
  if (!legend) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    'name': legend.name,
    'alternateName': legend.nickname,
    'jobTitle': legend.role,
    'description': legend.bio,
    'image': legend.profile_image_url || DEFAULT_OG_IMAGE,
    'affiliation': {
      '@type': 'SportsTeam',
      'name': 'Devans Old Basketball Club (Maliyadeva College)'
    }
  };
};

/**
 * JSON-LD Event Schema
 */
export const getEventSchema = (event) => {
  if (!event) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    'name': event.title,
    'description': event.description,
    'startDate': event.date ? `${event.date}T09:00:00+05:30` : new Date().toISOString(),
    'location': {
      '@type': 'Place',
      'name': event.location || 'Maliyadeva College Basketball Court',
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Kurunegala',
        'addressCountry': 'LK'
      }
    },
    'image': [event.cover_image_url || DEFAULT_OG_IMAGE],
    'organizer': {
      '@type': 'Organization',
      'name': 'Devans Old Basketball Club',
      'url': BASE_SITE_URL
    }
  };
};
