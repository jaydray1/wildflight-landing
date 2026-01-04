# Medusa.js Setup Guide

This guide explains how to set up Medusa.js integration for your Next.js app.

**Important:** Medusa runs as a **separate backend service**. This Next.js app connects to it via API.

## Prerequisites

1. A Medusa backend server running (separate from this Next.js app)
2. Medusa Storefront API enabled

## Quick Start

### 1. Set Up Your Medusa Backend (Separate Project)

Create and run Medusa in a separate directory/project:

```bash
# Create Medusa backend in a separate directory
npx create-medusa-app@latest ../wildflight-medusa-backend
cd ../wildflight-medusa-backend
npm run dev
```

This will start Medusa on `http://localhost:9000` by default.

### 2. Configure Environment Variables

Create or update your `.env.local` file in the root of your Next.js project:

```bash
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
```

For production:
```bash
NEXT_PUBLIC_MEDUSA_BACKEND_URL=https://your-medusa-instance.com
```

### 3. Test the Connection

1. Start your Next.js dev server:
   ```bash
   npm run dev
   ```

2. Visit: `http://localhost:3000/api/medusa/test`
   - Should return success message if connection works

3. Test products endpoint:
   - `http://localhost:3000/api/medusa/products`

## Setting Up Products in Medusa

### Create Products via Admin

1. Start your Medusa backend
2. Go to admin: `http://localhost:9000/app`
3. Login with your admin credentials
4. Navigate to **Products** → **Create Product**
5. Fill in product details

### Using Metadata for Coffee-Specific Fields

Medusa uses `metadata` to store custom fields. When creating/updating products in Medusa, add these metadata fields:

**Required metadata fields:**
- `profile`: `"bright"`, `"balanced"`, `"bold"`, `"light"`, or `"dark"`
- `varietal`: Coffee varietal name (e.g., "Ethiopian Yirgacheffe")
- `process`: Processing method (e.g., "Washed", "Natural")
- `elevation`: Elevation in MASL (e.g., "1800")
- `origin`: Country/region of origin
- `utilityNote`: One sentence on why this bean works for adventure

**Optional metadata fields:**
- `status`: `"fresh-drop"`, `"low-inventory"`, `"roasting-tuesday"`, or `"in-stock"`
- `bestFor`: JSON array like `["drip", "espresso"]` or comma-separated string
- `tastingNotes`: JSON array with 3 tasting notes

### Product Variants

Create variants for different sizes (12oz, 2lb):

1. In product edit page, go to **Variants**
2. Add variant with title like "12oz" or "2lb"
3. Set price for each variant
4. Add SKU (e.g., `coffee-slug-12oz`)
5. Optionally add variant metadata:
   - `size`: `"12oz"` or `"2lb"`

### Product Images

Upload images in the **Media** section of the product. The helper function will use the first image as the primary product image.

### Tags

Use tags for additional categorization:
- `bright`, `balanced`, `bold`, `light`, `dark` (for profile fallback)
- `drip`, `espresso`, `milk`, `immersion` (for best-for methods)
- `fresh drop`, `low inventory`, `roasting` (for status fallback)

## API Routes Available

### Products
- `GET /api/medusa/products` - Get all products
  - Query params: `?limit=50&offset=0&collection_id=xxx&region_id=xxx&currency_code=usd`
- `GET /api/medusa/product/[handle]` - Get a single product by handle or ID

### Test
- `GET /api/medusa/test` - Test connection to Medusa backend

## Using Medusa Data in Your Components

### Fetch Products

```typescript
import { getProducts } from '@/lib/medusa';
import { medusaProductToCoffee } from '@/lib/medusa-helpers';

// In your page component
const productsData = await getProducts({ limit: 50 });
const coffees = productsData.products.map(product => 
  medusaProductToCoffee(product, 'usd')
);
```

### Fetch Single Product

```typescript
import { getProduct } from '@/lib/medusa';
import { medusaProductToCoffee } from '@/lib/medusa-helpers';

const productData = await getProduct('coffee-slug');
const coffee = medusaProductToCoffee(productData.product, 'usd');
```

## Cart Functionality

The client includes cart functions, but you'll need to implement cart state management:

```typescript
import { createCart, addToCart } from '@/lib/medusa';

// Create a new cart
const { cart } = await createCart(regionId, [
  { variant_id: 'variant-id', quantity: 1 }
]);

// Add item to existing cart
const { cart: updatedCart } = await addToCart(cartId, variantId, 2);
```

## Regions and Currencies

Medusa supports multi-region/currency. To get available regions:

```typescript
import { getRegions } from '@/lib/medusa';

const { regions } = await getRegions();
// Use region_id and currency_code when fetching products
```

## CORS Configuration

If your Medusa backend is on a different domain, configure CORS:

In your Medusa backend `medusa-config.js`:

```javascript
module.exports = {
  projectConfig: {
    store_cors: "http://localhost:3000", // Your Next.js URL
    // ...
  },
};
```

## Production Deployment

1. Deploy your Medusa backend (Heroku, AWS, DigitalOcean, etc.)
2. Update `NEXT_PUBLIC_MEDUSA_BACKEND_URL` to production URL
3. Ensure CORS is configured for your production domain
4. Set up environment variables in your hosting platform

## Troubleshooting

**Error: "Medusa backend URL not configured"**
- Check that `.env.local` has `NEXT_PUBLIC_MEDUSA_BACKEND_URL`
- Restart your dev server after adding environment variables

**Error: "Failed to connect to Medusa"**
- Verify Medusa backend is running
- Check the URL is correct (no trailing slash)
- For local development, ensure it's `http://localhost:9000` (default Medusa port)

**Error: "CORS policy"**
- Configure CORS in your Medusa backend
- Add your Next.js domain to `store_cors` in `medusa-config.js`

**Products not showing metadata:**
- Metadata must be added via Medusa Admin or API
- Check that metadata keys match exactly (case-sensitive)

## Next Steps

1. Set up your Medusa backend
2. Add environment variable
3. Test the connection
4. Create some products in Medusa Admin
5. Update your shop page to fetch from Medusa
6. Implement cart functionality

