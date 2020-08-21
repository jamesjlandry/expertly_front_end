import React from 'react'

export default class CredentialsForm extends React.Component {

    constructor() {
        super();
    
        this.state = {
          degree: '',
          yearsInField: '',
          
        };
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
            years_in_field: this.state.yearsInField,
            user_id: this.props.currentUser.id, 
            field_id: this.props.fieldId
        }
        this.props.createExpert(credentials)
        this.props.handleCredentialModal()
        
      }
    
      render() {
        return (
          <form className="login_form" onSubmit={this.handleSubmit}>
            <div>
    
                
                <input className="login_input" onChange={event => this.degreeChange(event)} placeholder="degree" id="degree" name="degree" type="text" value={this.state.degree}/>
            
            
             
                <input className="login_input" onChange={event => this.yearsInFieldChange(event)} placeholder="years in field" id="yearsInField" name="yearsInField" type="text" value={this.state.yearsInField}/>
  

              <button  className="login_input" type="submit">Update Credentials</button>
            </div>
          </form>
        );
      }
}