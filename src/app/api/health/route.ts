import { NextResponse } from 'next/server';
import type { HealthResponse } from '@/types';

export async function GET(): Promise<NextResponse<HealthResponse>> {
  try {
    const response: HealthResponse = {
      status: 'ok'
    };
    
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Health check failed:', error);
    return NextResponse.json(
      { status: 'error' },
      { status: 500 }
    );
  }
}