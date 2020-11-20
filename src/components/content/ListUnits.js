import React from 'react'
import { Link } from 'react-router-dom';
import { getSingleUser } from '../util/UsersAPI';
import { getSingleUnit } from '../util/GrowingUnitsAPI';
import styles from './mystyle.module.css'; 


/*this creates a new box for each unit on the main page

used in Home.js*/


 class ListUnits extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            units: [],
        }
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getUnits = this.getUnits.bind(this);
    }


    /*getUnits = (user1) => {
        const currentUser = user1;
        getSingleUser('5fabccf9e9ace35d64f5216c').then(response => {
            this.setState({
                user: user1
            }).then (res => {
                console.log('LISTUNITSSSSSSSSS: ' + this.state.user);
            })
        });
        return currentUser;
    }*/

    getUnits(id) {
        getSingleUser(id).then(user => {
            this.setState({
              units: user.own_units,
            });
          });
     }

     //test
    handleSubmit(event) {
        const userId = localStorage.getItem('currentUser');
        event.preventDefault();
        this.state.units.map((unit) => {
            console.log('units: ' + unit.nickname);
        })
        
    }

    componentDidMount() {
        const userId = localStorage.getItem('currentUser');
        this.getUnits(userId);
    }

    //first checks if there are units, then lists them

    render (){
        if (this.state.units !== null) {
            return this.state.units.map((unit) => {
                return <Link to={`/unit/${unit.unit_id}`} key={unit.unit_id}> 
                <div className={ styles.boxstyle }>
                    <img src='' alt='img' className={ styles.iconStyle } />
                    <p>{ unit.nickname }</p>
                </div>
                </Link>
            });
        } else {
            return <div className={ styles.boxstyle }><p>No units</p></div>
        }
        
    }
    
}

export default ListUnits;