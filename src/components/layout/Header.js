import React from 'react';
import Navigation from './Navigation';
import styles from '../content/mystyle.module.css';

//default header view
// <img  src={require('../../images/alpomeheader3.jpg')} alt='alpomelogo' />

 function Header() {
     if (localStorage.getItem('token') !== null) {
        return (
            <header className={ styles.headerStyle }>
                <img className={ styles.logoStyle } src={require('../../images/alpomeheader3.jpg')} alt='alpomelogo' />
                <Navigation className={ styles.iconStyle } />
            </header>
        )
     } else {
        return (
            <header className={ styles.headerStyle }>
                <img className={ styles.logoStyle } src={require('../../images/alpomeheader3.jpg')} alt='alpomelogo' />
            </header>
        )
     }
}

export default Header;