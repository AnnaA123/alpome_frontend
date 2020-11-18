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
            }, () => {
              console.log('(statstemp) UNIT HAS BEEN SET' + JSON.stringify(this.state.unit));
            });
          });
     }

     //get current data for the supragarden unit from https://us-central1-amiable-hydra-279814.cloudfunctions.net/app/api/read
     getSupragarden() {
        getAllData().then(stats => {
            this.setState({
                data: stats[0].data,
                loading: false,
            });
        });
    }

     componentDidMount() {
         // TODO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
         this.getUnit(this.props.match.params.id);
         this.getSupragarden();
         console.log('HERE ARE THE CURRENT PROPS ' + JSON.stringify(this.props));
         console.log('MATCH PROPS: ' + JSON.stringify(this.props.match.params.id));
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