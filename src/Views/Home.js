import React from 'react'
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import ListUnits from '../components/content/ListUnits';
import CheckToken from '../components/content/CheckToken';
import styles from '../components/content/mystyle.module.css'; 

/*this is the main page where the units are listed. 
there is also an add units button*/

 function Home(props) {
    return (
        <div>
            <CheckToken />
            <Header />
            <ListUnits units={props.units} />

            <Link to='/addnew'>
                <div className={ styles.boxstyle2 }>
                    <img src='' alt='img' className={ styles.iconStyle } />
                    <p>Add new unit +</p>
                </div></Link>
            
            
        </div>
    )
}

export default Home;