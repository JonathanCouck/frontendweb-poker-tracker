import { v4 } from 'uuid';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { useForm } from 'react-hook-form';

export default function NewCashgame({places, addCashgame}) {
  const {register, handleSubmit, formState:{errors}, reset} = useForm();
  const getPlaceId = (name) => places.find(place => place.name===name).id;

  const onSubmit = (data) => {
    const {big_blind, small_blind, in_for, out_for, date, place} = data
    const newC = {id:v4(), place_id:getPlaceId(place), big_blind:big_blind, small_blind:small_blind, in_for:in_for, out_for:out_for, date:date};
    addCashgame(newC)

    reset();
  }

  const Input = ({label , type , defaultValue,  validation, cls }) => {
    return(
      <input 
              {...register(label, validation)} 
              defaultValue={defaultValue}
              type={type} id={label} name={label} className={cls} /> 
    )
  }

  return (
    <div>
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-7 grid-row-6 border-2 border-red-600 rounded-md bg-red-200 m-1 text-left p-5 w-80">
    <b className="col-start-1 col-span-4 row-start-1 row-span-1 pb-2 text-lg pb-5"> Cashgame </b>
      <span className="col-start-1 col-span-2 row-start-2 font-semibold"> Blinds: </span> 
      <span className="col-start-3 col-span-4 row-start-2"> 
        $ <Input label='small_blind' type="number" defaultValue={1} validation={{required:'Big blind is required', min:{value:1, message:'min value is 1'}}} cls="w-16" />
        / <Input label='big_blind' type="number" defaultValue={1} validation={{required:'Small blind is required', min:{value:1, message:'min value is 1'}}} cls="w-16" />
      </span>
      <span className="col-start-1 col-span-4 row-start-3 font-semibold"> In for: </span>
      <span className="col-start-3 col-span-4 row-start-3"> 
        $ <Input label='in_for' type="number" defaultValue={1} validation={{required:'In for is required', min:{value:1, message:'min value is 1'}}} cls="w-20" />
      </span>
      <span className="col-start-1 col-span-4 row-start-4 font-semibold"> Out for: </span>
      <span className="col-start-3 col-span-4 row-start-4"> 
        $ <Input label='out_for' type="number" defaultValue={1} validation={{required:'Out for is required', min:{value:1, message:'min value is 1'}}} cls="w-20" />
      </span>
      <span className="col-start-1 col-span-4 row-start-5 font-semibold"> Date: </span> 
      <span className="col-start-3 col-span-4 row-start-5">
        <Input label='date' type="date" defaultValue={1} validation={{required:'Date is required', min:{value:1, message:'min value is 1'}}} cls="w-40" />
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
}