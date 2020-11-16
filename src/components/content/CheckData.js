import React from 'react';
import styles from './mystyle.module.css'; 


 function CheckTemp(props) {
     if (props.current >= props.min && props.current <= props.max) {
        return <div style={emoSmile}><ion-icon name="happy-outline" className={ styles.iconStyle }></ion-icon> </div>
     } else {
        return <div style={emoSmile}><ion-icon name="sad-outline"></ion-icon></div>
     }
    
}

//styling
const emoSmile = {
    fontSize: '50px',
    marginRight: '20px',
    marginTop: '10px',
}



export default CheckTemp;