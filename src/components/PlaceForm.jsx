import React, { useEffect, useCallback, useMemo } from 'react';
import { useForm, FormProvider } from "react-hook-form";
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from "react-router-dom";
import { usePlaces } from "../contexts/PlacesProvider";

import LabelInput from "./LabelInput";

const PlaceForm = () => {
  const { t } = useTranslation();
  const { currentPlace, createOrUpdatePlace, setPlaceToUpdate } = usePlaces();
  const history = useHistory();
  const methods = useForm();
  const {
    handleSubmit,
    setValue,
  } = methods;

  const validationRules = useMemo(() => ({
    name: { validate: { required: value => value===''? t('Error.required'): null } },
    country: { validate: { required: value => value===''? t('Error.required'): null } },
    city: { validate: { required: value => value===''? t('Error.required'): null } },
    website: { validate: { required: value => value===''? t('Error.required'): null } },
  }),[]);

  useEffect(() => {
    if(currentPlace && (Object.keys(currentPlace).length !== 0 || currentPlace.constructor !== Object)) {

      setValue('name', currentPlace.name);
      setValue('country', currentPlace.country);
      setValue('city', currentPlace.city);
      setValue('website', currentPlace.website);
    }
  })

  const onSubmit = useCallback( async(data) => {
    try {
      await createOrUpdatePlace({
        id: currentPlace?.id,
        name: data.name,
        country: data.country,
        city: data.city,
        website: data.website,
      });
      setPlaceToUpdate(null);
      history.push('/places')
    } catch(error) {
      console.error(error);
    }
  }, []);
  
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-min px-5 py-2 text-black bg-blue-300 rounded-md border-2 border-white">
        <LabelInput
          label="name"
          type="text"
          data-cy="name_input"
          validation={validationRules.name} />
        <LabelInput
          label="country"
          type="text"
          data-cy="country_input"
          validation={validationRules.country} />
        <LabelInput
          label="city"
          type="text"
          data-cy="city_input"
          validation={validationRules.city} />
        <LabelInput
          label="website"
          type="text"
          data-cy="website_input"
          validation={validationRules.website} />

        <div className="flex flex-row justify-end p-2">
          <button className="text-black pr-2 pl-2 m-1 border-2 bg-gray-200 border-gray-400 font-semibold disabled:opacity-50 hover:bg-gray-400 rounded-md" type="submit" data-cy="submit_btn">
            {t('PlaceEditor.save')}
          </button>
          <Link className="text-black pr-2 pl-2 m-1 border-2 bg-gray-200 border-gray-400 font-semibold disabled:opacity-50 hover:bg-gray-400 rounded-md" to="/places" onClick={()=>setPlaceToUpdate(null)} data-cy="cancel_btn">
          {t('PlaceEditor.cancel')}
          </Link>
        </div>
      </form>
    </FormProvider>
  )
}

export default PlaceForm



// <LabelInput
// label="country"
// type="text"
// defaultValue=""
// data-cy="username_input"
// placeholder="Username123"
// validation={validationRules.country} />

// <LabelInput
// label="website"
// type="text"
// defaultValue=""
// data-cy="username_input"
// placeholder="Username123"
// validation={validationRules.website} />