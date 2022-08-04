import React from 'react'
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import GameForm from '../components/GameForm'

const GameEditor = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  return (
    <div className="m-5">
      <h1 className="font-semibold text-2xl mb-5">{id?t('GameEditor.edit'):t('GameEditor.add')} </h1>
      <GameForm />
    </div>
  )
}

export default GameEditor