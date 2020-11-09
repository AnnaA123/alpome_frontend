import React from 'react'
import StatsTemp from '../components/content/StatsTemp';
import Header from '../components/layout/Header';


 function Temperature() {
    return (
        <div>
            <Header previous='unit/1' />
            <StatsTemp />
        </div>
    )
}

export default Temperature;