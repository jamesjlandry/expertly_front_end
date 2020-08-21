import React from 'react'

export default class AnswerForm extends React.Component {

    constructor() {
        super();
    
        this.state = {
          text: ''
        };
      }
     
      textChange = (e) => {
          this.setState({
              text: e.target.value
          })
      }

      handleSubmit = (e) => {
          e.preventDefault();
        let answer = {
            text: this.state.text,
            question_id: this.props.question.id,
            user_id: this.props.currentUser.id,
            upvotes: 0
        }
        this.props.createAnswer(answer)
        this.props.answerModal()
      }
    
      render() {
        return (
          <form className='answer_form_modal' onSubmit={this.handleSubmit}>
            <div>
              <label>
                <input onChange={event => this.textChange(event)} id="answer" name="answer" type="text" placeholder='Answer' value={this.state.text}/>
              </label>
            </div>
            <div>
              <button  type="submit">Submit Answer</button>
            </div>
          </form>
        );
      }
}