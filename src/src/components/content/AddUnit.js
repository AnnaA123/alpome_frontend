import React from 'react';
import { Link } from 'react-router-dom';
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
                last_watered: '',
                watering_frequency: null,
                data_source: null,
                owner: localStorage.getItem('currentUser'),
                shared_access: [],
                stream_url: '',
                images: []
            },
            formToggler: false,
            errorMessage: '',
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
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

    // supragarden true/false toggle button
    handleClick =(event) => {
        event.preventDefault();
        
        this.toggleForm(this.state.formToggler);

        
    }

    // submit the whole form
    handleSubmit = (event) => {
        event.preventDefault();
        const unit = {...this.state.unit};

        addNewUnit(unit, localStorage.getItem('token')).then(unit => {
            console.log('msg from AddUnit: ' + JSON.stringify(unit));
            console.log(' here is the state ' + JSON.stringify(this.state.unit));
            if (unit.error !== undefined) {
                this.setState({ errorMessage: 'Cannot add unit.' })
            }
        })
    }

    /* the if/else statement changes input and state depending on whether the unit is connected to a 
    supragarden or not supragarden has a data source while a normal unit has watering frequency*/

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
                <label>Watering frequency</label>
                <input 
                    type="text" 
                    value={this.state.watering_frequency}
                    onChange={this.handleChange}  
                    name="watering_frequency"/>
                
                <label>Is it a Supragarden? (it currently is)</label>
                <button onClick={this.handleClick}>No</button>
                <label>Data source</label>
                <input 
                    type="text" 
                    value={this.state.data_source} 
                    onChange={this.handleChange} 
                    name="data_source"/>
                
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
                <label>Watering frequency</label>
                <input 
                    type="text" 
                    value={this.state.watering_frequency}
                    onChange={this.handleChange}  
                    name="watering_frequency"/>
                
                <label>Is it a Supragarden? (it currently is not)</label>
                <button onClick={this.handleClick}>Yes</button>

                <p>{'\n'}</p>
                <button type="submit" className={styles.buttonStyle}>Add Unit</button>
            </form>
            </div>
        }

        
    }
    
}

export default AddUnit;