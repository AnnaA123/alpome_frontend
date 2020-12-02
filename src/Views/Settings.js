import React from 'react';
import ChangeEmail from '../components/content/ChangeEmail';
import Header from '../components/layout/Header';
import CheckToken from '../components/content/CheckToken';
import DeleteUser from '../components/content/DeleteUser';


 function Unitview() {
    return (
        <div>
            <CheckToken />
            <Header />
            <h1>Settings</h1>
            <ChangeEmail />
            <DeleteUser />
        </div>
    )
}

export default Unitview;