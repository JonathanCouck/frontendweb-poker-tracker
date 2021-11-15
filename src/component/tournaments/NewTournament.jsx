import { AiOutlineCheckCircle } from 'react-icons/ai';
import { useForm } from 'react-hook-form';

export default function NewTournament({places, addTournament}) {
  const {register, handleSubmit, formState:{errors}, reset} = useForm();
  const getPlaceId = (name) => places.find(place => place.name===name).id;

  const onSubmit = (data) => {
    const newT = {place_id:getPlaceId(data.place), ...data};
    console.log(newT);
    addTournament(newT)

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
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-7 grid-row-6 border-2 border-blue-600 rounded-md bg-blue-200 m-1 text-left p-5 w-80">
      <b className="col-start-1 col-span-4 row-start-1 row-span-1 pb-2 text-lg pb-5"> Tournament </b>
        <span className="col-start-1 col-span-2 row-start-2 font-semibold"> Finished: </span> 
        <span className="col-start-3 col-span-4 row-start-2"> 
          <Input label='finished' type="number" defaultValue={1} validation={{required:'Finished is required', min:{value:1, message:'min value is 1'}}} cls="w-16" />
          / <Input label='entrants' type="number" defaultValue={1} validation={{required:'Entrants is required', min:{value:1, message:'min value is 1'}}} cls="w-16" />
        </span>
        <span className="col-start-1 col-span-4 row-start-3 font-semibold"> Buyin: </span>
        <span className="col-start-3 col-span-4 row-start-3"> 
          $ <Input label='buyin' type="number" defaultValue={1} validation={{required:'Buyin is required', min:{value:1, message:'min value is 1'}}} cls="w-20" />
        </span>
        <span className="col-start-1 col-span-4 row-start-4 font-semibold"> Cashed: </span>
        <span className="col-start-3 col-span-4 row-start-4"> 
          $ <Input label='cashed' type="number" defaultValue={1} validation={{required:'Cashed is required', min:{value:0, message:'min value is 0'}}} cls="w-20" />
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
        <button>
        <AiOutlineCheckCircle type='submit' className="col-start-7 row-start-1 hover:bg-blue-600 cursor-pointer rounded-lg" color="black" size={25} />
        </button>
      </form>
    </div>
  )
}