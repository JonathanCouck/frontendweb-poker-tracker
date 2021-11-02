

export default function Place({name, country, city, postal_code, street, house_number}) {
  return (
    <div className="grid grid-cols-5 grid-row-4 border-2 border-yellow-500 rounded-md bg-yellow-200 m-3 mt-5 text-left p-5 w-96">
      <b className="col-start-1 col-span-4 row-start-1 row-span-1 pb-2 text-lg pb-5"> {name} </b>
      <span className="col-start-1 col-span-2 row-start-2 font-semibold"> Country: </span>
      <span className="col-start-3 col-span-3 row-start-2"> {country}</span>
      <span className="col-start-1 col-span-2 row-start-3 font-semibold"> City: </span>
      <span className="col-start-3 col-span-3 row-start-3"> {postal_code} {city} </span>
      <span className="col-start-1 col-span-2 row-start-4 font-semibold"> Address: </span> 
      <span className="col-start-3 col-span-3 row-start-4"> {street} {house_number} </span>
    </div>
  )
}