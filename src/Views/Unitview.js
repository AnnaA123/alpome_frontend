import React from 'react';
import Header from '../components/layout/Header';
import UnitContent from '../components/content/UnitContent';

//the page of info abt a specific unit by id


 function Unitview(props) {

    

    return (
        <div>
            <Header previous='' />
            <UnitContent units={props.units} />
        </div>
    )
}

export default Unitview;