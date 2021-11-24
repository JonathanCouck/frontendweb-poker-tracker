import { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { AiOutlineCheckCircle } from "react-icons/ai";
import Input from './Input';

export default function UserSettings({user, places, editUser}) {
  const {register, handleSubmit, formState:{errors}, reset} = useForm();
  const [editing, setEditing] = useState(false)

  const getPlaceName = (id) => places.find(place => place.id===id).name;
  const getPlaceId = (name) => places.find(place => place.name===name).id;

  const changeEditing = () => setEditing(!editing);

  const onSubmit = (data) => {
    const {first_name, last_name, birth_date, place} = data;
    const newUser = {id:user.id, username:user.username, first_name:first_name, last_name:last_name, birth_date:birth_date, favorite_place_id: getPlaceId(place) }

    if(window.confirm("Are you sure you want to edit your settings?")) {
      editUser(newUser)
    }
    changeEditing();
    reset();
  }

  const editor=() => {
    return (
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-5 grid-row-4 border-2 border-green-600 rounded-md bg-green-200 m-3 mt-5 text-left p-5 w-96">
          <b className="col-start-1 col-span-4 row-start-1 row-span-1 pb-2 text-lg pb-5"> {user.username} </b>
          <span className="col-start-1 col-span-2 row-start-2 font-semibold"> First name: </span>
          <span className="col-start-3 col-span-3 row-start-2">
            <Input label='first_name' type="text" defaultValue={user.first_name} validation={{required:'First name is required', minLength:{value:2, message:'Min length is 2'}}} cls="w-40" />
          </span>
          <span className="col-start-1 col-span-2 row-start-3 font-semibold"> Last name: </span>
          <span className="col-start-3 col-span-3 row-start-3">
            <Input label='last_name' type="text" defaultValue={user.last_name} validation={{required:'Last name is required', minLength:{value:2, message:'Min length is 2'}}} cls="w-40" />
          </span>
          <span className="col-start-1 col-span-2 row-start-4 font-semibold"> Date of birth: </span>
          <span className="col-start-3 col-span-3 row-start-4">
            <Input label='birth_date' type="date" defaultValue={user.birth_date} validation={{required:'Birth date is required'}} cls="w-40" /> 
          </span>
          <span className="col-start-1 col-span-2 row-start-5 font-semibold"> Favorite place: </span> 
          <span className="col-start-3 col-span-2 row-start-5">
            <select {...register('place', 
              {required:'Place is required'})}
              name="place" id="place">
                {places.map(p => <option key={p.name} value={p.name} > {p.name} </option>)}
            </select>
          </span>
          <button className="col-start-5 row-start-1">
            <AiOutlineCheckCircle type='submit' className="hover:bg-green-600 cursor-pointer rounded-lg" color="black" size={25} />
          </button>
        </form>
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
        <span className="col-start-3 col-span-3 row-start-5"> {getPlaceName(user.favorite_place_id)} </span>
        <AiFillEdit className="col-start-5 row-start-1 hover:bg-green-600 cursor-pointer rounded-lg" color="black" size={25} onClick={changeEditing} />
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