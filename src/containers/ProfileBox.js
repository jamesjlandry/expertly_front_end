import React from 'react';
import UserDetails from '../components/UserDetails'


export default class ProfileBox extends React.Component {

   

    render () {

        return (
            <div>
               {this.props.userLoggedIn ? <div className="displayLoggedInOutUser" >{this.props.username}</div> : <div className="displayLoggedInOutUser">Log In</div>}
                <div className="createUserAccount" onClick={() => this.props.showModal()}>Create New Account</div>
            </div>
        )
    }

}