import React from 'react'
import Header from '../components/layout/Header';
import LoginForm from '../components/content/LoginForm';
import CheckNoToken from '../components/content/CheckNoToken';

 function Login(props) {
    return (
        <div>
            <CheckNoToken />
            <Header />
            <LoginForm setUser={props.setUser} />
        </div>
    )
}

export default Login;