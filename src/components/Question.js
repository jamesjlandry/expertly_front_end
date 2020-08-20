import React from 'react'
import AnswerForm from '../components/AnswerForm'


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
        let answers = this.props.answers.filter(answer => answer.field_id === this.props.question.field_id)
        return (
            <div className="questionBox">
                {this.state.answerModal ? <div> <AnswerForm currentUser={this.props.currentUser} question={this.props.question} createAnswer={this.props.createAnswer}/></div> : null}
                <div>{this.props.question.text}</div>
                Are you an Expert? <button className='answer_button' onClick={() => this.answerModal()}>
                    Answer Question
                </button>
            </div>
        )
    }

}