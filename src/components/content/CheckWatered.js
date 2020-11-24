import React from 'react';
import styles from './mystyle.module.css'; 


/* checks if the current value is good for plants/unit and returns either a happy or a sad face
used in UnitContent.js and StatsTemp.js */
 function CheckWatered(props) {
     const situation = props.w_freq - (props.today - props.last_watered);
     if (situation <= 1800000) {
        return <div style={emoSmile}><ion-icon name="happy-outline" className={ styles.iconStyle }></ion-icon> </div>
     } else if (situation > 1800000) {
        return <div style={emoSmile}><ion-icon name="sad-outline" className={ styles.iconStyle }></ion-icon></div>
     } else {
      return <div style={emoSmile}><ion-icon name="skull-outline" className={ styles.iconStyle }></ion-icon></div>
     }
}

//styling
const emoSmile = {
    fontSize: '50px',
    marginRight: '20px',
    marginTop: '10px',
}

export default CheckWatered;