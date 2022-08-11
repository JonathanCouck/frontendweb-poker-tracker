import React from 'react';
import { useTranslation }from 'react-i18next'

const Index = () => {
  const { t } = useTranslation();
  return (
    <div className='m-5'>
      <h1 className='text-2xl font-semibold mb-2'>{t('Index.trackerSite')}</h1>
      <span>{t('Index.logTrack')}</span>
    </div>
  )
}

export default Index