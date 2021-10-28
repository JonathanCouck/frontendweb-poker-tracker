import './App.css';
import Cashgame from './component/Cashgame';
import Tournament from './component/Tournament';
import CASHGAME_DATA from './mock_data/cashgame_mock';
import TOURNAMENT_DATA from './mock_data/tournament_mock';

function App() {
  return (
    <div className="App flex">
      <div>
        {TOURNAMENT_DATA.map(tour =>
          <Tournament {...tour} />
        )}
      </div>
      <div>
        {CASHGAME_DATA.map(cash =>
          <Cashgame {...cash} />
        )}
      </div>
    </div>
  );
}

export default App;
