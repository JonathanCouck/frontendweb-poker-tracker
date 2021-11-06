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
  };

  const changeScreen = (screen) => {
    setCurrScreen(screen);
  };
  const settingsScreen = () => {
    setCurrScreen('Settings');
  };

  const addTournament = ( newTournament ) => {
    const newTournaments = tournaments;
    newTournaments[tournaments.length] = newTournament;
    setTournaments(newTournaments);
  };
  const editTournament = ( editedTournament ) => {
    const newTournaments = tournaments.map(tour => tour.id===editedTournament.id ? editedTournament : tour);
    setTournaments(newTournaments);
  };
  const deleteTournament = (id) => {
    const newTournaments = tournaments.filter(tour => tour.id !== id);
    setTournaments(newTournaments);
  };

  const addCashgame = ( newCashgame ) => {
    const newCashgames = cashgames;
    newCashgames[tournaments.length] = newCashgame;
    setTournaments(newCashgames);
  };
  const editCashgame = ( editedCashgame ) => {
    const newCashgames = cashgames.map(cash => cash.id===editedCashgame.id ? editedCashgame : cash);
    setCashgames(newCashgames)
  };
  const deleteCashgame = (id) => {
    const newCashgames = cashgames.filter(cash => cash.id !== id)
    setCashgames(newCashgames);
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