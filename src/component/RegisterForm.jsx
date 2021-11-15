import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 } from 'uuid';

export default function RegisterForm({ places, backToLogin }) {
  const {register, handleSubmit, formState:{errors}, reset} = useForm();
  const [errorMsg, setErrorMsg] = useState('');
  
  const getPlaceId = (name) => places.find(place => place.name===name).id;

  const onSubmit = (data) => {
    data.favorite_place_id = getPlaceId(data.place);
    sendPostRequest(data);
    backToLogin();
  }

  const sendPostRequest = useCallback( async(user) => {
    try {
      const response = await axios.post('http://localhost:9000/api/users',user);
    } catch(err) {
      console.error(err)
    }
  });

  const Input = ({label , type , defaultValue,  validation, cls }) => {
    return(
      <input 
              {...register(label, validation)} 
              defaultValue={defaultValue}
              type={type} id={label} name={label} className={cls} /> 
    )
  }

  return(
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-8 grid-row-8 border-2 border-blue-600 rounded-md bg-blue-200 m-1 text-left p-5 w-96">
        <span className="col-start-1 col-span-2 row-start-1 font-semibold mb-2"> Username: </span> 
        <span className="col-start-4 col-span-4 row-start-1"> 
          <Input label='username' type="text" defaultValue={''} validation={{required:'Username is required', minLength: { value: 4,message: 'Min length is 2' }}} cls="" />
        </span>
        <span className="col-start-1 col-span-2 row-start-2 font-semibold mb-2"> Password: </span> 
        <span className="col-start-4 col-span-4 row-start-2"> 
          <Input label='password' type="password" defaultValue={''} validation={{required:'Password is required', minLength: { value: 4,message: 'Min length is 8' }}} cls="" />
        </span>
        <span className="col-start-1 col-span-4 row-start-3 font-semibold mb-2"> First name: </span>
        <span className="col-start-4 col-span-4 row-start-3"> 
          <Input label='first_name' type="text" validation={{required:'First Name is required', minLength: { value: 2,message: 'Min length is 2' }}} cls="" />
        </span>
        <span className="col-start-1 col-span-4 row-start-4 font-semibold mb-2"> Last name: </span>
        <span className="col-start-4 col-span-4 row-start-4"> 
          <Input label='last_name' type="text" validation={{required:'Last name is required', minLength: { value: 2,message: 'Min length is 2' }}} cls="" />
        </span>
        <span className="col-start-1 col-span-4 row-start-5 font-semibold mb-2"> Birth date: </span> 
        <span className="col-start-4 col-span-4 row-start-5">
          <Input label='birth_date' type="date" defaultValue={1} validation={{required:'Date is required', min:{value:1, message:'min value is 1'}}} cls="" />
        </span>
        <span className="col-start-1 col-span-4 row-start-6 font-semibold mb-2"> Favorite place: </span> 
        <span className="col-start-4 col-span-2 row-start-6 mb-2">
          <select {...register('place', 
            {required:'Place is required'})}
            name="place" id="place">
              {places.map(p => <option key={p.name} value={p.name} > {p.name} </option>)}
          </select>
        </span>
        <button className="row-start-7 col-span-2 col-start-1 border-2 bg-white font-semibold" type="submit" >Register</button>
        <button className="row-start-7 col-span-2 col-start-4 border-2 bg-white font-semibold" onClick={backToLogin}>Back</button>
        {errorMsg && <div className="text-red-800 row-start-8" > {errorMsg} </div>}
      </form>
    </div>
  )
}