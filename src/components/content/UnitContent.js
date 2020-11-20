import React, { useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './mystyle.module.css'; 
import { getSingleUnit } from '../util/GrowingUnitsAPI';
import { getDayData } from '../util/supragardenAPI';
import CheckTemp from './CheckData';

//the content for Unitview.js

 class UnitContent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            unit: '',
            data: [],
            loading: true,
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
                        <Link to={`/unit/temperature/${this.state.unit.unit_id}`} unitId={this.state.unit.unit_id}>
                            <div className={ styles.boxstyle3 }>
                                <CheckTemp current={this.state.data.temp} min='22' max='30' />
                                
                                    <div>
                                        <p>temp</p>
                                        <p className={ styles.smallText }>{this.state.data.temp}</p>
                                    </div>
                                
                            </div>
                        </Link>
                        <Link to=''>
                            <div className={ styles.boxstyle3 }>
                                <CheckTemp current={this.state.data.tempW} min='18' max='25' />
                                
                                    <div>
                                        <p>Water Temperature</p>
                                        <p className={ styles.smallText }>{this.state.data.tempW}</p>
                                    </div>
                                
                            </div>
                        </Link>
                        <Link to=''>
                            <div className={ styles.boxstyle3 }>
                                <CheckTemp current={this.state.data.tvoc} min='22' max='30' />
                                
                                    <div>
                                        <p>tvoc</p>
                                        <p className={ styles.smallText }>{this.state.data.tvoc}</p>
                                    </div>
                                
                            </div>
                        </Link>
                        <Link to=''>
                            <div className={ styles.boxstyle3 }>
                                <CheckTemp current={this.state.data.co2} min='22' max='30' />
                                
                                    <div>
                                        <p>co2</p>
                                        <p className={ styles.smallText }>{this.state.data.co2}</p>
                                    </div>
                                
                            </div>
                        </Link>
                        <Link to=''>
                            <div className={ styles.boxstyle3 }>
                                <CheckTemp current={this.state.data.ph} min='22' max='30' />
                                
                                    <div>
                                        <p>ph</p>
                                        <p className={ styles.smallText }>{this.state.data.ph}</p>
                                    </div>
                                
                            </div>
                        </Link>
                        <Link to=''>
                            <div className={ styles.boxstyle3 }>
                                <CheckTemp current={this.state.data.h} min='22' max='30' />
                                
                                    <div>
                                        <p>h</p>
                                        <p className={ styles.smallText }>{this.state.data.h}</p>
                                    </div>
                                
                            </div>
                        </Link>
                        <Link to=''>
                            <div className={ styles.boxstyle3 }>
                                <CheckTemp current={this.state.data.ec} min='22' max='30' />
                                
                                    <div>
                                        <p>ec</p>
                                        <p className={ styles.smallText }>{this.state.data.ec}</p>
                                    </div>
                                
                            </div>
                        </Link>
                        <Link to=''>
                            <div className={ styles.boxstyle3 }>
                                <CheckTemp current={this.state.data.light} min='22' max='30' />
                                
                                    <div>
                                        <p>light</p>
                                        <p className={ styles.smallText }>{this.state.data.light}</p>
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