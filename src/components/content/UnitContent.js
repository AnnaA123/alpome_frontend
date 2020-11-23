import React, { useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './mystyle.module.css'; 
import { getSingleUnit } from '../util/GrowingUnitsAPI';
import { getDayData } from '../util/supragardenAPI';
import CheckTemp from './CheckData';

/* the content for Unitview.js 
NOTE: minmax values are currently hardcoded into the state, and are sent through props to StatsTemp */

 class UnitContent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            unit: '',
            data: [],
            loading: true,
            minmax: {
                temp: {
                    min: '10',
                    low: '16',
                    high: '24',
                    max: '30'
                },
                tempW: {
                    min: '10',
                    low: '16',
                    high: '24',
                    max: '30'
                },
                ph: {
                    min: '3.5',
                    low: '5',
                    high: '6.5',
                    max: '8'
                },
                h: {
                    min: '50',
                    low: '70',
                    high: '90',
                    max: '110'
                },
                ec: {
                    min: '1',
                    low: '1.5',
                    high: '3.5',
                    max: '4'
                },
            }
        }
        
        this.handleClick = this.handleClick.bind(this);
    }

    //gets unit info from the alpome db and saves it to the state
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
        console.log('current date: ' + dateNow);
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
     
     // gets the units id from the url (then go to getUnit())
     getUnitId() {
        const located = window.location.href;
        const divided = located.split('/');
        const theId = divided[divided.length -1] 
        return theId;
    }
    
    //posts iimage to unit at GrowingUnitsAPI.js
    handleImgSubmit = (evt) => {
        const fd = new FormData();
        // TODO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    }

     //test
     handleClick(event) {
        event.preventDefault();
        console.log('today: ' + this.getToday());

        console.log('window.location.href ' + window.location.href);
        console.log('HERE ARE THE CURRENT PROPS ' + JSON.stringify(this.props));
        console.log('AND HERE IS THE ID ' + JSON.stringify(this.props.match.params.unitid));
        console.log('image url: ' + JSON.stringify(this.state.unit.images));
        console.log('garden info: ' + JSON.stringify(this.state.data));
    }

    componentDidMount() {
        const unitId = this.getUnitId();
        
        this.getUnit(unitId);
        this.getSupragarden();
        
    }

    // TEST BUTTON: <button onClick={this.handleClick}>test</button>

    render () {
        if (this.state.unit.supragarden === true) {
            if(this.state.loading) {
                return <p>Loading...</p>
            } else {
                return (
                    <div className={ styles.contain }>
                        <img src={image => {
                            if (this.state.unit.images.image_url !== null){
                                return this.state.unit.images.image_url;
                            } else {
                                return '';
                            }
                        }} alt='No image' className={styles.topImg} />
    
                        <h1>{this.state.unit.nickname}</h1>
                        <button onClick={this.handleClick}>test</button>
                        <Link to={{
                            pathname: `/unit/temperature/${this.state.unit.unit_id}`,
                            propperinos: { type: 'temp', minmax: this.state.minmax.temp }
                        }} unitId={this.state.unit.unit_id} type='temp'>
                            <div className={ styles.boxstyle3 }>
                                <CheckTemp current={this.state.data.temp} 
                                min={this.state.minmax.temp.min} low={this.state.minmax.temp.low} high={this.state.minmax.temp.high} max={this.state.minmax.temp.max} />
                                
                                    <div>
                                        <p>Temperature</p>
                                        <p className={ styles.smallText }>{this.state.data.temp} C</p>
                                    </div>
                            </div>
                        </Link>
                        <Link to={{
                            pathname: `/unit/temperature/${this.state.unit.unit_id}`,
                            propperinos: { type: 'tempW', minmax: this.state.minmax.tempW }
                        }}>
                            <div className={ styles.boxstyle3 }>
                                <CheckTemp current={this.state.data.tempW} 
                                min={this.state.minmax.tempW.min} low={this.state.minmax.tempW.low} high={this.state.minmax.tempW.high} max={this.state.minmax.tempW.max} />
                                
                                    <div>
                                        <p>Water Temperature</p>
                                        <p className={ styles.smallText }>{this.state.data.tempW} C</p>
                                    </div>
                            </div>
                        </Link>
                        <Link to={{
                            pathname: `/unit/temperature/${this.state.unit.unit_id}`,
                            propperinos: { type: 'ph', minmax: this.state.minmax.ph }
                        }}>
                            <div className={ styles.boxstyle3 }>
                                <CheckTemp current={this.state.data.ph} 
                                min={this.state.minmax.ph.min} low={this.state.minmax.ph.low} high={this.state.minmax.ph.high} max={this.state.minmax.ph.max} />
                                
                                    <div>
                                        <p>PH</p>
                                        <p className={ styles.smallText }>{this.state.data.ph} </p>
                                    </div>
                            </div>
                        </Link>
                        <Link to={{
                            pathname: `/unit/temperature/${this.state.unit.unit_id}`,
                            propperinos: { type: 'h', minmax: this.state.minmax.h }
                        }}>
                            <div className={ styles.boxstyle3 }>
                                <CheckTemp current={this.state.data.h} 
                                min={this.state.minmax.h.min} low={this.state.minmax.h.low} high={this.state.minmax.h.high} max={this.state.minmax.h.max} />
                                
                                    <div>
                                        <p>Humidity</p>
                                        <p className={ styles.smallText }>{this.state.data.h} %</p>
                                    </div>
                            </div>
                        </Link>
                        <Link to={{
                            pathname: `/unit/temperature/${this.state.unit.unit_id}`,
                            propperinos: { type: 'ec', minmax: this.state.minmax.ec }
                        }}>
                            <div className={ styles.boxstyle3 }>
                                <CheckTemp current={this.state.data.ec} 
                                min={this.state.minmax.ec.min} low={this.state.minmax.ec.low} high={this.state.minmax.ec.high} max={this.state.minmax.ec.max} />
                                
                                    <div>
                                        <p>Electronic Conductivity</p>
                                        <p className={ styles.smallText }>{this.state.data.ec} mS/cm</p>
                                    </div>
                            </div>
                        </Link>
                    </div>
                )
            }
            
        } else {
            return (
                <div className={ styles.contain }>
                    <img src={image => {
                        if (this.state.unit.images.image_url !== null){
                            return this.state.unit.images.image_url;
                        } else {
                            return '';
                        }
                    }} alt='No image' className={styles.topImg} />
                    <h1>{this.state.unit.nickname}</h1>
                    <div className={ styles.boxstyle3 }>
                        <div>
                            <p>Information</p>
                            <p className={ styles.smallText }>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default UnitContent;