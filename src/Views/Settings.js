import React from 'react';
import ChangeEmail from '../components/content/ChangeEmail';
import Header from '../components/layout/Header';
import CheckToken from '../components/content/CheckToken';
import DeleteUser from '../components/content/DeleteUser';
import styles from '../components/content/mystyle.module.css';

 function Unitview() {
    return (
        <div>
            <CheckToken />
            <Header />
            <div className={ styles.contain }><h1>Settings</h1></div>
            <ChangeEmail />
            <DeleteUser />
        </div>
    )
}

export default Unitview;