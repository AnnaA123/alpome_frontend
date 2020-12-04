import React from 'react';
import Navigation from './Navigation';
import styles from '../content/mystyle.module.css';

/*default header view
first if/else checks if theres a token (to show menu or not),
second one checks screen width for banner design
*/

 function Header() {
     if (localStorage.getItem('token') !== null) {
         if(window.innerWidth <= 400) {
            return (
                <header className={ styles.headerStyle }>
                    <img className={ styles.logoStyle } src={require('../../images/alpomeheader3.jpg')} alt='alpomelogo' />
                    <Navigation className={ styles.iconStyle } />
                </header>
            )
         } else {
            return (
                <header className={ styles.headerStyle }>
                    <h1 className={ styles.logoStyle }>Alpome</h1>
                    <Navigation className={ styles.iconStyle } />
                </header>
            )
         }
        
     } else {
        if(window.innerWidth <= 400) {
            return (
                <header className={ styles.headerStyle }>
                    <img className={ styles.logoStyle } src={require('../../images/alpomeheader3.jpg')} alt='alpomelogo' />
                </header>
            )
        } else {
            return (
                <header className={ styles.headerStyle }>
                    <h1 className={ styles.logoStyle }>Alpome</h1>
                </header>
            )
        }
     }
}

export default Header;