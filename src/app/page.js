'use client';

import { useState } from 'react';
import Board from '../components/Board';

function Home() {
  const [status, setStatus] = useState('playing');
  const [gameCount, setGameCount] = useState(1);
  const [record, setRecord] = useState({ wins: 0, losses: 0, ties: 0 });

  const resetGame = () => {
    setStatus('playing');
    setGameCount((prev) => prev + 1);
  };

  const endGame = (winner) => {
    if (winner === 'player') {
      setRecord((prev) => ({ ...prev, wins: prev.wins + 1 }));
    } else if (winner === 'computer') {
      setRecord((prev) => ({ ...prev, losses: prev.losses + 1 }));
    } else if (winner === 'tie') {
      setRecord((prev) => ({ ...prev, ties: prev.ties + 1 }));
    }
    setStatus('ended');
  };

  return (
    <>
      <h1 className="header">Tic Tac Toe</h1>
      <Board key={gameCount} onUpdate={(winner) => endGame(winner)} />
      <div className="extras">
        <h5 className="record">
          Current Record: {record.wins} - {record.losses} - {record.ties}
        </h5>
        {status === 'ended' && (
          <button type="button" className="new-game" onClick={resetGame}>
            Play another game?
          </button>
        )}
      </div>
    </>
  );
}

export default Home;
