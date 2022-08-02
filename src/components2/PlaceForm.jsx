import React, { useContext, useEffect, useCallback } from 'react';
import { useForm, FormProvider } from "react-hook-form";
import { Link, useParams, useHistory } from "react-router-dom";
import { PlacesContext, usePlaces } from "../contexts/PlacesProvider";
import { useSession } from "../contexts/AuthProvider";

import LabelInput from "../components/LabelInput";

const validationRules = {
  name: { required: "this is required" },
  country: { required: "this is required" },
  website: { required: "this is required" },
}

const PlaceForm = () => {
  const { currentPlace, createOrUpdatePlace, setPlaceToUpdate } = useContext(PlacesContext);
  const history = useHistory();
  const methods = useForm();
  const {
    handleSubmit,
    setValue,
  } = methods;

  useEffect(() => {
    if(currentPlace) {
      setValue('name', currentPlace.name);
      setValue('country', currentPlace.country);
      setValue('website', currentPlace.website);
    }
  })

  const onSubmit = useCallback( async(data) => {
    try {
      await createOrUpdatePlace({
        id: currentPlace?.id,
        name: data.name,
        country: data.country,
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
          label="website"
          type="text"
          data-cy="website_input"
          validation={validationRules.website} />

        <div className="flex flex-row justify-end p-2">
          <button className="text-black pr-2 pl-2 m-1 border-2 bg-gray-200 border-gray-400 font-semibold disabled:opacity-50 hover:bg-gray-400 rounded-md" type="submit" data-cy="submit_cashgame">
            Save Place
          </button>
          <Link className="text-black pr-2 pl-2 m-1 border-2 bg-gray-200 border-gray-400 font-semibold disabled:opacity-50 hover:bg-gray-400 rounded-md" to="/places">
            Cancel
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