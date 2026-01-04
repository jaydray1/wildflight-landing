import { NextResponse } from 'next/server';
import { validateMedusaConfig, getProducts } from '@/lib/medusa';

/**
 * Test endpoint to verify Medusa Storefront API connection
 * Visit: http://localhost:3000/api/medusa/test
 */
export async function GET() {
  try {
    // First, validate configuration
    const config = validateMedusaConfig();
    
    if (!config.valid) {
      return NextResponse.json(
        {
          success: false,
          message: 'Configuration errors',
          errors: config.errors,
          help: 'Make sure your .env.local has: NEXT_PUBLIC_MEDUSA_BACKEND_URL',
        },
        { status: 400 }
      );
    }

    // Try to fetch products
    const products = await getProducts({ limit: 1 });

    return NextResponse.json({
      success: true,
      message: 'Medusa Storefront API connection successful!',
      productCount: products.count,
      sampleProduct: products.products[0] ? {
        title: products.products[0].title,
        handle: products.products[0].handle || products.products[0].id,
        status: products.products[0].status,
      } : null,
    });
  } catch (error: any) {
    console.error('Medusa test error:', error);
    
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to connect to Medusa',
        error: error.message,
        troubleshooting: [
          'Verify your Medusa backend is running',
          'Check that NEXT_PUBLIC_MEDUSA_BACKEND_URL is correct (e.g., http://localhost:9000)',
          'Ensure the Medusa backend has storefront API enabled',
          'Check CORS settings if backend is on a different domain',
        ],
      },
      { status: 500 }
    );
  }
}


