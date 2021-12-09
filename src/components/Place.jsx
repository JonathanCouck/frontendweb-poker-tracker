import { memo } from 'react';

const Place = memo(({ name, country, city, postalCode, street, houseNumber }) => {
  return (
    <div data-cy="place" className="grid grid-cols-5 grid-row-6 border-2 border-blue-600 rounded-md bg-blue-200 m-1 text-left p-5 w-96 text-black">
      <b data-cy="place_name" className="col-start-1 col-span-4 row-start-1 row-span-1 pb-2 text-lg pb-5"> {name} </b>

      <span className="col-start-1 col-span-2 row-start-2 font-semibold"> Country: </span>
      <span data-cy="place_country" className="col-start-3 col-span-3 row-start-2"> {country}</span>

      <span className="col-start-1 col-span-2 row-start-3 font-semibold"> Postal code: </span>
      <span data-cy="place_postal_code" className="col-start-3 col-span-3 row-start-3"> {postalCode} </span>

      <span className="col-start-1 col-span-2 row-start-4 font-semibold"> City: </span>
      <span data-cy="place_city" className="col-start-3 col-span-3 row-start-4"> {city} </span>

      <span className="col-start-1 col-span-2 row-start-5 font-semibold"> Street: </span> 
      <span data-cy="place_street" className="col-start-3 col-span-3 row-start-5"> {street} </span>
      
      <span className="col-start-1 col-span-2 row-start-6 font-semibold"> House number: </span> 
      <span data-cy="place_house_number" className="col-start-3 col-span-3 row-start-6"> {houseNumber} </span>
    </div>
  )
});

export default Place;