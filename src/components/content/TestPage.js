import React from 'react';
import Header from '../layout/Header';
import { getSingleUser } from '../util/UsersAPI';

//this is a page just for testing out some stuff. not a part of the final product /test8437586490743385891029748

 class TestPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            username: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showName = this.showName.bind(this);
    }

    /*componentDidMount () {
        if (localStorage.getItem('token') === null) {
            console.log('no token');
            this.props.history.push('login');
        } else {
            console.log('yes token');
        }
        
    }*/
    

     doThing(id) {
         

        getSingleUser(id).then(user => {
          
            
            this.setState({
              username: user.username
            }, () => {
              console.log('username: ', this.state.username);
            });
          });
     }

     handleSubmit(event) {
        event.preventDefault();
        this.doThing(this.state.id);
    }

    showName(e) {
        console.log('username2: ' + this.state.username);
    }

     render() {

        return (
            <div>
                <Header />
    
                <div>
                    <p>{'\n'}</p>
                    <p>{'\n'}</p>
                    <p>{'\n'}</p>
                    <h1>IS THIS WORKING</h1>
                    <form onClick={this.handleSubmit}>

                        <button type='submit' >get name to state</button>
                        
                    </form>
                    <button type='submit' onClick={this.showName}>console log name</button>

                    <embed src='https://us-central1-amiable-hydra-279814.cloudfunctions.net/app/api/read' style={embedStyle}></embed>

                </div>
            </div>
        )
     }
    
}

const embedStyle = {
    width: '500px', 
    height: '300px',
}

export default TestPage;