import React from 'react';
import './App.css';
import axios from 'axios';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Main from './Main'
import Login from './components/Login'
import NewUser from './components/NewUser'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      isLoggedIn: false,
      currentUser: {}
     };
  }

  componentDidMount() {
    this.loginStatus()
  }
  // componentWillMount() {
  //   return this.props.loggedInStatus ? this.redirect() : null 
  // }

  loginStatus = () => {
    axios.get('http://localhost:3000/logged_in', 
   {withCredentials: true})
    .then(res => {
      if (res.data.logged_in) {
        this.handleLogin(res)
      } else {
        this.handleLogout()
      }
    })
    .catch(error => console.log('api errors:', error))
  }

    handleLogin = (data) => {
      this.setState({
        isLoggedIn: true,
        user: data.user
      })
    }
    
    handleLogout = () => {
      this.setState({
      isLoggedIn: false,
      user: {}
      })
    }
  
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route 
              exact path='/' 
              render={props => (
              <Main {...props} loggedInStatus={this.state.isLoggedIn} currentUser={this.state.currentUser}/>
              )}
            />
            <Route 
              exact path='/login' 
              render={props => (
              <Login {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn}/>
              )}
            />
            <Route 
              exact path='/signup' 
              render={props => (
              <NewUser {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn}/>
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
    
    


}


export default App;
