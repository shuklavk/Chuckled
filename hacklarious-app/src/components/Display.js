import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom'
import Upload from './Upload';
import UploadWithoutVideo from './UploadWithoutVideo'
import styles from '../styles/Display.module.css';
import logo from '../styles/logo.png';
import axios from 'axios';

export default (props) => {
  const location = useLocation();

  const joke =  location.state.response;
  return (

    <div>
      <Link to="/">
        <img src={logo} alt="logo" style={{ width: "400px", height: "auto", margin: "20px 100px" }} />
      </Link>
      <UploadWithoutVideo img={props.img} />
      <div className={`${styles.buttonDiv} clearfix`}>
        <button type="button"
          className={`btn btn-lg btn-primary rounded-pill ${styles.button} shadow`}
        >
          {joke}
        </button>

        <Link to="/">
          <button type="button"
            className={`btn btn-lg btn-primary rounded-pill ${styles.backButton} shadow pull-right`}
          >
            Chuckle Me Again!
        </button>
        </Link>

      </div>
    </div>
  )
}