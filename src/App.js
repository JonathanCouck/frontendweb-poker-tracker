import './App.css';
import MenuBar from './component/menubar/MenuBar';
import Footer from './component/Footer';
import MainContent from './component/MainContent';

import USER_DATA from './mock_data/user_mock';

function App() {
  const user = USER_DATA[1];
  return (
    <div className="App">
      <div className="h-screen flex flex-nowrap">
        <div>
          <MenuBar user={user}/>
          <Footer className="justify-end" />
        </div>
      </div>
    </div>
  
  );
}
//<MainContent user={user} />
export default App;

/*
<div className="row-start-2 row-span-11 col-start-1 col-span-6 flex flex-col">
<Tournaments tournaments={TOURNAMENT_DATA}/>
<Cashgames cashgames={CASHGAME_DATA}/>
</div>
*/