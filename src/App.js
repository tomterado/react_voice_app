import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react'

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition 
const mic = new SpeechRecognition()

mic.continuous = true;
mic.interimResults = true;
mic.lang = 'en-US';



function App() {
  const [isListening, setListening] = useState(false);
  const [note, setNote] = useState(null);
  const [savedNotes, setSavedNotes] = useState([]);

  useEffect(() => {
    handleListen()
  }, [isListening])

  const handleSaveNote = () => {
    setSavedNotes([...savedNotes, note]);
    setNote('');
  }

  const handleListen = () => {
    if (isListening) {
      mic.start();
      mic.onend = () => {
        console.log('Continue .... ')
        mic.start()
      }
    } else {
      mic.stop();
      mic.onend = () => {
        console.log('Stop Mic .... ')
      }
    }
    mic.onstart = () => {
      console.log('Mic is on ... ')
    }

    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')
      console.log('Transcript', transcript)
      setNote(transcript)
      mic.onerror = event => {
        console.log(event.error)
      }
    }
}
  
  

  return (
    <div className="container">
      <div className="box"> 
        <h1>Current Note</h1>
        {isListening ? <span>🎙</span> : <span>🛑🎙</span>}
        <button onClick={handleSaveNote} disabled={!note}>Save Note</button>
        <button onClick={() => setListening(prevState => !prevState)}>Start/Stop</button>
        <p>{note}</p>
      </div>
      <div className="box"> 
        <h1> Notes</h1>
        {savedNotes.map((e,i) => (
          <p key={i}>{e}</p>
        ))}
      </div>
    </div>
  );
}

export default App;
