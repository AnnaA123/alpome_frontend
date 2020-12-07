import React from 'react'
import { Link } from 'react-router-dom';
import { getSingleUser } from '../util/UsersAPI';
import styles from './mystyle.module.css'; 

/*this creates a new box for each unit on the main page
used in Home.js*/
 class ListUnits extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            units: [],
            loading: true,
        }
        this.getUnits = this.getUnits.bind(this);
    }

    getUnits(id) {
        getSingleUser(id).then(user => {
            this.setState({
              units: user.own_units,
              loading: false,
            });
          });
     }

    componentDidMount() {
        const userId = localStorage.getItem('currentUser');
        this.getUnits(userId);
    }

    //first checks if there are units, then lists them
    render (){
        if (this.state.loading) {
            return <div className={ styles.loading }>
                    <div className={ styles.loadingText }>
                        <ion-icon name="sync-outline" ></ion-icon>
                        <p>Loading</p>
                    </div></div>
        } else {
            if (this.state.units[0] !== undefined) {
                return this.state.units.map((unit) => {
                    return <div key={unit.unit_id}><Link to={`/unit/${unit.unit_id}`} key={unit.unit_id}> 
                    <div className={ styles.boxstyle }>
                        <ion-icon name="flower-outline" className={ styles.iconStyle } ></ion-icon>
                        <p className={ styles.titleStyle }>{ unit.nickname }</p>
                    </div></Link></div>
                });
            } else {
                return <div className={ styles.infoBox }>
                        <h1>Welcome <ion-icon name="happy-outline"></ion-icon></h1>
                        <p>You don't seem to have any gardening units yet! Create one by pressing the button below.</p>
                    </div>
            }
        }
    }
}

export default ListUnits;