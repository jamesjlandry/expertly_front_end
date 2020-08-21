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
        if (this.state.field === '1') {
            this.props.createUser(user)
            this.props.hideModal()
        } else {
            let field_id = parseInt(this.state.field)
            this.props.createUser(user)
            this.props.handleCredentials(field_id)
            this.props.handleCredentialModal()
            this.props.hideModal()
        }
      }
    
      render() {
        return (
          <form className="login_form" onSubmit={this.handleSubmit}>
                <input
                  className="login_input" 
                  onChange={event => this.nameChange(event)} 
                  id="username"
                  name="username" 
                  placeholder="username"
                  type="text" 
                  value={this.state.username}
                />
                <input
                  className="login_input"
                  onChange={event => this.passwordChange(event)} 
                  id="password" 
                  name="password"
                  placeholder="password"
                  type="password" 
                  value={this.state.password}
                />
            <div>
                <select className="login_input" onChange={event => this.fieldChange(event.target.value)} >
                    <option value='1'>Not an Expert</option>
                    <option value='2'>Medical</option>
                    <option value="3">Psychology</option>
                    <option value="4">Legal</option>
                    <option value="5">Electrical Engineering</option>
                    <option value="6">Software Engineering</option>
                    <option value="7">Construction</option>
                    <option value="8">Auto Mechanic</option>
                    <option value="9">Political Science</option>
                    <option value="10">Music</option>
                </select>
            </div>
            <div>
              <button className="login_input" type="submit">Create Account</button>
            </div>
          </form>
        );
      }
}
