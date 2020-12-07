import React from 'react'
import { withRouter } from 'react-router-dom'

/* checks if user is logged in. if is, will be redirected to homepage */
class CheckNoToken extends React.Component{
    componentDidMount() {
        const uToken = localStorage.getItem('token');

        //checks if the user logs in. if not, redirected to login
        if (uToken !== null) {
            this.props.history.push('/home');
        }
    }
    render () {
        return (
            <div></div>
        )
    }
}

export default withRouter(CheckNoToken);