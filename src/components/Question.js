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
        let user = this.props.users.filter(user => user.id === this.props.question.user_id)
        return (
            <div className="question_box">
                
                {this.props.question.text} {user.map(user => <div key={user.id}>~ {user.username}</div>)}
                
                <div className="question_bottom">
                    <AnswersContainer question={this.props.question} answers={thisQuestionsAnswers} users={this.props.users}/>
                    {
                        this.state.answerModal
                    ?
                        <AnswerForm
                            answerModal={this.answerModal}
                            currentUser={this.props.currentUser}
                            question={this.props.question}
                            createAnswer={this.props.createAnswer}
                        />
                    :
                        <div>Are you an Expert?</div>
                    }
                    
                    <button className='answer_button' onClick={() => this.answerModal()}>Answer Question</button>
                </div>
            </div>
        )
    }

}