import './App.css';
import { useState } from 'react';
import MenuBar from './component/menubar/MenuBar';
import Footer from './component/Footer';
import MainContent from './component/MainContent';
import USER_DATA from './mock_data/user_mock';
import TOURNAMENT_DATA from './mock_data/tournament_mock';
import CASHGAME_DATA from './mock_data/cashgame_mock';
import PLACE_DATA from './mock_data/place_mock';

function App() {
  const [userIndex, setUserIndex] = useState(1);
  const [users] = useState(USER_DATA);
  const [tournaments, setTournaments] = useState(TOURNAMENT_DATA.filter(tour => tour.player_id === users[userIndex].id));
  const [cashgames, setCashgames] = useState(CASHGAME_DATA.filter(cash => cash.player_id === users[userIndex].id));
  const [places, setPlaces] = useState(PLACE_DATA);

  return (
    <div>
      <MenuBar user={users[userIndex]} userIndex={userIndex} />
      <MainContent user={users[userIndex]} tournaments={tournaments} cashgames={cashgames} />
      <Footer />
    </div>
  );
}
export default App;
/*
      */