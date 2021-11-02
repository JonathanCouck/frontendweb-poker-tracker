import './App.css';
import { useState } from 'react';
import MenuBar from './component/menubar/MenuBar';
import Footer from './component/Footer';
import MainContent from './component/MainContent';
import Login from './component/Login';
import USER_DATA from './mock_data/user_mock';
import TOURNAMENT_DATA from './mock_data/tournament_mock';
import CASHGAME_DATA from './mock_data/cashgame_mock';
import PLACE_DATA from './mock_data/place_mock';

function App() {
  const [user, setUser] = useState(null);
  const [users] = useState(USER_DATA);
  const [tournaments, setTournaments] = useState(null);
  const [cashgames, setCashgames] = useState(null);
  const [places, setPlaces] = useState(PLACE_DATA);
  const [loginScreen, setLoginScreen] = useState(true);

  const saveCashgame = (id, small_blind, big_blind, in_for, out_for, date) => {
    console.log(id,small_blind,big_blind,in_for,out_for,date)
  }
  const saveTournament = (id, entrants, finished, buyin, cashed, date) => {
    console.log(id, entrants, finished, buyin, cashed, date)
  }
  const logIn = (u) => {
    if(u){
      setUser(u);
      setLoginScreen(false);
      setCashgames(CASHGAME_DATA.filter(cash => cash.player_id === u.id))
      setTournaments(TOURNAMENT_DATA.filter(tour => tour.player_id === u.id))
    }
  }
  const signOut = () => {
    setTournaments(null);
    setCashgames(null);
    setUser(null);
    setLoginScreen(true);
  }

  const logScreen = () => {
    return( <Login users={users} logIn={logIn} />)
  }
  const mainScreen = () => {
    return (
      <div>
        <MenuBar user={user} signOut={signOut} />
        <MainContent user={user} tournaments={tournaments} cashgames={cashgames} saveCashgame={saveCashgame} saveTournament={saveTournament} />
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