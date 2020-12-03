import React from 'react';
import Navigation from './Navigation';
import styles from '../content/mystyle.module.css';

//header with a back button, for UnitView.js, Addnew.js and others

/*
<header className={ styles.headerStyle }>
            <Link to={`/${props.previous}`} style={iconStyle}>BACK</Link>
            <h1 style={logoStyle}>Alpome</h1>
            <Navigation style={iconStyle} />
        </header>

*/


 function Header3(props) {
    return (
    <header className={ styles.headerStyle }>
        <img className={ styles.logoStyle } src={require('../../images/alpomeheader3.jpg')} alt='alpomelogo' />
        <Navigation className={ styles.iconStyle } />
    </header>
        
    )
}

//styling

const logoStyle = {
    width: '100%',
    maxWidth: '300px',
    right: '0',
    margin: 'auto',
    zIndex: '60',
}

const iconStyle = {
    width: '24px',
}


export default Header3;