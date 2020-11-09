import React from 'react'
import { Link } from 'react-router-dom'
import styles from './mystyle.module.css'; 

//used in Login.js

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            liUsername: '',
            liPassword: '',
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
        console.log('username: ' + this.state.liUsername + 'and password: ' + this.state.liPassword);
        event.preventDefault();
    }

    

    
    render () {
        return <div className={styles.fullFormStyle}>
                <h1 className={styles.formTitle}>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>Username</label>
                    <input 
                        type="text" 
                        name="liUsername" 
                        value={this.state.liUsername}
                        onChange={this.handleChange} />
                    <label>Password</label>
                    <input 
                        type="password" 
                        name="liPassword" 
                        value={this.state.liPassword}
                        onChange={this.handleChange}
                         />

                    <div className={styles.bottomText}>
                        <p>Don't have an account?</p>
                        <Link to='/signup'>Sign up here!</Link>
                        <p>{"\n"}</p>
                    </div>

                    <button type="submit" 
                    className={styles.buttonStyle} 
                    onClick={() => {
                        window.location.href="/";
                    }}>Login</button>
                </form>

                
                </div>
    }
}

export default LoginForm;