import React from 'react'
import { Link } from 'react-router-dom'
import styles from './mystyle.module.css'; 


/* for adding a new unit
used in Addnew.js*/

class  AddUnit extends React.Component{

    render () {
        return (
            <div className={styles.fullFormStyle}>
                <h1>Add New Unit</h1>
                <form >
                    <label>Form</label>
                    <input type="text" name="form1"/>
                    <label>Form</label>
                    <input type="text" name="form2"/>
                    <label>Form</label>
                    <input type="text" name="form3"/>
                    <label>Form</label>
                    <input type="text" name="form4"/>
                    <p>{'\n'}</p>
                    <button type="submit" className={styles.buttonStyle}>Add Unit</button>
                </form>
            </div>
        )
    }
    
}

export default AddUnit;