import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { getSingleUser } from '../util/UsersAPI';
import styles from './mystyle.module.css';

/* change users email in settings */

class ChangeEmail extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            user: '',
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

        this.setState((prevState) => ({
            user: {
                ...prevState.unit,
                email: val,
            },
        }));
    }

    saveEmail = (event) => {
        event.preventDefault();

        const user = {...this.state.user};
        console.log('email changed (in state only): ' + user.email);
        
        
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
                    value={this.state.user.email}
                    onChange={this.editEmail} 
                    name="email"/>
                <button type="submit" className={styles.buttonStyle}>Change email</button>
            </form>
            
        </div>
        
        
    }
    
}

export default withRouter(ChangeEmail);