import React from 'react'
import AnswerForm from '../components/AnswerForm'
import AnswersContainer from '../containers/AnswersContainer'


export default class Question extends React.Component {

    state = {
        answerModal: false
    }

    answerModal = () => {
        this.setState({
            answerModal: !this.state.answerModal
        })
    }

    render () {
        let thisQuestionsAnswers = this.props.answers.filter(answer => answer.field_id === this.props.question.field_id)
        return (
            <div className="question_box">
                {this.state.answerModal ? <div> <AnswerForm currentUser={this.props.currentUser} question={this.props.question} createAnswer={this.props.createAnswer}/></div> : null}
                <div>{this.props.question.text}</div>
                <AnswersContainer question={this.props.question} answers={thisQuestionsAnswers} users={this.props.users} />
                <div className="question_bottom">
                    <div>Are you an Expert?</div>
                    <button className='answer_button' onClick={() => this.answerModal()}>Answer Question</button>
                </div>
            </div>
        )
    }

}