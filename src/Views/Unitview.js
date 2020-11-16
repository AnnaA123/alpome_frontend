import React from 'react';
import Header from '../components/layout/Header';
import UnitContent from '../components/content/UnitContent';
import CheckToken from '../components/content/CheckToken';

//the page of info abt a specific unit by id


 function Unitview(props) {

    

    return (
        <div>
            <CheckToken />
            <Header previous='' />
            <UnitContent units={props.units} {...props} />
        </div>
    )
}

export default Unitview;