import React from 'react';
import { withRouter } from 'react-router-dom';
import { getSingleUser, updateUser } from '../util/UsersAPI';
import styles from './mystyle.module.css';

/* change users email in settings */

class ChangeEmail extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            newEmail: '',
            loading: true,
            errorMessage: '',
        };
        
        this.handleTest = this.handleTest.bind(this);
        this.editEmail = this.editEmail.bind(this);
        this.saveEmail = this.saveEmail.bind(this);
    }

    getUser(id) {
        getSingleUser(id).then(user => {
            this.setState({
              user: user,
              loading: false,
            });
          });
     }

    editEmail = (event) => {
        event.preventDefault();
        const val = event.target.value;

        this.setState({
            newEmail: val,
        });
    }

    saveEmail = (event) => {
        event.preventDefault();

        //const user = {...this.state.user};
        
        this.setState((prevState) => ({
            user: {
                ...prevState.user,
                email: this.state.newEmail,
            },
        }));

        console.log('userinfo: ' + JSON.stringify(this.state.user));

        const user = {
            "own_units": this.state.user.own_units,
            "units_with_access": this.state.user.units_with_access,
            "email": this.state.newEmail,
            "username": this.state.user.username,
            "user_id": this.state.user.user_id
        }

        updateUser(user, 'bearer ' + localStorage.getItem('token'), this.state.user.user_id).then(user => {
            if (user.error !== undefined) {
                console.log( '(ChangeEmail.js) Error message: ' + user.error)
            } else {
                console.log( 'Email changed.' )
            }
        });
    }

    //test
    handleTest(event) {
        event.preventDefault();

    }

    componentDidMount() {
        this.getUser(localStorage.getItem('currentUser'));
    }

    // TEST BUTTON: <button onClick={this.handleClick}>test</button>

    render () {
        return <div className={styles.fullFormStyle}>
            <form onSubmit={this.saveEmail}>
            <label>New email:</label>
                <input 
                    type="text" 
                    value={this.state.newEmail}
                    onChange={this.editEmail} 
                    name="email"/>
                <button type="submit" className={styles.buttonStyle}>Change email</button>
            </form>
            
        </div>
        
        
    }
    
}

export default withRouter(ChangeEmail);