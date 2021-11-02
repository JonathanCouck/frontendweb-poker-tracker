import './App.css';
import { useState } from 'react';
import MenuBar from './component/menubar/MenuBar';
import Footer from './component/Footer';
import Tournaments from './component/tournaments/Tournaments';
import Cashgames from './component/cashgames/Cashgames';
import Places from './component/places/Places';
import Login from './component/Login';
import USER_DATA from './mock_data/user_mock';
import TOURNAMENT_DATA from './mock_data/tournament_mock';
import CASHGAME_DATA from './mock_data/cashgame_mock';
import PLACE_DATA from './mock_data/place_mock';
import UserSettings from './component/UserSettings';

function App() {
  const [user, setUser] = useState(null);
  const [users] = useState(USER_DATA);
  const [tournaments, setTournaments] = useState(null);
  const [cashgames, setCashgames] = useState(null);
  const [places, setPlaces] = useState(PLACE_DATA);
  const [loginScreen, setLoginScreen] = useState(true);
  const [currScreen, setCurrScreen] = useState('Tournaments');

  const saveCashgame = (id, small_blind, big_blind, in_for, out_for, date) => {
    const newCashgames = cashgames.map(cash => id===cash.id ? {id, small_blind, big_blind, in_for, out_for, date} : cash);
    setCashgames(newCashgames)
  }
  const saveTournament = (id, entrants, finished, buyin, cashed, date, place_id) => {
    const newTournaments = tournaments.map(tour => id===tour.id ? {id, entrants, finished, buyin, cashed, date, player_id:user.id, place_id:place_id}: tour);
    setTournaments(newTournaments)
  }

  const logIn = (u) => {
    if(u){
      setUser(u);
      setLoginScreen(false);
      setCashgames(CASHGAME_DATA.filter(cash => cash.player_id === u.id));
      setTournaments(TOURNAMENT_DATA.filter(tour => tour.player_id === u.id));
    }
  }
  const signOut = () => {
    setTournaments(null);
    setCashgames(null);
    setUser(null);
    setLoginScreen(true);
  }
  const changeScreen = (screen) => {
    setCurrScreen(screen);
  }
  const settingsScreen = () => {
    setCurrScreen('Settings');
  }
  

  const logScreen = () => {
    return( 
      <div>
        <Login users={users} logIn={logIn} />
        <Footer />
      </div>
    )
  }
  const mainScreen = () => {
    return (
      <div>
        <MenuBar user={user} signOut={signOut} changeScreen={changeScreen} settings={settingsScreen}/>
        <div>
          {currScreen==='Tournaments' && <Tournaments tournaments={tournaments} user={user} saveTournament={saveTournament} places={places} />}
          {currScreen==='Cashgames' && <Cashgames cashgames={cashgames} user={user} saveCashgame={saveCashgame} places={places} />}
          {currScreen==='Places' && <Places places={places}/>}
          {currScreen==='Settings' && <UserSettings user={user} places={places}/>}
        </div>
        <Footer />
      </div>
    )
  }

  return (
    loginScreen ? logScreen() : mainScreen()
  );
}
export default App;
/*
*/