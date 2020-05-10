import React, { useState, useEffect, useRef } from 'react';
import Upload from './Upload';
import styles from '../styles/App.module.css';
import logo from '../styles/logo.png';
import axios from 'axios'

function App() {
  const video = document.getElementById('video');
  // const [currentTime, setCurrentTime] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  //Post request Link goes here ---------------------------
  const POST_IMAGE_URL = "http://45.79.199.42:8002/gimmeajoke";

  // useEffect(() => {
  //   fetch("/api").then(res => res.json()).then(data => {
  //     setCurrentTime(data.hello)

  //   })
  // })

  const fileSelectorHandle = (event) => {
    console.log(event.target.files);
    setSelectedFile(event.target.files[0]);
  }

  const fileUploadHandler = () => {
    const fd = new FormData();
    fd.append('file', selectedFile);
    return axios.post(POST_IMAGE_URL,
      fd,
      // {
      //   headers: {
      //     'content-type': 'application/x-www-form-urlencoded'
      //   }
      // }
    )
      .then(resp => console.log("Response from Uploaded Image: ", resp))
      .catch(err => {
        console.log("Error with Uploading:", err);
      })
  }

  const fileInput = useRef(null);
  const canvasRef = useRef(null);
  const videoInput = useRef(null);

  const dataURItoBlob = (dataURI) => {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
    else
      byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
  }

  const snapshotUploadHandler = () => {
    let context = canvasRef.current.getContext('2d');
    // console.log(videoInput)
    context.drawImage(videoInput.current, 0, 0, 688, 398);
    const dataURI = canvasRef.current.toDataURL('image/jpeg');
    var blob = dataURItoBlob(dataURI);
    var fd = new FormData(document.forms[0]);
    fd.append("file", blob);
    axios.post(POST_IMAGE_URL, fd)
      .then(resp => console.log("Response from Video Image: ", resp))
      .catch(err => {
        console.log("Error with Uploading From Video:", err);
      })
  }

  return (
    <div>
      <img src={logo} alt="logo" style={{ width: "400px", height: "auto", margin: "20px 100px" }} />
      <Upload videoInput={videoInput} />
      <div className={styles.buttonDiv}>
        <button type="button"
          className={`btn btn-lg btn-primary rounded-pill ${styles.button} shadow`}
          onClick={snapshotUploadHandler}
        >
          Take a Photo
        </button>
        {/* <form action="http://45.79.199.42:8002/gimmeajoke" method="POST"
          encType="multipart/form-data"> */}
          <input
            style={{ display: "none" }}
            name="file"
            type="file"
            onChange={fileSelectorHandle}
            ref={fileInput}
          />

          <button type="button"
            className={`btn btn-lg btn-primary rounded-pill ${styles.button} shadow`}
            onClick={() => { fileInput.current.click() }}
          >
            Upload a Photo
    </button>

          <button type="button"
            className={`btn btn-lg btn-primary rounded-pill ${styles.chuckleButton} shadow`}
          onClick={fileUploadHandler}
          >
            Chuckle Me!
    </button>
        {/* </form> */}
        <canvas style={{ display: "none" }} ref={canvasRef} id="canvas" width="640" height="480" />
      </div>
    </div>
  );
}

export default App;
