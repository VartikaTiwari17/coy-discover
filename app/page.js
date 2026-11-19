'use client';
import { useState } from 'react';
import Discover from '@/components/Discover';

export default function Page() {
  const [tab, setTab] = useState('discover');

  return (
    <div className="app">
      <main className="content">
        {tab === 'home' ? <div /> : <Discover />}
      </main>
      <nav className="tabbar">
        <button className={tab === 'home' ? 'active' : ''} onClick={() => setTab('home')}>🏠 Home</button>
        <button className={tab === 'discover' ? 'active' : ''} onClick={() => setTab('discover')}>🔥 Discover</button>
      </nav>
    </div>
  );
}