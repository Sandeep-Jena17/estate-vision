# SEO Integration Guide for EstateVision

## Overview
This guide explains how to implement SEO for the EstateVision real estate platform to ensure property listings rank high in search engines.

## 1. Base Meta Tags (Already Implemented)
**File**: `public/index.html`

The following SEO fundamentals are already in place:
- ✅ Meta charset (UTF-8)
- ✅ Viewport meta tag (mobile responsive)
- ✅ Meta description (155-160 characters)
- ✅ Keywords meta tag
- ✅ Open Graph tags (Facebook sharing)
- ✅ Twitter Card tags
- ✅ Canonical URL
- ✅ Theme color and mobile web app tags

---

## 2. Using the SEO Hook

### Basic Usage
```typescript
import { useSEO } from '../hooks';

export default function HomePage() {
  useSEO({
    title: 'Find Your Perfect Property',
    description: 'Browse thousands of premium real estate listings. Find houses, apartments, and commercial properties with EstateVision.',
    keywords: 'property listings, real estate, houses for sale, apartments for rent, estate marketplace',
    type: 'website'
  });

  return <div>Your component content</div>;
}
```

### For Property Details Page
```typescript
import { useSEO, getPropertySchema } from '../hooks';

export default function PropertyDetailsPage() {
  const property = {
    id: '123',
    title: '3 Bedroom Modern House in Downtown',
    description: 'Beautiful modern house with stunning views',
    price: 450000,
    bedrooms: 3,
    bathrooms: 2,
    area: 2500,
    images: [imageUrl],
    address: 'Downtown, City, State'
  };

  useSEO({
    title: property.title,
    description: `${property.bedrooms}BR, ${property.bathrooms}BA • $${property.price.toLocaleString()} • ${property.area} sqft`,
    keywords: `buy property, real estate, ${property.address}, apartment, house sale`,
    image: property.images?.[0],
    url: `https://estatevision.com/property/${property.id}`,
    type: 'product',
    structuredData: getPropertySchema(property)
  });

  return <div>Property details content</div>;
}
```

---

## 3. Structured Data (Schema.org)

The platform includes JSON-LD structured data helpers:

### Organization Schema
Automatically included in `index.html` - identifies EstateVision as a real estate agent.

### Property Schema
Used for individual property listings:
```typescript
{
  "@context": "https://schema.org",
  "@type": "RealEstateProperty",
  "name": "Property Title",
  "description": "Property description",
  "image": "image-url",
  "price": "450000",
  "priceCurrency": "USD",
  "numberOfBedrooms": 3,
  "numberOfBatrooms": 2,
  "floorSize": { "value": 2500, "unitCode": "SqFt" },
  "address": { "addressCountry": "US" },
  "offers": { "price": "450000", "priceCurrency": "USD" }
}
```

### BreadcrumbList Schema
For navigation hierarchy:
```typescript
import { getBreadcrumbSchema } from '../hooks';

const breadcrumbs = getBreadcrumbSchema([
  { name: 'Home', url: 'https://estatevision.com' },
  { name: 'Properties', url: 'https://estatevision.com/properties' },
  { name: 'Property Details', url: 'https://estatevision.com/property/123' }
]);
```

---

## 4. Page-Specific SEO Implementation

### HomePage
- **Keyword Focus**: "real estate marketplace", "buy sell rent property"
- **Meta**: Focus on features and unique value proposition
- **Structured Data**: GeneralOrganizationSchema

### ListingsPage
- **Keyword Focus**: "property listings", "houses for sale", "apartments to rent"
- **Meta**: Highlight filtering capabilities and property count
- **URL Structure**: `/listings?filter=...`

### PropertyDetailsPage
- **Keyword Focus**: Location, property type, price range
- **Meta**: Property-specific title with key details (beds, baths, price)
- **Structured Data**: PropertySchema with full details
- **Images**: Optimized images with proper alt text

### PropertiesPage
- **Keyword Focus**: "buy property", "find apartments", "real estate search"
- **Meta**: Emphasize search and filter functionality
- **Structured Data**: PropertySchema for each listing

### AgentsPage
- **Keyword Focus**: "real estate agents", "property experts"
- **Meta**: Agent credentials and service areas
- **Structured Data**: Person/Agent schema

### ProjectsPage
- **Keyword Focus**: "real estate projects", "development", "new construction"
- **Meta**: Project details and completion status
- **Structured Data**: Project-specific schema

---

## 5. SEO Best Practices for Property Listings

### Title Tags (50-60 characters)
```
❌ Bad:  "Property Listing #123"
✅ Good: "3BR House in Downtown - $450,000 | EstateVision"
```

### Meta Descriptions (155-160 characters)
```
❌ Bad:  "A nice property"
✅ Good: "Beautiful 3BR, 2BA house with 2500 sqft. Downtown location. Modern amenities. $450,000. View now!"
```

### Heading Hierarchy
```
H1: Property Title (only one per page)
H2: Section titles (Amenities, Details, etc.)
H3: Subsection content
```

### Image Optimization
- Use descriptive filenames: `downtown-3br-house.jpg`
- Add alt text: "3 bedroom house with garden in downtown"
- Compress images for faster loading
- Use WebP format when possible

### URL Structure
```
✅ Good:
/property/downtown-3br-house-123
/listings?type=residential&bedrooms=3&minPrice=100000&maxPrice=500000

❌ Bad:
/property/123
/listings
```

---

## 6. Content Optimization

### For Each Property Listing
1. **Unique Title** with key details (beds, baths, location)
2. **Rich Description** with:
   - Room-by-room details
   - Amenities and features
   - Neighborhood highlights
   - Listing date and agent info
3. **Multiple High-Quality Images**
4. **Price** clearly displayed
5. **Location** with address and Google Maps integration

### Keywords to Target
```
Primary: "real estate", "property listings", "buy property"
Location-based: "property in [city]", "[city] real estate"
Property-type: "apartment for sale", "house to rent", "commercial space"
Long-tail: "3 bedroom house with garden in downtown"
Price-range: "property under $500k", "luxury real estate"
```

---

## 7. Technical SEO

### Already Implemented ✅
- Mobile responsive design
- Fast page load times
- Clean URL structure
- Proper heading hierarchy
- XML sitemap ready
- Robots.txt configured
- HTTPS (deployment ready)

### Still To Do 🔄
- [ ] Generate XML Sitemap (`sitemap.xml`)
- [ ] Set up Google Search Console
- [ ] Implement breadcrumb navigation
- [ ] Add internal linking strategy
- [ ] Create robots.txt rules
- [ ] Set up 404 error handling

---

## 8. Implementation Checklist

### HomePage
- [ ] Add SEO hook with homepage keywords
- [ ] Include organization schema
- [ ] Optimize title and description

### ListingsPage
- [ ] Add dynamic SEO for filter states
- [ ] Include property type keywords
- [ ] Add pagination support

### PropertyDetailsPage
- [ ] Complete property schema implementation
- [ ] Add breadcrumb schema
- [ ] Optimize image alt text
- [ ] Location-based keywords

### PropertiesPage
- [ ] Filter-aware SEO
- [ ] Multiple property schemas
- [ ] Search functionality SEO

### AgentsPage
- [ ] Agent-specific schemas
- [ ] Contact information markup
- [ ] Ratings and reviews schema

### ProjectsPage
- [ ] Project-specific keywords
- [ ] Timeline and status schema
- [ ] Multi-image gallery optimization

---

## 9. Monitoring & Analytics

### Google Search Console
1. Verify site ownership
2. Submit sitemap
3. Monitor search queries
4. Fix crawl errors
5. Improve click-through rate

### Google Analytics
- Track organic traffic
- Monitor user behavior
- Identify top-performing pages
- Track conversion funnels

### SEO Tools to Use
- Semrush
- Ahrefs
- Moz
- SEMrush
- Yoast SEO (for WordPress, if needed)

---

## 10. Quick Start - Update PropertyDetailsPage

```typescript
import { useSEO, getPropertySchema } from '../hooks';

export default function PropertyDetailsPage() {
  // ... existing code ...

  // Get property from state/context
  const property = MOCK_PROPERTIES[0]; // Your actual data

  useSEO({
    title: `${property.bedrooms}BR ${property.address} - $${property.price}`,
    description: `Stunning ${property.bedrooms} bedroom property in ${property.address}. ${property.bathrooms} bathrooms, ${property.area} sqft. Perfect home!`,
    keywords: `property in ${property.address}, real estate, buy house, apartment`,
    image: property.images?.[0],
    url: `https://estatevision.com/property/${property.id}`,
    type: 'product',
    structuredData: getPropertySchema({
      id: property.id,
      title: property.title,
      description: property.description,
      price: property.price,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      area: property.area,
      images: property.images,
      address: property.address,
      type: property.type
    })
  });

  return (
    <div>
      {/* Your component content */}
    </div>
  );
}
```

---

## Next Steps

1. **Update each page** with appropriate `useSEO` hooks
2. **Generate XML Sitemap** for all property listings
3. **Submit to Google Search Console**
4. **Implement breadcrumb navigation** in UI
5. **Optimize images** with descriptive names and alt text
6. **Create robots.txt** with proper rules
7. **Monitor performance** in Google Search Console
8. **Test with Google Structured Data Testing Tool**

---

**Last Updated**: March 12, 2026
**Version**: 1.0
