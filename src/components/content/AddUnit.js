import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { addNewUnit } from '../util/GrowingUnitsAPI';
import styles from './mystyle.module.css'; 

/* for adding a new unit
used in Addnew.js*/

/* NOTE: THIS IS STILL IN UNDER CONSTRUCTION BCS BACKEND ISNT GETTING CORRECT INFO FOR SOME REASON */

class AddUnit extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            unit: {
                nickname: '',
                common_names: [],
                location: '',
                supragarden: false,
                last_watered: null,
                watering_frequency: null,
                data_source: null,
                owner: localStorage.getItem('currentUser'),
                shared_access: [],
                stream_url: '',
                images: []
            },
            wfDdNum: 1,
            wfDdVal: 'days',

            formToggler: false,
            errorMessage: '',
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleTest = this.handleTest.bind(this);
    }
    
    handleChange = (event) => {   

        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState((prevState) => ({
            unit: {
                ...prevState.unit,
                [name]: value,
            },
        }));
    }

    toggleForm = (previous) => {
        this.setState((prevState) => ({
            unit: {
                ...prevState.unit,
                supragarden: !previous,
            },
            formToggler: !previous,
        }));
        
    }

    // watering frequency shenanigans
    wateringFreqCalc = () => {
        let wfms = 0;

        if(this.state.wfDdVal === 'hours'){
            wfms = (this.state.wfDdNum * 60 * 60 * 1000);
            this.setState((prevState) => ({
                unit: {
                    ...prevState.unit,
                    watering_frequency: wfms,
                },
            }));
            return this.state.unit;
        } else if (this.state.wfDdVal === 'days') {
            wfms = (this.state.wfDdNum * 24 * 60 * 60 * 1000);
            this.setState((prevState) => ({
                unit: {
                    ...prevState.unit,
                    watering_frequency: wfms,
                },
            }));
            return this.state.unit;
        } else if (this.state.wfDdVal === 'weeks') {
            wfms = (this.state.wfDdNum * 7 * 24 * 60 * 60 * 1000);
            this.setState((prevState) => ({
                unit: {
                    ...prevState.unit,
                    watering_frequency: wfms,
                },
            }));
            return this.state.unit;
        } else if (this.state.wfDdVal === 'months') {
            wfms = (this.state.wfDdNum * 30 * 24 * 60 * 60 * 1000);
            this.setState((prevState) => ({
                unit: {
                    ...prevState.unit,
                    watering_frequency: wfms,
                },
            }));
            return this.state.unit;
        } else {
            this.setState((prevState) => ({
            unit: {
                    ...prevState.unit,
                    watering_frequency: null,
                },
            }));
            return this.state.unit;
        }
    }
    
    onNumSelect = (event) => {
        event.preventDefault();
        this.setState({
            wfDdNum: event.target.value
        },
        this.wateringFreqCalc
        );
    }

    onValSelect = (event) => {
        event.preventDefault();
        this.setState({
            wfDdVal: event.target.value
        },
        this.wateringFreqCalc
        );

        
    }

    // supragarden true/false toggle button
    handleClick =(event) => {
        event.preventDefault();
        this.toggleForm(this.state.formToggler);
    }

    //test
    handleTest(event) {
        event.preventDefault();

        this.wateringFreqCalc();
        console.log('heres the numbers (from addunit): ' + JSON.stringify(this.state.unit));

    }

    /* 
    this.wateringFreqCalc();
        console.log('pls work: ' + JSON.stringify(this.state.unit));
    */

    // submit the whole form
    handleSubmit = (event) => {
        event.preventDefault();

        


        const unit = {...this.state.unit};
        
        console.log('here it is: ' + this.state.unit.watering_frequency);

        addNewUnit(unit, localStorage.getItem('token')).then(unit => {
            console.log('msg from AddUnit: ' + JSON.stringify(unit));
            console.log(' here is the state ' + JSON.stringify(this.state.unit));
            if (unit.error !== undefined) {
                this.setState({ errorMessage: 'Cannot add unit.' })
            } else {
                this.props.history.push('/');
            }
        })
    }

    /* the if/else statement changes input and state depending on whether the unit is connected to a 
    supragarden or not supragarden has a data source while a normal unit has watering frequency*/

    // TEST BUTTON: <button onClick={this.handleClick}>test</button>

    render () {
        if (this.state.formToggler === true) { 
            return <div className={styles.fullFormStyle}>
            <h1>Add New Unit</h1>
            <form onSubmit={this.handleSubmit}>
                <label>Nickname</label>
                <input 
                    type="text" 
                    value={this.state.nickname}
                    onChange={this.handleChange} 
                    name="nickname"/>
                <label>Location</label>
                <input 
                    type="text" 
                    value={this.state.location}
                    onChange={this.handleChange} 
                    name="location"/>
                
                
                <label>
                    <button onClick={this.handleClick} className={styles.choiceButtonStyle}><ion-icon name="radio-button-on-outline" ></ion-icon></button>
                    Is it a hydroponic system?
                </label>
                
                <p className={styles.errorText}>{this.state.errorMessage}</p>
                <p>{'\n'}</p>
                <button type="submit" className={styles.buttonStyle}>Add Unit</button>
            </form>
            </div>
        } else {
            return <div className={styles.fullFormStyle}>
            <h1>Add New Unit</h1>
            <form onSubmit={this.handleSubmit}>
                <label>Nickname</label>
                <input 
                    type="text" 
                    value={this.state.nickname}
                    onChange={this.handleChange} 
                    name="nickname"/>
                <label>Location</label>
                <input 
                    type="text" 
                    value={this.state.location}
                    onChange={this.handleChange} 
                    name="location"/>
                
                <label>
                <button onClick={this.handleClick} className={styles.choiceButtonStyle}><ion-icon name="radio-button-off-outline"></ion-icon></button>
                    Is it a hydroponic system?
                </label>

                <label>Watering Frequency</label>
                <select value={this.state.wfDdNum} onChange={this.onNumSelect} className={styles.dropDownStyle}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                </select>
                <select value={this.state.wfDdVal} onChange={this.onValSelect} className={styles.dropDownStyle}>
                    <option value="hours">Hours</option>
                    <option value="days">Days</option>
                    <option value="weeks">Weeks</option>
                    <option value="months">Months</option>
                </select>
                
                <p className={styles.errorText}>{this.state.errorMessage}</p>
                <p>{'\n'}</p>
                <button type="submit" className={styles.buttonStyle}>Add Unit</button>
            </form>
            </div>
        }
        

        
    }
    
}

export default withRouter(AddUnit);