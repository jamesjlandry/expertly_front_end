import React from 'react'

export default class QuestionForm extends React.Component {

    constructor() {
        super();
    
        this.state = {
          fieldType: 0,
          text: '',
          
        };
      }
      
      textChange = (e) => {
          this.setState({
              text: e.target.value
          })
      }

      fieldChange = (e) => {
          this.setState({
            fieldType: e.target.value
          })
      }


      handleSubmit = (e) => {
          e.preventDefault();
          let fieldID = parseInt(this.state.fieldType)
        let question = {
            text: this.state.text,
            field_id: fieldID,
            user_id: this.props.currentUser.id,
            upvotes: 0
        }
        this.props.createQuestion(question)
        this.props.closeQuestionModal()
      }
    
      render() {
        return (
          <form className='credentials_form_modal' onSubmit={this.handleSubmit}>
            <div>
              <label>
                Select Question Field
                <select fieldType={this.state.fieldType} onChange={this.fieldChange}>
                    <option value=''disabled selected>Make a Selection</option>
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
              </label>
            </div>
            <div>
              <label>
                Ask a question:
                <input onChange={event => this.textChange(event)} id="question" name="question" type="text" value={this.state.text}/>
              </label>
            </div>
            <div>
              <button type="submit">Submit Question</button>
            </div>
          </form>
        );
      }
}