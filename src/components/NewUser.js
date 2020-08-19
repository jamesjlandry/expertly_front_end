import React from 'react'
import axios from 'axios'


export default class NewUser extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
          username: '',
          password: '',
          field: ''
        };
      }

      nameChange = (e) => {
          this.setState({
              name: e.target.value
          })
      }

      passwordChange = (e) => {
          this.setState({
              password: e.target.value
          })
      }

      fieldChange = (field) => {
          this.setState({
              field
          })
      }

      handleSubmit = (e) => {
          e.preventDefault();
        let user = {
            username: this.state.username,
            password_digest: this.state.password,
            field: this.state.field
            }

        axios.post('http://localhost:3001/users', {user}, {withCredentials: true})
            .then(response => {
                if (response.data.status === 'created') {
                    this.props.handleLogin(response.data)
                    this.redirect()
                } else {
                    this.setState({
                        errors: response.data.errors
                        })
                    }
                })
                .catch(error => console.log('api errors:', error))
            };


            redirect = () => {
                this.props.history.push('/')
            }

            handleErrors = () => {
                return (
                  <div>
                    <ul>{this.state.errors.map((error) => {
                      return <li key={error}>{error}</li>
                    })}</ul> 
                  </div>
                )
              }
        
    
      render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <div>
              <label>
                Username
                <input onChange={event => this.nameChange(event)} placeholder="username" id="username" name="username" type="text" value={this.state.name}/>
              </label>
            </div>
            <div>
              <label>
                Password
                <input onChange={event => this.passwordChange(event)} placeholder="password" id="password" name="password" type="password" value={this.state.password}/>
              </label>
            </div>
            <div>
                <select onChange={event => this.fieldChange(event.target.value)} >
                    <option value={'none'}>Not an Expert</option>
                    <option value={'Medical'}>Medical</option>
                    <option value={'Psychology'}>Psychology</option>
                    <option value={'Legal'}>Legal</option>
                    <option value={'Electrical Engineering'}>Electrical Engineering</option>
                    <option value={'Software'}>Software Development</option>
                    <option value={'Construction'}>Construction</option>
                    <option value={'Auto Mechanic'}>Auto Mechanic</option>
                    <option value={'Music'}>Music</option>
                </select>
            </div>
            <div>
              <button  type="submit">Create Account</button>
            </div>
            <div>
                {this.state.errors ? this.handleErrors() : null}
            </div>
          </form>
        );
      }
}
