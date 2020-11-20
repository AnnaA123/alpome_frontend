import React from 'react';
import Navigation from './Navigation';
import styles from '../content/mystyle.module.css';

//default header view

 function Header() {
     if (localStorage.getItem('token') !== null) {
        return (
            <header className={ styles.headerStyle }>
                <div style={iconStyle} />
                <h1 style={logoStyle}>Alpome</h1>
                <Navigation style={iconStyle} />
            </header>
        )
     } else {
        return (
            <header className={ styles.headerStyle }>
                <h1 style={emptyStyle}>Alpome</h1>
            </header>
        )
     }
}

//styling
const logoStyle = {
    width: '100%',
    width: '200px',
    right: '0',
}

const emptyStyle = {
    width: '100%',
}

const iconStyle = {
    width: '24px',
}

export default Header;