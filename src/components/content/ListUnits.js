import React from 'react'
import { Link } from 'react-router-dom';

import styles from './mystyle.module.css'; 


/*this creates a new box for each unit on the main page

used in Home.js*/


 class ListUnits extends React.Component {

    
    render (){
        return this.props.units.map((unit) => {
            return <Link to={`/unit/${unit.unit_id}`}>
                <div className={ styles.boxstyle }>
                    <img src='' alt='img' className={ styles.iconStyle } />
                    <p>{ unit.nickname }</p>
                </div></Link>
        });
    }
    
}

export default ListUnits;