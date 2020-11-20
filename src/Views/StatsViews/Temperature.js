import React from 'react'
import StatsTemp from '../../components/content/stats/StatsTemp';
import Header from '../../components/layout/Header';
import CheckToken from '../../components/content/CheckToken';


// props to StatsTemp sent from UnitContent.js
 function Temperature(props) {
    /*
        render = {props => <PageStart {...props} key={this.props.location.key} /> }
    */
    return (
        <div>
            <CheckToken />
            <Header />
            <StatsTemp {...props} unitId={props.unit_id} />
        </div>
    )
}

export default Temperature;