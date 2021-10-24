import { useState } from 'react';
import './App.css';
import MainComponent from './components/MainComponent';
import Navbar from './components/Navbar';

function App() {
  const [view, setView] = useState('User')
  return (
    <div className="App">
      <Navbar id='0'/>
      <MainComponent view={view}/>
    </div>
  );
}

export default App;
