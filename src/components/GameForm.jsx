import React, { useCallback, useEffect, useMemo } from 'react'
import { Link, useHistory } from "react-router-dom";
import { FormProvider, useForm } from 'react-hook-form';
import { usePlaces } from "../contexts/PlacesProvider";
import { useGames } from '../contexts/GamesProvider';

import LabelInput from './LabelInput';
import LabelSelect from './LabelSelect';
import { useTranslation } from 'react-i18next';

const GameForm = () => {
  const { t } = useTranslation();
  const { currentGame, createOrUpdateGame, setGameToUpdate } = useGames();
  const { places } = usePlaces();
  const history = useHistory();
  const methods = useForm();
  const { handleSubmit, setValue } = methods;

  const validationRules = useMemo(() => ({
    place: { validate: { required: value => value===''? t('Error.required'): null } },
    type: { validate: { required: value => value===''? t('Error.required'): null } },
    inFor: { validate: { required: value => value===''? t('Error.required'): null } },
    outFor: { validate: { required: value => value===''? t('Error.required'): null } },
    par1: { validate: { required: value => value===''? t('Error.required'): null } },
    par2: { validate: { required: value => value===''? t('Error.required'): null } },
    date: { validate: { required: value => value===''? t('Error.required'): null } },
  }),[]);

  useEffect(() => {
    if(currentGame && (Object.keys(currentGame).length !== 0 || currentGame.constructor !== Object)) {
      
      const date = new Date(currentGame.date).toLocaleDateString("nl-BE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      setValue('place', currentGame.place.id);
      setValue('type', currentGame.type);
      setValue('inFor', currentGame.inFor);
      setValue('outFor', currentGame.outFor);
      setValue('par1', currentGame.par1);
      setValue('par2', currentGame.par2);
      setValue('date', `${date.slice(6,10)}-${date.slice(3,5)}-${date.slice(0,2)}`);
    }
  })

  const onSubmit = useCallback( async(data) => {
    try {
      await createOrUpdateGame({
        id: currentGame?.id,
        place: data.place,
        type: data.type,
        inFor: data.inFor,
        outFor: data.outFor,
        par1: data.par1,
        par2: data.par2,
        date: data.date,
      });
      setGameToUpdate(null)
      history.push('/games')
    } catch(error) {
      console.error(error);
    }
  }, []);
  
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-min px-5 py-2 text-black bg-blue-300 rounded-md border-2 border-white">
        <LabelSelect
          label="place"
          options={places}
          validation={validationRules.place}
          data-cy="place_input"/>
        <LabelSelect
          label="type"
          options={[{id:'TOUR', name:'Tournament'}, {id:'CASH', name:'Cashgame'}]}
          validation={validationRules.type}
          data-cy="type_input"/>
        <LabelInput
          label="inFor"
          type="number"
          data-cy="inFor_input"
          validation={validationRules.inFor} />
        <LabelInput
          label="outFor"
          type="number"
          data-cy="outFor_input"
          validation={validationRules.outFor} />
        <LabelInput
          label="par1"
          type="number"
          data-cy="par1_input"
          validation={validationRules.par1} />
        <LabelInput
          label="par2"
          type="number"
          data-cy="par2_input"
          validation={validationRules.par2} />
        <LabelInput
          label="date"
          type="date"
          data-cy="date_input"
          validation={validationRules.date} />

        <div className="flex flex-row justify-end p-2">
          <button className="text-black pr-2 pl-2 m-1 border-2 bg-gray-200 border-gray-400 font-semibold disabled:opacity-50 hover:bg-gray-400 rounded-md" type="submit" data-cy="submit_btn">
            {t('GameEditor.save')}
          </button>
          <Link className="text-black pr-2 pl-2 m-1 border-2 bg-gray-200 border-gray-400 font-semibold disabled:opacity-50 hover:bg-gray-400 rounded-md" to="/games" onClick={()=>setGameToUpdate(null)} data-cy="cancel_btn">
            {t('GameEditor.cancel')}
          </Link>
        </div>
      </form>
    </FormProvider>
  )
}

export default GameForm