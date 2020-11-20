import React from 'react';
import checkTemp from '../CheckData';
import { getSingleUnit } from '../../util/GrowingUnitsAPI';
import { getDayData } from '../../util/supragardenAPI';
import styles from '../mystyle.module.css'; 


 class StatsTemp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            unit: '',
            data: [],
            loading: true,
            type: '',
        }
        this.getUnit = this.getUnit.bind(this);
        
    }

    //gets unit info from the alpome db
    getUnit(id) {
        console.log('props.unitid: ' + id);
        getSingleUnit(id).then(unit => {
            this.setState({
              unit
            });
          });
     }

     // get the date for getDayData()
     getToday() {
        const timeNow = new Date();
        const dateNow = timeNow.getFullYear() + '-' + (timeNow.getMonth() + 1) + '-' + timeNow.getDate();
        return dateNow;
    }

     //get current data for the supragarden unit from https://us-central1-amiable-hydra-279814.cloudfunctions.net/app/api/read
     getSupragarden() {
        getDayData(this.getToday()).then(stats => {
            this.setState({
                data: stats[0].data,
                loading: false,
            });
        });
    }

    getUnitId() {
        const located = window.location.href;
        const divided = located.split('/');
        const theId = divided[divided.length -1];
        return theId;
    }

    /*getUnitId() {
        console.log('window location href ' + window.location.href) 
    }*/

     componentDidMount() {
         // TODO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
         const unitId = this.getUnitId();

         this.getUnit(unitId);
         this.getSupragarden();
     }

    render () {
        if(this.state.loading) {
            return <p>Loading...</p>
        } else {
            return (
                <div className={ styles.contain }>
                    <h1>{this.state.unit.nickname}</h1>
                    <div className={ styles.boxstyle }>
                        Temperature
                    </div>
                    <div className={ styles.statBoxes }>
                        <div className={ styles.boxstyle4 }>
                            <p>Current</p>
                            <p className={ styles.smallText }>{this.state.data.temp} C</p>
                        </div>
                        <div className={ styles.boxstyle4 }>
                            <p>Goal</p>
                            <p className={ styles.smallText }>25 C</p>
                        </div>
                    </div>
                    <p>graph</p>
        
                </div>
            )
        }
    }
}

export default StatsTemp;