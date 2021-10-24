import './App.css';
import User from './components/User.jsx'
import USER_DATA from './data/user_mock'

function App() {
  const user = USER_DATA[1];
  return (
    <div className="App">
      <User id={user.id} firstName={user.firstName} lastName={user.lastName}/> 
    </div>
  );
}

export default App;
