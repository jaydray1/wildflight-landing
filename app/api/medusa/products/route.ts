import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/medusa';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);
    const collectionId = searchParams.get('collection_id') || undefined;
    const regionId = searchParams.get('region_id') || undefined;
    const currencyCode = searchParams.get('currency_code') || undefined;

    const products = await getProducts({
      limit,
      offset,
      collection_id: collectionId,
      region_id: regionId,
      currency_code: currencyCode,
    });

    return NextResponse.json(products);
  } catch (error: any) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products', message: error.message },
      { status: 500 }
    );
  }
}


