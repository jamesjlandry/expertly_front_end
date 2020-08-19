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
              username: e.target.value
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
            password: this.state.password,
        }
        if (this.state.field === 'none') {
        this.props.createUser(user)
        } else {
            this.props.createUser(user)
            this.props.handleCredentials(user)
        }
      }
    
      render() {
        return (
          <form className="new_user_modal" onSubmit={this.handleSubmit}>
            <div>
              <label>
                Username
                <input onChange={event => this.nameChange(event)} id="username" name="username" type="text" value={this.state.username}/>
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
