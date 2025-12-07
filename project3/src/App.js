import './App.css';
import React from 'react';
import spotifyLogo from './spotifyLogo.png';
import { useState } from 'react';


function App() {

    const [danceability, setDanceability] = useState(0.5);
    const [acousticness, setAcousticness] = useState(0.5);
    const [energy, setEnergy] = useState(0.5);
    const [instrumentalness, setInstrumentalness] = useState(0.5);
    const [liveness, setLiveness] = useState(0.5);
    const [loudness, setLoudness] = useState(0.5);
    const [speechiness, setSpeechiness] = useState(0.5);
    const [tempo, setTempo] = useState(0.5);

    const handleGenerate = () => {
       
        console.log("Generating recommendations with features:");
        console.log({
            danceability: danceability,
            acousticness: acousticness,
            energy: energy,
            instrumentalness: instrumentalness,
            liveness: liveness,
            loudness: loudness,
            speechiness: speechiness,
            tempo: tempo
        });
    };



  return (

    <div className="App">
      <p className = "title">
          Spotify Song Recommender
        </p>
      <header className="App-header">
        <img src={spotifyLogo} className="App-logo" alt="logo" />
        
  <div className="sliders-container"> 

  <div className="feature-block">
    <div className="feature-pill">
      Danceability
    </div>

    <div className="feature-value">
      {danceability}
    </div>

    <input
      type="range"
      min="0"
      max="1"
      step="0.01"
      value={danceability}
      onChange={(e) => setDanceability(e.target.value)}
      className="feature-slider"
    />


  </div>

  <div className="feature-block">
  <div className="feature-pill">Acousticness</div>
  <div className="feature-value">{acousticness}</div>
  <input
    type="range"
    min="0"
    max="1"
    step="0.01"
    value={acousticness}
    onChange={(e) => setAcousticness(e.target.value)}
    className="feature-slider"
  />
  </div>

  <div className="feature-block">
  <div className="feature-pill">Energy</div>
  <div className="feature-value">{energy}</div>
  <input
    type="range"
    min="0"
    max="1"
    step="0.01"
    value={energy}
    onChange={(e) => setEnergy(e.target.value)}
    className="feature-slider"
  />
</div>

<div className="feature-block">
  <div className="feature-pill">Instrumentalness</div>
  <div className="feature-value">{instrumentalness}</div>
  <input
    type="range"
    min="0"
    max="1"
    step="0.01"
    value={instrumentalness}
    onChange={(e) => setInstrumentalness(e.target.value)}
    className="feature-slider"
  />
</div>

</div>

<div className="sliders-container"> 
<div className="feature-block">
  <div className="feature-pill">Liveness</div>
  <div className="feature-value">{liveness}</div>
  <input
    type="range"
    min="0"
    max="1"
    step="0.01"
    value={liveness}
    onChange={(e) => setLiveness(e.target.value)}
    className="feature-slider"
  />
</div>

<div className="feature-block">
  <div className="feature-pill">Loudness</div>
  <div className="feature-value">{loudness}</div>
  <input
    type="range"
    min="0"
    max="1"
    step="0.01"
    value={loudness}
    onChange={(e) => setLoudness(e.target.value)}
    className="feature-slider"
  />
</div>

<div className="feature-block">
  <div className="feature-pill">Speechiness</div>
  <div className="feature-value">{speechiness}</div>
  <input
    type="range"
    min="0"
    max="1"
    step="0.01"
    value={speechiness}
    onChange={(e) => setSpeechiness(e.target.value)}
    className="feature-slider"
  />
</div>

<div className="feature-block">
  <div className="feature-pill">Tempo</div>
  <div className="feature-value">{tempo}</div>
  <input
    type="range"
    min="0"
    max="1"
    step="0.01"
    value={tempo}
    onChange={(e) => setTempo(e.target.value)}
    className="feature-slider"
  />
</div>
</div>

<button 
  className="generate-button" 
  onClick={handleGenerate}
>
  Generate Recommendations
</button>


  


      </header>
    </div>
  );
}

export default App;
