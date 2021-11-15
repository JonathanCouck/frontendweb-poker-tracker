import { useState } from 'react';
import { AiOutlineCheckCircle, AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { useForm } from 'react-hook-form';

export default function Cashgame({ id, small_blind, big_blind, in_for, out_for, date, place_id, places, editCashgame, deleteCashgame }) {
  const {register, handleSubmit, formState:{errors}, reset} = useForm();
  const [editing, setEditing] = useState(false);
  const changeEditing = () => {
    setEditing(!editing);
  }

  const getPlaceName = (id) => places.find(place => place.id===id).name;
  const getPlaceId = (name) => places.find(place => place.name===name).id;
  
  const onSubmit = (data) => {
    const {big_blind, small_blind, in_for, out_for, date, place} = data
    const newC = {id:id, place_id:getPlaceId(place), big_blind:big_blind, small_blind:small_blind, in_for:in_for, out_for:out_for, date:date};
    if(window.confirm("Are you sure you want to edit this Cashgame?")) {
      editCashgame(newC);
    }
    changeEditing();
    reset();
  }
  
  const _deleteCashgame = () => {
    if(window.confirm("Are you sure you want to delete this Cashgame?")) {
      deleteCashgame(id);
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
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-7 grid-row-6 border-2 border-red-600 rounded-md bg-red-200 m-1 text-left p-5 w-80">
        <b className="col-start-1 col-span-4 row-start-1 row-span-1 pb-2 text-lg pb-5"> Cashgame </b>
          <span className="col-start-1 col-span-2 row-start-2 font-semibold"> Blinds: </span> 
          <span className="col-start-3 col-span-4 row-start-2"> 
            $ <Input label='small_blind' type="number" defaultValue={small_blind} validation={{required:'Small blind is required', min:{value:1, message:'min value is 1'}}} cls="w-16" />
            / <Input label='big_blind' type="number" defaultValue={big_blind} validation={{required:'Big blind is required', min:{value:1, message:'min value is 1'}}} cls="w-16" />
          </span>
          <span className="col-start-1 col-span-4 row-start-3 font-semibold"> In for: </span>
          <span className="col-start-3 col-span-4 row-start-3"> 
            $ <Input label='in_for' type="number" defaultValue={in_for} validation={{required:'In for is required', min:{value:1, message:'min value is 1'}}} cls="w-20" />
          </span>
          <span className="col-start-1 col-span-4 row-start-4 font-semibold"> Out for: </span>
          <span className="col-start-3 col-span-4 row-start-4"> 
            $ <Input label='out_for' type="number" defaultValue={out_for} validation={{required:'Out for is required', min:{value:1, message:'min value is 1'}}} cls="w-20" />
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
            <AiOutlineCheckCircle type='submit' className="hover:bg-red-600 cursor-pointer rounded-lg" color="black" size={25} />
          </button>
        </form>
      </div>
    )
  };
  const not_editor = () => {
    return (
      <div className="grid grid-cols-7 grid-row-6 border-2 border-red-600 rounded-md bg-red-200 m-1 text-left p-5 w-80">
        <b className="col-start-1 col-span-5 row-start-1 row-span-1 pb-2 text-lg pb-5"> Cashgame </b>
        <span className="col-start-1 col-span-2 row-start-2 font-semibold"> Blinds: </span> 
        <span className="col-start-3 col-span-4 row-start-2"> $ {small_blind} / {big_blind} </span>
        <span className="col-start-1 col-span-2 row-start-3 font-semibold"> In for: </span>
        <span className="col-start-3 col-span-2 row-start-3"> $ {in_for} </span>
        <span className="col-start-1 col-span-2 row-start-4 font-semibold"> Out for: </span> 
        <span className="col-start-3 col-span-2 row-start-4"> $ {out_for} </span> 
        <span className="col-start-1 col-span-2 row-start-5 font-semibold"> Date: </span> 
        <span className="col-start-3 col-span-4 row-start-5"> {date.substring(0,10)} </span>
        <span className="col-start-1 col-span-2 row-start-6 font-semibold"> Place: </span> 
        <span className="col-start-3 col-span-5 row-start-6"> {getPlaceName(place_id)} </span>
        <AiFillEdit color="black" size={25} className="col-start-6 row-start-1 rounded-md m-1 hover:bg-red-600 cursor-pointer rounded-lg" onClick={changeEditing} />
        <AiFillDelete color="black" size={25} className="col-start-7 row-start-1 rounded-md m-1 hover:bg-red-600 cursor-pointer rounded-lg" onClick={_deleteCashgame}/>
      </div>
    )
  };
  return editing ? editor() : not_editor()
};