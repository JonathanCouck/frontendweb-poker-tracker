

export default function UserSettings({user, places}) {

  const getPlaceName=() => {
    return places.filter(place => place.id===user.favorite_place_id)[0].name
  }

  return (
    <div className="grid grid-cols-5 grid-row-4 border-2 border-green-500 rounded-md bg-green-200 m-3 mt-5 text-left p-5 w-96">
      <b className="col-start-1 col-span-4 row-start-1 row-span-1 pb-2 text-lg pb-5"> {user.username} </b>
      <span className="col-start-1 col-span-2 row-start-2 font-semibold"> Full name: </span>
      <span className="col-start-3 col-span-3 row-start-2"> {user.first_name} {user.last_name}</span>
      <span className="col-start-1 col-span-2 row-start-3 font-semibold"> Date of birth: </span>
      <span className="col-start-3 col-span-3 row-start-3"> {user.birth_date.substring(0,10)} </span>
      <span className="col-start-1 col-span-2 row-start-4 font-semibold"> Favorite place: </span> 
      <span className="col-start-3 col-span-3 row-start-4"> {getPlaceName()} </span>
    </div>
  )
}