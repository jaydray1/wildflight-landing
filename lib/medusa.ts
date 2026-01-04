/**
 * Medusa Storefront API Client
 * 
 * Environment variables required:
 * - NEXT_PUBLIC_MEDUSA_BACKEND_URL (e.g., 'http://localhost:9000' or 'https://your-medusa-instance.com')
 * 
 * For production, you may also need:
 * - MEDUSA_STOREFRONT_TOKEN (if using authenticated storefront API)
 */

const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || process.env.MEDUSA_BACKEND_URL;
const storefrontToken = process.env.MEDUSA_STOREFRONT_TOKEN;

if (!backendUrl) {
  console.warn(
    'Medusa backend URL not found. Set NEXT_PUBLIC_MEDUSA_BACKEND_URL in .env.local'
  );
}

// Medusa Storefront API endpoint
const storefrontUrl = backendUrl
  ? `${backendUrl}/store`
  : null;

export interface MedusaImage {
  id: string;
  url: string;
  metadata?: Record<string, any>;
}

export interface MedusaMoney {
  amount: number;
  currency_code: string;
}

export interface MedusaProductVariant {
  id: string;
  title: string;
  sku?: string;
  prices: Array<{
    id: string;
    amount: number;
    currency_code: string;
    region_id?: string;
  }>;
  inventory_quantity?: number;
  manage_inventory?: boolean;
  metadata?: Record<string, any>;
  product?: MedusaProduct;
  options?: Array<{
    option_id: string;
    value: string;
  }>;
}

export interface MedusaProduct {
  id: string;
  title: string;
  handle?: string;
  subtitle?: string;
  description?: string;
  is_giftcard: boolean;
  status: 'draft' | 'proposed' | 'published' | 'rejected';
  images: MedusaImage[];
  options: Array<{
    id: string;
    title: string;
    values: Array<{
      id: string;
      value: string;
    }>;
  }>;
  variants: MedusaProductVariant[];
  tags?: Array<{
    id: string;
    value: string;
  }>;
  collection?: {
    id: string;
    title: string;
    handle: string;
  };
  collection_id?: string;
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface MedusaProductsResponse {
  products: MedusaProduct[];
  count: number;
  offset: number;
  limit: number;
}

export interface MedusaProductResponse {
  product: MedusaProduct;
}

export interface MedusaRegion {
  id: string;
  name: string;
  currency_code: string;
  countries: Array<{
    id: string;
    iso_2: string;
    iso_3: string;
    num_code: string;
    name: string;
    display_name: string;
  }>;
}

export interface MedusaCart {
  id: string;
  region_id: string;
  customer_id?: string;
  email?: string;
  items: Array<{
    id: string;
    variant_id: string;
    quantity: number;
    unit_price: number;
    variant: MedusaProductVariant;
  }>;
  total: number;
  subtotal: number;
  shipping_total: number;
  tax_total: number;
  currency_code: string;
  created_at: string;
  updated_at: string;
}

/**
 * Fetch helper for Medusa Storefront API
 */
async function medusaFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  if (!storefrontUrl) {
    throw new Error(
      'Medusa backend URL not configured. Please set NEXT_PUBLIC_MEDUSA_BACKEND_URL in .env.local'
    );
  }

  const url = `${storefrontUrl}${endpoint}`;
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Add storefront token if available (for authenticated requests)
  if (storefrontToken) {
    headers['Authorization'] = `Bearer ${storefrontToken}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(
        `Medusa API Error (${response.status}): ${error.message || response.statusText}`
      );
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error('Medusa API Error:', error);
    throw error;
  }
}

/**
 * Get all products
 */
export async function getProducts(params?: {
  limit?: number;
  offset?: number;
  collection_id?: string;
  region_id?: string;
  currency_code?: string;
}): Promise<MedusaProductsResponse> {
  const queryParams = new URLSearchParams();
  
  if (params?.limit) queryParams.append('limit', params.limit.toString());
  if (params?.offset) queryParams.append('offset', params.offset.toString());
  if (params?.collection_id) queryParams.append('collection_id', params.collection_id);
  if (params?.region_id) queryParams.append('region_id', params.region_id);
  if (params?.currency_code) queryParams.append('currency_code', params.currency_code);

  const query = queryParams.toString();
  const endpoint = `/products${query ? `?${query}` : ''}`;

  return medusaFetch<MedusaProductsResponse>(endpoint);
}

/**
 * Get a single product by handle or ID
 */
export async function getProduct(handleOrId: string): Promise<MedusaProductResponse> {
  const endpoint = `/products/${handleOrId}`;
  return medusaFetch<MedusaProductResponse>(endpoint);
}

/**
 * Search products
 */
export async function searchProducts(query: string, params?: {
  limit?: number;
  offset?: number;
  collection_id?: string;
}): Promise<MedusaProductsResponse> {
  const queryParams = new URLSearchParams({ q: query });
  
  if (params?.limit) queryParams.append('limit', params.limit.toString());
  if (params?.offset) queryParams.append('offset', params.offset.toString());
  if (params?.collection_id) queryParams.append('collection_id', params.collection_id);

  const endpoint = `/products?${queryParams.toString()}`;
  return medusaFetch<MedusaProductsResponse>(endpoint);
}

/**
 * Get regions (for currency/region selection)
 */
export async function getRegions(): Promise<{ regions: MedusaRegion[] }> {
  return medusaFetch<{ regions: MedusaRegion[] }>('/regions');
}

/**
 * Create a cart
 */
export async function createCart(regionId: string, items?: Array<{
  variant_id: string;
  quantity: number;
}>): Promise<{ cart: MedusaCart }> {
  return medusaFetch<{ cart: MedusaCart }>('/carts', {
    method: 'POST',
    body: JSON.stringify({
      region_id: regionId,
      items,
    }),
  });
}

/**
 * Add item to cart
 */
export async function addToCart(cartId: string, variantId: string, quantity: number): Promise<{ cart: MedusaCart }> {
  return medusaFetch<{ cart: MedusaCart }>(`/carts/${cartId}/line-items`, {
    method: 'POST',
    body: JSON.stringify({
      variant_id: variantId,
      quantity,
    }),
  });
}

/**
 * Get cart
 */
export async function getCart(cartId: string): Promise<{ cart: MedusaCart }> {
  return medusaFetch<{ cart: MedusaCart }>(`/carts/${cartId}`);
}

/**
 * Validate configuration
 */
export function validateMedusaConfig(): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!backendUrl || backendUrl === 'http://localhost:9000') {
    errors.push('NEXT_PUBLIC_MEDUSA_BACKEND_URL is not set or is still the default placeholder');
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
}

