import fs from 'fs';
import path from 'path';

const file = path.join(process.cwd(), 'data', 'db.json');

export function readDb() {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

export function writeDb(db) {
  fs.writeFileSync(file, JSON.stringify(db, null, 2));
}