import React from 'react'
import styles from './mystyle.module.css'; 

//used in About.js
 function AboutText() {
    return (
        <div className={styles.infoBox}>
            <h1>About Monap</h1>
            <p>
            We are a monitoring software builder company that enters
            the market with a first contract for a hydroponic garden
            monitoring application and after have made agreements
            with shops and websites to evolve this last one that expects
            to reach others markets in a few years like home security
            systems.
            </p>
        </div>
    )
}

export default AboutText;