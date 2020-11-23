import React from 'react';
import styles from './mystyle.module.css'; 


/* checks if the current value is good for plants/unit and returns either a happy or a sad face
used in UnitContent.js and StatsTemp.js */
 function CheckTemp(props) {
    console.log('here are the CheckData.js props: ' + JSON.stringify(props));
     if (props.current >= props.low && props.current <= props.high) {
        return <div style={emoSmile}><ion-icon name="happy-outline" className={ styles.iconStyle }></ion-icon> </div>
     } else if (props.current >= props.min && props.current <= props.max) {
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



export default CheckTemp;