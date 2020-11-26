import React from 'react';
import { withRouter } from 'react-router-dom'
import CheckTemp from '../CheckData';
import LineChart from '../LineChart';
import { graphDataType } from '../../util/globals';
import { getSingleUnit } from '../../util/GrowingUnitsAPI';
import { getDayData, getAllData } from '../../util/supragardenAPI';
import styles from '../mystyle.module.css'; 


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
        this.handleClick = this.handleClick.bind(this);
        
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

    // get the type of data thru props
    getType() {
        if (this.props.location.propperinos !== undefined) {
            this.setState({
                type: this.props.location.propperinos.type
            })
        } else {
            this.props.history.push('/');
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

    //test
    handleClick(event) {
        event.preventDefault();

        
        console.log('täälä propsit: ' + JSON.stringify(this.props.location.propperinos.type));
        console.log('ja täälä statet: ' + this.state.type);
        console.log('title and thing ' + this.state.title + this.state.xyz);
        console.log('here is the type in caps: ' + this.setGraphView());

    }

     componentDidMount() {
         // TODO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
         const unitId = this.getUnitId();

         this.getUnit(unitId);
         this.getSupragarden();
         this.getType();
         this.setDetails();
         getAllData().then((data) => this.setState({ readings: data }));
     }

     // TEST BUTTON: <button onClick={this.handleClick}>test</button>

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
                    </div>
    </div>
        
                </div>
            )
        }
    }
}

export default withRouter(StatsTemp);