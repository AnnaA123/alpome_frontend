import React from 'react'
import { withRouter } from 'react-router-dom';
import { deleteUnit } from '../util/GrowingUnitsAPI';
import styles from './mystyle.module.css'; 


/*deletes the unit

used in UnitContent*/
 class DeleteUnit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            delMsg: false,
        }

        this.popUpDel = this.popUpDel.bind(this);
        this.delUnit = this.delUnit.bind(this);
        
    }

    // toggles message view
    toggleDelMsg() {
        this.setState(prevState => ({ delMsg: !prevState.delMsg }));
    }

    // message that asks for delete confirmation
    delMessage = () => {
        if(this.state.delMsg) {
            return <div className={ styles.delMsg }>
                <p>Are you sure?</p>
                <button onClick={this.delUnit} className={ styles.smallButtonRed }>Yes</button>
                <button onClick={this.popUpDel} className={ styles.smallButtonStyle }>Cancel</button>
            </div>
        }
    }

     // del button (opens message)
     popUpDel = (event) => {
        event.preventDefault();

        this.toggleDelMsg();
     }

     //deletes the unit from backend
     delUnit = (event) => {
        event.preventDefault();

        const unitId = this.props.unitid;
        console.log('props working: ' + unitId);

        deleteUnit('bearer ' + localStorage.getItem('token'), unitId).then(unit => {
            console.log('unit deleted: ' + unit)
            if (unit.error !== undefined) {
                this.setState({ errorMessage: 'Could not delete unit' })
            } else {
                this.props.history.push('/home');
            }
        })
     }


    render (){
        return <div>
            {this.delMessage()}
            <button className={styles.deleteButtonStyle} onClick={this.popUpDel}>
                <p>Delete unit</p>
                <ion-icon name="trash" className={ styles.iconStyle }></ion-icon> 
            </button>
        </div>
    }
}

export default withRouter(DeleteUnit);