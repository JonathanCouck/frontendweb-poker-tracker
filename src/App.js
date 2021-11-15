import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Tournaments from './component/tournaments/Tournaments';
import Cashgames from './component/cashgames/Cashgames';
import Places from './component/places/Places';
import LoginForm from './component/LoginForm';
import RegisterForm from './component/RegisterForm';
import MenuBar from './component/menubar/MenuBar';
import UserSettings from './component/UserSettings';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  const [user, setUser] = useState({});
  const [places, setPlaces] = useState([]);
  const [screen, setScreen] = useState('login');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

  useEffect(()=> {
    const getPlaces = async () => {
      try{
        setError('');
        setLoading(true);
        const response = await axios.get(`http://localhost:9000/api/places`,{
          params: {
            limit: 16,
            offset: 0
          }
        });
        setPlaces(response.data.data);
      } catch (err) {
        console.log(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    getPlaces();
  }, []);

  const logIn = (u) => {
    setUser(u);
    setScreen('main');
  };

  const signOut = () => {
    setUser({});
    setScreen('login');
  };

  const setRegister = (value) => {
    setScreen('register')
  };

  const backToLogin = () => {
    setScreen('login')
  };

  const logScreen = () => {
    return( 
      <div className="flex justify-center" >
        <LoginForm logIn={logIn} setRegister={setRegister} />
      </div>
    );
  }

  const regScreen = () => {
    return(
      <div className="flex justify-center" >
        <RegisterForm places={places} backToLogin={backToLogin} />
      </div>
    )
  }

  useEffect(() => {
    //getUsers();
    //getPlaces();
    setScreen('login');
  }, [])

  if (loading) {
    return (
      <p className="text-red-500">
        {JSON.stringify(error, null, 2)}
      </p>
    )
  }

  const mainScreen = () => { 
    return (
      <Router>
        <div>
          <MenuBar user={user} signOut={signOut}/>
          
          <Switch>
            <Route path="/tournaments">
              <Tournaments user={user} places={places} />
            </Route>
            <Route path="/cashgames">
              <Cashgames user={user} places={places} />
            </Route>
            <Route path="/places">
              <Places places={places} />
            </Route>
            <Route path="/user">
            <UserSettings user={user} places={places} />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  };
  
  switch (screen) {
    case 'login':
      return logScreen();
    case 'register':
      return regScreen();
    case 'main':
      return mainScreen();
    default:
      return <div className="text-white font-bold">Error loading page</div>
  }
}
export default App;