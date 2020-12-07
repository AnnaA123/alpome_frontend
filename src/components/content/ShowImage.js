import React, { useState } from 'react';
import styles from './mystyle.module.css';
import { deleteImg } from '../util/GrowingUnitsAPI';
import { withRouter } from 'react-router-dom';

 function ShowImage(props) {
     const [showImg, setShowImg] = useState(false)

     //HAMBURGER MENU (CLICK TO OPEN)
     let pic
     let picMask
     const thisUnit = props.unitid

     // TODO: clicking the trashcan deletes the image
     if (showImg) {
         pic = 
        <div className={ styles.imgStyle }>
            <div style={iconsStyle}>
            <h1 style={delStyle} onClick={() => 
                deleteImg(props.image.fileName, 'bearer ' + localStorage.getItem('token'), thisUnit).then(pic => {
                    console.log('pic deleted: ' + JSON.stringify(pic))
                    if (pic.error !== undefined) {
                        console.log(pic.error);
                    } else {
                        window.location.reload();
                    }})
                }><ion-icon name="trash-outline"  style={trashStyle}></ion-icon></h1>
            <h1 style={xClose} onClick={() => setShowImg(false)}><ion-icon name="close-outline" style={xStyle}></ion-icon></h1>
            </div>
            <img className={ styles.imgSize } src={props.image.image_url} alt='none' />
        </div>

        picMask =
        <div className={ styles.maskStyle } onClick={() => setShowImg(false)}></div>
     }

    return (
        <div>
            <span style={listImg} onClick={() => setShowImg(!showImg)}>
                <img src={props.image.image_url} alt='img' className={ styles.smallImg }/>
            </span>
            { picMask }
            { pic }
        </div>
    )
}
//STYLING
const iconsStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '400px',
}
/* x to close the image */
const xClose ={
    textAlign: 'right',
    right: '0',
    padding: '5px',
    marginRight: '20px',
}
const xStyle = {
    color: '#fff',
    fontSize: '46px',
    verticalAlign: 'middle',
    lineHeight: 'normal',
}

/* trash icon to delete the image */
const delStyle ={
    textAlign: 'left',
    bottom: '10px',
    padding: '5px',
    marginLeft: '10px',
}
const trashStyle = {
    color: '#fff',
    fontSize: '46px',
    verticalAlign: 'middle',
    lineHeight: 'normal',
}

/* small version of image in a list */
const listImg = {
    color: '#fff',
    fontSize: '46px',
    display: 'flex',
    verticalAlign: 'middle',
    lineHeight: 'normal',
}

export default withRouter(ShowImage);