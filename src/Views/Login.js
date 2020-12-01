import React from 'react'
import Header from '../components/layout/Header';
import LoginForm from '../components/content/LoginForm';
import CheckNoToken from '../components/content/CheckNoToken';


 class Login extends React.Component {
    constructor(props) {
        super(props);
        
    }

    render () {
        return (
            <div>
                <CheckNoToken />
                <Header />
                <LoginForm setUser={this.props.setUser} />
            </div>
        )
    }
    
}

export default Login;