# 🔧 Refactoring Action Plan - New Pages

## Priority: HIGH - Do This Next

---

## **Phase 1: Component Extraction (1 hour)**

### 1.1 Create Missing Building Blocks

**File: `src/components/property/PropertyCardFull.tsx`**
```typescript
import React from 'react';

interface PropertyCardFullProps {
  property: any;
  onClick?: () => void;
  saved?: boolean;
  onToggleSave?: () => void;
}

export const PropertyCardFull: React.FC<PropertyCardFullProps> = ({
  property,
  onClick,
  saved = false,
  onToggleSave
}) => (
  <div
    className="property-card-full"
    onClick={onClick}
  >
    {/* Card content extracted from SearchListingsPage */}
  </div>
);

PropertyCardFull.displayName = 'PropertyCardFull';
```

**File: `src/components/property/PropertyCardList.tsx`**
```typescript
// Similar structure, different layout (horizontal)
```

**File: `src/components/property/PropertyCardMini.tsx`**
```typescript
// For map view pins
```

**File: `src/components/booking/BookingRow.tsx`**
```typescript
interface BookingRowProps {
  booking: any;
}

export const BookingRow: React.FC<BookingRowProps> = ({ booking }) => (
  // Card showing booking details
);
```

**File: `src/components/common/FilterSection.tsx`**
```typescript
interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
}

export const FilterSection: React.FC<FilterSectionProps> = ({ title, children }) => (
  // Collapsible filter section
);
```

**File: `src/components/common/EmptyState.tsx`**
```typescript
interface EmptyStateProps {
  icon?: string;
  title?: string;
  message?: string;
  onReset?: () => void;
  action?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ ... }) => (
  // Empty state message with optional action
);
```

### 1.2 Update `src/components/index.ts`

Add exports for new components:
```typescript
export { PropertyCardFull } from './property/PropertyCardFull';
export { PropertyCardList } from './property/PropertyCardList';
export { PropertyCardMini } from './property/PropertyCardMini';
export { BookingRow } from './booking/BookingRow';
export { FilterSection } from './common/FilterSection';
export { EmptyState } from './common/EmptyState';
```

---

## **Phase 2: Data Centralization (30 min)**

### 2.1 Create Mock Data File

**File: `src/services/mockData.ts`**

Move all MOCK_* data here:

```typescript
/* Mock agent data */
export const MOCK_AGENT = { ... };
export const AGENT_LISTINGS = [ ... ];
export const REVIEWS = [ ... ];

/* Mock property data */
export const MOCK_PROPERTY = { ... };
export const MOCK_PROPERTIES = [ ... ];

/* Mock user data */
export const MOCK_USER = { ... };
export const SAVED_PROPERTIES = [ ... ];
export const BOOKINGS = [ ... ];
export const RECENTLY_VIEWED = [ ... ];

/* Mock constants */
export const LOCALITIES = [ ... ];
export const TYPES = [ ... ];
export const BHK = [ ... ];
export const SORT_OPTS = [ ... ];
```

### 2.2 Update Page Files

Remove all MOCK_* definitions and import instead:

```typescript
import {
  MOCK_AGENT,
  AGENT_LISTINGS,
  MOCK_PROPERTY,
  MOCK_PROPERTIES,
  MOCK_USER,
  // ... etc
} from '@/services/mockData';
```

---

## **Phase 3: TypeScript Conversion (45 min)**

### 3.1 Rename Files
```bash
mv src/pages/AgentProfilePage.jsx src/pages/AgentProfilePage.tsx
mv src/pages/PropertyDetailPage.jsx src/pages/PropertyDetailPage.tsx
mv src/pages/SearchListingsPage.jsx src/pages/SearchListingsPage.tsx
mv src/pages/UserDashboardPage.jsx src/pages/UserDashboardPage.tsx
```

### 3.2 Add Type Definitions

**File: `src/types/index.ts`**

Add these types:

```typescript
/* Agent Types */
export interface Agent {
  id: string;
  name: string;
  role: string;
  avatar: string;
  email: string;
  phone: string;
  location: string;
  verified: boolean;
  rating: number;
  reviewCount: number;
  [key: string]: any;
}

export interface AgentListing {
  id: number;
  title: string;
  priceLabel: string;
  image: string;
  [key: string]: any;
}

/* Property Types */
export interface Property {
  id: number;
  title: string;
  priceLabel: string;
  price: number;
  location: string;
  beds: number;
  baths: number;
  sqft: number;
  status: 'Ready to Move' | 'Under Construction';
  images: string[];
  [key: string]: any;
}

/* User Types */
export interface User {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  verified: boolean;
  plan: 'free' | 'premium';
  [key: string]: any;
}

export interface Booking {
  id: string;
  property: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  date: string;
  time: string;
  [key: string]: any;
}

/* Search/Filter Types */
export interface SearchFilters {
  locality: string;
  type: string;
  bhk: string;
  minPrice: number;
  maxPrice: number;
  minSqft: number;
  furnished: string[];
  status: string[];
  premiumOnly: boolean;
  has3D: boolean;
  sortBy: string;
}
```

### 3.3 Update Component Signatures

Example for AgentProfilePage:

```typescript
import React, { useState, useEffect } from 'react';
import { Agent, AgentListing } from '@/types';

interface AgentProfilePageProps {
  agent?: Agent;
  listings?: AgentListing[];
  onSelectProperty?: (property: AgentListing) => void;
}

export const AgentProfilePage: React.FC<AgentProfilePageProps> = ({
  agent = MOCK_AGENT,
  listings = AGENT_LISTINGS,
  onSelectProperty
}) => {
  // Component logic
};

AgentProfilePage.displayName = 'AgentProfilePage';
```

---

## **Phase 4: Styling Refactor (1 hour)**

### 4.1 Create CSS File

**File: `src/styles/pages.css`**

```css
/* ── REUSABLE COMPONENTS ── */

.panel {
  background: white;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 24px;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.panel-title {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 700;
  color: var(--slate);
}

/* ── CARDS ── */

.property-card-full {
  background: white;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: all var(--transition);
  cursor: pointer;
}

.property-card-full:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-lg);
}

.property-card-list {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  background: white;
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 16px;
  transition: all var(--transition);
}

.property-card-list:hover {
  box-shadow: var(--shadow-md);
}

/* ── FILTERS ── */

.filter-section {
  border-bottom: 1px solid var(--border);
  padding: 14px 20px;
}

.filter-title {
  font-size: 12px;
  font-weight: 700;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.filter-options {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

/* ── TABS ── */

.tabs-container {
  display: flex;
  gap: 0;
  border-bottom: 2px solid var(--border);
  margin-bottom: 28px;
}

.tab-button {
  padding: 12px 24px;
  background: none;
  border: none;
  cursor: pointer;
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 500;
  color: var(--muted);
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
  transition: all var(--transition);
}

.tab-button.active {
  color: var(--slate);
  border-bottom-color: var(--gold);
}

/* ── BADGES ── */

.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  background: var(--cream);
  border: 1px solid var(--border);
  color: var(--slate);
}

.badge-gold {
  background: var(--gold-lt);
  color: var(--gold);
  border-color: #e8c97a;
}

.badge-new {
  background: #fefce8;
  color: #d97706;
  border-color: #fde68a;
}

/* ── EMPTY STATE ── */

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 24px;
  text-align: center;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.empty-text {
  font-size: 16px;
  color: var(--muted);
  margin-bottom: 20px;
}

/* ── RESPONSIVE ── */

@media (max-width: 768px) {
  .panel {
    padding: 16px;
  }

  .property-card-list {
    flex-direction: column;
  }

  .filter-section {
    padding: 12px 16px;
  }
}
```

### 4.2 Update Component Classes

Replace inline styles:

```typescript
// OLD
<div style={{ padding:"24px", background:"white", borderRadius:16 }}>
  
// NEW
<div className="panel">

// OLD
<button style={{ padding:"12px 24px", fontWeight:500, ... }}>
  
// NEW
<button className="tab-button active">
```

---

## **Phase 5: Feature Completion (2 hours)**

### 5.1 Implement Property Lightbox

Add to PropertyDetailPage:

```typescript
{lightbox && (
  <Lightbox
    images={property.images}
    activeIndex={activeImg}
    onClose={() => setLightbox(false)}
    onPrev={() => setActiveImg(i => (i - 1 + property.images.length) % property.images.length)}
    onNext={() => setActiveImg(i => (i + 1) % property.images.length)}
  />
)}
```

### 5.2 Complete Edit Profile Form

Add to UserDashboardPage:

```typescript
{editMode && (
  <div className="edit-form">
    <input
      value={form.name}
      onChange={e => setForm({ ...form, name: e.target.value })}
      placeholder="Full Name"
    />
    {/* Other form fields */}
    <button onClick={() => {
      setEditMode(false);
      showToast('✅ Profile updated!');
    }}>Save Changes</button>
  </div>
)}
```

### 5.3 Add Price Range Slider

Add to SearchListingsPage:

```typescript
<div style={{ marginBottom: 16 }}>
  <div style={{ fontSize: 12, marginBottom: 8 }}>
    Price: {priceStr(minPrice)} - {priceStr(maxPrice)}
  </div>
  <input
    type="range"
    min={0}
    max={30000000}
    value={minPrice}
    onChange={e => setMinPrice(Number(e.target.value))}
  />
  <input
    type="range"
    min={0}
    max={30000000}
    value={maxPrice}
    onChange={e => setMaxPrice(Number(e.target.value))}
  />
</div>
```

### 5.4 Add Booking Details Modal

Create `src/components/booking/BookingDetailsModal.tsx`:

```typescript
interface BookingDetailsModalProps {
  booking: Booking;
  onClose: () => void;
  onCancel?: (bookingId: string) => void;
}

export const BookingDetailsModal: React.FC<BookingDetailsModalProps> = ({
  booking,
  onClose,
  onCancel
}) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {/* Booking details */}
        {booking.status === 'pending' && (
          <button onClick={() => onCancel?.(booking.id)}>
            Cancel Booking
          </button>
        )}
      </div>
    </div>
  );
};
```

---

## **Phase 6: Form Validation (30 min)**

### 6.1 Add Validation Utilities

**File: `src/utils/validation.ts`**

```typescript
export const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const regex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
  return regex.test(phone);
};

export const validateContactForm = (form: any): string[] => {
  const errors: string[] = [];
  if (!form.name?.trim()) errors.push('Name is required');
  if (!form.phone?.trim()) errors.push('Phone is required');
  if (!validatePhone(form.phone)) errors.push('Invalid phone number');
  if (form.email && !validateEmail(form.email)) errors.push('Invalid email');
  return errors;
};
```

### 6.2 Use Validation in Forms

```typescript
const handleSubmit = () => {
  const errors = validateContactForm(contactForm);
  if (errors.length > 0) {
    showToast(`❌ ${errors[0]}`);
    return;
  }
  // Submit form
};
```

---

## 📊 **Refactoring Checklist**

- [ ] Phase 1: Extract components
- [ ] Phase 2: Centralize mock data
- [ ] Phase 3: Convert to TypeScript
- [ ] Phase 4: Refactor styles
- [ ] Phase 5: Complete features
- [ ] Phase 6: Add validation
- [ ] Test all pages
- [ ] Fix responsive issues
- [ ] Add accessibility
- [ ] Performance testing

---

## ⏱️ **Estimated Timeline**

| Phase | Time | Done |
|-------|------|------|
| 1: Components | 1h | |
| 2: Data | 30m | |
| 3: TypeScript | 45m | |
| 4: Styles | 1h | |
| 5: Features | 2h | |
| 6: Validation | 30m | |
| **Total** | **5.5 hours** | |

---

## 🚀 **Next Steps**

1. Start with Phase 1 (component extraction)
2. Complete one phase at a time
3. Test after each phase
4. Update imports/exports as you go
5. Fix any compilation errors immediately

**Good luck! 🎉**
