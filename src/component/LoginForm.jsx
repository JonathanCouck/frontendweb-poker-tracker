import { useState } from "react";
import { useForm } from 'react-hook-form';
import Input from './Input';
import axios from 'axios';


export default function LoginForm({users, logIn, setRegister}) {
  const {register, handleSubmit, formState:{ errors }, reset} = useForm();
  const [badLogin, setBadLogin] = useState(false);
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

  const onSubmit = async() => {

    const params = {
      username: document.getElementById('username').value, 
      password: document.getElementById('password').value,
    };
    if(params.username!=='' && params.password!=='') {
      let response = []
      try{
        setError('');
        setLoading(true);
        response = await axios.get(`http://localhost:9000/api/users/${params.username}`);
      } catch (err) {
        setError(err);
        setBadLogin(true);
      } finally {
        setLoading(false);
      }

      if(response.data.length===0) {
        setBadLogin(true);
      } else if(response.data[0].password !== params.password) {
        setBadLogin(true);
      } else {
        logIn(response.data[0])
      }
    }
  }

  const _setRegister = () => {
    setRegister(true)
  }

  return(
    <form onSubmit={handleSubmit(onSubmit)} className="bg-blue-200 w-min m-5 pt-1 pb-1 pl-2 pr-2 border-2 border-blue-600 rounded-md">
      <div className="p-1 flex">
        <label className="w-20 font-semibold">Username:</label>
        <Input label='username' type="text" defaultValue={''} validation={{required:'Username is required'}} cls="" />
      </div>
      <div className="p-1 flex">
        <label className="w-20 font-semibold">Password:</label>
          <Input label='password' type="password" defaultValue={''} validation={{required:'Password is required'}} cls="" />
      </div>
      <div>
        <button className="border-2 pl-2 pr-2 pt-1 pb-1 m-1 bg-white font-semibold" type="submit">Login</button>
        <button className="border-2 pl-2 pr-2 pt-1 pb-1 m-1 bg-white font-semibold" onClick={_setRegister}>Register</button>
      </div>
      {badLogin && 
        <div className="text-red-800" >Bad login information</div>
      }
    </form>
  )
}