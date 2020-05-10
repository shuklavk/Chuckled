import React, {useRef} from 'react';
import styles from '../styles/UploadWithoutVideo.module.css';
// import {Card }

export default ({img}) => {

  // init();

  return (
    <div className={styles.uploadDiv}>
      <div className={`card rounded-lg ${styles.trial} container shadow`}>
        {/* <video id="video" className={styles.video} playsInline autoPlay ref={videoInput}>
        </video> */}
        <img  className={styles.displayImg} src={img} alt={"Image"} height={"42"} width={"42"} />
      </div>
    </div>
  )
}