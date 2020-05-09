import React, {useState, useEffect, useRef} from 'react';
import Upload from './Upload';
import styles from '../styles/App.module.css';
import logo from '../styles/logo.png';
import axios from 'axios'

function App() {
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  //Post request Link goes here ---------------------------
  const POST_IMAGE_URL = "";

  useEffect(() => {
    fetch("/api").then(res => res.json()).then(data => {
      setCurrentTime(data.hello)

    })
  })

  const fileSelectorHandle = (event) => {
    setSelectedFile(event.target.files[0]);
  }

  const fileUploadHandler = () => {
    const fd = new FormData();
    fd.append('image', selectedFile, selectedFile.name);
    axios.post(POST_IMAGE_URL, fd)
    .then(resp => console.log(resp))
    .catch(err => {
      console.log("Error with Uploading:", err);
    })
  }

  const fileInput = useRef(null);

  return (
    <div>
    <img src={logo} alt="logo" style={{width:"400px", height:"auto", margin:"20px 100px"}}/>
    <Upload />
    <div className={styles.buttonDiv}>
    <input 
      style={{display:"none"}}
      type="file" 
      onChange={fileSelectorHandle}
      ref={fileInput}
    />
    <button type="button" 
      className={`btn btn-lg btn-primary rounded-pill ${styles.button} shadow`}
      onClick ={() => {fileInput.current.click()}}
    >
      Choose a Photo
    </button>

    <button type="button" 
      className={`btn btn-lg btn-primary rounded-pill ${styles.button} shadow`}
      onClick= {fileUploadHandler}
    >
      Upload
    </button>
    <button type="button" className={`btn btn-lg btn-primary rounded-pill ${styles.button} shadow`}>Take a Photo</button>
    </div>
    </div>
  );
}

export default App;
