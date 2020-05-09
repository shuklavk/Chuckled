import React, {useRef} from 'react';
import styles from '../styles/Upload.module.css';
// import {Card }

export default () => {
  const videoInput = useRef(null);
  const video = document.getElementById('video');
  const errorMsgElement = document.getElementById('span#ErrorMsg');
  const constraints = {
    // audio: true,
    video :{
      width: '400px', heigher: '400px'
    }
  }

  const init = async () => {
    try{
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      handleSuccess(stream);
    }
    catch(e){
      console.log('error')
      // errorMsgElement.innerHTML = `navigator.getUserMedia.error:${e.toString()}`;
    }
  }

  const  handleSuccess = (stream) => {
    window.stream = stream;
    videoInput.current.srcObject = stream;
  }

  init();

  return (
    <div className={styles.uploadDiv}>
      <div className={`card rounded-lg ${styles.trial} container shadow`}>
        <video id="video" className={styles.video} playsInline autoPlay ref={videoInput}>
        </video>
      </div>
    </div>
  )
}