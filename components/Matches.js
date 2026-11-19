'use client';
import { useEffect, useState } from 'react';

export default function Matches() {
  const [matches, setMatches] = useState(null);

  useEffect(() => {
    fetch('/api/matches', { cache: 'no-store' })
      .then(r => r.json())
      .then(d => setMatches(d.matches));
  }, []);

  if (!matches) return <p className="center">Loading...</p>;
  if (matches.length === 0) {
    return <div className="center"><h3>No matches yet</h3><p>Keep swiping 💘</p></div>;
  }

  return (
    <div className="matches">
      {matches.map(m => (
        <div className="match-row" key={m.id}>
          <img src={m.photo} alt={m.name} />
          <div>
            <b>{m.name}, {m.age}</b>
            <div className="muted">{m.city}</div>
          </div>
        </div>
      ))}
    </div>
  );
}