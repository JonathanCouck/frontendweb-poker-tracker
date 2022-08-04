import React from 'react'
import { useParams } from 'react-router-dom';

import GameForm from '../components/GameForm'

const GameEditor = () => {
  const { id } = useParams();
  return (
    <div className="m-5">
      <h1 className="font-semibold text-2xl mb-5">{id?'Edit existing':'Add new'} game</h1>

      <GameForm />
    </div>
  )
}

export default GameEditor