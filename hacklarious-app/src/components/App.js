import React, {useState, useEffect} from 'react';
import Upload from './Upload';
import styles from '../styles/App.module.css'
import logo from '../styles/logo.png'

function App() {
  const [currentTime, setCurrentTime] = useState(0);
  useEffect(() => {
    fetch("/api").then(res => res.json()).then(data => {
      setCurrentTime(data.hello)

    })
  })
  return (
    <div>
    <img src={logo} alt="logo" style={{width:"400px", height:"auto", margin:"20px 100px"}}/>
    <Upload />
    <div className={styles.buttonDiv}>
    <button type="button" className={`btn btn-lg btn-primary rounded-pill ${styles.button} shadow`}>Upload a Photo</button>
    <button type="button" className={`btn btn-lg btn-primary rounded-pill ${styles.button} shadow`}>Take a Photo</button>
    </div>
    </div>
  );
}

export default App;
