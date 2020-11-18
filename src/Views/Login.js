import React from 'react'

import Header2 from '../components/layout/Header2';
import LoginForm from '../components/content/LoginForm'
import { checkPropTypes } from 'prop-types';


 class Login extends React.Component {
    constructor(props) {
        super(props);
        
        /*binding 'this'
        this.userr = this.userr.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);*/
    }

    /*userr = () => {
        this.props.setUser('moi :)')
    }

    handleSubmit(event) {
        event.preventDefault();
        this.userr();
    }*/

    render () {
        return (
            <div>
                
                <Header2 />
                <LoginForm setUser={this.props.setUser} />
            </div>
        )
    }
    
}

export default Login;