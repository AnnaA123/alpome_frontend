import React from 'react';
import { withRouter } from 'react-router-dom'
import CheckTemp from './CheckData';
import LineChart from './LineChart';
import { graphDataType } from '../util/globals';
import { getSingleUnit } from '../util/GrowingUnitsAPI';
import { getAllData } from '../util/supragardenAPI';
import styles from './mystyle.module.css'; 

// shows data for any prop sent through UnitContent.js -> Temperature.js -> here (despite name. this was planned badly)
 class StatsTemp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            unit: '',
            data: [],
            loading: true,
            type: '',
            title: '',
            xyz: '',
            goal: '',
            minmax: {
                min: '',
                low: '',
                high: '',
                max: '',
            },
            readings: [],
        }
        this.getUnit = this.getUnit.bind(this);
        this.getType = this.getType.bind(this);
    }

    //gets unit info from the alpome db
    getUnit(id) {
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
        /* note to other devs: check the supragarden API. 
        it suddenly isn't giving daily data anymore, causing the app to crash
        
        getDayData(this.getToday()) */
        
        getAllData().then(stats => {
            if (stats[0] !== undefined) {
               this.setState({
                   data: stats[0].data,
                   loading: false,
               });
            } else {
                console.log('Error: Could not retrieve data');
            }
        });
    }

    getUnitId() {
        const located = window.location.href;
        const divided = located.split('/');
        const theId = divided[divided.length -1];
        return theId;
    }

    // get the type of data thru props
    getType() {
        if (this.props.location.propperinos !== undefined) {
            this.setState({
                type: this.props.location.propperinos.type
            })
        } else {
            this.props.history.push('/home');
        }
    }

    // sets the title, type of value and goal
    setDetails() {
        let currentType = '';
        let currentMinMax = '';
        if (this.props.location.propperinos !== undefined) {
            currentType = this.props.location.propperinos.type;
            currentMinMax = this.props.location.propperinos.minmax;
        };

        if(currentType === 'temp') {
            this.setState({
                title: 'Temperature',
                xyz: '°C',
                goal: '20',
                minmax: currentMinMax,
            })
        } else if (currentType === 'tempW') {
            this.setState({
                title: 'Water Temperature',
                xyz: '°C',
                goal: '20',
                minmax: currentMinMax,
            })
        } else if (currentType === 'ph') {
            this.setState({
                title: 'pH',
                xyz: '',
                goal: '5,75',
                minmax: currentMinMax,
            })
        } else if (currentType === 'h') {
            this.setState({
                title: 'Humidity',
                xyz: '%',
                goal: '80',
                minmax: currentMinMax,
            })
        } else if (currentType === 'ec') {
            this.setState({
                title: 'Electronic Conductivity',
                xyz: 'mS/cm',
                goal: '2,5',
                minmax: currentMinMax,
            })
        }
    }

    // get the corresponding graph from LineChart.js
    setGraphView = () => {
        const type = this.state.type;
        if(type === 'temp') {
            return 'TEMPERATURE';
        } else if (type === 'tempW') {
            return 'WATER_TEMPERATURE';
        } else if (type === 'ph') {
            return 'PH';
        } else if (type === 'h') {
            return 'HUMIDITY';
        } else if (type === 'ec') {
            return 'ELECTRICAL_CONDUCTIVITY';
        }
    }

     componentDidMount() {
         const unitId = this.getUnitId();
         this.getUnit(unitId);
         this.getSupragarden();
         this.getType();
         this.setDetails();
         getAllData().then((data) => this.setState({ readings: data }));
     }

    render () {
        if(this.state.loading) {
            return <div className={ styles.loading }>
            <div className={ styles.loadingText }>
                <ion-icon name="sync-outline" ></ion-icon>
                <p>Loading</p>
            </div></div>
        } else {
            return (
                <div className={ styles.contain }>
                    <h1>{this.state.unit.nickname}</h1>
                    <div className={ styles.boxstyle }>
                    <CheckTemp current={this.state.data[this.state.type]} 
                                min={this.state.minmax.min} low={this.state.minmax.low} high={this.state.minmax.high} max={this.state.minmax.max} />
                        {this.state.title}
                    </div>
                    <div className={ styles.statBoxes }>
                        <div className={ styles.boxstyle4 }>
                            <p>Current</p>
                            <p className={ styles.smallText }>{this.state.data[this.state.type]} {this.state.xyz}</p>
                        </div>
                        <div className={ styles.boxstyle4 }>
                            <p>Goal</p>
                            <p className={ styles.smallText }>{this.state.goal} {this.state.xyz}</p>
                        </div>
                    </div>
                    <div className="App">
        
                        <div className="chart" >
                        <LineChart graphReadings={this.state.readings} parameter={graphDataType[this.setGraphView()]}/>
                    </div></div>
                </div>
            )
        }
    }
}

export default withRouter(StatsTemp);