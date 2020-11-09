import React from 'react'
import { Link } from 'react-router-dom'
import styles from './mystyle.module.css'; 

//used in Signup.js

class SignUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            suUsername: '',
            suEmail: '',
            suPw1: '',
            suPw: '',
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {   
        let nam = event.target.name;
        let val = event.target.value;
        
        this.setState({[nam]: val});  
    }
    handleSubmit(event) {
        console.log('username: ' + this.state.suUsername + ' and email: ' + this.state.suEmail);
        event.preventDefault();
    }

    render () {
        return <div className={styles.fullFormStyle}>
                <h1 className={styles.formTitle}>Sign Up</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>Username</label>
                    <input 
                        type="text" 
                        name="suUsername" 
                        value={this.state.suUsername} 
                        onChange={this.handleChange} />
                    <label>Email Address</label>
                    <input 
                        type="text" 
                        name="suEmail"
                        value={this.state.suEmail} 
                        onChange={this.handleChange} />
                    <label>Password</label>
                    <input 
                        type="password" 
                        name="suPw1" 
                        value={this.state.suPw1} 
                        onChange={this.handleChange} />
                    <label>Password</label>
                    <input 
                        type="password" 
                        name="suPw2" 
                        value={this.state.suPw} 
                        onChange={this.handleChange} />

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