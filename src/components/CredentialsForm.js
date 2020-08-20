import React from 'react'

export default class Credentials extends React.Component {

    constructor() {
        super();
    
        this.state = {
          degree: '',
          yearsInField: '',
          
        };
      }
      createExpert = (credentials) => {
        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
        .then(res => res.json())
        .then(credential => {
           let credentials = [credential, ...this.state.credentials]
           this.setState({credentials})
        })
    }
      degreeChange = (e) => {
          this.setState({
              degree: e.target.value
          })
      }

      yearsInFieldChange = (e) => {
          this.setState({
            yearsInField: e.target.value
          })
      }

      fieldChange = (field) => {
          this.setState({
              field
          })
      }

      handleSubmit = (e) => {
          e.preventDefault();
        let credentials = {
            degree: this.state.degree,
            yearsInField: this.state.yearsInField,
            user_id: this.props.currentUser.id
        }
        this.createExpert(credentials)
      }
    
      render() {
        return (
          <form className='credentials_form_modal' onSubmit={this.handleSubmit}>
            <div>
              <label>
                Degree
                <input onChange={event => this.degreeChange(event)} id="degree" name="degree" type="text" value={this.state.degree}/>
              </label>
            </div>
            <div>
              <label>
                Years In Field
                <input onChange={event => this.yearsInFieldChange(event)} id="yearsInField" name="yearsInField" type="text" value={this.state.yearsInField}/>
              </label>
            </div>
            <div>
              <button  type="submit">Update Credentials</button>
            </div>
          </form>
        );
      }
}