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
        <div 
        className={ styles.imgStyle }>
            <h1 style={xClose} onClick={() => setShowImg(false)}><ion-icon name="close-outline" style={xStyle}></ion-icon></h1>
            <img src={props.image.image_url} alt='none' />
            
            <h1 style={delStyle} onClick={() => 
                
                deleteImg(props.image.fileName, 'bearer ' + localStorage.getItem('token'), thisUnit).then(pic => {
                    console.log('pic deleted: ' + JSON.stringify(pic))
                    if (pic.error !== undefined) {
                        console.log('failed to delete image' + JSON.stringify(pic.error))
                    } else {
                        console.log('image deleted');
                        window.location.reload();
                    }
                })
                }><ion-icon name="trash-outline" style={trashStyle}></ion-icon></h1>
        </div>

        picMask =
        <div style={maskStyle} onClick={() => setShowImg(false)}></div>
     }

    return (
        <nav>
            <span style={white} onClick={() => setShowImg(!showImg)}>
                <img src={props.image.image_url} alt='img' className={ styles.smallImg }/>
            </span>

            { picMask }

            { pic }
        </nav>

        
    )
}

//STYLING
/*
const imgStyle = {
    position: 'fixed',
    top: '10%',
    bottom: '30%',
    right: '0',
    left: '0',
    maxWidth: '100%',
    maxHeight: '80%',
    zIndex: '100',
}
*/
const xClose ={
    position: 'fixed',
    textAlign: 'right',
    right: '0',
    padding: '5px',
    marginRight: '10px',
}

const delStyle ={
    position: 'fixed',
    textAlign: 'left',
    left: '0',
    bottom: '10px',
    padding: '5px',
    marginLeft: '10px',
}

const navList = {
    display: 'block',
    marginTop: '20px',
    padding: '20px',
    width: '100%',
    color: '#fff',
    fontSize: '20px',
    background: '#227D26',
    borderLeft: '6px solid',
    borderColor: '#003300',
}

const maskStyle = {
    position: 'fixed',
    backgroundColor: '#000',
    opacity: '0.3',
    top: '0',
    left: '0',
    height: '100%',
    width: '100%',
    zIndex: '100',
}

const white = {
    color: '#fff',
    fontSize: '46px',
    display: 'flex',
    verticalAlign: 'middle',
    lineHeight: 'normal',
}

const xStyle = {
    color: '#fff',
    fontSize: '46px',
    
    verticalAlign: 'middle',
    lineHeight: 'normal',
}

const trashStyle = {
    color: '#fff',
    fontSize: '46px',
    verticalAlign: 'middle',
    lineHeight: 'normal',
}

export default withRouter(ShowImage);