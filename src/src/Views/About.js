import React from 'react'
import Header from '../components/layout/Header';
import AboutText from '../components/content/AboutText';
import CheckToken from '../components/content/CheckToken';


 function About() {
    return (
        <div>
            <CheckToken />
            <Header />
            <AboutText />
        </div>
    )
}

export default About;