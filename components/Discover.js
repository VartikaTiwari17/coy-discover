'use client';
import { useEffect, useRef, useState } from 'react';
import Matches from './Matches';

export default function Discover() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('swipe');
  const [match, setMatch] = useState(null);
  const [dx, setDx] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [leaving, setLeaving] = useState(null);
  const startX = useRef(0);
  const busy = useRef(false);

  useEffect(() => {
    fetch('/api/feed', { cache: 'no-store' })
      .then(r => r.json())
      .then(d => { setProfiles(d.profiles); setLoading(false); });
  }, []);

  async function swipe(action) {
    if (busy.current || profiles.length === 0) return;
    busy.current = true;
    const p = profiles[0];
    setLeaving(action);

    const req = fetch('/api/swipe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profileId: p.id, action }),
    }).then(r => r.json());

    await new Promise(r => setTimeout(r, 300));
    const res = await req;

    setProfiles(prev => prev.slice(1));
    setLeaving(null);
    setDx(0);
    if (res.match) setMatch(res.profile);
    busy.current = false;
  }

  function onDown(e) {
    if (busy.current) return;
    startX.current = e.clientX;
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  }
  function onMove(e) {
    if (!dragging) return;
    setDx(e.clientX - startX.current);
  }
  function onUp() {
    if (!dragging) return;
    setDragging(false);
    if (dx > 100) swipe('like');
    else if (dx < -100) swipe('pass');
    else setDx(0);
  }

  const top = profiles[0];
  const next = profiles[1];
  const x = leaving ? (leaving === 'like' ? 600 : -600) : dx;
  const stamp = leaving ? 1 : Math.min(Math.abs(dx) / 100, 1);
  const direction = leaving ? leaving : dx > 0 ? 'like' : 'pass';

  return (
    <div className="discover">
      <div className="subtabs">
        <button className={view === 'swipe' ? 'active' : ''} onClick={() => setView('swipe')}>Swipe</button>
        <button className={view === 'matches' ? 'active' : ''} onClick={() => setView('matches')}>Matches</button>
      </div>

      {view === 'matches' ? (
        <Matches />
      ) : loading ? (
        <p className="center">Loading...</p>
      ) : !top ? (
        <div className="center">
          <div style={{ fontSize: 56 }}>🌙</div>
          <h3>You&apos;re all caught up</h3>
          <p className="muted">No more profiles right now. Check back later!</p>
        </div>
      ) : (
        <>
          <div className="stack">
            {next && (
              <div className="card behind">
                <img src={next.photo} alt="" draggable={false} />
              </div>
            )}
            <div
              key={top.id}
              className="card"
              style={{
                transform: `translateX(${x}px) rotate(${x / 15}deg)`,
                transition: dragging ? 'none' : 'transform 0.3s ease',
              }}
              onPointerDown={onDown}
              onPointerMove={onMove}
              onPointerUp={onUp}
              onPointerCancel={onUp}
            >
              <img src={top.photo} alt={top.name} draggable={false} />
              <div className="stamp like" style={{ opacity: direction === 'like' ? stamp : 0 }}>LIKE</div>
              <div className="stamp nope" style={{ opacity: direction === 'pass' ? stamp : 0 }}>NOPE</div>
              <div className="info">
                <h2>{top.name}, {top.age}</h2>
                <div>📍 {top.city}</div>
                <p>{top.bio}</p>
                <div className="chips">
                  {top.interests.map(i => <span key={i}>{i}</span>)}
                </div>
              </div>
            </div>
          </div>

          <div className="actions">
            <button className="btn pass" onClick={() => swipe('pass')} aria-label="Pass">✕</button>
            <button className="btn like" onClick={() => swipe('like')} aria-label="Like">♥</button>
          </div>
        </>
      )}

      {match && (
        <div className="match-overlay">
          <h1>It&apos;s a match! 🎉</h1>
          <img src={match.photo} alt={match.name} />
          <p>You and {match.name} liked each other</p>
          <button className="primary" onClick={() => { setMatch(null); setView('matches'); }}>View matches</button>
          <button className="ghost" onClick={() => setMatch(null)}>Keep swiping</button>
        </div>
      )}
    </div>
  );
}