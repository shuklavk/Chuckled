import React, {useState, useEffect} from 'react';
import Upload from './Upload';

function App() {
  const [currentTime, setCurrentTime] = useState(0);
  useEffect(() => {
    fetch("/api").then(res => res.json()).then(data => {
      setCurrentTime(data.hello)

    })
  })
  return (
    <div>
    <h1>Logo</h1>
    <Upload />
    <h1>Buttons</h1>
    </div>
  );
}

export default App;
