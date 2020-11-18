import React from 'react'
import { Link } from 'react-router-dom'
import styles from './mystyle.module.css'; 
import { register } from '../util/UsersAPI';

//used in Signup.js

class SignUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                username: '',
                email: '',
                password: '',
                checkPw: '',
            },
            errorMessage: '',
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
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
    }

    //sends submit info to UsersAPI.js to register, if it doesnt work, adds an error message to the page
    handleSubmit = (event) => {
        event.preventDefault();

        if (this.state.user.password === this.state.user.checkPw) {
            const user = {...this.state.user};
            delete user.checkPw;

            register(user).then(user => {
                if (user.error !== undefined) {
                    this.setState({ errorMessage: 'Cannot signup. Username, password or email needs to be changed.' })
                }
            });
        } else {
            this.setState({ errorMessage: 'Passwords do not match.' })
        }
        
    }

    render () {
        return <div className={styles.fullFormStyle}>
                <h1 className={styles.formTitle}>Sign Up</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>Username</label>
                    <input 
                        type="text" 
                        name="username" 
                        value={this.state.username} 
                        onChange={this.handleChange} />
                    <label>Email Address</label>
                    <input 
                        type="text" 
                        name="email"
                        value={this.state.email} 
                        onChange={this.handleChange} />
                    <label>Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        value={this.state.password} 
                        onChange={this.handleChange} />
                    <label>Password</label>
                    <input 
                        type="password" 
                        name="checkPw" 
                        value={this.state.checkPw} 
                        onChange={this.handleChange} />

                    <div>
                        <p className={styles.errorText}>{this.state.errorMessage}</p>
                    </div>

                    <div className={styles.bottomText}>
                        <p>Already have an account?</p>
                        <Link to='/login'>Login here!</Link>
                    </div>

                    <button type="submit" className={styles.buttonStyle}>Sign Up</button>
                </form>
                </div>
    }
}

export default SignUpForm;