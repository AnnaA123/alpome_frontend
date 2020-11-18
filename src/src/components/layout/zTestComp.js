import React from 'react';
import Navigation from './Navigation';
import { Link } from 'react-router-dom';
import styles from '../content/mystyle.module.css';

//header with a back button, for UnitView.js, Addnew.js and others


 function Header3(props) {
    return (
        <header className={ styles.headerStyle }>
            <Link to={`/${props.previous}`} style={iconStyle}>BACK</Link>
            <h1 style={logoStyle}>Alpome</h1>
            <Navigation style={iconStyle} />
        </header>
    )
}

//styling

const logoStyle = {
    width: '100%',
    width: '200px',
    right: '0',
}

const iconStyle = {
    width: '24px',
}


export default Header3;