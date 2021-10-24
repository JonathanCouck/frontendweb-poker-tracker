import { useState } from 'react';
import './App.css';
import MainComponent from './components/MainComponent';
import Navbar from './components/Navbar';
import USER_DATA from './data/user_mock'
import TOURNAMENT_DATA from './data/tournament_mock'
import CASHGAME_DATA from './data/cashgame_mock'

function App() {
  const [users, setUsers] = useState(USER_DATA);
  const [tournaments, setTournaments] = useState(TOURNAMENT_DATA);
  const [cashgames, setCashgames] = useState(CASHGAME_DATA);
  console.log(users)
  console.log(tournaments)
  console.log(cashgames)
  return (
    <div className="App">
      <Navbar id='0'/>
      <MainComponent/>
    </div>
  );
}

export default App;
