import { NextResponse, connection } from 'next/server';
import { readDb } from '@/lib/db';

export async function GET() {
  await connection();
  const db = readDb();
  const swiped = new Set(db.swipes.map(s => s.profileId));
  const profiles = db.profiles.filter(p => !swiped.has(p.id));
  // NOTE: likedMe is never sent to the client (core privacy promise)
  return NextResponse.json({ profiles });
}