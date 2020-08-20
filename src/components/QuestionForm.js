import React from 'react'

export default class QuestionForm extends React.Component {

    constructor() {
        super();
    
        this.state = {
          fieldType: '',
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
        let question = {
            text: this.state.text,
            field_id: this.state.fieldType,
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
                <input onChange={event => this.degreeChange(event)} id="degree" name="degree" type="text" value={this.state.degree}/>
              </label>
            </div>
            <div>
              <label>
                Ask a question:
                <input onChange={event => this.textChange(event)} id="question" name="question" type="text" value={this.state.text}/>
              </label>
            </div>
            <div>
              <button  type="submit">Submit Question</button>
            </div>
          </form>
        );
      }
}