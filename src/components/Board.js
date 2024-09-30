'use client';

import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

export default function Board({ onUpdate }) {
  const [layout, setLayout] = useState(['_0', '_1', '_2', '_3', '_4', '_5', '_6', '_7', '_8']);
  const [turn, setTurn] = useState('gameStart');
  const [message, setMessage] = useState('Select a box to begin game...');

  const checkResult = (marker = '') => {
    const check = layout.map((sq) => sq.slice(0, 1));
    if (check[0] === marker) {
      if ((check[1] === marker && check[2] === marker) || (check[3] === marker && check[6] === marker) || (check[4] === marker && check[8] === marker)) {
        return 'winner';
      }
    }
    if (check[4] === marker) {
      if ((check[1] === marker && check[7] === marker) || (check[3] === marker && check[5] === marker) || (check[2] === marker && check[6] === marker)) {
        return 'winner';
      }
    }
    if (check[8] === marker) {
      if ((check[2] === marker && check[5] === marker) || (check[6] === marker && check[7] === marker)) {
        return 'winner';
      }
    }

    if (!check.some((sq) => sq === '_')) {
      return true;
    }

    return false;
  };

  const computerTurn = () => {
    setTimeout(() => {
      setLayout((prev) => {
        let newIndex = -1;
        do {
          newIndex = Math.floor(Math.random() * 8);
        } while (prev[newIndex].slice(0, 1) !== '_');
        const newLayout = [...prev];
        newLayout[newIndex] = `O${newIndex}}`;
        return newLayout;
      });
    }, 2000);
  };

  const populateSquare = (squareText) => {
    setLayout((prev) => {
      const newLayout = [...prev];
      newLayout[squareText.slice(-1)] = `X${squareText.slice(-1)}`;
      return newLayout;
    });
  };

  useEffect(() => {
    if (checkResult('X') === 'winner') {
      setMessage('Player wins! :)');
      setTurn('gameOver');
      onUpdate('player');
    } else if (checkResult('O') === 'winner') {
      setMessage('Computer wins :(');
      setTurn('gameOver');
      onUpdate('computer');
    } else if (turn !== 'gameStart' && checkResult()) {
      setMessage('Tie game...');
      setTurn('gameOver');
      onUpdate('tie');
    } else if (turn === 'computer') {
      setTurn('player');
    } else if (turn === 'player' || (turn === 'gameStart' && layout.some((sq) => sq.slice(0, 1) === 'X'))) {
      setTurn('computer');
      computerTurn();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layout]);

  return (
    <>
      <div className="board">
        {layout.map((square) => {
          const marker = square.slice(0, 1);

          if (marker !== '_') {
            return (
              <div key={square} className="square">
                {marker}
              </div>
            );
          }

          return (
            <button type="button" key={square} className="square vacant" disabled={turn !== 'player' && turn !== 'gameStart'} onClick={() => populateSquare(square)}>
              ?
            </button>
          );
        })}
      </div>
      {turn !== 'player' && turn !== 'computer' && <h3 className="message">{message}</h3>}
    </>
  );
}

Board.propTypes = {
  onUpdate: PropTypes.func.isRequired,
};
