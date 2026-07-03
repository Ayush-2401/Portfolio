import { NextResponse } from 'next/server';
import { getGithubStats } from '@/lib/github';

export async function GET() {
  const stats = await getGithubStats();
  return NextResponse.json(stats);
}
