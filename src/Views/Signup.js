import React from 'react'
import Header from '../components/layout/Header';
import SignUpForm from '../components/content/SignUpForm'
import CheckNoToken from '../components/content/CheckNoToken';


 function Signup() {
    return (
        <div>
            <CheckNoToken />
            <Header />
            <SignUpForm />
        </div>
    )
}

export default Signup;