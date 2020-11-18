import React from 'react';
import checkTemp from '../CheckData';
import { getSingleUnit } from '../../util/GrowingUnitsAPI';
import { getAllData } from '../../util/supragardenAPI';
import styles from '../mystyle.module.css'; 


 class StatsTemp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            unit: '',
            data: [],
            loading: true,
        }
        
    }

    //gets unit info from the alpome db
    getUnit(id) {
        getSingleUnit(id).then(unit => {
            this.setState({
              unit
            }, () => {
              console.log('done!!! ');
            });
          });
     }

     //get current data for the supragarden unit from https://us-central1-amiable-hydra-279814.cloudfunctions.net/app/api/read
     getSupragarden() {
        getAllData().then(stats => {
            this.setState({
                data: stats[0].data,
                loading: false,
            }, () => {
                console.log('toimiiko tää????? ' + JSON.stringify(this.state.data));
            });
        });
    }

     componentDidMount() {
         this.getSupragarden();

     }

    render () {
        if(this.state.loading) {
            return <p>Loading...</p>
        } else {
            return (
                <div className={ styles.contain }>
                    <h1>Unit</h1>
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
                            <p className={ styles.smallText }>25C</p>
                        </div>
                    </div>
                    <p>graph</p>
        
                </div>
            )
        }
        
    }
    
}

export default StatsTemp;