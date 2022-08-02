import React from 'react';
import { useParams } from 'react-router-dom';

import PlaceForm from '../components2/PlaceForm';

const PlaceEditor = () => {
  const { id } = useParams();
  return (
    <div className="m-5">
      <h1 className="font-semibold text-2xl mb-5">{id?'Edit':'Add'} Place</h1>

      <PlaceForm id={id} />
    </div>
  )
}

export default PlaceEditor;