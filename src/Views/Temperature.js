import React from 'react'
import StatsTemp from '../components/content/stats/StatsTemp';
import Header from '../components/layout/Header';
import CheckToken from '../components/content/CheckToken';


 function Temperature() {
    return (
        <div>
            <CheckToken />
            <Header />
            <StatsTemp />
        </div>
    )
}

export default Temperature;