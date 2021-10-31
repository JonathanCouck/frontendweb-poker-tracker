import './App.css';
import MenuBar from './component/menubar/MenuBar';
import USER_DATA from './mock_data/user_mock';
import Footer from './component/Footer';
import MainContent from './component/MainContent';
import UserBar from './component/UserBar';

function App() {
  const user = USER_DATA[1];
  return (
    <div className="App">
      <div className="h-screen flex flex-nowrap">
        <div className="w-5/6">
          <MenuBar className="" />
          <MainContent className="" user={user}/>
        </div>
        <div className="w-1/6">
          <UserBar {...user}/>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  
  );
}
//<Footer />
export default App;

/*
<div className="row-start-2 row-span-11 col-start-1 col-span-6 flex flex-col">
<Tournaments tournaments={TOURNAMENT_DATA}/>
<Cashgames cashgames={CASHGAME_DATA}/>
</div>
*/