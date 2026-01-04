/**
 * Helper functions to map Medusa products to your Coffee type structure
 */

import {
  MedusaProduct,
  MedusaProductVariant,
} from './medusa';
import { Coffee, Profile, CoffeeVariant, CoffeeStatus } from '../app/types/coffee';

/**
 * Get metadata value from Medusa product
 */
export function getMetadata(product: MedusaProduct, key: string): string | null {
  return product.metadata?.[key] || null;
}

/**
 * Get metadata value from Medusa variant
 */
export function getVariantMetadata(variant: MedusaProductVariant, key: string): string | null {
  return variant.metadata?.[key] || null;
}

/**
 * Get the price for a variant (returns price in smallest currency unit, e.g. cents)
 * Converts to dollars by dividing by 100
 */
export function getVariantPrice(variant: MedusaProductVariant, currencyCode: string = 'usd'): number {
  const price = variant.prices?.find(
    (p) => p.currency_code.toLowerCase() === currencyCode.toLowerCase()
  );
  
  if (!price) {
    // Fall back to first price if currency doesn't match
    const firstPrice = variant.prices?.[0];
    return firstPrice ? firstPrice.amount / 100 : 0;
  }
  
  // Medusa stores prices in smallest currency unit (cents), convert to dollars
  return price.amount / 100;
}

/**
 * Determine coffee profile from tags or metadata
 */
export function getProfile(product: MedusaProduct): Profile {
  // Check metadata first
  const profileMetadata = getMetadata(product, 'profile');
  if (profileMetadata) {
    const profile = profileMetadata.toLowerCase();
    if (['bright', 'balanced', 'bold', 'light', 'dark'].includes(profile)) {
      return profile as Profile;
    }
  }

  // Fall back to tags
  const tags = product.tags?.map((tag) => tag.value.toLowerCase()) || [];
  if (tags.includes('bright')) return 'bright';
  if (tags.includes('bold')) return 'bold';
  if (tags.includes('light')) return 'light';
  if (tags.includes('dark')) return 'dark';
  return 'balanced'; // default
}

/**
 * Determine coffee status from metadata, tags, or inventory
 */
export function getStatus(product: MedusaProduct, variant?: MedusaProductVariant): CoffeeStatus {
  // Check metadata
  const statusMetadata = getMetadata(product, 'status');
  if (statusMetadata) {
    const status = statusMetadata.toLowerCase().replace('_', '-');
    if (['fresh-drop', 'low-inventory', 'roasting-tuesday', 'in-stock'].includes(status)) {
      return status as CoffeeStatus;
    }
  }

  // Check tags
  const tags = product.tags?.map((tag) => tag.value.toLowerCase()) || [];
  if (tags.includes('fresh drop') || tags.includes('fresh')) return 'fresh-drop';
  if (tags.includes('low inventory') || tags.includes('low')) return 'low-inventory';
  if (tags.includes('roasting')) return 'roasting-tuesday';
  
  // Check inventory
  if (variant?.inventory_quantity !== undefined) {
    if (variant.inventory_quantity === 0) return 'low-inventory';
    if (variant.inventory_quantity < 10) return 'low-inventory';
  }

  // Check product status
  if (product.status === 'published') return 'fresh-drop';
  
  return 'in-stock'; // default
}

/**
 * Get best for brewing methods from metadata or tags
 */
export function getBestFor(product: MedusaProduct): string[] {
  const bestForMetadata = getMetadata(product, 'bestFor');
  if (bestForMetadata) {
    try {
      return JSON.parse(bestForMetadata);
    } catch {
      return bestForMetadata.split(',').map((s: string) => s.trim());
    }
  }

  // Fall back to tags
  const tags = product.tags?.map((tag) => tag.value.toLowerCase()) || [];
  const methods: string[] = [];
  
  if (tags.includes('drip') || tags.includes('pour over')) methods.push('drip');
  if (tags.includes('espresso')) methods.push('espresso');
  if (tags.includes('milk') || tags.includes('latte')) methods.push('milk');
  if (tags.includes('immersion')) methods.push('immersion');
  
  return methods.length > 0 ? methods : ['drip']; // default
}

/**
 * Extract tasting notes from metadata or description
 */
export function getTastingNotes(product: MedusaProduct): [string, string, string] {
  const tastingMetadata = getMetadata(product, 'tastingNotes');
  if (tastingMetadata) {
    try {
      const notes = JSON.parse(tastingMetadata);
      if (Array.isArray(notes) && notes.length >= 3) {
        return [notes[0], notes[1], notes[2]];
      }
    } catch {
      // If not JSON, try splitting
      const notes = tastingMetadata.split(',').map((s: string) => s.trim());
      if (notes.length >= 3) {
        return [notes[0], notes[1], notes[2]];
      }
    }
  }

  // Default fallback
  return ['Bright', 'Balanced', 'Clean'];
}

/**
 * Convert Medusa variant to Coffee variant
 */
export function medusaVariantToCoffeeVariant(
  variant: MedusaProductVariant,
  productHandle: string,
  currencyCode: string = 'usd'
): CoffeeVariant {
  // Determine size from variant title or metadata
  const variantTitle = variant.title?.toLowerCase() || '';
  const sizeMetadata = getVariantMetadata(variant, 'size');
  
  let size: '12oz' | '2lb' = '12oz';
  
  if (sizeMetadata) {
    size = sizeMetadata.toLowerCase().includes('2') ? '2lb' : '12oz';
  } else if (
    variantTitle.includes('2lb') ||
    variantTitle.includes('2 lb') ||
    variantTitle.includes('32oz') ||
    variantTitle.includes('32 oz')
  ) {
    size = '2lb';
  }

  const price = getVariantPrice(variant, currencyCode);
  const sku = variant.sku || `${productHandle}-${size}`;

  return {
    size,
    price,
    sku,
  };
}

/**
 * Convert Medusa product to Coffee type
 */
export function medusaProductToCoffee(
  product: MedusaProduct,
  currencyCode: string = 'usd'
): Coffee {
  const profile = getProfile(product);
  const bestFor = getBestFor(product);
  const tasting = getTastingNotes(product);

  // Get primary variant for status check
  const primaryVariant = product.variants?.[0];
  const status = getStatus(product, primaryVariant);

  // Extract technical specs from metadata
  const varietal = getMetadata(product, 'varietal') || 'Unknown';
  const elevation = getMetadata(product, 'elevation') || '';
  const process = getMetadata(product, 'process') || 'Unknown';
  const utilityNote = getMetadata(product, 'utilityNote') || '';
  const origin = getMetadata(product, 'origin') || '';

  // Convert variants - group by size
  const variantMap: Partial<Record<'12oz' | '2lb', CoffeeVariant>> = {};
  
  product.variants?.forEach((variant) => {
    const coffeeVariant = medusaVariantToCoffeeVariant(variant, product.handle || product.id, currencyCode);
    variantMap[coffeeVariant.size] = coffeeVariant;
  });

  // Ensure we have at least default variants if none exist
  if (!variantMap['12oz'] && product.variants?.[0]) {
    variantMap['12oz'] = medusaVariantToCoffeeVariant(
      product.variants[0],
      product.handle || product.id,
      currencyCode
    );
  }

  // If no 2lb variant, create a placeholder or use the 12oz variant data
  if (!variantMap['2lb'] && variantMap['12oz']) {
    variantMap['2lb'] = {
      ...variantMap['12oz'],
      size: '2lb',
      sku: `${product.handle || product.id}-2lb`,
      // Typically 2lb is slightly cheaper per oz, adjust as needed
      price: variantMap['12oz'].price * 2.5, // Example: 2lb = 2.5x 12oz price
    };
  }

  // Ensure we have both variants for the Coffee type structure
  const variants: Record<'12oz' | '2lb', CoffeeVariant> = {
    '12oz': variantMap['12oz'] || {
      size: '12oz',
      price: 0,
      sku: `${product.handle || product.id}-12oz`,
    },
    '2lb': variantMap['2lb'] || {
      size: '2lb',
      price: 0,
      sku: `${product.handle || product.id}-2lb`,
    },
  };

  // Get images
  const images = product.images?.map((img) => img.url) || [];

  return {
    name: product.title,
    slug: product.handle || product.id.toLowerCase().replace(/\s+/g, '-'),
    profile,
    bestFor: bestFor as any,
    tasting,
    story: product.description || product.subtitle || '',
    origin,
    process,
    elevation,
    images,
    variants,
    status,
    specs: {
      varietal,
      elevationMASL: elevation ? parseInt(elevation) : 0,
      process,
    },
    utilityNote,
  };
}

