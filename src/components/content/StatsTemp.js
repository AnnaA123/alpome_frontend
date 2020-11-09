import React from 'react';
import styles from './mystyle.module.css'; 


 function StatsTemp() {
    return (
        <div className={ styles.contain }>
            <h1>Unit</h1>
            <div className={ styles.boxstyle }>
                Temperature
            </div>
            <div className={ styles.statBoxes }>
                <div className={ styles.boxstyle4 }>
                    <p>Current</p>
                    <p className={ styles.smallText }>25C</p>
                </div>
                <div className={ styles.boxstyle4 }>
                    <p>Goal</p>
                    <p className={ styles.smallText }>25C</p>
                </div>
            </div>
            <p>graph</p>

        </div>
    )
}

export default StatsTemp;