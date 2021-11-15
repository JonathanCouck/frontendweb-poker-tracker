import { useState } from 'react';
import { AiOutlineCheckCircle, AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { useForm } from 'react-hook-form';

export default function Tournament({ id, entrants, finished, buyin, cashed, date, place_id, places, editTournament, deleteTournament }) {
  const {register, handleSubmit, formState:{errors}, reset} = useForm();
  const [editing, setEditing] = useState(false);
  const changeEditing = () => {
    setEditing(!editing);
  }
  
  const getPlaceName = (id) => places.find(place => place.id===id).name;
  const getPlaceId = (name) => places.find(place => place.name===name).id;

  const onSubmit = (data) => {
    const {finished, entrants, buyin, cashed, date, place} = data
    const newT = {id:id, place_id:getPlaceId(place), entrants:entrants, finished:finished, buyin:buyin, cashed:cashed, date:date};
    
    if(window.confirm("Are you sure you want to delete this Tournament?")) {
      editTournament(newT)
    }
    changeEditing();
    reset();
  } 

  const _deleteTournament = () => {
    if(window.confirm("Are you sure you want to delete this Tournament?")) {
      deleteTournament(id);
    }
  }
  
  const Input = ({label , type , defaultValue,  validation, cls }) => {
    return(
      <input 
              {...register(label, validation)} 
              defaultValue={defaultValue}
              type={type} id={label} name={label} className={cls} /> 
    )
  }

  const editor = () => {
    return(
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-7 grid-row-6 border-2 border-blue-600 rounded-md bg-blue-200 m-1 text-left p-5 w-80">
        <b className="col-start-1 col-span-4 row-start-1 row-span-1 pb-2 text-lg pb-5"> Tournament </b>
          <span className="col-start-1 col-span-2 row-start-2 font-semibold"> Finished: </span> 
          <span className="col-start-3 col-span-4 row-start-2"> 
            <Input label='finished' type="number" defaultValue={finished} validation={{required:'Finished is required', min:{value:1, message:'min value is 1'}}} cls="w-16" />
            / <Input label='entrants' type="number" defaultValue={entrants} validation={{required:'Entrants is required', min:{value:1, message:'min value is 1'}}} cls="w-16" />
          </span>
          <span className="col-start-1 col-span-4 row-start-3 font-semibold"> Buyin: </span>
          <span className="col-start-3 col-span-4 row-start-3"> 
            $ <Input label='buyin' type="number" defaultValue={buyin} validation={{required:'Buyin is required', min:{value:1, message:'min value is 1'}}} cls="w-20" />
          </span>
          <span className="col-start-1 col-span-4 row-start-4 font-semibold"> Cashed: </span>
          <span className="col-start-3 col-span-4 row-start-4"> 
            $ <Input label='cashed' type="number" defaultValue={cashed} validation={{required:'Cashed is required', min:{value:0, message:'min value is 0'}}} cls="w-20" />
          </span>
          <span className="col-start-1 col-span-4 row-start-5 font-semibold"> Date: </span> 
          <span className="col-start-3 col-span-4 row-start-5">
            <Input label='date' type="date" defaultValue={date} validation={{required:'Date is required', min:{value:1, message:'min value is 1'}}} cls="w-40" />
          </span>
          <span className="col-start-1 col-span-4 row-start-6 font-semibold"> Place: </span> 
          <span className="col-start-3 col-span-2 row-start-6">
            <select {...register('place', 
              {required:'Place is required'})}
              name="place" id="place">
                {places.map(p => <option key={p.name} value={p.name} > {p.name} </option>)}
            </select>
          </span>
          <button className="col-start-7 row-start-1">
            <AiOutlineCheckCircle type='submit' className="hover:bg-blue-600 cursor-pointer rounded-lg" color="black" size={25} />
          </button>
        </form>
      </div>
    )
  };
  const not_editor = () => {
    return(
      <div className="grid grid-cols-7 grid-row-6 border-2 border-blue-600 rounded-md bg-blue-200 m-1 text-left p-5 w-80">
        <b className="col-start-1 col-span-5 row-start-1 row-span-1 pb-2 text-lg pb-5"> Tournament </b>
        <span className="col-start-1 col-span-2 row-start-2 font-semibold"> Finished: </span> 
        <span className="col-start-3 col-span-4 row-start-2"> {finished} / {entrants} </span>
        <span className="col-start-1 col-span-2 row-start-3 font-semibold"> Buyin: </span>
        <span className="col-start-3 col-span-2 row-start-3"> $ {buyin}</span>
        <span className="col-start-1 col-span-2 row-start-4 font-semibold"> Cashed: </span>
        <span className="col-start-3 col-span-2 row-start-4"> $ {cashed} </span>
        <span className="col-start-1 col-span-2 row-start-5 font-semibold"> Date: </span> 
        <span className="col-start-3 col-span-4 row-start-5"> {date.substring(0,10)} </span>
        <span className="col-start-1 col-span-2 row-start-6 font-semibold"> Place: </span> 
        <span className="col-start-3 col-span-5 row-start-6"> {getPlaceName(place_id)} </span>
        <AiFillEdit color="black" size={25} className="col-start-6 row-start-1 rounded-md m-1 hover:bg-blue-600 cursor-pointer rounded-lg" onClick={changeEditing}/>
        <AiFillDelete color="black" size={25} className="col-start-7 row-start-1 rounded-md m-1 hover:bg-blue-600 cursor-pointer rounded-lg" onClick={_deleteTournament} />
      </div>
    )
  };
  return editing? editor(): not_editor();
};