import React from 'react'
import Question from '../components/Question'
import QuestionForm from '../components/QuestionForm'
import Search from '../components/Search'

export default class QuestionsContainer extends React.Component {

    state = {
        questionModal: false,
        search: '',
    }

    openQuestionModal = () => {
        this.setState({
            questionModal: !this.state.questionModal
        })
    }

    handleSearch = (e)=> {
        this.setState({search: e.target.value.toLowerCase()})
    }

    render () {
        let filteredQuestions = this.props.questions.filter(question => question.text.toLowerCase().includes(this.state.search))
        filteredQuestions = filteredQuestions.sort((a, b) => {
            return b.id - a.id
        })
        console.log(filteredQuestions)
        return (
            <div className="top_nav">
                <div className="search_and_question_nav">
                    <Search handleSearch={this.handleSearch} /> 
                    <button className='question_button' onClick={() => this.openQuestionModal()}>Ask a Question</button>
                </div>
                {
                    this.state.questionModal
                ?
                    <QuestionForm
                        createQuestion={this.props.createQuestion}
                        closeQuestionModal={this.openQuestionModal}
                        currentUser={this.props.currentUser}
                    />
                :
                    null
                }
               <div className="questions_container" >
               {
                    filteredQuestions.map(question => 
                        <Question
                            key={question.id}
                            question={question}
                            currentUser={this.props.currentUser}
                            answers={this.props.answers}
                            createAnswer={this.props.createAnswer}
                            users={this.props.users}
                        />
                    )
                }
                 </div>
            </div>
        )
    }

}