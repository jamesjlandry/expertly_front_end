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
                <div className="displayLoggedInOutUser" >Welcome {this.props.currentUser.username} <button className='logout_button' onClick={() => this.props.handleLogout()}>Log Out</button></div>
                :
                <div className="displayLoggedInOutUser" >
                    <div onClick={ () => this.handleLogin()}>Log In</div>
                    <div className="createUserAccount" onClick={() => this.props.showModal()}>Create New Account</div>
                </div>
                }
               {
                this.state.showLogin 
                ?  
                    <div className="login_form">
                        <input onChange={(event) => this.setUsername(event)} type="text" placeholder= "username" value={this.state.username}></input>
                        <input onChange={(event) => this.setPassword(event)} type="password" placeholder= "password" value={this.state.password}></input>
                        <button onClick={this.submitLogin} className= "login_button" > Make It So</button>
                    </div>
                : 
                    null
                }
                
            </div>
        )
    }

}