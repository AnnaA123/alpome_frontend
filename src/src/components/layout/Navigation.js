import React, { useState } from 'react';
import { Link } from 'react-router-dom';

 function Navigation() {
     const [showMenu, setShowMenu] = useState(false)

     //HAMBURGER MENU (CLICK TO OPEN)
     let navMenu
     let navMenuMask

     if (showMenu) {
         navMenu = 
        <div 
        style={navStyle}>
            <h1 style={xClose} onClick={() => setShowMenu(false)}>X</h1>
            <ul>
                <li>
                    <Link to='/' style={navList} onClick={() => setShowMenu(false)}>Main</Link>
                </li>
                <li>
                    <Link to='/about' style={navList} onClick={() => setShowMenu(false)}>About</Link>
                </li>
                <li>
                    <Link to='/settings' style={navList} onClick={() => setShowMenu(false)}>Settings</Link>
                </li>
                <li>
                    <Link to='/login' style={navList} onClick={() => {
                        setShowMenu(false);
                        localStorage.clear();
                    }}>Log Out</Link>
                </li>
            </ul>
        </div>

        navMenuMask =
        <div style={maskStyle} onClick={() => setShowMenu(false)}></div>
     }

    return (
        <nav>
            <span style={white} onClick={() => setShowMenu(!showMenu)}>
                <ion-icon name="menu"></ion-icon>
            </span>

            { navMenuMask }

            { navMenu }
        </nav>

        
    )
}

//STYLING


const navStyle = {
    position: 'fixed',
    backgroundColor: '#004d00',
    top: '0',
    right: '0',
    height: '100%',
    width: '70%',
    zIndex: '50',
}

const xClose ={
    textAlign: 'right',
    padding: '5px',
    marginRight: '10px',
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
    zIndex: '50',
}

const white = {
    color: '#fff',
    fontSize: '46px',
    display: 'inline-block',
    verticalAlign: 'middle',
    lineHeight: 'normal',
}

export default Navigation;