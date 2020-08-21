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
        let thisQuestionsAnswers = this.props.answers.filter(answer => answer.question_id === this.props.question.id)
        console.log(thisQuestionsAnswers)
        return (
            <div className="questionBox">
                {this.state.answerModal ? <div> <AnswerForm answerModal={this.answerModal} currentUser={this.props.currentUser} question={this.props.question} createAnswer={this.props.createAnswer}/></div> : null}
                <div>{this.props.question.text}</div>
                <div><AnswersContainer question={this.props.question} answers={thisQuestionsAnswers} users={this.props.users}/></div>
                Are you an Expert? <button className='answer_button' onClick={() => this.answerModal()}>
                    Answer Question
                </button>
            </div>
        )
    }

}