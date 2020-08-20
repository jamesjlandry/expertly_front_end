import React from 'react'
import Question from '../components/Question'
import QuestionForm from '../components/QuestionForm'

export default class QuestionsContainer extends React.Component {

    state = {
        questionModal: false
    }

    openQuestionModal = () => {
        this.setState({
            questionModal: !this.state.questionModal
        })
    }

    render () {

        return (
            <div className="questionContainer">
                <div className='new_question'><button className='question_button' onClick={() => this.openQuestionModal()}>Ask a Question</button></div>
                {this.state.questionModal ? <QuestionForm createQuestion={this.props.createQuestion} closeQuestionModal={this.openQuestionModal} currentUser={this.props.currentUser}/> : null}
                {this.props.questions.map(question => <Question key={question.id} question={question} currentUser={this.props.currentUser}/>)}
            </div>
        )
    }

}