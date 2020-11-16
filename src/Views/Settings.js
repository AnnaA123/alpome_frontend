import React from 'react';
import Header from '../components/layout/Header';
import CheckToken from '../components/content/CheckToken';


 function Unitview() {
    return (
        <div>
            <CheckToken />
            <Header />
            <p>Here are the settings</p>
        </div>
    )
}

export default Unitview;