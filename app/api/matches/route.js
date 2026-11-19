import { NextResponse, connection } from 'next/server';
import { readDb } from '@/lib/db';

export async function GET() {
  await connection();
  const db = readDb();
  const matches = db.matches
    .map(m => ({ ...db.profiles.find(p => p.id === m.profileId), matchedAt: m.matchedAt }))
    .sort((a, b) => b.matchedAt - a.matchedAt);
  return NextResponse.json({ matches });
}