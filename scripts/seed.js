const fs = require('fs');

const names = ['Aanya','Riya','Kabir','Meera','Arjun','Isha','Rohan','Sneha','Vihaan','Diya','Aditya','Kavya','Ishaan','Anika','Dev','Tara','Yash','Naina','Rahul','Pooja','Karan','Simran','Neil','Aditi','Varun','Sara','Manav','Ritika','Samar','Zoya'];
const cities = ['Delhi University','Pune','IIT Bombay','Bengaluru','Lucknow','Christ University','Mumbai','Hyderabad','Jaipur','Chandigarh'];
const bios = [
  'Chai over coffee, always.',
  'Weekend trekker, weekday coder.',
  'Will beat you at Mario Kart.',
  'Looking for someone to share fries with.',
  'Bookworm with a playlist for everything.',
  'Part-time foodie, full-time dreamer.',
  'Gym at 6am, memes at 6pm.',
  'Plant parent of 12 (and counting).'
];
const pool = ['Music','Travel','Coding','Movies','Cricket','Photography','Cooking','Gaming','Reading','Fitness','Art','Dancing'];

const profiles = names.map((name, i) => ({
  id: i + 1,
  name,
  age: 19 + (i % 8),
  photo: `https://i.pravatar.cc/500?img=${i + 1}`,
  bio: bios[i % bios.length],
  city: cities[i % cities.length],
  interests: [0, 1, 2].map(k => pool[(i * 3 + k * 5) % pool.length]),
}));

// Server-side only: these profiles already liked the logged-in user (ids 3,6,9,...30)
const likedMe = profiles.filter(p => p.id % 3 === 0).map(p => p.id);

fs.mkdirSync('data', { recursive: true });
fs.writeFileSync('data/db.json', JSON.stringify({ profiles, likedMe, swipes: [], matches: [] }, null, 2));
console.log('Seeded', profiles.length, 'profiles');