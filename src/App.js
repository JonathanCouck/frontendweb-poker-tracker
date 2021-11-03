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
  const [tournaments, setTournaments] = useState([]);
  const [cashgames, setCashgames] = useState([]);
  const [places, setPlaces] = useState(PLACE_DATA);
  const [loginScreen, setLoginScreen] = useState(true);
  const [currScreen, setCurrScreen] = useState('Tournaments');

  const logIn = (u) => {
    setUser(u);
    setLoginScreen(false);
    setCashgames(CASHGAME_DATA.filter(cash => cash.player_id === u.id));
    setTournaments(TOURNAMENT_DATA.filter(tour => tour.player_id === u.id));
    setCurrScreen('Tournaments');
  };
  const signOut = () => {
    setCurrScreen('')
    setTournaments([]);
    setCashgames([]);
    setUser({});
    setLoginScreen(true);
    console.log()
  };

  const changeScreen = (screen) => {
    setCurrScreen(screen);
  };
  const settingsScreen = () => {
    setCurrScreen('Settings');
  };

  const addTournament = ( buyin, cashed, date, entrants, finished, place_id ) => {
    const newTournaments = tournaments;
    newTournaments[newTournaments.length]={ id:'ffabb1ef-6944-484e-a084-f3cbd26babd2', buyin:buyin, cashed:cashed, date:date, 
      entrants:entrants, finished:finished, place_id: place_id, player_id: user.id};
    setTournaments(newTournaments);
  };
  const editTournament = ( id, buyin, cashed, date, entrants, finished, place_id ) => {
    const newTournaments = tournaments.map(tour => tour.id===id? {
      id:id, player_id: user.id, place_id:place_id, entrants:entrants, finished:finished, buyin:buyin, cashed:cashed, date:date 
    }: tour);
    setTournaments(newTournaments);
  };
  const deleteTournament = (id) => {
    setTournaments(tournaments.map(tour => tour.id !== id));
  };

  const addCashgame = ( place_id, big_blind, small_blind, date, in_for, out_for ) => {
    const newCashgames = cashgames;
    newCashgames[newCashgames.length] = { id:'11111111-6944-484e-a084-f3cbd26babd2',  big_blind:big_blind, small_blind:small_blind, date:date, 
      in_for:in_for, out_for:out_for, place_id:place_id, player_id:user.id};
    setCashgames(newCashgames);
  };
  const editCashgame = ( id, place_id, small_blind, big_blind, in_for, out_for, date ) => {
    const newCashgames = cashgames.map(cash => cash.id===id? {
      id:id, player_id:user.id, place_id:place_id, small_blind:small_blind, big_blind:big_blind, in_for:in_for, out_for:out_for, date:date
    } : cash);
    setCashgames(newCashgames);
  };
  const deleteCashgame = (id) => {
    setCashgames(cashgames.map(cash => cash.id !== id));
  };

  const logScreen = () => {
    return( 
      <div>
        <Login users={users} logIn={logIn} />
        <Footer />
      </div>
    );
  }

  const mainScreen = () => {
    return (
      <div>
        <MenuBar user={user} signOut={signOut} changeScreen={changeScreen} settings={settingsScreen}/>
        <div>
          {currScreen==='Tournaments' && <Tournaments tournaments={tournaments} user={user} places={places} addTournament={addTournament} editTournament={editTournament} deleteTournament={deleteTournament} />}
          {currScreen==='Cashgames' && <Cashgames cashgames={cashgames} user={user} places={places} addCashgame={addCashgame} editCashgame={editCashgame} deleteCashgame={deleteCashgame} />}
          {currScreen==='Places' && <Places places={places} />}
          {currScreen==='Settings' && <UserSettings user={user} places={places}/>}
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    loginScreen ? logScreen() : mainScreen()
  );
}
export default App;