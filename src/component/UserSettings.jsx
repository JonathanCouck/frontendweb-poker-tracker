import { useState } from "react"
import { AiFillEdit } from "react-icons/ai"

export default function UserSettings({user, places}) {
  const [editing, setEditing] = useState(false)

  const getPlaceName=() => {
    return places.find(place => place.id===user.favorite_place_id).name
  }

  const editSettings = () => setEditing(true);

  const editor=() => {
    return (
      <div className="grid grid-cols-5 grid-row-4 border-2 border-green-600 rounded-md bg-green-200 m-3 mt-5 text-left p-5 w-96">
        <b className="col-start-1 col-span-4 row-start-1 row-span-1 pb-2 text-lg pb-5"> {user.username} </b>
        <span className="col-start-1 col-span-2 row-start-2 font-semibold"> First name: </span>
        <span className="col-start-3 col-span-3 row-start-2"> <input type="text" name="first" id="first" className="w-40" /> </span>
        <span className="col-start-1 col-span-2 row-start-3 font-semibold"> Last name: </span>
        <span className="col-start-3 col-span-3 row-start-3"> <input type="text" name="last" id="last" className="w-40" /> </span>
        <span className="col-start-1 col-span-2 row-start-4 font-semibold"> Date of birth: </span>
        <span className="col-start-3 col-span-3 row-start-4"> <input type="date" name="birth" id="birth" className="w-40" /> </span>
        <span className="col-start-1 col-span-2 row-start-5 font-semibold"> Favorite place: </span> 
        <span className="col-start-3 col-span-2 row-start-5">
          <select name="place" id="place">
            {places.map(p => <option key={p.name} value={p.name} > {p.name} </option>)}
          </select>
        </span>
      </div>
    )
  }

  const not_editor = () => {
    return (
      <div className="grid grid-cols-5 grid-row-5 border-2 border-green-600 rounded-md bg-green-200 m-3 mt-5 text-left p-5 w-80">
        <b className="col-start-1 col-span-4 row-start-1 row-span-1 pb-2 text-lg pb-5"> {user.username} </b>
        <span className="col-start-1 col-span-2 row-start-2 font-semibold"> First name: </span>
        <span className="col-start-3 col-span-3 row-start-2"> {user.first_name} </span>
        <span className="col-start-1 col-span-2 row-start-3 font-semibold"> Last name: </span>
        <span className="col-start-3 col-span-3 row-start-3"> {user.last_name} </span>
        <span className="col-start-1 col-span-2 row-start-4 font-semibold"> Date of birth: </span>
        <span className="col-start-3 col-span-3 row-start-4"> {user.birth_date.substring(0,10)} </span>
        <span className="col-start-1 col-span-2 row-start-5 font-semibold"> Favorite place: </span> 
        <span className="col-start-3 col-span-3 row-start-5"> {getPlaceName()} </span>
        <AiFillEdit className="col-start-5 row-start-1 hover:bg-green-600 cursor-pointer rounded-lg" color="black" size={25} onClick={editSettings} />
      </div>
    )
  }

  return (
    <>
      {editing && editor()}
      {!editing && not_editor()}
    </>
  )
}