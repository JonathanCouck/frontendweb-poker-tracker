import { memo, useCallback } from 'react';
import StarRating from './StarRating';
import { usePlaces } from '../contexts/PlacesProvider';

const Place = memo(({ id, name, country, city, postal_code, street, house_number }) => {
	const { ratePlace } = usePlaces();

  return (
    <div className="grid grid-cols-5 grid-row-6 border-2 border-yellow-600 rounded-md bg-yellow-200 m-1 text-left p-5 w-96">
      <b className="col-start-1 col-span-4 row-start-1 row-span-1 pb-2 text-lg pb-5"> {name} </b>

      <span className="col-start-1 col-span-2 row-start-2 font-semibold"> Country: </span>
      <span className="col-start-3 col-span-3 row-start-2"> {country}</span>

      <span className="col-start-1 col-span-2 row-start-3 font-semibold"> Postal code: </span>
      <span className="col-start-3 col-span-3 row-start-3"> {postal_code} </span>

      <span className="col-start-1 col-span-2 row-start-4 font-semibold"> City: </span>
      <span className="col-start-3 col-span-3 row-start-4"> {city} </span>

      <span className="col-start-1 col-span-2 row-start-5 font-semibold"> Street: </span> 
      <span className="col-start-3 col-span-3 row-start-5"> {street} </span>
      
      <span className="col-start-1 col-span-2 row-start-6 font-semibold"> House number: </span> 
      <span className="col-start-3 col-span-3 row-start-6"> {house_number} </span>
    </div>
  )
});

export default Place;