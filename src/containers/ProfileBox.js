import React from 'react';
import UserDetails from '../components/UserDetails'
import NewUser from '../components/NewUser'
import CredentialsForm from '../components/CredentialsForm'


export default class ProfileBox extends React.Component {

   state = {
    credentialModal: false,
       showLogin: false,
       modal: false,
       username: '',
       password: ''
   }

   showModal = () => {
    this.setState({
        modal: !this.state.modal
    })
    }

    handleCredentialModal = () => {
            this.setState({credentialModal: !this.state.credentialModal})
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
      this.handleLogin()
   }

    render () {

        return (
            <div className="profile_box">
               {
                this.props.userLoggedIn === false
                ?
                <div className="display_logged_in_out_user" >
                    <button onClick={ () => this.handleLogin()}>Login</button>
                    <button className="create_user_account" onClick={() => this.showModal()}>Create New Account</button>
                </div>
                
                :
                <div className="display_logged_in_out_user" >
                    <div className="welcome_message" >Welcome {this.props.currentUser.username}</div>
                    <button className='logout_button' onClick={() => this.props.handleLogout()}>Log Out</button>
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
                {
                    this.state.modal
                ?
                    <NewUser
                        createUser={this.props.createUser}
                        handleCredentials={this.props.handleCredentials}
                        handleCredentialModal={this.handleCredentialModal}
                        hideModal={this.showModal}
                    />
                : 
                    null
                }
                {
                    this.state.credentialModal
                ? 
                    <CredentialsForm
                        createExpert={this.props.createExpert}
                        currentUser={this.props.currentUser}
                        fieldId={this.props.credentialFieldId}
                        handleCredentialModal={this.handleCredentialModal}
                    />
                :
                    null
                }
            </div>
        )
    }

}