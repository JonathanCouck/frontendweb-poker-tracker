import React from 'react';

import GamesList from '../components/GamesList';

const Games = () => {
  return (
    <div className="m-5">
      <h1 className="font-semibold text-2xl">Games</h1>
      <GamesList />
    </div>
  )
}

export default Games