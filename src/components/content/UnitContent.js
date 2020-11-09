import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import styles from './mystyle.module.css'; 

//the content for Unitview.js

 function UnitContent (props, { match }){
/*
    useEffect(() => {
        fetchUnit();
        console.log(match);
    }, []); 

    const [unit, setUnit] = useState({});

    const fetchUnit = async () => {
        const fetchUnit = await fetch(`/unit/${match.units.unit_id}`);
        const unit = await fetchUnit.json();

        console.log(unit);
    }
    */

    return (
        <div className={ styles.contain }>
            {console.log('match: ' + match)}
            <h1>{props.units[0].nickname}</h1>
            <div className={ styles.boxstyle3 }>
                <img src='' alt='mood' className={ styles.iconStyle }/>
                <Link to='/unit/temperature/1'>
                    <div>
                        <p>Temperature</p>
                        <p className={ styles.smallText }>25C</p>
                    </div>
                </Link>
                
            </div>
            <div className={ styles.boxstyle3 }>
                <img src='' alt='mood' className={ styles.iconStyle }/>
                <div>
                    <p>asdfg</p>
                    <p className={ styles.smallText }>idk</p>
                </div>
            </div>
            <div className={ styles.boxstyle3 }>
                <img src='' alt='mood' className={ styles.iconStyle }/>
                <div>
                    <p>asdfg</p>
                    <p className={ styles.smallText }>idk</p>
                </div>
            </div>
        </div>
    )
    
}

export default UnitContent;