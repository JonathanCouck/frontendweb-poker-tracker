import React from 'react';
import { useTranslation } from 'react-i18next';

import GamesList from '../components/GamesList';

const Games = () => {
  const { t } = useTranslation();
  return (
    <div className="m-5">
      <h1 className="font-semibold text-2xl">{t('Games.games')}</h1>
      <GamesList />
    </div>
  )
}

export default Games