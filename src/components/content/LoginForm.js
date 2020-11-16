import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import styles from './mystyle.module.css'; 
import { login } from '../util/LoginAPI';

//used in Login.js

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                username: '',
                password: '',
            },
            errorMessage: '',
            validUser: true,
        };
        
        //binding 'this'
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        //this.setUser = this.setUser.bind(this);
        this.doLogin = this.doLogin.bind(this);
    }

    //sends the info to LoginAPI.js, which sends and compares it to the database
    doLogin = () => {
        login(this.state.user.username, this.state.user.password).then(response => {
            if (response.user !== undefined) {
                console.log('doLogin response yes');
                const userIsSet = this.props.setUser(response.user);
                localStorage.setItem('token', response.token);
                localStorage.setItem('currentUser', response.user.user_id);
                this.props.history.push('/');
                return userIsSet;
            } else {
                console.log('lol no');
                this.setState({errorMessage: 'Username or password is incorrect.'});
            }
        }).catch((err) => {
            console.log(err);
        })
    };
    
    //writing or pressing anything
    handleChange(event) {   
        /*let nam = event.target.name;
        let val = event.target.value;
        
        this.setState({[nam]: val});  */

        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState((prevState) => ({
            user: {
                ...prevState.user,
                [name]: value,
            },
        }));

        /*
        if (name === 'username') {
            this.checkUsername(target.value);
          }
*/
    }
/*
    checkUsername = (username) => {
        checkUser(username).then((result) => {
          console.log(result.available);
          this.setState({ validUser: result.available });
        });
    };
*/
    handleSubmit(event) {
        event.preventDefault();
        this.doLogin();
    }

    

    /*componentDidMount() {
        console.log('token' + localStorage.getItem('token'));
        if(localStorage.getItem('token') !== null) {
            console.log('token' + localStorage.getItem('token'));
        }
    }*/
    
    render () {
        return <div className={styles.fullFormStyle}>
                <h1 className={styles.formTitle}>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>Username</label>
                    <input 
                        type="text" 
                        name="username" id="username" label="Username"
                        value={this.state.user.username}
                        onChange={this.handleChange} />
                    <label>Password</label>
                    <input 
                        type="password" 
                        name="password" id="password" label="Password"
                        value={this.state.user.password}
                        onChange={this.handleChange}
                         />

                    <div>
                        <p className={styles.errorText}>{this.state.errorMessage}</p>
                    </div>

                    <div className={styles.bottomText}>
                        <p>Don't have an account?</p>
                        <Link to='/signup'>Sign up here!</Link>
                        <p>{"\n"}</p>
                    </div>

                    <button type="submit" 
                    className={styles.buttonStyle} 
                    >Login</button>
                </form>

                
                </div>
    }
}

export default withRouter(LoginForm);