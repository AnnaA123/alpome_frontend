import React from 'react'
import Header from '../components/layout/Header';
import AddUnit from '../components/content/AddUnit';
import CheckToken from '../components/content/CheckToken';

 function Addnew() {
    return (
        <div>
            <CheckToken />
            <Header previous='' />
            <AddUnit />
        </div>
    )
}

export default Addnew;