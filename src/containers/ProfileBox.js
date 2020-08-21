import React from 'react';
import UserDetails from '../components/UserDetails'


export default class ProfileBox extends React.Component {

   state = {
       showLogin: false,
       username: '',
       password: ''
   }

   handleLogin = () => {
       this.setState({showLogin: !this.state.showLogin})
   }

   setUsername = (e) => {
       this.setState({
           username: e.target.value
       })
   }

   setPassword = (e) => {
       this.setState({
           password: e.target.value
       })
   }

   submitLogin = (e) => {
      let user = { 
        username: this.state.username,
        password: this.state.password
      }
      this.props.userLogin(user)
   }

    render () {

        return (
            <div className="profile_box">
               {
                this.props.userLoggedIn
                ?
                <div className="display_logged_in_out_user" >
                    <div className="welcome_message" >Welcome {this.props.currentUser.username}</div>
                    <button className='logout_button' onClick={() => this.props.handleLogout()}>Log Out</button>
                </div>
                :
                <div className="display_logged_in_out_user" >
                    <button onClick={ () => this.handleLogin()}>Login</button>
                    <button className="create_user_account" onClick={() => this.props.showModal()}>Create New Account</button>
                </div>
                }
               {
                this.state.showLogin 
                ?  
                <div className="login_form">
                    <input className="login_input" onChange={(event) => this.setUsername(event)} type="text" placeholder= "username" value={this.state.username}></input>
                    <input className="login_input" onChange={(event) => this.setPassword(event)} type="password" placeholder= "password" value={this.state.password}></input>
                    <button className="login_input" onClick={this.submitLogin} >Login</button>
                </div>
                : 
                    null
                }
                
            </div>
        )
    }

}