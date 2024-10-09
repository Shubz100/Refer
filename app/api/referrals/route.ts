import { NextRequest, NextResponse } from 'next/server';
import { saveReferral, getReferrals, getReferrer } from '@/lib/storage';

export async function POST(request: NextRequest) {
  const { userId, referrerId } = await request.json();
  await saveReferral(userId, referrerId);
  return NextResponse.json({ success: true });
}

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get('userId');
  const referrals = await getReferrals(userId);
  const referrer = await getReferrer(userId);
  return NextResponse.json({ referrals, referrer });
}
