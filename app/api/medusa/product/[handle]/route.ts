import { NextResponse } from 'next/server';
import { getProduct } from '@/lib/medusa';

export async function GET(
  request: Request,
  { params }: { params: { handle: string } }
) {
  try {
    const product = await getProduct(params.handle);

    if (!product?.product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error: any) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product', message: error.message },
      { status: 500 }
    );
  }
}


