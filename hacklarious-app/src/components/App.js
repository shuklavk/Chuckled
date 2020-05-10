import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom';
import Upload from './Upload';
import Display from './Display'
import styles from '../styles/App.module.css';
import logo from '../styles/logo.png';
import axios from 'axios'

function App() {
  const history = useHistory();
  const video = document.getElementById('video');
  const [selectedFile, setSelectedFile] = useState(null);
  const [joke, setJoke] = useState("fmlvkdfmv");
  //Post request Link goes here ---------------------------
  const POST_IMAGE_URL = "http://45.79.199.42:8002/gimmeajoke";

  const fileSelectorHandle = (event) => {
    console.log(event.target.files);
    setSelectedFile(event.target.files[0]);
  }

  const fileUploadHandler = () => {
    const fd = new FormData();
    fd.append('file', selectedFile);
    return axios.post(POST_IMAGE_URL,
      fd
    )
      .then(resp => {
        console.log("Response from Uploaded Image: ", resp.data.results)
        setJoke(resp.data.results)
        history.push("/joke", { response: resp.data.results })
      })
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
    context.drawImage(videoInput.current, 0, 0, 900, 500);
    canvasRef.current.toBlob((blob) => {
      const formData = new FormData();
      formData.append('file', blob, 'filename.png');
    
      // Post via axios or other transport method
      axios.post(POST_IMAGE_URL, formData)
      .then((resp) => {
        history.push("/joke", { response: resp.data.results });
        console.log(resp)
      })
      .catch(err => console.log("Error with Uploading From Video:", err));
    })
    // const dataURI = canvasRef.current.toDataURL('image/jpeg');
    // var blob = dataURItoBlob(dataURI);
    // var fd = new FormData(document.forms[0]);
    // console.log(document.forms[0])
    // fd.append("file", blob);
    // // console.log(fd.file)
    // axios.post(POST_IMAGE_URL, fd)
    //   .then(resp => console.log("Response from Video Image: ", resp))
    //   .catch(err => {
    //     console.log("Error with Uploading From Video:", err);
    //   })
  }

  return (
      <div>
        <Link to="/">
        <img src={logo} alt="logo" style={{ width: "400px", height: "auto", margin: "20px 100px" }} />
        </Link>
        <Upload videoInput={videoInput} />
        <div className={styles.buttonDiv}>
          <button type="button"
            className={`btn btn-lg btn-primary rounded-pill ${styles.button} shadow`}
            onClick={snapshotUploadHandler}
          >
            Take a Photo
        </button>
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
    <canvas style={{ display: "none" }} id="canvas" width="640" height="480" ref={canvasRef}></canvas>

        </div>
      </div>
  );
}

export default App;
