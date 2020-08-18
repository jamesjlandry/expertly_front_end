import React from 'react'


export default class NewUser extends React.Component {

    constructor() {
        super();
    
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

      handleSubmit = () => {
        let user = {
            username: this.state.username,
            password_digest: this.state.password,
            field: this.state.field
        }
        createUser(user)
      }
    
      render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <div>
              <label>
                Username
                <input onChange={event => this.nameChange(event)} id="username" name="username" type="text" value={this.state.name}/>
              </label>
            </div>
            <div>
              <label>
                Password
                <input onChange={event => this.passwordChange(event)} id="password" name="password" type="password" value={this.state.password}/>
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
          </form>
        );
      }
    }
}
