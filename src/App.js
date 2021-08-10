import logo from './logo.svg';
import './App.css';
import SoundPlayer from "./sound-player/index";
import {useEffect, useState} from 'react';

const initialState = [];

const api = "https://app.fakejson.com/q/4Xsxdy6s?token=94hEBwhPCWJS5epYIXSbww";
function App() {
  const [sounds, setSounds] = useState(initialState);

  useEffect(() => {
    fetch(api).then((res) => res.json()).then(data => setSounds(data.album));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <div className="container">
          <SoundPlayer list={sounds}></SoundPlayer>
        </div>
      </header>
    </div>
  );
}

export default App;
