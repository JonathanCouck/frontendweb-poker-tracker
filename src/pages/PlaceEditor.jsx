import React from 'react';
import { useParams } from 'react-router-dom';

import PlaceForm from '../components/PlaceForm';

const PlaceEditor = () => {
  const { id } = useParams();
  return (
    <div className="m-5">
      <h1 className="font-semibold text-2xl mb-5">{id?'Edit existing':'Add new'} place</h1>

      <PlaceForm />
    </div>
  )
}

export default PlaceEditor;