import './App.css';
import MenuBar from './component/menubar/MenuBar';
import CASHGAME_DATA from './mock_data/cashgame_mock';
import TOURNAMENT_DATA from './mock_data/tournament_mock';
import Tournaments from './component/tournaments/Tournaments';
import Cashgames from './component/cashgames/Cashgames';

function App() {
  return (
    <div className="App grid grid-rows-12">
      <MenuBar className="row-start-1 row-span-1"/>
      <div className="row-start-2 row-span-11 flex flex-col">
        <Tournaments tournaments={TOURNAMENT_DATA}/>
        <Cashgames cashgames={CASHGAME_DATA}/>
      </div>
    </div>
  );
}

export default App;