import React from 'react';
import styles from '../content/mystyle.module.css';

//header for login and signup pages (no nav)


 function Header2() {
    return (
        <header className={ styles.headerStyle }>
            <h1 style={logoStyle}>Alpome</h1>
        </header>
    )
}

//styling

const logoStyle = {
    width: '100%',
}


export default Header2;