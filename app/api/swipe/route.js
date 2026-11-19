import { NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/db';


export async function POST(req) {
  const { profileId, action } = await req.json();

  if (!['like', 'pass'].includes(action)) {
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  }

  const db = readDb();
  const profile = db.profiles.find(p => p.id === profileId);
  if (!profile) {
    return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
  }
  if (db.swipes.some(s => s.profileId === profileId)) {
    return NextResponse.json({ error: 'Already swiped', match: false }, { status: 409 });
  }

  db.swipes.push({ profileId, action, at: Date.now() });

  let match = false;
  if (action === 'like' && db.likedMe.includes(profileId)) {
    match = true;
    db.matches.push({ profileId, matchedAt: Date.now() });
  }

  writeDb(db);
  return NextResponse.json({ match, profile: match ? profile : undefined });
}