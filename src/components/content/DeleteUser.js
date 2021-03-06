import React from 'react'
import { withRouter } from 'react-router-dom';
import { deleteUser } from '../util/UsersAPI';
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

     //deletes the user from backend
     delUnit = (event) => {
        event.preventDefault();
        const userId = localStorage.getItem('currentUser');

        deleteUser('bearer ' + localStorage.getItem('token'), userId).then(user => {
            if (user.error !== undefined) {
                this.setState({ errorMessage: 'Could not delete user' })
            } else {
                localStorage.clear();
                this.props.history.push('/');
            }
        })
     }

    render (){
        return <div>
            <button className={styles.deleteButtonStyle} onClick={this.popUpDel}>
                <p>Delete user</p>
                <ion-icon name="trash" className={ styles.iconStyle }></ion-icon> 
            </button>
            {this.delMessage()}
        </div>
    }
}

export default withRouter(DeleteUnit);