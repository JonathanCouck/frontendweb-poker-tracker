import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import PlaceForm from '../components/PlaceForm';

const PlaceEditor = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  return (
    <div className="m-5">
      <h1 className="font-semibold text-2xl mb-5">{id?t('PlaceEditor.edit'):t('PlaceEditor.add')}</h1>

      <PlaceForm />
    </div>
  )
}

export default PlaceEditor;