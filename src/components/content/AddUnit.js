import React from 'react';
import { withRouter } from 'react-router-dom';
import { addNewUnit, updateData } from '../util/GrowingUnitsAPI';
import CurrentTime from './CurrentTime';
import styles from './mystyle.module.css'; 

/* for adding a new unit
used in Addnew.js*/
class AddUnit extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            unit: {
                nickname: '',
                common_names: [],
                location: '',
                supragarden: false,
                last_watered: CurrentTime(),
                watering_frequency: 3600000,
                data_source: null,
                owner: localStorage.getItem('currentUser'),
                shared_access: [],
                stream_url: '',
                notes: 'Here is a description of your garden!',
                images: []
            },
            wfDdNum: 1,
            wfDdVal: 'hours',

            formToggler: false,
            errorMessage: '',
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleClickT = this.handleClickT.bind(this);
        this.handleClickF = this.handleClickF.bind(this);
    }
    
    // input values to state
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

    // set supragarden as true and null watering_frequency
    toggleFormT = (previous) => {
        this.setState((prevState) => ({
            unit: {
                ...prevState.unit,
                supragarden: !previous,
                watering_frequency: null,
            },
            formToggler: !previous,
        }));
    }

    // set supragarden as false and set the watering frequency
    toggleFormF = (previous) => {
        this.setState((prevState) => ({
            unit: {
                ...prevState.unit,
                supragarden: !previous,
            },
            formToggler: !previous,
        }));

        this.wateringFreqCalc();
    }

    // watering frequency calculator
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
    
    // watering frequency dropdown menus
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

    // set supragarden as true button
    handleClickT =(event) => {
        event.preventDefault();
        this.toggleFormT(this.state.formToggler);
    }

    // set supragarden as false button
    handleClickF =(event) => {
        event.preventDefault();
        this.toggleFormF(this.state.formToggler);
    }
    
    // create the unit in backend
    handleSubmit = (event) => {
        event.preventDefault();
        const unit = {...this.state.unit};

        addNewUnit(unit, localStorage.getItem('token')).then(unit => {
            if (unit.error !== undefined) {
                this.setState({ errorMessage: 'Cannot add unit.' })
            } else {
                this.props.history.push('/home');
            }
        })
    }
    
/* button for easily turning the unit into supragarden monitor:
if included: add to the right above the watering frequency selectors.
for if(formToggler) make sure to add a datasource input 
(datasource has not been properly configured due to issues with the supragarden api)

    <label>
        <button onClick={this.handleClickT} className={styles.choiceButtonStyle}>
            <ion-icon name="radio-button-off-outline"></ion-icon>
        </button>
        Is it a hydroponic system?
    </label>
*/

/* the if/else statement changes input and state depending on whether the unit is connected to a 
    supragarden or not.
    supragarden has a data source while a normal garden has watering frequency*/
    render () {
        if (this.state.formToggler === true) { 
            return <div className={styles.fullFormStyle}>
            <h1>Add New Garden</h1>
            <form onSubmit={this.handleSubmit}>
                <label>Nickname of your garden</label>
                <input 
                    type="text" 
                    maxLength="20"
                    value={this.state.nickname}
                    onChange={this.handleChange} 
                    name="nickname"/>
                <label>Location of your garden</label>
                <input 
                    type="text" 
                    maxLength="20"
                    value={this.state.location}
                    onChange={this.handleChange} 
                    name="location"/>
                
                <label>
                    <button onClick={this.handleClickF} className={styles.choiceButtonStyle}><ion-icon name="radio-button-on-outline" ></ion-icon></button>
                    Is it a hydroponic system?
                </label>
                
                <p className={styles.errorText}>{this.state.errorMessage}</p>
                <p>{'\n'}</p>
                <button type="submit" className={styles.buttonStyle}>Add Garden</button>
            </form>
            </div>
        } else {
            return <div className={styles.fullFormStyle}>
            <h1>Add New Garden</h1>
            <form onSubmit={this.handleSubmit}>
                <label>Nickname of your garden</label>
                <input 
                    type="text" 
                    maxLength="20"
                    value={this.state.nickname}
                    onChange={this.handleChange} 
                    name="nickname"/>
                <label>Location of your garden</label>
                <input 
                    type="text" 
                    maxLength="20"
                    value={this.state.location}
                    onChange={this.handleChange} 
                    name="location"/>

                <label>How often do you want to water it?</label>
                <label>Once every</label>
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
                    <option value="hours">Hour(s)</option>
                    <option value="days">Day(s)</option>
                    <option value="weeks">Week(s)</option>
                    <option value="months">Month(s)</option>
                </select>
                
                <p className={styles.errorText}>{this.state.errorMessage}</p>
                <p>{'\n'}</p>
                <button type="submit" className={styles.buttonStyle}>Add Garden</button>
            </form>
            </div>
        }
    }
}

export default withRouter(AddUnit);