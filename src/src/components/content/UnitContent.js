import React, { useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './mystyle.module.css'; 
import { getSingleUnit } from '../util/GrowingUnitsAPI';
import { getAllData } from '../util/supragardenAPI';
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
        
        

        console.log('HERE ARE THE CURRENT PROPS ' + JSON.stringify(this.props));
        console.log('AND HERE IS THE ID ' + JSON.stringify(this.props.match.params.unitid));
        console.log('image url: ' + JSON.stringify(this.state.unit.images));
        console.log('garden info: ' + JSON.stringify(this.state.data));
    }

    componentDidMount() {
        const unitId = this.props.match.params.unitid;
        
        this.getUnit(this.props.match.params.unitid);
        this.getSupragarden();
        
    }

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
                        <button onClick={this.handleClick}>click me</button>
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
                        <img src='' alt='mood' className={ styles.iconStyle }/>
                        <div>
                            <p>asdfg</p>
                            <p className={ styles.smallText }>idk</p>
                        </div>
                    </div>
                    <button onClick={this.handleClick}>click me</button>
                </div>
            )
        }
        
    }
    
    
}

export default UnitContent;