import { deleteAllProducts } from '@/lib/actions/dev';
import { NextResponse } from 'next/server';

export async function GET() {
  // Add a check to ensure this can only be run in development
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'This endpoint is only available in development.' }, { status: 403 });
  }

  const result = await deleteAllProducts();

  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json({ message: result.message });
}
