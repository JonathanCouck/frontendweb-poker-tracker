import { useState } from "react";


export default function Login({users, logIn}) {
  const [badLogin, setBadLogin] = useState(false);

  const logInHere = () => {
    const user = users.filter(user => user.username === document.getElementById('username').value && user.password === document.getElementById('password').value )[0];
    if(user) {
      logIn(user);
    } else {
      setBadLogin(true);
    }
  }

  return(
    <div className="bg-blue-200 w-min m-2 pt-1 pb-1 pl-2 pr-2 border-2 border-blue-600">
      <div className="p-1 flex">
        <label for="username" >Username:</label>
        <input type="text" id="username" name="username" />
      </div>
      <div className="p-1 flex">
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" />
      </div>
      <button className="border-2 pl-2 pr-2 pt-1 pb-1 m-1 bg-white" onClick={logInHere}>Login</button>
      {badLogin && 
        <div className="text-red-800" >Bad login information</div>
      }
    </div>
  )
}